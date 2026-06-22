(function () {
  'use strict';

  function getCurrentPage() {
    var path = window.location.pathname || '';
    var page = path.split('/').pop();
    return page || 'index.html';
  }

  function isActive(currentPage, href) {
    if (href === 'index.html#features') {
      return currentPage === 'index.html';
    }
    return currentPage === href;
  }

  function linkClass(active, mobile) {
    if (active) {
      return mobile ? 'text-snoolink-purple font-semibold py-2' : 'text-snoolink-purple font-semibold';
    }
    return mobile ? 'hover:text-purple-400 transition py-2' : 'hover:text-purple-400 transition';
  }

  function injectSharedStyles() {
    if (document.getElementById('shared-layout-styles')) {
      return;
    }

    var style = document.createElement('style');
    style.id = 'shared-layout-styles';
    style.textContent = [
      '.shared-nav-glass {',
      '  background: rgba(17, 24, 39, 0.8);',
      '  backdrop-filter: blur(10px);',
      '  border-bottom: 1px solid rgba(139, 92, 246, 0.2);',
      '}',
      '.mobile-menu, .shared-mobile-menu {',
      '  max-height: 0;',
      '  overflow: hidden;',
      '  transition: max-height 0.3s ease-in-out;',
      '}',
      '.mobile-menu.active, .shared-mobile-menu.active {',
      '  max-height: 520px;',
      '}',
      '.hamburger span, .shared-hamburger span {',
      '  display: block;',
      '  width: 25px;',
      '  height: 3px;',
      '  background: white;',
      '  margin: 5px 0;',
      '  transition: 0.3s;',
      '}',
      '.hamburger.active span:nth-child(1), .shared-hamburger.active span:nth-child(1) {',
      '  transform: rotate(45deg) translate(5px, 5px);',
      '}',
      '.hamburger.active span:nth-child(2), .shared-hamburger.active span:nth-child(2) {',
      '  opacity: 0;',
      '}',
      '.hamburger.active span:nth-child(3), .shared-hamburger.active span:nth-child(3) {',
      '  transform: rotate(-45deg) translate(7px, -6px);',
      '}',
      '.shared-bg-snoolink-purple {',
      '  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);',
      '}'
    ].join('\n');

    document.head.appendChild(style);
  }

  function buildNav(currentPage) {
    var links = [
      { href: 'index.html#features', label: 'Features' },
      { href: 'snoolink-lens-desktop.html', label: 'Desktop App' },
      { href: 'pricing.html', label: 'Pricing' },
      { href: 'use-cases.html', label: 'Use Cases' },
      { href: 'roadmap.html', label: 'Roadmap' },
      { href: 'wall-of-fame.html', label: 'Wall of Fame' },
      { href: 'about.html', label: 'About' },
      { href: 'contact.html', label: 'Contact' }
    ];

    var desktopLinks = links.map(function (link) {
      return '<a href="' + link.href + '" class="' + linkClass(isActive(currentPage, link.href), false) + '">' + link.label + '</a>';
    }).join('');

    var mobileLinks = links.map(function (link) {
      return '<a href="' + link.href + '" class="' + linkClass(isActive(currentPage, link.href), true) + '">' + link.label + '</a>';
    }).join('');

    var nav = document.createElement('nav');
    nav.className = 'fixed w-full z-50 shared-nav-glass';
    nav.id = 'site-nav';
    nav.innerHTML = [
      '<div class="max-w-7xl mx-auto px-6 py-4">',
      '  <div class="flex justify-between items-center">',
      '    <a href="index.html" class="flex items-center z-50">',
      '      <img src="https://raw.githubusercontent.com/snoolink/frontend/refs/heads/main/assets/full_logo-white.png" alt="snoolink logo" class="h-10 md:h-14 w-auto">',
      '    </a>',
      '    <div class="hidden md:flex space-x-8">' + desktopLinks + '</div>',
      '    <a href="https://app.snoolink.com/" class="hidden md:block shared-bg-snoolink-purple px-6 py-2 rounded-full font-semibold hover:scale-105 transition transform shadow-lg hover:shadow-purple-500/50">Get Started</a>',
      '    <button class="md:hidden hamburger shared-hamburger z-50" id="hamburger" aria-label="Open menu">',
      '      <span></span><span></span><span></span>',
      '    </button>',
      '  </div>',
      '  <div class="mobile-menu shared-mobile-menu md:hidden" id="mobileMenu">',
      '    <div class="flex flex-col space-y-4 pt-6 pb-4">',
      mobileLinks,
      '      <a href="https://app.snoolink.com/" class="shared-bg-snoolink-purple px-6 py-3 rounded-full font-semibold text-center hover:scale-105 transition transform shadow-lg mt-4">Get Started</a>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('');

    return nav;
  }

  function buildFooter() {
    var footer = document.createElement('footer');
    footer.className = 'border-t border-gray-800 py-16 px-6 bg-gradient-to-b from-gray-900 to-black';
    footer.id = 'site-footer';

    footer.innerHTML = [
      '<div class="max-w-7xl mx-auto">',
      '  <div class="grid md:grid-cols-5 gap-8 mb-12">',
      '    <div class="md:col-span-1">',
      '      <a href="index.html" class="flex items-center mb-4">',
      '        <img src="https://raw.githubusercontent.com/snoolink/frontend/refs/heads/main/assets/full_logo-white.png" alt="snoolink logo" class="h-12 w-auto">',
      '      </a>',
      '      <p class="text-gray-400 text-sm leading-relaxed mb-6">Content management for the modern creator.</p>',
      '    </div>',
      '    <div>',
      '      <h5 class="font-semibold mb-4 text-white">Product</h5>',
      '      <ul class="space-y-3 text-gray-400 text-sm">',
      '        <li><a href="index.html#features" class="hover:text-white transition-colors duration-200">Features</a></li>',
      '        <li><a href="snoolink-lens-desktop.html" class="hover:text-white transition-colors duration-200">Desktop App</a></li>',
      '        <li><a href="pricing.html" class="hover:text-white transition-colors duration-200">Pricing</a></li>',
      '        <li><a href="roadmap.html" class="hover:text-white transition-colors duration-200">Roadmap</a></li>',
      '      </ul>',
      '    </div>',
      '    <div>',
      '      <h5 class="font-semibold mb-4 text-white">MicroTools</h5>',
      '      <ul class="space-y-3 text-gray-400 text-sm">',
      '        <li><a href="download-instagram-reel.html" class="hover:text-white transition-colors duration-200">Download Instagram Reel</a></li>',
      '        <li><a href="instagram-reel-analyzer.html" class="hover:text-white transition-colors duration-200">Analyze Instagram Reel</a></li>',
      '        <li><a href="viral-hook-generator.html" class="hover:text-white transition-colors duration-200">Viral Hook Generator</a></li>',
      '      </ul>',
      '    </div>',
      '    <div>',
      '      <h5 class="font-semibold mb-4 text-white">Company</h5>',
      '      <ul class="space-y-3 text-gray-400 text-sm">',
      '        <li><a href="about.html" class="hover:text-white transition-colors duration-200">About</a></li>',
      '        <li><a href="use-cases.html" class="hover:text-white transition-colors duration-200">Use Cases</a></li>',
      '        <li><a href="wall-of-fame.html" class="hover:text-white transition-colors duration-200">Wall of Fame</a></li>',
      '        <li><a href="contact.html" class="hover:text-white transition-colors duration-200">Contact</a></li>',
      '      </ul>',
      '    </div>',
      '    <div>',
      '      <h5 class="font-semibold mb-4 text-white">Legal</h5>',
      '      <ul class="space-y-3 text-gray-400 text-sm">',
      '        <li><a href="privacy.html" class="hover:text-white transition-colors duration-200">Privacy</a></li>',
      '        <li><a href="terms.html" class="hover:text-white transition-colors duration-200">Terms</a></li>',
      '      </ul>',
      '    </div>',
      '  </div>',
      '  <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">',
      '    <p class="text-gray-400 text-sm">© 2026 Snoolink. All rights reserved.</p>',
      '  </div>',
      '</div>'
    ].join('');

    return footer;
  }

  function wireMobileMenu() {
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobileMenu');

    if (!hamburger || !mobileMenu) {
      return;
    }

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    var mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }

  function applySharedLayout() {
    if (document.body && document.body.getAttribute('data-shared-layout') === 'off') {
      return;
    }

    injectSharedStyles();

    var currentPage = getCurrentPage();
    var nav = buildNav(currentPage);
    var footer = buildFooter();

    var existingNav = document.querySelector('body > nav') || document.querySelector('nav.fixed');
    var existingFooter = document.querySelector('body > footer') || document.querySelector('footer');

    if (existingNav) {
      existingNav.replaceWith(nav);
    } else if (document.body) {
      document.body.prepend(nav);
    }

    if (existingFooter) {
      existingFooter.replaceWith(footer);
    } else if (document.body) {
      document.body.appendChild(footer);
    }

    wireMobileMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySharedLayout);
  } else {
    applySharedLayout();
  }
})();
