/* ── HEADER SCROLL ── */
(function () {
  const header  = document.querySelector('.site-header');
  const backTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
    if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);
  });

  if (backTop) {
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── DROPDOWNS ── */
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(drop => {
    const btn  = drop.querySelector('.dropdown-btn');
    const menu = drop.querySelector('.dropdown-menu');
    if (!btn || !menu) return;
    if (!menu.querySelector('.dropdown-menu-inner')) {
      const inner = document.createElement('div');
      inner.className = 'dropdown-menu-inner';
      while (menu.firstChild) inner.appendChild(menu.firstChild);
      menu.appendChild(inner);
    }
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('open');
      document.querySelectorAll('.dropdown-menu.open').forEach(m => {
        m.classList.remove('open');
        m.closest('.nav-dropdown')?.querySelector('.dropdown-btn')?.classList.remove('active');
      });
      if (!isOpen) { menu.classList.add('open'); btn.classList.add('active'); }
    });
    drop.addEventListener('mouseleave', () => {
      drop._closeTimer = setTimeout(() => {
        menu.classList.remove('open'); btn.classList.remove('active');
      }, 150);
    });
    drop.addEventListener('mouseenter', () => {
      clearTimeout(drop._closeTimer);
      menu.classList.add('open'); btn.classList.add('active');
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu.open').forEach(m => {
      m.classList.remove('open');
      m.closest('.nav-dropdown')?.querySelector('.dropdown-btn')?.classList.remove('active');
    });
  });

  /* ── MOBILE MENU ── */
  const menuBtn   = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const icon = menuBtn.querySelector('i');
      if (icon) icon.className = mobileNav.classList.contains('open') ? 'ri-close-line' : 'ri-menu-line';
    });
  }

  /* ── ACTIVE NAV LINK ── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) link.classList.add('active');
  });
})();

/* ── SEND TO WEB3FORMS ── */
async function sendToWeb3Forms(fields) {
  var ACCESS_KEY = '2af0c0f5-01fa-4349-b83c-fff623cb969b';
  var payload = Object.assign({ access_key: ACCESS_KEY }, fields);
  var res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  var json = await res.json();
  if (!json.success) throw new Error('Web3Forms error: ' + JSON.stringify(json));
  return json;
}

/* ── CONTACT FORM (contact.html) ── */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const counter = document.getElementById('msg-counter');
  const msgArea = form.querySelector('textarea[name="message"]');
  if (msgArea && counter) {
    msgArea.addEventListener('input', () => {
      counter.textContent = msgArea.value.length + '/500';
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn        = form.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('form-success');
    const errorMsg   = document.getElementById('form-error');

    btn.disabled = true;
    btn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 1s linear infinite"></i> Sending...';

    try {
      const data = new FormData(form);
      await sendToWeb3Forms({
        'Source'  : 'Contact Page - Send Us a Message',
        'Name'    : data.get('name') || 'N/A',
        'Email'   : data.get('email') || 'N/A',
        'Phone'   : data.get('phone') || 'N/A',
        'Company' : data.get('company') || 'N/A',
        'Service' : data.get('service') || 'N/A',
        'Message' : data.get('message') || 'N/A'
      });
      if (successMsg) successMsg.style.display = 'flex';
      if (errorMsg)   errorMsg.style.display   = 'none';
      form.reset();
      if (counter) counter.textContent = '0/500';
    } catch(err) {
      console.error(err);
      if (errorMsg)   errorMsg.style.display   = 'flex';
      if (successMsg) successMsg.style.display = 'none';
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="ri-send-plane-line"></i> Send Message';
    }
  });
})();

/* ── SCROLL REVEAL ── */
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    observer.observe(el);
  });
})();

/* ── SPIN KEYFRAME ── */
const _s = document.createElement('style');
_s.textContent = '@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}';
document.head.appendChild(_s);

/* ═══ GLOBAL DUAL ACTION STRIP INJECTION ═══
   Injects the strip on pages that don't have it already */
(function () {
  if (document.querySelector('.dual-action-strip')) return; // already present

  const strip = document.createElement('div');
  strip.className = 'dual-action-strip';
  strip.innerHTML = `
    <div class="dual-action-inner">
      <div class="dual-action-left">
        <i class="ri-shield-check-line"></i>
        Trusted IT Partner for Delhi NCR Businesses
      </div>
      <div class="dual-action-right">
        <a href="/register.html" class="btn-register-hdr" id="regHdrBtn">
          <i class="ri-user-add-line"></i> Register / Sign Up
        </a>
        <a href="/managed-services.html" class="btn-managed">
          <i class="ri-settings-4-line"></i> Managed Services
        </a>
        <a href="/products.html" class="btn-online-purchase">
          <i class="ri-shopping-cart-2-line"></i> Online Purchase
        </a>
      </div>
    </div>`;

  const header = document.querySelector('.site-header');
  if (header) {
    document.body.insertBefore(strip, header);
  } else {
    document.body.insertBefore(strip, document.body.firstChild);
  }

  /* Strip is position:fixed — body needs top padding to expose content beneath it */
  document.body.style.paddingTop = '0'; // heroes handle their own offset via CSS padding
  /* Header top is set via CSS !important — JS inline style is not needed */

  /* Sync user state in the injected strip */
  try {
    const user   = JSON.parse(localStorage.getItem('omnet_user') || 'null');
    const regBtn = document.getElementById('regHdrBtn');
    if (user && regBtn) {
      regBtn.innerHTML = `<i class="ri-user-line"></i> ${user.name.split(' ')[0]}`;
      regBtn.href      = '/register.html#dashboard';
    }
  } catch (e) { /* ignore */ }

  /* Floating WhatsApp button (global) */
  if (!document.querySelector('.float-actions')) {
    const fab = document.createElement('div');
    fab.className = 'float-actions';
    fab.innerHTML = `
      <a href="https://wa.me/918920603270?text=Hi%2C%20I%20am%20interested%20in%20your%20services" target="_blank" 
         class="float-wa" title="Chat on WhatsApp">
        <i class="ri-whatsapp-line"></i>
      </a>`;
    document.body.appendChild(fab);
  }
})();

/* ═══ SCROLL REVEAL (global) ═══ */
(function () {
  if (!window.IntersectionObserver) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity  = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll('.reveal').forEach(el => {
    if (!el.style.opacity) {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      obs.observe(el);
    }
  });
})();
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
    var WA_URL = 'https://wa.me/918920603270?text=Hi%2C%20I%20am%20interested%20in%20your%20services';
    
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
        fab.innerHTML = '<a href="https://wa.me/918920603270?text=Hi%2C%20I%20am%20interested%20in%20your%20services" target="_blank" rel="noopener noreferrer" class="float-wa" title="Chat on WhatsApp" style="width:52px;height:52px;border-radius:50%;background:#25D366;color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.6rem;box-shadow:0 4px 16px rgba(37,211,102,.5);text-decoration:none;"><i class="ri-whatsapp-line"></i></a>';
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

// ── TAWK.TO LIVE CHAT ────────────────────────────────────────────
// Pages that have the teal "Leave a Message" button (#lamTrigger) use it as
// the chat launcher, so Tawk's own bubble is hidden there BEFORE it renders
// (no flash-then-disappear). Pages without that button show Tawk's normal
// bubble. Until Tawk has loaded, the button opens the message form instead.
var Tawk_API = Tawk_API || {}, Tawk_LoadTime = new Date();
(function () {
  var ready = false;
  function hasLauncher() { return !!document.getElementById('lamTrigger'); }
  function hideIfLauncher() {
    if (hasLauncher() && typeof Tawk_API.hideWidget === 'function') Tawk_API.hideWidget();
  }

  // On phones, keep Tawk's bubble above the sticky call bar at the bottom of the screen
  Tawk_API.customStyle = { visibility: { mobile: { position: 'br', xOffset: 16, yOffset: 76 } } };

  // On phones (<=768px) the sticky call bar covers the bottom 60px, so lift the
  // floating "Leave a Message" / "Technical Support" buttons above it.
  var fabCss = document.createElement('style');
  fabCss.textContent = '@media (max-width:768px){' +
    'html body #lamTrigger{bottom:calc(76px + env(safe-area-inset-bottom,0px)) !important;right:16px !important;z-index:9400 !important}' +
    'html body #stTrigger{bottom:calc(132px + env(safe-area-inset-bottom,0px)) !important;right:16px !important}}';
  document.head.appendChild(fabCss);

  Tawk_API.onBeforeLoad = hideIfLauncher;
  Tawk_API.onLoad = function () { ready = true; hideIfLauncher(); };
  Tawk_API.onChatMinimized = hideIfLauncher;
  // If an agent replies while the chat is closed, show the bubble so it isn't missed
  Tawk_API.onChatMessageAgent = function () {
    if (typeof Tawk_API.showWidget === 'function') Tawk_API.showWidget();
  };

  // "Leave a Message" -> open live chat (capture phase, runs before the page's own form handler)
  document.addEventListener('click', function (e) {
    if (!ready || !e.target.closest || !e.target.closest('#lamTrigger')) return;
    e.preventDefault();
    e.stopPropagation();
    Tawk_API.showWidget();
    Tawk_API.maximize();
  }, true);

  // Load after the page has finished loading so chat doesn't slow down first paint
  function loadTawk() {
    var s1 = document.createElement('script'), s0 = document.getElementsByTagName('script')[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/6ac1452ce6f57734ca7b09da/1k41fce27';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
  }
  if (document.readyState === 'complete') loadTawk();
  else window.addEventListener('load', loadTawk);
})();
