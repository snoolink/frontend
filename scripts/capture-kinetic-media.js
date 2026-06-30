const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  const root = path.resolve(__dirname, '..');
  const appFile = path.join(root, 'kinetic-typography-generator.html');
  const outDir = path.join(root, 'assets');
  const framesDir = path.join(root, 'assets', 'kinetic-frames');

  if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 980 } });

  await page.goto('file:///' + appFile.replace(/\\/g, '/'), { waitUntil: 'load' });
  await page.waitForTimeout(1200);

  // Prepare a meaningful scene before capture (works even when sections are collapsed).
  await page.evaluate(() => {
    const styleEl = document.querySelector('.style-card[data-style="pulse"]');
    if (styleEl && window.selStyle) window.selStyle(styleEl);
    const layoutEl = document.querySelector('.layout-card[data-layout="beat"]');
    if (layoutEl && window.selLayout) window.selLayout(layoutEl);
    const animEl = document.querySelector('.anim-chip[data-anim="whip"]');
    if (animEl && window.selAnim) window.selAnim(animEl);
    const ratioEl = document.querySelector('.ratio-chip[data-ratio="16:9"]');
    if (ratioEl && window.selRatio) window.selRatio(ratioEl);
    if (window.generate) window.generate();
  });
  await page.waitForTimeout(1400);

  // Capture full dashboard and canvas snapshot.
  await page.screenshot({ path: path.join(outDir, 'kinetic-dashboard-ui.png'), fullPage: true });
  await page.locator('#canvasWrap').screenshot({ path: path.join(outDir, 'kinetic-dashboard-canvas.png') });

  const totalDurMs = await page.evaluate(() => window.totalDurMs || 6000);
  const frameCount = 48;

  for (let i = 0; i < frameCount; i++) {
    const t = (i / (frameCount - 1)) * Math.max(1200, totalDurMs);
    await page.evaluate((ms) => {
      if (window.drawAtTime) {
        window.progress = Math.min(1, ms / (window.totalDurMs || ms || 1));
        window.drawAtTime(ms);
      }
    }, t);
    await page.waitForTimeout(20);
    const framePath = path.join(framesDir, `frame-${String(i).padStart(3, '0')}.png`);
    await page.locator('#canvasWrap').screenshot({ path: framePath });
  }

  await browser.close();
  console.log('Capture complete');
})();
