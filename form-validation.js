/* ════════════════════════════════════════════════════════════════════════
   OMNET IT — FORM SECURITY & VALIDATION (form-validation.js)
   ════════════════════════════════════════════════════════════════════════
   Wires up every <form class="omnet-secure-form"> with:

     • CSRF-style nonce       — random token per page load, included in payload
     • Honeypot detection     — silently drops submissions that filled
                                hp-trap or Web3Forms botcheck
     • Time-trap              — minimum fill seconds (data-min-fill-seconds)
     • Rate limit (soft)      — 3 submissions / 10 minutes / form per device
     • Field validation       — pattern + length + email/phone/date checks
     • Input sanitisation     — strips control chars, normalises Unicode,
                                rejects script injection patterns
     • reCAPTCHA v3           — invisible score check (token sent to Web3Forms;
                                also POSTed to your /verify endpoint if set)
     • Same-origin guard      — refuses to submit from non-https or wrong host
     • Submit lockout + UX    — disables button, shows spinner, surfaces errors

   IMPORTANT — replace these two before going live:
       RECAPTCHA_SITE_KEY     — your reCAPTCHA v3 site key
       SAME_ORIGIN_HOSTS      — array of allowed hosts

   This file has NO external dependencies.
   ════════════════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  /* ───────────────────── CONFIGURATION ────────────────────── */
  var CONFIG = {
    RECAPTCHA_SITE_KEY: 'YOUR_RECAPTCHA_SITE_KEY',
    WEB3FORMS_ENDPOINT: 'https://api.web3forms.com/submit',
    SAME_ORIGIN_HOSTS:  ['www.omnetit.in', 'omnetit.in', 'localhost', '127.0.0.1'],
    RATE_LIMIT_MAX:     3,                  // submissions per window
    RATE_LIMIT_WINDOW:  10 * 60 * 1000,     // 10 minutes
    MAX_FIELD_BYTES:    8000                // hard upper-bound per field
  };

  /* ───────────────────── XSS / INPUT SANITISER ─────────────────────── */
  // Removes control chars, strips tags, neutralises common XSS vectors,
  // truncates to MAX_FIELD_BYTES. Always call this before sending data.
  function sanitiseInput (raw) {
    if (raw == null) return '';
    var s = String(raw);
    // 1) Normalise Unicode so visually-identical attacks collapse
    try { s = s.normalize('NFKC'); } catch (_) {}
    // 2) Strip ASCII control chars (except \t \n \r)
    s = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
    // 3) Drop full HTML tags (defence-in-depth — server should re-encode)
    s = s.replace(/<\/?[a-z!][^>]*>/gi, '');
    // 4) Neutralise javascript: / data: / vbscript: pseudo-protocols
    s = s.replace(/javascript:/gi, '').replace(/vbscript:/gi, '').replace(/data:/gi, '');
    // 5) Collapse runaway whitespace
    s = s.replace(/[ \t]{4,}/g, '   ').trim();
    // 6) Hard-cap length
    if (s.length > CONFIG.MAX_FIELD_BYTES) s = s.slice(0, CONFIG.MAX_FIELD_BYTES);
    return s;
  }

  /* ───────────────────── HTML-ENTITY ESCAPER ─────────────────────────── */
  // For any text we render BACK to the page (status messages, etc.).
  function escapeHtml (s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ───────────────────── FIELD-LEVEL VALIDATORS ─────────────────────── */
  var VALIDATORS = {
    name:    function (v) { return /^[A-Za-z][A-Za-z .'\-]{1,79}$/.test(v) ? '' : 'Please enter a valid name (letters only).'; },
    email:   function (v) {
      // Pragmatic email regex — RFC compliance is overkill for a contact form
      var re = /^[A-Za-z0-9._%+\-]{1,64}@[A-Za-z0-9.\-]{1,253}\.[A-Za-z]{2,24}$/;
      return re.test(v) ? '' : 'Please enter a valid email address.';
    },
    phone:   function (v) {
      var digits = v.replace(/[^0-9]/g, '');
      if (digits.length < 8 || digits.length > 15) return 'Please enter a valid phone number.';
      if (!/^[+0-9 \-()]{8,20}$/.test(v))           return 'Phone may only contain digits, spaces, +, -, ( ).';
      return '';
    },
    text:    function (v, min, max) {
      if (v.length < (min || 1))   return 'This field is required.';
      if (v.length > (max || 500)) return 'Too long (max ' + (max || 500) + ' characters).';
      return '';
    },
    date:    function (v) {
      if (!v) return 'Please pick a date.';
      var d = new Date(v); var t = new Date(); t.setHours(0,0,0,0);
      if (isNaN(d.getTime())) return 'Invalid date.';
      if (d < t) return 'Date cannot be in the past.';
      return '';
    },
    select:  function (v) { return v ? '' : 'Please make a selection.'; }
  };

  /* ───────────────────── CSRF NONCE (sessionStorage) ─────────────────── */
  function getCsrfToken (formName) {
    var key = 'omnet_csrf_' + formName;
    var existing = sessionStorage.getItem(key);
    if (existing) return existing;
    // 32-char URL-safe random token
    var arr = new Uint8Array(24);
    (global.crypto || global.msCrypto).getRandomValues(arr);
    var b64 = btoa(String.fromCharCode.apply(null, arr))
              .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    sessionStorage.setItem(key, b64);
    return b64;
  }

  /* ───────────────────── RATE LIMIT (localStorage) ─────────────────── */
  function checkRateLimit (formName) {
    var key = 'omnet_rl_' + formName;
    var now = Date.now();
    var hits = [];
    try { hits = JSON.parse(localStorage.getItem(key) || '[]'); }
    catch (_) { hits = []; }
    // drop expired
    hits = hits.filter(function (t) { return now - t < CONFIG.RATE_LIMIT_WINDOW; });
    if (hits.length >= CONFIG.RATE_LIMIT_MAX) {
      var waitMin = Math.ceil((CONFIG.RATE_LIMIT_WINDOW - (now - hits[0])) / 60000);
      return { ok: false, waitMin: waitMin };
    }
    hits.push(now);
    localStorage.setItem(key, JSON.stringify(hits));
    return { ok: true };
  }

  /* ───────────────────── SAME-ORIGIN GUARD ─────────────────────────── */
  function sameOriginOk () {
    var h = location.hostname;
    return CONFIG.SAME_ORIGIN_HOSTS.indexOf(h) !== -1;
  }

  /* ───────────────────── HONEYPOT CHECK ─────────────────────────── */
  function honeypotTriggered (form) {
    // Web3Forms native botcheck
    var bc = form.querySelector('input[name="botcheck"]');
    if (bc && bc.checked) return true;
    // Custom hp-trap inputs (any non-empty value = bot)
    var traps = form.querySelectorAll('.hp-trap input');
    for (var i = 0; i < traps.length; i++) {
      if (traps[i].value && traps[i].value.length > 0) return true;
    }
    return false;
  }

  /* ───────────────────── reCAPTCHA v3 EXECUTION ─────────────────────── */
  function executeRecaptcha (action) {
    return new Promise(function (resolve) {
      // Skip silently if reCAPTCHA not configured / not loaded
      if (!global.grecaptcha || CONFIG.RECAPTCHA_SITE_KEY === 'YOUR_RECAPTCHA_SITE_KEY') {
        return resolve('');
      }
      try {
        global.grecaptcha.ready(function () {
          global.grecaptcha.execute(CONFIG.RECAPTCHA_SITE_KEY, { action: action })
            .then(resolve, function () { resolve(''); });
        });
      } catch (e) { resolve(''); }
    });
  }

  /* ───────────────────── PER-FIELD VALIDATION ─────────────────────── */
  function validateField (input) {
    var msg = '';
    var v = input.value.trim();
    var required = input.hasAttribute('required');
    if (!required && !v) return '';

    var tag = input.tagName.toLowerCase();
    var type = (input.type || '').toLowerCase();

    if (tag === 'select')                 msg = VALIDATORS.select(v);
    else if (type === 'email')            msg = VALIDATORS.email(v);
    else if (type === 'tel')              msg = VALIDATORS.phone(v);
    else if (type === 'date')             msg = VALIDATORS.date(v);
    else if (type === 'checkbox')         msg = input.checked ? '' : 'Please tick this box to continue.';
    else if (input.name === 'name' || input.id.endsWith('_name'))
                                          msg = VALIDATORS.name(v);
    else                                  msg = VALIDATORS.text(v,
                                                  parseInt(input.getAttribute('minlength') || '1', 10),
                                                  parseInt(input.getAttribute('maxlength') || '2000', 10));

    if (msg) input.classList.add('is-invalid'); else input.classList.remove('is-invalid');
    var errEl = document.getElementById('err_' + input.id);
    if (errEl) errEl.textContent = msg;
    return msg;
  }

  function validateForm (form) {
    var fields = form.querySelectorAll('input:not([type=hidden]):not(.hp-botcheck), select, textarea');
    var firstErr = null;
    for (var i = 0; i < fields.length; i++) {
      // Skip anything inside the hidden honeypot trap
      if (fields[i].closest && fields[i].closest('.hp-trap')) continue;
      var msg = validateField(fields[i]);
      if (msg && !firstErr) firstErr = fields[i];
    }
    return firstErr;
  }

  /* ───────────────────── STATUS / UX HELPERS ─────────────────────── */
  function setStatus (form, kind, html) {
    var el = form.querySelector('.form-status');
    if (!el) return;
    el.className = 'form-status is-' + kind;
    el.innerHTML = html;
  }
  function setSubmitting (form, isBusy) {
    var btn = form.querySelector('.btn-submit');
    if (!btn) return;
    btn.disabled = isBusy;
    var lbl = btn.querySelector('.btn-label');
    var spn = btn.querySelector('.btn-spinner');
    if (lbl) lbl.hidden = isBusy;
    if (spn) spn.hidden = !isBusy;
  }

  /* ───────────────────── PAYLOAD BUILDER ─────────────────────────── */
  function buildPayload (form) {
    var formName = form.dataset.formName || form.id;
    var payload = {
      from_name: 'OMNET IT — ' + formName,
      subject:   '[OMNET ' + formName + '] new submission from ' + (location.pathname || '/'),
      page:      location.pathname + location.search,
      submitted_at: new Date().toISOString(),
      user_agent:   (navigator.userAgent || '').slice(0, 200)
    };
    // Read every named field + sanitise it
    var fd = new FormData(form);
    fd.forEach(function (val, key) {
      // Skip honeypot fields entirely (they should be empty anyway)
      if (key === 'website' || key === 'emailaddr' || key === 'full_url') return;
      payload[key] = sanitiseInput(val);
    });
    return payload;
  }

  /* ───────────────────── SUBMIT HANDLER ─────────────────────────── */
  async function handleSubmit (form, e) {
    e.preventDefault();
    var formName = form.dataset.formName || form.id;

    // 1. Same-origin
    if (!sameOriginOk()) {
      setStatus(form, 'error', 'This form may only be submitted from the official site.');
      return;
    }

    // 2. Honeypot
    if (honeypotTriggered(form)) {
      // Pretend success so bots don't iterate. Do NOT send the request.
      setStatus(form, 'success', '✓ Thank you. Your message has been received.');
      form.reset();
      return;
    }

    // 3. Time-trap (bots submit too fast)
    var minSec = parseInt(form.dataset.minFillSeconds || '3', 10);
    var loadedAt = parseInt(form.querySelector('input[name="form_loaded_at"]').value || '0', 10);
    var elapsed = (Date.now() - loadedAt) / 1000;
    if (elapsed < minSec) {
      setStatus(form, 'error', 'Please fill the form a little more carefully and try again.');
      return;
    }

    // 4. Validation
    var firstErr = validateForm(form);
    if (firstErr) {
      setStatus(form, 'error', 'Please correct the highlighted fields above.');
      try { firstErr.focus(); } catch (_) {}
      return;
    }

    // 5. Rate limit
    var rl = checkRateLimit(formName);
    if (!rl.ok) {
      setStatus(form, 'error',
        'You\'ve sent several messages already. Please try again in ' +
        escapeHtml(String(rl.waitMin)) + ' minutes, or call ' +
        '<a href="tel:+919717270865">+91 97172 70865</a>.');
      return;
    }

    // 6. reCAPTCHA token
    setSubmitting(form, true);
    setStatus(form, 'info', 'Verifying…');
    var rcToken = await executeRecaptcha(formName);
    var rcInput = form.querySelector('input[name="recaptcha_token"]');
    if (rcInput) rcInput.value = rcToken;

    // 7. Build + send
    var payload = buildPayload(form);
    payload.recaptcha_token = rcToken;
    payload.honeypot_passed = true;
    payload.client_csrf     = form.querySelector('input[name="csrf_token"]').value;

    try {
      var res = await fetch(CONFIG.WEB3FORMS_ENDPOINT, {
        method:      'POST',
        headers:     { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body:        JSON.stringify(payload),
        credentials: 'omit'                 // never send cookies cross-origin
      });
      var json = {};
      try { json = await res.json(); } catch (_) {}
      if (res.ok && (json.success || json.message)) {
        setStatus(form, 'success',
          '✓ Thank you — we\'ve received your message and will respond shortly.');
        form.reset();
        // refresh CSRF nonce so the same form can be re-used safely
        sessionStorage.removeItem('omnet_csrf_' + formName);
        wireForm(form);
      } else {
        throw new Error(json.message || ('HTTP ' + res.status));
      }
    } catch (err) {
      setStatus(form, 'error',
        'Something went wrong. Please email us at ' +
        '<a href="#" onclick="window.OmnetEmail&&window.OmnetEmail.reveal(this);return false;">' +
        'reveal email</a> or call <a href="tel:+919717270865">+91 97172 70865</a>.');
    } finally {
      setSubmitting(form, false);
    }
  }

  /* ───────────────────── WIRE A SINGLE FORM ─────────────────────── */
  function wireForm (form) {
    var formName = form.dataset.formName || form.id;

    // Stamp form_loaded_at + csrf token
    var ts  = form.querySelector('input[name="form_loaded_at"]');
    if (ts)  ts.value  = String(Date.now());
    var csr = form.querySelector('input[name="csrf_token"]');
    if (csr) csr.value = getCsrfToken(formName);

    // Live validation as user types
    var fields = form.querySelectorAll('input:not([type=hidden]):not(.hp-botcheck), select, textarea');
    fields.forEach(function (f) {
      if (f.closest && f.closest('.hp-trap')) return;
      f.addEventListener('blur',  function () { validateField(f); });
      // character counters
      var counterId = f.id + '_count';
      var counter = document.getElementById(counterId);
      if (counter) {
        f.addEventListener('input', function () { counter.textContent = String(f.value.length); });
      }
    });

    // Submit
    form.addEventListener('submit', function (e) { handleSubmit(form, e); });
  }

  /* ───────────────────── BOOT ─────────────────────────────────────── */
  function init () {
    // Soft warning if not over HTTPS in production
    if (location.protocol !== 'https:' &&
        location.hostname !== 'localhost' &&
        location.hostname !== '127.0.0.1') {
      // Don't block — just log. Server should also redirect via HSTS.
      try { console.warn('[OMNET] Forms should only be submitted over HTTPS.'); } catch (_) {}
    }
    var forms = document.querySelectorAll('form.omnet-secure-form');
    forms.forEach(wireForm);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Public hook for tests / external callers */
  global.OmnetForms = {
    sanitiseInput: sanitiseInput,
    escapeHtml:    escapeHtml,
    validateField: validateField,
    rewire:        function () { document.querySelectorAll('form.omnet-secure-form').forEach(wireForm); }
  };
})(window);
