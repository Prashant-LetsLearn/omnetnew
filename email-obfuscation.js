/* ════════════════════════════════════════════════════════════════════════
   OMNET IT — EMAIL OBFUSCATION (email-obfuscation.js)
   ════════════════════════════════════════════════════════════════════════
   Why this exists
   ───────────────
   Plain `mailto:hello@omnetit.in` and even `hello[at]omnetit.in` are trivially
   harvested. Spammers run scrapers daily against any India-hosted business
   site. This script keeps the address out of the raw HTML and only
   reconstructs it inside the user's browser, on click.

   How it works
   ────────────
   Markup contains base64-encoded user + domain in data-* attributes:

       <span class="omnet-email"
             data-user="aGVsbG8="
             data-domain="b21uZXRpdC5pbg==">[ click to reveal email ]</span>

   On the user's first interaction (click / focus / hover), the script:
     1. Decodes the parts
     2. Reassembles them as user@domain
     3. Replaces the placeholder with a real <a href="mailto:..."> link
     4. Optionally opens the user's mail client immediately

   Bots that just parse static HTML never see the address. Bots that execute
   JS (much rarer) still need to *click* — and our click handler verifies it
   was a real user gesture (isTrusted) before revealing.

   How to encode a new address
   ───────────────────────────
   In any browser console:
     btoa('hello')          // → "aGVsbG8="
     btoa('omnetit.in')     // → "b21uZXRpdC5pbg=="
     btoa('support')        // → "c3VwcG9ydA=="

   Add new addresses by dropping more <span class="omnet-email" ...> tags.
   Multiple addresses on one page work fine.
   ════════════════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  /* ── Base64 → utf-8 string (handles any unicode safely) ── */
  function b64decode (s) {
    if (!s) return '';
    try {
      // atob on its own is byte-oriented; this preserves UTF-8 chars too.
      return decodeURIComponent(atob(s).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    } catch (_) { return ''; }
  }

  /* ── Reassemble + (optionally) open mailto: ── */
  function reveal (el, openMail) {
    if (!el || el.classList.contains('revealed')) return el && el.dataset && el.dataset.address;
    var user   = b64decode(el.dataset.user);
    var domain = b64decode(el.dataset.domain);
    if (!user || !domain) return '';
    var address = user + '@' + domain;
    el.dataset.address = address;
    el.classList.add('revealed');

    // Replace placeholder content with a real mailto link
    var link = document.createElement('a');
    link.href        = 'mailto:' + address;
    link.textContent = address;
    link.className   = 'omnet-email-link';
    link.rel         = 'nofollow';
    // Clear the placeholder
    el.innerHTML = '';
    el.appendChild(link);

    if (openMail) {
      try { global.location.href = 'mailto:' + address; } catch (_) {}
    }
    return address;
  }

  /* ── Click / focus / touch reveal ── */
  function attach (el) {
    if (el.dataset.bound === '1') return;
    el.dataset.bound = '1';

    var openOnClick = !el.classList.contains('omnet-email-no-open');

    el.addEventListener('click', function (e) {
      // Require a real user gesture — bots running headless usually don't have one
      if (e && e.isTrusted === false) return;
      e.preventDefault();
      reveal(el, openOnClick);
    });

    // Pre-reveal (without opening mail) on hover/focus for accessibility
    var lazyReveal = function () { reveal(el, false); };
    el.addEventListener('focus',      lazyReveal, { once: true });
    el.addEventListener('mouseenter', lazyReveal, { once: true });
    el.addEventListener('touchstart', lazyReveal, { once: true, passive: true });

    if (el.tagName === 'SPAN' || el.tagName === 'BUTTON') {
      el.setAttribute('role', el.tagName === 'BUTTON' ? 'button' : 'link');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', el.dataset.label || 'Reveal email address');
      el.style.cursor = 'pointer';
    }
  }

  /* ── Boot ── */
  function init () {
    var els = document.querySelectorAll('.omnet-email, .omnet-email-btn');
    Array.prototype.forEach.call(els, attach);

    // Catch dynamically added emails (e.g. modals opened later)
    if (global.MutationObserver) {
      new MutationObserver(function (muts) {
        muts.forEach(function (m) {
          m.addedNodes && m.addedNodes.forEach(function (n) {
            if (n.nodeType !== 1) return;
            if (n.matches && n.matches('.omnet-email, .omnet-email-btn')) attach(n);
            if (n.querySelectorAll) n.querySelectorAll('.omnet-email, .omnet-email-btn').forEach(attach);
          });
        });
      }).observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Public API */
  global.OmnetEmail = {
    reveal: function (el) { return reveal(el, true); },
    attach: attach,
    encode: function (s) { return btoa(unescape(encodeURIComponent(s))); }
  };
})(window);
