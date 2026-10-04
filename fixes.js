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

  /* ── FIX: Inject mobile sticky call/WhatsApp bar if a page is missing it ── */
  function ensureStickyBar() {
    if (document.querySelector('.omnet-sticky-bar')) return; // already present
    var bar = document.createElement('div');
    bar.className = 'omnet-sticky-bar';
    bar.setAttribute('role', 'navigation');
    bar.setAttribute('aria-label', 'Quick contact');
    bar.innerHTML =
      '<a class="omnet-sticky-phone" href="tel:+918920603270" title="Call us"><i class="ri-phone-line"></i></a>' +
      '<a class="omnet-sticky-call" href="tel:+918920603270"><i class="ri-phone-fill"></i> +91 89206 03270</a>' +
      '<a class="omnet-sticky-wa" href="https://wa.me/918920603270?text=Hi%2C%20I%20am%20interested%20in%20your%20services" target="_blank" rel="noopener" title="WhatsApp"><i class="ri-whatsapp-line"></i></a>';
    document.body.appendChild(bar);
  }

  /* ── RUN ALL FIXES ── */
  function runAllFixes() {
    fixDropdownZIndex();
    fixWhatsAppButton();
    fixRevealFallback();
    fixOverlays();
    fixMobileMenu();
    ensureFloatWA();
    ensureStickyBar();
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

/* ── FIX: "Request Callback" on pages without the callback modal ──
   Many pages show the header callback button but don't include the modal,
   so cbOpen() was undefined and the button did nothing. Send those visitors
   to the contact page, which opens the callback form. */
if (typeof window.cbOpen !== 'function') {
  window.cbOpen = function () { window.location.href = '/contact.html#callback'; };
}

/* Request a Callback form → also log to Google Sheet ("Callbacks" tab).
   Runs alongside the existing Web3Forms submit; never blocks it. */
(function () {
  var SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwiRsUFv_kVzLkY0DmVRko2fPvPhzZ1li3F_U80OhwLy5pqd8T_N9VHNG2ONBEk5X60/exec';
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || f.id !== 'cbForm') return;
    try {
      var fd = new FormData(f);
      var body = new URLSearchParams({
        type: 'callback',
        name: fd.get('cb_name') || '', phone: fd.get('cb_phone') || '',
        date: fd.get('cb_date') || '', time: fd.get('cb_time') || '',
        topic: fd.get('cb_topic') || '', page: location.href, userAgent: navigator.userAgent
      });
      fetch(SHEET_ENDPOINT, { method: 'POST', mode: 'no-cors', body: body }).catch(function () {});
    } catch (err) {}
  }, true);
})();

/* Top strip: "Register / Sign Up" → "Contact Us", plus a "Subscribe" button
   with a sign-up modal. Subscribers are logged to Google Sheet ("Subscribers"). */
(function () {
  var SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwiRsUFv_kVzLkY0DmVRko2fPvPhzZ1li3F_U80OhwLy5pqd8T_N9VHNG2ONBEk5X60/exec';

  function upgradeStrip() {
    document.querySelectorAll('.btn-register-hdr:not(.omn-sub-btn)').forEach(function (a) {
      a.href = '/register.html';
      a.innerHTML = '<i class="ri-chat-smile-2-line"></i> Contact Us';
      a.title = 'Contact OMNET IT Solutions';
      if (!a.parentNode.querySelector('.omn-sub-btn')) {
        var s = document.createElement('a');
        s.href = '#subscribe';
        s.className = 'btn-register-hdr omn-sub-btn';
        s.innerHTML = '<i class="ri-notification-3-line"></i> Subscribe';
        s.title = 'Get IT tips, security alerts & offers';
        s.addEventListener('click', function (e) { e.preventDefault(); openSub(); });
        a.parentNode.insertBefore(s, a.nextSibling);
      }
    });
  }

  var modal;
  function buildModal() {
    var st = document.createElement('style');
    st.textContent =
      '.omn-sub-btn{background:linear-gradient(135deg,#f97316,#eab308)!important;border-color:transparent!important;color:#fff!important}' +
      '#omnSubOv{position:fixed;inset:0;background:rgba(2,6,23,.55);z-index:9300;display:none;align-items:center;justify-content:center;padding:16px}' +
      '#omnSubOv.open{display:flex}' +
      '#omnSub{background:#fff;border-radius:18px;max-width:440px;width:100%;box-shadow:0 24px 70px rgba(0,0,0,.3);overflow:hidden;font-family:inherit;color:#334155}' +
      '#omnSub .hd{background:linear-gradient(135deg,#0d9488,#0891b2);color:#fff;padding:20px 22px;position:relative}' +
      '#omnSub .hd b{display:block;font-size:18px;font-weight:800}#omnSub .hd span{font-size:13px;opacity:.9}' +
      '#omnSub .x{position:absolute;top:10px;right:14px;background:none;border:0;color:#fff;font-size:26px;cursor:pointer;line-height:1}' +
      '#omnSub form{padding:20px 22px}' +
      '#omnSub input[type=email],#omnSub input[type=text]{width:100%;box-sizing:border-box;padding:10px 12px;border:1.5px solid #e5e7eb;border-radius:9px;font:inherit;font-size:14px;margin-bottom:10px;outline:none}' +
      '#omnSub input:focus{border-color:#0d9488}' +
      '#omnSub .chips{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0 14px}' +
      '#omnSub .chips label{display:inline-flex;align-items:center;gap:5px;border:1.5px solid #e5e7eb;border-radius:99px;padding:5px 10px;font-size:12px;font-weight:600;cursor:pointer}' +
      '#omnSub .chips input{accent-color:#0d9488}' +
      '#omnSub button[type=submit]{width:100%;padding:12px;border:0;border-radius:9px;background:linear-gradient(135deg,#f97316,#eab308);color:#fff;font-weight:800;font-size:14px;cursor:pointer}' +
      '#omnSub .m{margin-top:10px;font-size:13px;font-weight:600;min-height:1em}#omnSub .m.ok{color:#047857}#omnSub .m.err{color:#b91c1c}' +
      '#omnSub .ft{font-size:11px;color:#94a3b8;margin-top:10px;text-align:center}#omnSub .ft a{color:#0d9488}';
    document.head.appendChild(st);
    modal = document.createElement('div');
    modal.id = 'omnSubOv';
    modal.innerHTML =
      '<div id="omnSub" role="dialog" aria-modal="true" aria-labelledby="omnSubT">' +
      '<div class="hd"><button class="x" type="button" aria-label="Close">&times;</button>' +
      '<b id="omnSubT">Stay ahead on IT &amp; security</b><span>Practical IT tips, security alerts and exclusive offers. No spam — unsubscribe anytime.</span></div>' +
      '<form novalidate><input type="email" name="email" placeholder="Your work email *" required autocomplete="email">' +
      '<input type="text" name="name" placeholder="Your name (optional)" autocomplete="name">' +
      '<div style="font-size:12px;font-weight:700;color:#475569">I\'m interested in</div><div class="chips">' +
      ['IT Support & AMC', 'Cybersecurity alerts', 'Cloud & Microsoft 365', 'Hardware deals', 'Tech tips'].map(function (t) {
        return '<label><input type="checkbox" name="interests" value="' + t + '">' + t.replace('&', '&amp;') + '</label>';
      }).join('') +
      '</div><button type="submit">Subscribe</button><div class="m" role="status" aria-live="polite"></div>' +
      '<div class="ft">By subscribing you agree to our <a href="/privacy-policy.html">Privacy Policy</a>.</div></form></div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', function (e) { if (e.target === modal || e.target.classList.contains('x')) closeSub(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSub(); });
    var form = modal.querySelector('form'), m = modal.querySelector('.m'), b = form.querySelector('button[type=submit]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form), email = String(fd.get('email') || '').trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { m.textContent = 'Please enter a valid email address.'; m.className = 'm err'; return; }
      b.disabled = true; b.textContent = 'Subscribing…';
      fetch(SHEET_ENDPOINT, { method: 'POST', mode: 'no-cors', body: new URLSearchParams({
        type: 'subscribe', email: email, name: fd.get('name') || '', interests: fd.getAll('interests').join(', '),
        page: location.href, userAgent: navigator.userAgent }) })
        .then(function () {
          m.textContent = 'You\'re subscribed! Watch your inbox for IT tips and offers from OMNET.'; m.className = 'm ok'; form.reset();
          if (window.gtag) gtag('event', 'sign_up', { method: 'newsletter' });
          setTimeout(closeSub, 3000);
        })
        .catch(function () { m.textContent = 'Something went wrong. Please try again.'; m.className = 'm err'; })
        .finally(function () { b.disabled = false; b.textContent = 'Subscribe'; });
    });
  }
  function openSub() { if (!modal) buildModal(); modal.classList.add('open'); setTimeout(function () { modal.querySelector('input[type=email]').focus(); }, 50); }
  function closeSub() { if (modal) modal.classList.remove('open'); }
  window.omnOpenSubscribe = openSub;

  function init() {
    upgradeStrip();
    if (location.hash === '#subscribe') openSub();
    if (!modal) { var st = document.createElement('style'); st.textContent = '.omn-sub-btn{background:linear-gradient(135deg,#f97316,#eab308)!important;border-color:transparent!important;color:#fff!important}'; document.head.appendChild(st); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.addEventListener('load', upgradeStrip);
})();

/* Footer: communication & WhatsApp consent notice (all pages). */
(function () {
  function addConsent() {
    var footer = document.querySelector('footer');
    if (!footer || footer.querySelector('.omn-consent')) return;
    var box = document.createElement('div');
    box.className = 'omn-consent';
    box.setAttribute('style', 'max-width:1280px;margin:0 auto;padding:.9rem 1.5rem;border-top:1px solid rgba(255,255,255,.08);font-size:.74rem;line-height:1.65;color:#94a3b8');
    box.innerHTML =
      '<strong style="color:#e2e8f0;font-weight:600"><i class="ri-shield-user-line" style="margin-right:4px;color:#2dd4bf"></i>Communication &amp; WhatsApp consent:</strong> ' +
      'By submitting a form on this website, requesting a callback, or messaging us, you agree that OMNET IT Solutions may contact you by phone, SMS, email and WhatsApp ' +
      'about your enquiry and our services. Promotional messages are sent only to people who have opted in. You can opt out anytime by replying <b>STOP</b> on WhatsApp, ' +
      'using the <a href="/unsubscribe.html" style="color:#2dd4bf">Unsubscribe from Mailer Promotions</a> page, or writing to ' +
      '<a href="mailto:info@omnetit.in" style="color:#2dd4bf">info@omnetit.in</a>. We never sell or share your details. See our ' +
      '<a href="/privacy-policy.html" style="color:#2dd4bf">Privacy Policy</a>.';
    var bottom = footer.querySelector('.footer-bottom');
    if (bottom) footer.insertBefore(box, bottom); else footer.appendChild(box);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addConsent); else addConsent();
})();
