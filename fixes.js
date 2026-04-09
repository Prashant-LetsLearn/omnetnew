/* ═══════════════════════════════════════════════════════════════════
   OMNET IT SOLUTIONS — JAVASCRIPT BUG FIXES
   Fixes: Dropdown z-index, WhatsApp button, overlay blocking,
          reveal fallback, mobile menu improvements
═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── FIX: Ensure dropdown menus are ABOVE header (z-index fix) ── */
  function fixDropdownZIndex() {
    document.querySelectorAll('.dropdown-menu').forEach(function (menu) {
      menu.style.zIndex = '1100';
    });
    document.querySelectorAll('.nav-dropdown').forEach(function (drop) {
      drop.style.overflow = 'visible';
      drop.style.position = 'relative';
    });
    // Also fix ancestor nav overflow
    var nav = document.querySelector('.site-nav');
    if (nav) nav.style.overflow = 'visible';
    var hInner = document.querySelector('.header-inner');
    if (hInner) hInner.style.overflow = 'visible';
    var sHeader = document.querySelector('.site-header');
    if (sHeader) sHeader.style.overflow = 'visible';
  }

  /* ── FIX: WhatsApp floating button — always correct URL ── */
  function fixWhatsAppButton() {
    var WA_URL = 'https://wa.me/919717270865?text=Hi%2C%20I%20am%20interested%20in%20your%20services';
    
    // Fix the right-side float button injected by script.js
    document.querySelectorAll('.float-wa').forEach(function (el) {
      el.href = WA_URL;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
      el.style.pointerEvents = 'auto';
      el.style.cursor = 'pointer';
      el.style.zIndex = '99998';
    });

    // Fix the mobile sticky bar WhatsApp
    document.querySelectorAll('.omnet-sticky-wa').forEach(function (el) {
      el.href = WA_URL;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
      el.style.pointerEvents = 'auto';
    });

    // Fix waWrap container z-index
    var waWrap = document.getElementById('waWrap');
    if (waWrap) {
      waWrap.style.zIndex = '99999';
      waWrap.style.pointerEvents = 'auto';
    }

    // Fix the waBubble button
    var waBubble = document.getElementById('waBubble');
    if (waBubble) {
      waBubble.style.pointerEvents = 'auto';
      waBubble.style.cursor = 'pointer';
    }
  }

  /* ── FIX: Reveal animation fallback ── 
     If IntersectionObserver never fires (hidden elements stay invisible),
     force reveal after 1.5s timeout */
  function fixRevealFallback() {
    setTimeout(function () {
      document.querySelectorAll('.reveal').forEach(function (el) {
        if (el.style.opacity === '0' || el.style.opacity === '') {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    }, 1500);
  }

  /* ── FIX: Ensure overlays don't block page by default ── */
  function fixOverlays() {
    // Cart overlay
    var cartOverlay = document.querySelector('.cart-overlay');
    if (cartOverlay && !cartOverlay.classList.contains('open')) {
      cartOverlay.style.pointerEvents = 'none';
    }

    // Modal overlay
    var modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay && !modalOverlay.classList.contains('active')) {
      modalOverlay.style.pointerEvents = 'none';
      modalOverlay.style.display = 'none';
    }

    // UPI modal
    var upiOverlay = document.querySelector('.upi-modal-overlay');
    if (upiOverlay && !upiOverlay.classList.contains('active')) {
      upiOverlay.style.pointerEvents = 'none';
      upiOverlay.style.display = 'none';
    }

    // Support ticket overlay
    var stOverlay = document.getElementById('stOverlay');
    if (stOverlay) {
      stOverlay.style.pointerEvents = 'none';
    }
  }

  /* ── FIX: Mobile menu — close on outside click ── */
  function fixMobileMenu() {
    var mobileNav = document.querySelector('.mobile-nav');
    var menuBtn = document.querySelector('.mobile-menu-btn');
    if (!mobileNav || !menuBtn) return;

    document.addEventListener('click', function (e) {
      if (mobileNav.classList.contains('open') &&
          !mobileNav.contains(e.target) &&
          !menuBtn.contains(e.target)) {
        mobileNav.classList.remove('open');
        var icon = menuBtn.querySelector('i');
        if (icon) icon.className = 'ri-menu-line';
      }
    });
  }

  /* ── FIX: Inject float-actions WhatsApp if script.js hasn't done it ── */
  function ensureFloatWA() {
    // The script.js injects .float-actions — wait for it then fix the URL
    setTimeout(function () {
      fixWhatsAppButton();
      
      // If script.js didn't inject float-actions, create it now
      if (!document.querySelector('.float-actions')) {
        var fab = document.createElement('div');
        fab.className = 'float-actions';
        fab.style.cssText = 'position:fixed;left:1.25rem;bottom:5rem;z-index:99998;display:flex;flex-direction:column;gap:.6rem;align-items:flex-start;';
        fab.innerHTML = '<a href="https://wa.me/919717270865?text=Hi%2C%20I%20am%20interested%20in%20your%20services" target="_blank" rel="noopener noreferrer" class="float-wa" title="Chat on WhatsApp" style="width:52px;height:52px;border-radius:50%;background:#25D366;color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.6rem;box-shadow:0 4px 16px rgba(37,211,102,.5);text-decoration:none;"><i class="ri-whatsapp-line"></i></a>';
        document.body.appendChild(fab);
      }
    }, 500);
  }

  /* ── RUN ALL FIXES ── */
  function runAllFixes() {
    fixDropdownZIndex();
    fixWhatsAppButton();
    fixRevealFallback();
    fixOverlays();
    fixMobileMenu();
    ensureFloatWA();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllFixes);
  } else {
    runAllFixes();
  }

  // Re-run after a short delay to catch dynamically injected elements
  window.addEventListener('load', function () {
    fixDropdownZIndex();
    fixWhatsAppButton();
    fixOverlays();
  });

})();
