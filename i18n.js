/* ════════════════════════════════════════════════════════════════════
   OMNET IT — Multilingual engine (i18n.js)   v1.0
   ────────────────────────────────────────────────────────────────────
   WHAT THIS DOES
   1. Adds an on-brand language switcher to the header (desktop) and the
      mobile menu, on every page that includes this file.
   2. Instantly translates all shared UI "chrome" — navigation, buttons,
      CTAs, footer, and common form labels — using the dictionary below.
      (Self-hosted, fast, no third party, fully reliable.)
   3. Detects the visitor's browser language on first visit and offers a
      one-tap switch, with English as the permanent fallback.
   4. Handles right-to-left layout for Arabic and Urdu automatically.
   5. Remembers the choice (localStorage) across pages and visits.
   6. OPTIONAL bridge: for languages other than English it offers a
      "Translate page content too" button that uses Google Translate to
      machine-translate the unique body text of the page. This is opt-in
      and clearly labelled. See README_TRANSLATION.md for the trade-offs.

   ── HOW TO ADD A NEW LANGUAGE ──────────────────────────────────────
   1. Add an entry to LANGS (code, native name, English name, flag, dir).
   2. Add a matching block to DICT with the same code.
   Done. Nothing else changes.

   ── HOW TO ADD A NEW TRANSLATABLE STRING ───────────────────────────
   Add the exact English text as a key in EACH language block of DICT.
   Any text node or common attribute on any page whose trimmed text
   matches that key is translated automatically — no per-page edits.
   ════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var STORAGE_KEY = "omnet_lang";
  var DISMISS_KEY = "omnet_lang_suggest_dismissed";
  var DEFAULT = "en";

  /* ---------- Supported languages ---------- */
  var LANGS = [
    { code: "en", native: "English",   en: "English",    flag: "\uD83C\uDDEC\uD83C\uDDE7", dir: "ltr" },
    { code: "hi", native: "\u0939\u093F\u0928\u094D\u0926\u0940",       en: "Hindi",      flag: "\uD83C\uDDEE\uD83C\uDDF3", dir: "ltr" },
    { code: "ur", native: "\u0627\u0631\u062F\u0648",         en: "Urdu",       flag: "\uD83C\uDDF5\uD83C\uDDF0", dir: "rtl" },
    { code: "ne", native: "\u0928\u0947\u092A\u093E\u0932\u0940",       en: "Nepali",     flag: "\uD83C\uDDF3\uD83C\uDDF5", dir: "ltr" },
    { code: "ar", native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",     en: "Arabic",     flag: "\uD83C\uDDF8\uD83C\uDDE6", dir: "rtl" },
    { code: "fr", native: "Fran\u00E7ais",     en: "French",     flag: "\uD83C\uDDEB\uD83C\uDDF7", dir: "ltr" },
    { code: "es", native: "Espa\u00F1ol",      en: "Spanish",    flag: "\uD83C\uDDEA\uD83C\uDDF8", dir: "ltr" },
    { code: "de", native: "Deutsch",       en: "German",     flag: "\uD83C\uDDE9\uD83C\uDDEA", dir: "ltr" },
    { code: "pt", native: "Portugu\u00EAs",    en: "Portuguese", flag: "\uD83C\uDDF5\uD83C\uDDF9", dir: "ltr" },
    { code: "ru", native: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439",      en: "Russian",    flag: "\uD83C\uDDF7\uD83C\uDDFA", dir: "ltr" },
    { code: "zh", native: "\u4E2D\u6587",         en: "Chinese",    flag: "\uD83C\uDDE8\uD83C\uDDF3", dir: "ltr" },
    { code: "ja", native: "\u65E5\u672C\u8A9E",       en: "Japanese",   flag: "\uD83C\uDDEF\uD83C\uDDF5", dir: "ltr" }
  ];

  /* ────────────────────────────────────────────────────────────────
     DICTIONARY
     Keys are the EXACT English UI strings used across the site.
     Product/brand names (Microsoft 365, Google Workspace, Zoho Suite,
     OMNET, CERT-In) are intentionally left out so they stay unchanged.
     ──────────────────────────────────────────────────────────────── */
  var DICT = {
    hi: {
      "Home":"\u0939\u094B\u092E","IT Support":"IT \u0938\u092A\u094B\u0930\u094D\u091F","IT Security":"IT \u0938\u0941\u0930\u0915\u094D\u0937\u093E","Managed IT":"\u092E\u0948\u0928\u0947\u091C\u094D\u0921 IT","Services":"\u0938\u0947\u0935\u093E\u090F\u0902","Software & Web":"\u0938\u0949\u092B\u094D\u091F\u0935\u0947\u092F\u0930 \u0914\u0930 \u0935\u0947\u092C","Cloud & Email":"\u0915\u094D\u0932\u093E\u0909\u0921 \u0914\u0930 \u0908\u092E\u0947\u0932","Shop":"\u0936\u0949\u092A","Products":"\u0909\u0924\u094D\u092A\u093E\u0926","Industries":"\u0909\u0926\u094D\u092F\u094B\u0917","About":"\u0939\u092E\u093E\u0930\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902","Contact":"\u0938\u0902\u092A\u0930\u094D\u0915","Blog":"\u092C\u094D\u0932\u0949\u0917",
      "IT Support Overview":"IT \u0938\u092A\u094B\u0930\u094D\u091F \u0905\u0935\u0932\u094B\u0915\u0928","Fixed Cost IT Support":"\u092B\u093F\u0915\u094D\u0938\u094D\u0921 \u0915\u0949\u0938\u094D\u091F IT \u0938\u092A\u094B\u0930\u094D\u091F","Prepaid IT Support":"\u092A\u094D\u0930\u0940\u092A\u0947\u0921 IT \u0938\u092A\u094B\u0930\u094D\u091F","Casual IT Support":"\u0915\u0948\u091C\u0941\u0905\u0932 IT \u0938\u092A\u094B\u0930\u094D\u091F","IT Security Overview":"IT \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u0905\u0935\u0932\u094B\u0915\u0928","Desktop Security":"\u0921\u0947\u0938\u094D\u0915\u091F\u0949\u092A \u0938\u0941\u0930\u0915\u094D\u0937\u093E","Server Infrastructure":"\u0938\u0930\u094D\u0935\u0930 \u0907\u0928\u094D\u092B\u094D\u0930\u093E\u0938\u094D\u091F\u094D\u0930\u0915\u094D\u091A\u0930","Cloud Security":"\u0915\u094D\u0932\u093E\u0909\u0921 \u0938\u0941\u0930\u0915\u094D\u0937\u093E","Risk & Threat Assessment":"\u091C\u094B\u0916\u093F\u092E \u0914\u0930 \u0916\u0924\u0930\u093E \u0906\u0915\u0932\u0928","Internet & Content Security":"\u0907\u0902\u091F\u0930\u0928\u0947\u091F \u0914\u0930 \u0915\u0902\u091F\u0947\u0902\u091F \u0938\u0941\u0930\u0915\u094D\u0937\u093E","Managed IT Overview":"\u092E\u0948\u0928\u0947\u091C\u094D\u0921 IT \u0905\u0935\u0932\u094B\u0915\u0928","Managed Servers":"\u092E\u0948\u0928\u0947\u091C\u094D\u0921 \u0938\u0930\u094D\u0935\u0930","Managed Security":"\u092E\u0948\u0928\u0947\u091C\u094D\u0921 \u0938\u0941\u0930\u0915\u094D\u0937\u093E","Managed Network":"\u092E\u0948\u0928\u0947\u091C\u094D\u0921 \u0928\u0947\u091F\u0935\u0930\u094D\u0915","Managed Colocation":"\u092E\u0948\u0928\u0947\u091C\u094D\u0921 \u0915\u094B\u0932\u094B\u0915\u0947\u0936\u0928","All Services":"\u0938\u092D\u0940 \u0938\u0947\u0935\u093E\u090F\u0902","Infrastructure Services":"\u0907\u0928\u094D\u092B\u094D\u0930\u093E\u0938\u094D\u091F\u094D\u0930\u0915\u094D\u091A\u0930 \u0938\u0947\u0935\u093E\u090F\u0902","Cloud Services":"\u0915\u094D\u0932\u093E\u0909\u0921 \u0938\u0947\u0935\u093E\u090F\u0902","Network Infrastructure":"\u0928\u0947\u091F\u0935\u0930\u094D\u0915 \u0907\u0928\u094D\u092B\u094D\u0930\u093E\u0938\u094D\u091F\u094D\u0930\u0915\u094D\u091A\u0930","DevOps Services":"DevOps \u0938\u0947\u0935\u093E\u090F\u0902","Email Solutions":"\u0908\u092E\u0947\u0932 \u0938\u092E\u093E\u0927\u093E\u0928","Repair & AMC":"\u0930\u093F\u092A\u0947\u092F\u0930 \u0914\u0930 AMC","Remote & Onsite Support":"\u0930\u093F\u092E\u094B\u091F \u0914\u0930 \u0911\u0928\u0938\u093E\u0907\u091F \u0938\u092A\u094B\u0930\u094D\u091F","Professional Services":"\u092A\u094D\u0930\u094B\u092B\u0947\u0936\u0928\u0932 \u0938\u0947\u0935\u093E\u090F\u0902","IT Hardware Rental":"IT \u0939\u093E\u0930\u094D\u0921\u0935\u0947\u092F\u0930 \u0915\u093F\u0930\u093E\u092F\u093E","Custom Software":"\u0915\u0938\u094D\u091F\u092E \u0938\u0949\u092B\u094D\u091F\u0935\u0947\u092F\u0930","Website Design & Dev":"\u0935\u0947\u092C\u0938\u093E\u0907\u091F \u0921\u093F\u091C\u093C\u093E\u0907\u0928 \u0914\u0930 \u0921\u0947\u0935","Mobile App Development":"\u092E\u094B\u092C\u093E\u0907\u0932 \u0910\u092A \u0921\u0947\u0935\u0932\u092A\u092E\u0947\u0902\u091F","Professional Email":"\u092A\u094D\u0930\u094B\u092B\u0947\u0936\u0928\u0932 \u0908\u092E\u0947\u0932","Email Licensing":"\u0908\u092E\u0947\u0932 \u0932\u093E\u0907\u0938\u0947\u0902\u0938\u093F\u0902\u0917","Email Migration":"\u0908\u092E\u0947\u0932 \u092E\u093E\u0907\u0917\u094D\u0930\u0947\u0936\u0928","About Us":"\u0939\u092E\u093E\u0930\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902","Portfolio":"\u092A\u094B\u0930\u094D\u091F\u092B\u094B\u0932\u093F\u092F\u094B","Pricing":"\u092E\u0942\u0932\u094D\u092F \u0928\u093F\u0930\u094D\u0927\u093E\u0930\u0923",
      "Call Us":"\u0915\u0949\u0932 \u0915\u0930\u0947\u0902","Request Callback":"\u0915\u0949\u0932\u092C\u0948\u0915 \u0915\u093E \u0905\u0928\u0941\u0930\u094B\u0927","Get Quote":"\u0915\u094B\u091F\u0947\u0936\u0928 \u092A\u093E\u090F\u0902",
      "IT Services":"IT \u0938\u0947\u0935\u093E\u090F\u0902","Quick Links":"\u0924\u094D\u0935\u0930\u093F\u0924 \u0932\u093F\u0902\u0915","Company":"\u0915\u0902\u092A\u0928\u0940","Contact Us":"\u0938\u0902\u092A\u0930\u094D\u0915 \u0915\u0930\u0947\u0902","Locations":"\u0938\u094D\u0925\u093E\u0928","Software & Cloud":"\u0938\u0949\u092B\u094D\u091F\u0935\u0947\u092F\u0930 \u0914\u0930 \u0915\u094D\u0932\u093E\u0909\u0921","Software":"\u0938\u0949\u092B\u094D\u091F\u0935\u0947\u092F\u0930",
      "Managed IT Services":"\u092E\u0948\u0928\u0947\u091C\u094D\u0921 IT \u0938\u0947\u0935\u093E\u090F\u0902","Cybersecurity":"\u0938\u093E\u0907\u092C\u0930 \u0938\u0941\u0930\u0915\u094D\u0937\u093E","Networking":"\u0928\u0947\u091F\u0935\u0930\u094D\u0915\u093F\u0902\u0917","Computer AMC & Repair":"\u0915\u0902\u092A\u094D\u092F\u0942\u091F\u0930 AMC \u0914\u0930 \u0930\u093F\u092A\u0947\u092F\u0930","Privacy Policy":"\u0917\u094B\u092A\u0928\u0940\u092F\u0924\u093E \u0928\u0940\u0924\u093F","Terms of Service":"\u0938\u0947\u0935\u093E \u0915\u0940 \u0936\u0930\u094D\u0924\u0947\u0902",
      "Mobile":"\u092E\u094B\u092C\u093E\u0907\u0932","Office":"\u0911\u092B\u093F\u0938","Email":"\u0908\u092E\u0947\u0932","Coverage":"\u0915\u0935\u0930\u0947\u091C",
      "Get a Free IT Assessment":"\u092E\u0941\u092B\u094D\u0924 IT \u092E\u0942\u0932\u094D\u092F\u093E\u0902\u0915\u0928 \u092A\u093E\u090F\u0902","Explore":"\u0905\u0928\u094D\u0935\u0947\u0937\u0923 \u0915\u0930\u0947\u0902","Read More":"\u0914\u0930 \u092A\u0922\u093C\u0947\u0902","Learn More":"\u0914\u0930 \u091C\u093E\u0928\u0947\u0902","View All":"\u0938\u092D\u0940 \u0926\u0947\u0916\u0947\u0902","Get Started":"\u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902","Send Message":"\u0938\u0902\u0926\u0947\u0936 \u092D\u0947\u091C\u0947\u0902","Subscribe":"\u0938\u092C\u094D\u0938\u0915\u094D\u0930\u093E\u0907\u092C \u0915\u0930\u0947\u0902",
      "Name":"\u0928\u093E\u092E","Full Name":"\u092A\u0942\u0930\u093E \u0928\u093E\u092E","Email Address":"\u0908\u092E\u0947\u0932 \u092A\u0924\u093E","Phone":"\u092B\u094B\u0928","Phone Number":"\u092B\u094B\u0928 \u0928\u0902\u092C\u0930","Message":"\u0938\u0902\u0926\u0947\u0936","Subject":"\u0935\u093F\u0937\u092F","Submit":"\u091C\u092E\u093E \u0915\u0930\u0947\u0902","Send":"\u092D\u0947\u091C\u0947\u0902"
    },
    ur: {
      "Home":"\u06C1\u0648\u0645","IT Support":"\u0622\u0626\u06CC \u0679\u06CC \u0633\u067E\u0648\u0631\u0679","IT Security":"\u0622\u0626\u06CC \u0679\u06CC \u0633\u06CC\u06A9\u06CC\u0648\u0631\u0679\u06CC","Managed IT":"\u0645\u06CC\u0646\u06CC\u062C\u0688 \u0622\u0626\u06CC \u0679\u06CC","Services":"\u062E\u062F\u0645\u0627\u062A","Software & Web":"\u0633\u0627\u0641\u0679 \u0648\u06CC\u0626\u0631 \u0648 \u0648\u06CC\u0628","Cloud & Email":"\u06A9\u0644\u0627\u0624\u0688 \u0648 \u0627\u06CC \u0645\u06CC\u0644","Shop":"\u0627\u0633\u0679\u0648\u0631","Products":"\u0645\u0635\u0646\u0648\u0639\u0627\u062A","Industries":"\u0635\u0646\u0639\u062A\u06CC\u06BA","About":"\u062A\u0639\u0627\u0631\u0641","Contact":"\u0631\u0627\u0628\u0637\u06C1","Blog":"\u0628\u0644\u0627\u06AF",
      "IT Support Overview":"\u0622\u0626\u06CC \u0679\u06CC \u0633\u067E\u0648\u0631\u0679 \u062C\u0627\u0626\u0632\u06C1","Fixed Cost IT Support":"\u0641\u06A9\u0633\u0688 \u0644\u0627\u06AF\u062A \u0622\u0626\u06CC \u0679\u06CC \u0633\u067E\u0648\u0631\u0679","Prepaid IT Support":"\u067E\u0631\u06CC \u067E\u06CC\u0688 \u0622\u0626\u06CC \u0679\u06CC \u0633\u067E\u0648\u0631\u0679","Casual IT Support":"\u0639\u0627\u0631\u0636\u06CC \u0622\u0626\u06CC \u0679\u06CC \u0633\u067E\u0648\u0631\u0679","IT Security Overview":"\u0622\u0626\u06CC \u0679\u06CC \u0633\u06CC\u06A9\u06CC\u0648\u0631\u0679\u06CC \u062C\u0627\u0626\u0632\u06C1","Desktop Security":"\u0688\u06CC\u0633\u06A9 \u0679\u0627\u067E \u0633\u06CC\u06A9\u06CC\u0648\u0631\u0679\u06CC","Server Infrastructure":"\u0633\u0631\u0648\u0631 \u0627\u0646\u0641\u0631\u0627\u0633\u0679\u0631\u06A9\u0686\u0631","Cloud Security":"\u06A9\u0644\u0627\u0624\u0688 \u0633\u06CC\u06A9\u06CC\u0648\u0631\u0679\u06CC","Risk & Threat Assessment":"\u062E\u0637\u0631\u06C1 \u0627\u0648\u0631 \u062E\u062F\u0634\u06C1 \u062A\u0634\u062E\u06CC\u0635","Internet & Content Security":"\u0627\u0646\u0679\u0631\u0646\u06CC\u0679 \u0648 \u06A9\u0646\u0679\u06CC\u0646\u0679 \u0633\u06CC\u06A9\u06CC\u0648\u0631\u0679\u06CC","Managed IT Overview":"\u0645\u06CC\u0646\u06CC\u062C\u0688 \u0622\u0626\u06CC \u0679\u06CC \u062C\u0627\u0626\u0632\u06C1","Managed Servers":"\u0645\u06CC\u0646\u06CC\u062C\u0688 \u0633\u0631\u0648\u0631","Managed Security":"\u0645\u06CC\u0646\u06CC\u062C\u0688 \u0633\u06CC\u06A9\u06CC\u0648\u0631\u0679\u06CC","Managed Network":"\u0645\u06CC\u0646\u06CC\u062C\u0688 \u0646\u06CC\u0679 \u0648\u0631\u06A9","Managed Colocation":"\u0645\u06CC\u0646\u06CC\u062C\u0688 \u06A9\u0648\u0644\u0648\u06A9\u06CC\u0634\u0646","All Services":"\u062A\u0645\u0627\u0645 \u062E\u062F\u0645\u0627\u062A","Infrastructure Services":"\u0627\u0646\u0641\u0631\u0627\u0633\u0679\u0631\u06A9\u0686\u0631 \u062E\u062F\u0645\u0627\u062A","Cloud Services":"\u06A9\u0644\u0627\u0624\u0688 \u062E\u062F\u0645\u0627\u062A","Network Infrastructure":"\u0646\u06CC\u0679 \u0648\u0631\u06A9 \u0627\u0646\u0641\u0631\u0627\u0633\u0679\u0631\u06A9\u0686\u0631","DevOps Services":"DevOps \u062E\u062F\u0645\u0627\u062A","Email Solutions":"\u0627\u06CC \u0645\u06CC\u0644 \u062D\u0644","Repair & AMC":"\u0645\u0631\u0645\u062A \u0648 AMC","Remote & Onsite Support":"\u0631\u06CC\u0645\u0648\u0679 \u0648 \u0622\u0646 \u0633\u0627\u0626\u0679 \u0633\u067E\u0648\u0631\u0679","Professional Services":"\u067E\u06CC\u0634\u06C1 \u0648\u0631\u0627\u0646\u06C1 \u062E\u062F\u0645\u0627\u062A","IT Hardware Rental":"\u0622\u0626\u06CC \u0679\u06CC \u06C1\u0627\u0631\u0688 \u0648\u06CC\u0626\u0631 \u06A9\u0631\u0627\u06CC\u06C1","Custom Software":"\u06A9\u0633\u0679\u0645 \u0633\u0627\u0641\u0679 \u0648\u06CC\u0626\u0631","Website Design & Dev":"\u0648\u06CC\u0628 \u0633\u0627\u0626\u0679 \u0688\u06CC\u0632\u0627\u0626\u0646 \u0648 \u0688\u06CC\u0648","Mobile App Development":"\u0645\u0648\u0628\u0627\u0626\u0644 \u0627\u06CC\u067E \u0688\u06CC\u0648\u0644\u067E\u0645\u0646\u0679","Professional Email":"\u067E\u06CC\u0634\u06C1 \u0648\u0631\u0627\u0646\u06C1 \u0627\u06CC \u0645\u06CC\u0644","Email Licensing":"\u0627\u06CC \u0645\u06CC\u0644 \u0644\u0627\u0626\u0633\u0646\u0633\u0646\u06AF","Email Migration":"\u0627\u06CC \u0645\u06CC\u0644 \u0645\u0627\u0626\u06AF\u0631\u06CC\u0634\u0646","About Us":"\u06C1\u0645\u0627\u0631\u06D2 \u0628\u0627\u0631\u06D2 \u0645\u06CC\u06BA","Portfolio":"\u067E\u0648\u0631\u0679 \u0641\u0648\u0644\u06CC\u0648","Pricing":"\u0642\u06CC\u0645\u062A\u06CC\u06BA",
      "Call Us":"\u06A9\u0627\u0644 \u06A9\u0631\u06CC\u06BA","Request Callback":"\u06A9\u0627\u0644 \u0628\u06CC\u06A9 \u06A9\u06CC \u062F\u0631\u062E\u0648\u0627\u0633\u062A","Get Quote":"\u06A9\u0648\u0679\u06CC\u0634\u0646 \u062D\u0627\u0635\u0644 \u06A9\u0631\u06CC\u06BA",
      "IT Services":"\u0622\u0626\u06CC \u0679\u06CC \u062E\u062F\u0645\u0627\u062A","Quick Links":"\u0641\u0648\u0631\u06CC \u0644\u0646\u06A9\u0633","Company":"\u06A9\u0645\u067E\u0646\u06CC","Contact Us":"\u0631\u0627\u0628\u0637\u06C1 \u06A9\u0631\u06CC\u06BA","Locations":"\u0645\u0642\u0627\u0645\u0627\u062A","Software & Cloud":"\u0633\u0627\u0641\u0679 \u0648\u06CC\u0626\u0631 \u0648 \u06A9\u0644\u0627\u0624\u0688","Software":"\u0633\u0627\u0641\u0679 \u0648\u06CC\u0626\u0631",
      "Managed IT Services":"\u0645\u06CC\u0646\u06CC\u062C\u0688 \u0622\u0626\u06CC \u0679\u06CC \u062E\u062F\u0645\u0627\u062A","Cybersecurity":"\u0633\u0627\u0626\u0628\u0631 \u0633\u06CC\u06A9\u06CC\u0648\u0631\u0679\u06CC","Networking":"\u0646\u06CC\u0679 \u0648\u0631\u06A9\u0646\u06AF","Computer AMC & Repair":"\u06A9\u0645\u067E\u06CC\u0648\u0679\u0631 AMC \u0648 \u0645\u0631\u0645\u062A","Privacy Policy":"\u067E\u0631\u0627\u0626\u06CC\u0648\u06CC\u0633\u06CC \u067E\u0627\u0644\u06CC\u0633\u06CC","Terms of Service":"\u0633\u0631\u0648\u0633 \u06A9\u06CC \u0634\u0631\u0627\u0626\u0637",
      "Mobile":"\u0645\u0648\u0628\u0627\u0626\u0644","Office":"\u062F\u0641\u062A\u0631","Email":"\u0627\u06CC \u0645\u06CC\u0644","Coverage":"\u06A9\u0648\u0631\u06CC\u062C",
      "Get a Free IT Assessment":"\u0645\u0641\u062A \u0622\u0626\u06CC \u0679\u06CC \u062A\u0634\u062E\u06CC\u0635 \u062D\u0627\u0635\u0644 \u06A9\u0631\u06CC\u06BA","Explore":"\u062F\u0631\u06CC\u0627\u0641\u062A \u06A9\u0631\u06CC\u06BA","Read More":"\u0645\u0632\u06CC\u062F \u067E\u0691\u06BE\u06CC\u06BA","Learn More":"\u0645\u0632\u06CC\u062F \u062C\u0627\u0646\u06CC\u06BA","View All":"\u0633\u0628 \u062F\u06CC\u06A9\u06BE\u06CC\u06BA","Get Started":"\u0634\u0631\u0648\u0639 \u06A9\u0631\u06CC\u06BA","Send Message":"\u067E\u06CC\u063A\u0627\u0645 \u0628\u06BE\u06CC\u062C\u06CC\u06BA","Subscribe":"\u0633\u0628\u0633\u06A9\u0631\u0627\u0626\u0628 \u06A9\u0631\u06CC\u06BA",
      "Name":"\u0646\u0627\u0645","Full Name":"\u067E\u0648\u0631\u0627 \u0646\u0627\u0645","Email Address":"\u0627\u06CC \u0645\u06CC\u0644 \u0627\u06CC\u0688\u0631\u06CC\u0633","Phone":"\u0641\u0648\u0646","Phone Number":"\u0641\u0648\u0646 \u0646\u0645\u0628\u0631","Message":"\u067E\u06CC\u063A\u0627\u0645","Subject":"\u0645\u0648\u0636\u0648\u0639","Submit":"\u062C\u0645\u0639 \u06A9\u0631\u0627\u0626\u06CC\u06BA","Send":"\u0628\u06BE\u06CC\u062C\u06CC\u06BA"
    },
    ne: {
      "Home":"\u0917\u0943\u0939\u092A\u0943\u0937\u094D\u0920","IT Support":"IT \u0938\u092E\u0930\u094D\u0925\u0928","IT Security":"IT \u0938\u0941\u0930\u0915\u094D\u0937\u093E","Managed IT":"\u0935\u094D\u092F\u0935\u0938\u094D\u0925\u093F\u0924 IT","Services":"\u0938\u0947\u0935\u093E\u0939\u0930\u0942","Software & Web":"\u0938\u092B\u094D\u091F\u0935\u0947\u092F\u0930 \u0930 \u0935\u0947\u092C","Cloud & Email":"\u0915\u094D\u0932\u093E\u0909\u0921 \u0930 \u0907\u092E\u0947\u0932","Shop":"\u092A\u0938\u0932","Products":"\u0909\u0924\u094D\u092A\u093E\u0926\u0928","Industries":"\u0909\u0926\u094D\u092F\u094B\u0917","About":"\u0939\u093E\u092E\u094D\u0930\u094B \u092C\u093E\u0930\u0947\u092E\u093E","Contact":"\u0938\u092E\u094D\u092A\u0930\u094D\u0915","Blog":"\u092C\u094D\u0932\u0917",
      "IT Support Overview":"IT \u0938\u092E\u0930\u094D\u0925\u0928 \u0938\u093F\u0902\u0939\u093E\u0935\u0932\u094B\u0915\u0928","Fixed Cost IT Support":"\u0928\u093F\u0936\u094D\u091A\u093F\u0924 \u092E\u0942\u0932\u094D\u092F IT \u0938\u092E\u0930\u094D\u0925\u0928","Prepaid IT Support":"\u092A\u094D\u0930\u0940\u092A\u0947\u0921 IT \u0938\u092E\u0930\u094D\u0925\u0928","Casual IT Support":"\u0938\u093E\u092E\u093E\u0928\u094D\u092F IT \u0938\u092E\u0930\u094D\u0925\u0928","IT Security Overview":"IT \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u0938\u093F\u0902\u0939\u093E\u0935\u0932\u094B\u0915\u0928","Desktop Security":"\u0921\u0947\u0938\u094D\u0915\u091F\u092A \u0938\u0941\u0930\u0915\u094D\u0937\u093E","Server Infrastructure":"\u0938\u0930\u094D\u092D\u0930 \u092A\u0942\u0930\u094D\u0935\u093E\u0927\u093E\u0930","Cloud Security":"\u0915\u094D\u0932\u093E\u0909\u0921 \u0938\u0941\u0930\u0915\u094D\u0937\u093E","Risk & Threat Assessment":"\u091C\u094B\u0916\u093F\u092E \u0930 \u0916\u0924\u0930\u093E \u092E\u0942\u0932\u094D\u092F\u093E\u0919\u094D\u0915\u0928","Internet & Content Security":"\u0907\u0928\u094D\u091F\u0930\u0928\u0947\u091F \u0930 \u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u0938\u0941\u0930\u0915\u094D\u0937\u093E","Managed IT Overview":"\u0935\u094D\u092F\u0935\u0938\u094D\u0925\u093F\u0924 IT \u0938\u093F\u0902\u0939\u093E\u0935\u0932\u094B\u0915\u0928","Managed Servers":"\u0935\u094D\u092F\u0935\u0938\u094D\u0925\u093F\u0924 \u0938\u0930\u094D\u092D\u0930","Managed Security":"\u0935\u094D\u092F\u0935\u0938\u094D\u0925\u093F\u0924 \u0938\u0941\u0930\u0915\u094D\u0937\u093E","Managed Network":"\u0935\u094D\u092F\u0935\u0938\u094D\u0925\u093F\u0924 \u0928\u0947\u091F\u0935\u0930\u094D\u0915","Managed Colocation":"\u0935\u094D\u092F\u0935\u0938\u094D\u0925\u093F\u0924 \u0915\u094B\u0932\u094B\u0915\u0947\u0936\u0928","All Services":"\u0938\u092C\u0948 \u0938\u0947\u0935\u093E\u0939\u0930\u0942","Infrastructure Services":"\u092A\u0942\u0930\u094D\u0935\u093E\u0927\u093E\u0930 \u0938\u0947\u0935\u093E\u0939\u0930\u0942","Cloud Services":"\u0915\u094D\u0932\u093E\u0909\u0921 \u0938\u0947\u0935\u093E\u0939\u0930\u0942","Network Infrastructure":"\u0928\u0947\u091F\u0935\u0930\u094D\u0915 \u092A\u0942\u0930\u094D\u0935\u093E\u0927\u093E\u0930","DevOps Services":"DevOps \u0938\u0947\u0935\u093E\u0939\u0930\u0942","Email Solutions":"\u0907\u092E\u0947\u0932 \u0938\u092E\u093E\u0927\u093E\u0928","Repair & AMC":"\u092E\u0930\u094D\u092E\u0924 \u0930 AMC","Remote & Onsite Support":"\u0930\u093F\u092E\u094B\u091F \u0930 \u0905\u0928\u0938\u093E\u0907\u091F \u0938\u092E\u0930\u094D\u0925\u0928","Professional Services":"\u092A\u094D\u0930\u093E\u0935\u093F\u0927\u093F\u0915 \u0938\u0947\u0935\u093E\u0939\u0930\u0942","IT Hardware Rental":"IT \u0939\u093E\u0930\u094D\u0921\u0935\u0947\u092F\u0930 \u092D\u093E\u0921\u093E","Custom Software":"\u0915\u0938\u094D\u091F\u092E \u0938\u092B\u094D\u091F\u0935\u0947\u092F\u0930","Website Design & Dev":"\u0935\u0947\u092C\u0938\u093E\u0907\u091F \u0921\u093F\u091C\u093E\u0907\u0928 \u0930 \u0921\u0947\u092D","Mobile App Development":"\u092E\u094B\u092C\u093E\u0907\u0932 \u090F\u092A \u0935\u093F\u0915\u093E\u0938","Professional Email":"\u092A\u094D\u0930\u093E\u0935\u093F\u0927\u093F\u0915 \u0907\u092E\u0947\u0932","Email Licensing":"\u0907\u092E\u0947\u0932 \u0932\u093E\u0907\u0938\u0947\u0928\u094D\u0938\u093F\u0919","Email Migration":"\u0907\u092E\u0947\u0932 \u0938\u094D\u0925\u093E\u0928\u093E\u0928\u094D\u0924\u0930\u0923","About Us":"\u0939\u093E\u092E\u094D\u0930\u094B \u092C\u093E\u0930\u0947\u092E\u093E","Portfolio":"\u092A\u094B\u0930\u094D\u091F\u092B\u094B\u0932\u093F\u092F\u094B","Pricing":"\u092E\u0942\u0932\u094D\u092F",
      "Call Us":"\u0939\u093E\u092E\u0940\u0932\u093E\u0908 \u0915\u0932 \u0917\u0930\u094D\u0928\u0941\u0939\u094B\u0938\u094D","Request Callback":"\u0915\u0932\u092C\u094D\u092F\u093E\u0915 \u0905\u0928\u0941\u0930\u094B\u0927","Get Quote":"\u0915\u094B\u091F\u0947\u0936\u0928 \u0932\u093F\u0928\u0941\u0939\u094B\u0938\u094D",
      "IT Services":"IT \u0938\u0947\u0935\u093E\u0939\u0930\u0942","Quick Links":"\u0926\u094D\u0930\u0941\u0924 \u0932\u093F\u0902\u0915","Company":"\u0915\u092E\u094D\u092A\u0928\u0940","Contact Us":"\u0938\u092E\u094D\u092A\u0930\u094D\u0915 \u0917\u0930\u094D\u0928\u0941\u0939\u094B\u0938\u094D","Locations":"\u0938\u094D\u0925\u093E\u0928\u0939\u0930\u0942","Software & Cloud":"\u0938\u092B\u094D\u091F\u0935\u0947\u092F\u0930 \u0930 \u0915\u094D\u0932\u093E\u0909\u0921","Software":"\u0938\u092B\u094D\u091F\u0935\u0947\u092F\u0930",
      "Managed IT Services":"\u0935\u094D\u092F\u0935\u0938\u094D\u0925\u093F\u0924 IT \u0938\u0947\u0935\u093E\u0939\u0930\u0942","Cybersecurity":"\u0938\u093E\u0907\u092C\u0930 \u0938\u0941\u0930\u0915\u094D\u0937\u093E","Networking":"\u0928\u0947\u091F\u0935\u0930\u094D\u0915\u093F\u0919","Computer AMC & Repair":"\u0915\u092E\u094D\u092A\u094D\u092F\u0941\u091F\u0930 AMC \u0930 \u092E\u0930\u094D\u092E\u0924","Privacy Policy":"\u0917\u094B\u092A\u0928\u0940\u092F\u0924\u093E \u0928\u0940\u0924\u093F","Terms of Service":"\u0938\u0947\u0935\u093E \u0936\u0930\u094D\u0924\u0939\u0930\u0942",
      "Mobile":"\u092E\u094B\u092C\u093E\u0907\u0932","Office":"\u0915\u093E\u0930\u094D\u092F\u093E\u0932\u092F","Email":"\u0907\u092E\u0947\u0932","Coverage":"\u0915\u092D\u0930\u0947\u091C",
      "Get a Free IT Assessment":"\u0928\u093F\u0903\u0936\u0941\u0932\u094D\u0915 IT \u092E\u0942\u0932\u094D\u092F\u093E\u0919\u094D\u0915\u0928 \u0932\u093F\u0928\u0941\u0939\u094B\u0938\u094D","Explore":"\u0905\u0928\u094D\u0935\u0947\u0937\u0923 \u0917\u0930\u094D\u0928\u0941\u0939\u094B\u0938\u094D","Read More":"\u0925\u092A \u092A\u0922\u094D\u0928\u0941\u0939\u094B\u0938\u094D","Learn More":"\u0925\u092A \u091C\u093E\u0928\u094D\u0928\u0941\u0939\u094B\u0938\u094D","View All":"\u0938\u092C\u0948 \u0939\u0947\u0930\u094D\u0928\u0941\u0939\u094B\u0938\u094D","Get Started":"\u0938\u0941\u0930\u0941 \u0917\u0930\u094D\u0928\u0941\u0939\u094B\u0938\u094D","Send Message":"\u0938\u0928\u094D\u0926\u0947\u0936 \u092A\u0920\u093E\u0909\u0928\u0941\u0939\u094B\u0938\u094D","Subscribe":"\u0938\u0926\u0938\u094D\u092F\u0924\u093E \u0932\u093F\u0928\u0941\u0939\u094B\u0938\u094D",
      "Name":"\u0928\u093E\u092E","Full Name":"\u092A\u0942\u0930\u093E \u0928\u093E\u092E","Email Address":"\u0907\u092E\u0947\u0932 \u0920\u0947\u0917\u093E\u0928\u093E","Phone":"\u092B\u094B\u0928","Phone Number":"\u092B\u094B\u0928 \u0928\u092E\u094D\u092C\u0930","Message":"\u0938\u0928\u094D\u0926\u0947\u0936","Subject":"\u0935\u093F\u0937\u092F","Submit":"\u092A\u0947\u0936 \u0917\u0930\u094D\u0928\u0941\u0939\u094B\u0938\u094D","Send":"\u092A\u0920\u093E\u0909\u0928\u0941\u0939\u094B\u0938\u094D"
    },
    ar: {
      "Home":"\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629","IT Support":"\u062F\u0639\u0645 \u062A\u0642\u0646\u064A\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A","IT Security":"\u0623\u0645\u0646 \u062A\u0642\u0646\u064A\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A","Managed IT":"\u062A\u0642\u0646\u064A\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u062F\u0627\u0631\u0629","Services":"\u0627\u0644\u062E\u062F\u0645\u0627\u062A","Software & Web":"\u0627\u0644\u0628\u0631\u0645\u062C\u064A\u0627\u062A \u0648\u0627\u0644\u0648\u064A\u0628","Cloud & Email":"\u0627\u0644\u0633\u062D\u0627\u0628\u0629 \u0648\u0627\u0644\u0628\u0631\u064A\u062F","Shop":"\u0627\u0644\u0645\u062A\u062C\u0631","Products":"\u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A","Industries":"\u0627\u0644\u0635\u0646\u0627\u0639\u0627\u062A","About":"\u0645\u0646 \u0646\u062D\u0646","Contact":"\u0627\u062A\u0635\u0644 \u0628\u0646\u0627","Blog":"\u0627\u0644\u0645\u062F\u0648\u0646\u0629",
      "IT Support Overview":"\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629 \u0639\u0644\u0649 \u0627\u0644\u062F\u0639\u0645","Fixed Cost IT Support":"\u062F\u0639\u0645 \u062A\u0642\u0646\u064A \u0628\u062A\u0643\u0644\u0641\u0629 \u062B\u0627\u0628\u062A\u0629","Prepaid IT Support":"\u062F\u0639\u0645 \u062A\u0642\u0646\u064A \u0645\u062F\u0641\u0648\u0639 \u0645\u0633\u0628\u0642\u064B\u0627","Casual IT Support":"\u062F\u0639\u0645 \u062A\u0642\u0646\u064A \u0639\u0631\u0636\u064A","IT Security Overview":"\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629 \u0639\u0644\u0649 \u0627\u0644\u0623\u0645\u0646","Desktop Security":"\u0623\u0645\u0646 \u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628","Server Infrastructure":"\u0628\u0646\u064A\u0629 \u0627\u0644\u062E\u0648\u0627\u062F\u0645","Cloud Security":"\u0623\u0645\u0646 \u0627\u0644\u0633\u062D\u0627\u0628\u0629","Risk & Threat Assessment":"\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0627\u0644\u062A\u0647\u062F\u064A\u062F\u0627\u062A","Internet & Content Security":"\u0623\u0645\u0646 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0648\u0627\u0644\u0645\u062D\u062A\u0648\u0649","Managed IT Overview":"\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629 \u0639\u0644\u0649 \u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0645\u062F\u0627\u0631\u0629","Managed Servers":"\u062E\u0648\u0627\u062F\u0645 \u0645\u062F\u0627\u0631\u0629","Managed Security":"\u0623\u0645\u0646 \u0645\u062F\u0627\u0631","Managed Network":"\u0634\u0628\u0643\u0629 \u0645\u062F\u0627\u0631\u0629","Managed Colocation":"\u0627\u0633\u062A\u0636\u0627\u0641\u0629 \u0645\u0634\u062A\u0631\u0643\u0629 \u0645\u062F\u0627\u0631\u0629","All Services":"\u062C\u0645\u064A\u0639 \u0627\u0644\u062E\u062F\u0645\u0627\u062A","Infrastructure Services":"\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0628\u0646\u064A\u0629 \u0627\u0644\u062A\u062D\u062A\u064A\u0629","Cloud Services":"\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0633\u062D\u0627\u0628\u0629","Network Infrastructure":"\u0628\u0646\u064A\u0629 \u0627\u0644\u0634\u0628\u0643\u0629","DevOps Services":"\u062E\u062F\u0645\u0627\u062A DevOps","Email Solutions":"\u062D\u0644\u0648\u0644 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A","Repair & AMC":"\u0627\u0644\u0625\u0635\u0644\u0627\u062D \u0648 AMC","Remote & Onsite Support":"\u0627\u0644\u062F\u0639\u0645 \u0639\u0646 \u0628\u064F\u0639\u062F \u0648\u0641\u064A \u0627\u0644\u0645\u0648\u0642\u0639","Professional Services":"\u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0641\u064A\u0629","IT Hardware Rental":"\u062A\u0623\u062C\u064A\u0631 \u0623\u062C\u0647\u0632\u0629 \u062A\u0642\u0646\u064A\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A","Custom Software":"\u0628\u0631\u0645\u062C\u064A\u0627\u062A \u0645\u062E\u0635\u0635\u0629","Website Design & Dev":"\u062A\u0635\u0645\u064A\u0645 \u0648\u062A\u0637\u0648\u064A\u0631 \u0627\u0644\u0645\u0648\u0627\u0642\u0639","Mobile App Development":"\u062A\u0637\u0648\u064A\u0631 \u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0627\u0644\u062C\u0648\u0627\u0644","Professional Email":"\u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0627\u062D\u062A\u0631\u0627\u0641\u064A","Email Licensing":"\u062A\u0631\u062E\u064A\u0635 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A","Email Migration":"\u062A\u0631\u062D\u064A\u0644 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A","About Us":"\u0645\u0646 \u0646\u062D\u0646","Portfolio":"\u0623\u0639\u0645\u0627\u0644\u0646\u0627","Pricing":"\u0627\u0644\u0623\u0633\u0639\u0627\u0631",
      "Call Us":"\u0627\u062A\u0635\u0644 \u0628\u0646\u0627","Request Callback":"\u0627\u0637\u0644\u0628 \u0645\u0639\u0627\u0648\u062F\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644","Get Quote":"\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0639\u0631\u0636 \u0633\u0639\u0631",
      "IT Services":"\u062E\u062F\u0645\u0627\u062A \u062A\u0642\u0646\u064A\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A","Quick Links":"\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629","Company":"\u0627\u0644\u0634\u0631\u0643\u0629","Contact Us":"\u0627\u062A\u0635\u0644 \u0628\u0646\u0627","Locations":"\u0627\u0644\u0645\u0648\u0627\u0642\u0639","Software & Cloud":"\u0627\u0644\u0628\u0631\u0645\u062C\u064A\u0627\u062A \u0648\u0627\u0644\u0633\u062D\u0627\u0628\u0629","Software":"\u0627\u0644\u0628\u0631\u0645\u062C\u064A\u0627\u062A",
      "Managed IT Services":"\u062E\u062F\u0645\u0627\u062A \u062A\u0642\u0646\u064A\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u062F\u0627\u0631\u0629","Cybersecurity":"\u0627\u0644\u0623\u0645\u0646 \u0627\u0644\u0633\u064A\u0628\u0631\u0627\u0646\u064A","Networking":"\u0627\u0644\u0634\u0628\u0643\u0627\u062A","Computer AMC & Repair":"\u0639\u0642\u0648\u062F \u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u062D\u0627\u0633\u0648\u0628 \u0648\u0627\u0644\u0625\u0635\u0644\u0627\u062D","Privacy Policy":"\u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629","Terms of Service":"\u0634\u0631\u0648\u0637 \u0627\u0644\u062E\u062F\u0645\u0629",
      "Mobile":"\u0627\u0644\u062C\u0648\u0627\u0644","Office":"\u0627\u0644\u0645\u0643\u062A\u0628","Email":"\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A","Coverage":"\u0627\u0644\u062A\u063A\u0637\u064A\u0629",
      "Get a Free IT Assessment":"\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u062A\u0642\u064A\u064A\u0645 \u062A\u0642\u0646\u064A \u0645\u062C\u0627\u0646\u064A","Explore":"\u0627\u0633\u062A\u0643\u0634\u0641","Read More":"\u0627\u0642\u0631\u0623 \u0627\u0644\u0645\u0632\u064A\u062F","Learn More":"\u0627\u0639\u0631\u0641 \u0627\u0644\u0645\u0632\u064A\u062F","View All":"\u0639\u0631\u0636 \u0627\u0644\u0643\u0644","Get Started":"\u0627\u0628\u062F\u0623 \u0627\u0644\u0622\u0646","Send Message":"\u0625\u0631\u0633\u0627\u0644 \u0631\u0633\u0627\u0644\u0629","Subscribe":"\u0627\u0634\u062A\u0631\u0643",
      "Name":"\u0627\u0644\u0627\u0633\u0645","Full Name":"\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644","Email Address":"\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A","Phone":"\u0627\u0644\u0647\u0627\u062A\u0641","Phone Number":"\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641","Message":"\u0627\u0644\u0631\u0633\u0627\u0644\u0629","Subject":"\u0627\u0644\u0645\u0648\u0636\u0648\u0639","Submit":"\u0625\u0631\u0633\u0627\u0644","Send":"\u0625\u0631\u0633\u0627\u0644"
    },
    fr: {
      "Home":"Accueil","IT Support":"Support informatique","IT Security":"S\u00E9curit\u00E9 informatique","Managed IT":"Infogérance","Services":"Services","Software & Web":"Logiciels & Web","Cloud & Email":"Cloud & E-mail","Shop":"Boutique","Products":"Produits","Industries":"Secteurs","About":"\u00C0 propos","Contact":"Contact","Blog":"Blog",
      "IT Support Overview":"Aper\u00E7u du support","Fixed Cost IT Support":"Support informatique \u00E0 co\u00FBt fixe","Prepaid IT Support":"Support informatique pr\u00E9pay\u00E9","Casual IT Support":"Support informatique ponctuel","IT Security Overview":"Aper\u00E7u de la s\u00E9curit\u00E9","Desktop Security":"S\u00E9curit\u00E9 des postes","Server Infrastructure":"Infrastructure serveur","Cloud Security":"S\u00E9curit\u00E9 du cloud","Risk & Threat Assessment":"\u00C9valuation des risques et menaces","Internet & Content Security":"S\u00E9curit\u00E9 Internet et contenu","Managed IT Overview":"Aper\u00E7u de l'infog\u00E9rance","Managed Servers":"Serveurs g\u00E9r\u00E9s","Managed Security":"S\u00E9curit\u00E9 g\u00E9r\u00E9e","Managed Network":"R\u00E9seau g\u00E9r\u00E9","Managed Colocation":"Colocation g\u00E9r\u00E9e","All Services":"Tous les services","Infrastructure Services":"Services d'infrastructure","Cloud Services":"Services cloud","Network Infrastructure":"Infrastructure r\u00E9seau","DevOps Services":"Services DevOps","Email Solutions":"Solutions e-mail","Repair & AMC":"R\u00E9paration & AMC","Remote & Onsite Support":"Support \u00E0 distance et sur site","Professional Services":"Services professionnels","IT Hardware Rental":"Location de mat\u00E9riel informatique","Custom Software":"Logiciels sur mesure","Website Design & Dev":"Conception & d\u00E9v. de sites web","Mobile App Development":"D\u00E9veloppement d'applications mobiles","Professional Email":"E-mail professionnel","Email Licensing":"Licences e-mail","Email Migration":"Migration d'e-mails","About Us":"\u00C0 propos de nous","Portfolio":"Portfolio","Pricing":"Tarifs",
      "Call Us":"Appelez-nous","Request Callback":"Demander un rappel","Get Quote":"Obtenir un devis",
      "IT Services":"Services informatiques","Quick Links":"Liens rapides","Company":"Entreprise","Contact Us":"Contactez-nous","Locations":"Emplacements","Software & Cloud":"Logiciels & Cloud","Software":"Logiciels",
      "Managed IT Services":"Services informatiques g\u00E9r\u00E9s","Cybersecurity":"Cybers\u00E9curit\u00E9","Networking":"R\u00E9seautage","Computer AMC & Repair":"AMC & r\u00E9paration informatique","Privacy Policy":"Politique de confidentialit\u00E9","Terms of Service":"Conditions d'utilisation",
      "Mobile":"Mobile","Office":"Bureau","Email":"E-mail","Coverage":"Couverture",
      "Get a Free IT Assessment":"Obtenez une \u00E9valuation IT gratuite","Explore":"Explorer","Read More":"Lire la suite","Learn More":"En savoir plus","View All":"Tout voir","Get Started":"Commencer","Send Message":"Envoyer le message","Subscribe":"S'abonner",
      "Name":"Nom","Full Name":"Nom complet","Email Address":"Adresse e-mail","Phone":"T\u00E9l\u00E9phone","Phone Number":"Num\u00E9ro de t\u00E9l\u00E9phone","Message":"Message","Subject":"Sujet","Submit":"Envoyer","Send":"Envoyer"
    },
    es: {
      "Home":"Inicio","IT Support":"Soporte TI","IT Security":"Seguridad TI","Managed IT":"TI gestionada","Services":"Servicios","Software & Web":"Software y Web","Cloud & Email":"Nube y Correo","Shop":"Tienda","Products":"Productos","Industries":"Industrias","About":"Acerca de","Contact":"Contacto","Blog":"Blog",
      "IT Support Overview":"Resumen de soporte TI","Fixed Cost IT Support":"Soporte TI de costo fijo","Prepaid IT Support":"Soporte TI prepago","Casual IT Support":"Soporte TI ocasional","IT Security Overview":"Resumen de seguridad TI","Desktop Security":"Seguridad de escritorio","Server Infrastructure":"Infraestructura de servidores","Cloud Security":"Seguridad en la nube","Risk & Threat Assessment":"Evaluaci\u00F3n de riesgos y amenazas","Internet & Content Security":"Seguridad de internet y contenido","Managed IT Overview":"Resumen de TI gestionada","Managed Servers":"Servidores gestionados","Managed Security":"Seguridad gestionada","Managed Network":"Red gestionada","Managed Colocation":"Colocaci\u00F3n gestionada","All Services":"Todos los servicios","Infrastructure Services":"Servicios de infraestructura","Cloud Services":"Servicios en la nube","Network Infrastructure":"Infraestructura de red","DevOps Services":"Servicios DevOps","Email Solutions":"Soluciones de correo","Repair & AMC":"Reparaci\u00F3n y AMC","Remote & Onsite Support":"Soporte remoto y en sitio","Professional Services":"Servicios profesionales","IT Hardware Rental":"Alquiler de hardware TI","Custom Software":"Software a medida","Website Design & Dev":"Dise\u00F1o y desarrollo web","Mobile App Development":"Desarrollo de apps m\u00F3viles","Professional Email":"Correo profesional","Email Licensing":"Licencias de correo","Email Migration":"Migraci\u00F3n de correo","About Us":"Sobre nosotros","Portfolio":"Portafolio","Pricing":"Precios",
      "Call Us":"Ll\u00E1manos","Request Callback":"Solicitar llamada","Get Quote":"Obtener cotizaci\u00F3n",
      "IT Services":"Servicios TI","Quick Links":"Enlaces r\u00E1pidos","Company":"Empresa","Contact Us":"Cont\u00E1ctanos","Locations":"Ubicaciones","Software & Cloud":"Software y Nube","Software":"Software",
      "Managed IT Services":"Servicios TI gestionados","Cybersecurity":"Ciberseguridad","Networking":"Redes","Computer AMC & Repair":"AMC y reparaci\u00F3n de equipos","Privacy Policy":"Pol\u00EDtica de privacidad","Terms of Service":"T\u00E9rminos del servicio",
      "Mobile":"M\u00F3vil","Office":"Oficina","Email":"Correo","Coverage":"Cobertura",
      "Get a Free IT Assessment":"Obtenga una evaluaci\u00F3n TI gratuita","Explore":"Explorar","Read More":"Leer m\u00E1s","Learn More":"M\u00E1s informaci\u00F3n","View All":"Ver todo","Get Started":"Comenzar","Send Message":"Enviar mensaje","Subscribe":"Suscribirse",
      "Name":"Nombre","Full Name":"Nombre completo","Email Address":"Correo electr\u00F3nico","Phone":"Tel\u00E9fono","Phone Number":"N\u00FAmero de tel\u00E9fono","Message":"Mensaje","Subject":"Asunto","Submit":"Enviar","Send":"Enviar"
    },
    de: {
      "Home":"Startseite","IT Support":"IT-Support","IT Security":"IT-Sicherheit","Managed IT":"Managed IT","Services":"Leistungen","Software & Web":"Software & Web","Cloud & Email":"Cloud & E-Mail","Shop":"Shop","Products":"Produkte","Industries":"Branchen","About":"\u00DCber uns","Contact":"Kontakt","Blog":"Blog",
      "IT Support Overview":"IT-Support \u00DCbersicht","Fixed Cost IT Support":"IT-Support zum Festpreis","Prepaid IT Support":"Prepaid IT-Support","Casual IT Support":"Gelegentlicher IT-Support","IT Security Overview":"IT-Sicherheit \u00DCbersicht","Desktop Security":"Desktop-Sicherheit","Server Infrastructure":"Server-Infrastruktur","Cloud Security":"Cloud-Sicherheit","Risk & Threat Assessment":"Risiko- und Bedrohungsanalyse","Internet & Content Security":"Internet- und Inhaltssicherheit","Managed IT Overview":"Managed IT \u00DCbersicht","Managed Servers":"Managed Server","Managed Security":"Managed Security","Managed Network":"Managed Network","Managed Colocation":"Managed Colocation","All Services":"Alle Leistungen","Infrastructure Services":"Infrastruktur-Services","Cloud Services":"Cloud-Services","Network Infrastructure":"Netzwerkinfrastruktur","DevOps Services":"DevOps-Services","Email Solutions":"E-Mail-L\u00F6sungen","Repair & AMC":"Reparatur & AMC","Remote & Onsite Support":"Remote- & Vor-Ort-Support","Professional Services":"Professionelle Dienste","IT Hardware Rental":"IT-Hardware-Vermietung","Custom Software":"Individuelle Software","Website Design & Dev":"Webdesign & -entwicklung","Mobile App Development":"Mobile App-Entwicklung","Professional Email":"Professionelle E-Mail","Email Licensing":"E-Mail-Lizenzierung","Email Migration":"E-Mail-Migration","About Us":"\u00DCber uns","Portfolio":"Portfolio","Pricing":"Preise",
      "Call Us":"Rufen Sie uns an","Request Callback":"R\u00FCckruf anfordern","Get Quote":"Angebot anfordern",
      "IT Services":"IT-Services","Quick Links":"Schnelllinks","Company":"Unternehmen","Contact Us":"Kontaktieren Sie uns","Locations":"Standorte","Software & Cloud":"Software & Cloud","Software":"Software",
      "Managed IT Services":"Managed IT-Services","Cybersecurity":"Cybersicherheit","Networking":"Netzwerk","Computer AMC & Repair":"Computer-AMC & Reparatur","Privacy Policy":"Datenschutzrichtlinie","Terms of Service":"Nutzungsbedingungen",
      "Mobile":"Mobil","Office":"B\u00FCro","Email":"E-Mail","Coverage":"Abdeckung",
      "Get a Free IT Assessment":"Kostenlose IT-Bewertung erhalten","Explore":"Entdecken","Read More":"Mehr lesen","Learn More":"Mehr erfahren","View All":"Alle anzeigen","Get Started":"Loslegen","Send Message":"Nachricht senden","Subscribe":"Abonnieren",
      "Name":"Name","Full Name":"Vollst\u00E4ndiger Name","Email Address":"E-Mail-Adresse","Phone":"Telefon","Phone Number":"Telefonnummer","Message":"Nachricht","Subject":"Betreff","Submit":"Absenden","Send":"Senden"
    },
    pt: {
      "Home":"In\u00EDcio","IT Support":"Suporte de TI","IT Security":"Seguran\u00E7a de TI","Managed IT":"TI gerenciada","Services":"Servi\u00E7os","Software & Web":"Software e Web","Cloud & Email":"Nuvem e E-mail","Shop":"Loja","Products":"Produtos","Industries":"Setores","About":"Sobre","Contact":"Contato","Blog":"Blog",
      "IT Support Overview":"Vis\u00E3o geral do suporte","Fixed Cost IT Support":"Suporte de TI de custo fixo","Prepaid IT Support":"Suporte de TI pr\u00E9-pago","Casual IT Support":"Suporte de TI avulso","IT Security Overview":"Vis\u00E3o geral da seguran\u00E7a","Desktop Security":"Seguran\u00E7a de desktop","Server Infrastructure":"Infraestrutura de servidores","Cloud Security":"Seguran\u00E7a na nuvem","Risk & Threat Assessment":"Avalia\u00E7\u00E3o de riscos e amea\u00E7as","Internet & Content Security":"Seguran\u00E7a de internet e conte\u00FAdo","Managed IT Overview":"Vis\u00E3o geral da TI gerenciada","Managed Servers":"Servidores gerenciados","Managed Security":"Seguran\u00E7a gerenciada","Managed Network":"Rede gerenciada","Managed Colocation":"Colocation gerenciado","All Services":"Todos os servi\u00E7os","Infrastructure Services":"Servi\u00E7os de infraestrutura","Cloud Services":"Servi\u00E7os em nuvem","Network Infrastructure":"Infraestrutura de rede","DevOps Services":"Servi\u00E7os DevOps","Email Solutions":"Solu\u00E7\u00F5es de e-mail","Repair & AMC":"Reparo e AMC","Remote & Onsite Support":"Suporte remoto e presencial","Professional Services":"Servi\u00E7os profissionais","IT Hardware Rental":"Aluguel de hardware de TI","Custom Software":"Software sob medida","Website Design & Dev":"Design e desenvolvimento web","Mobile App Development":"Desenvolvimento de apps m\u00F3veis","Professional Email":"E-mail profissional","Email Licensing":"Licenciamento de e-mail","Email Migration":"Migra\u00E7\u00E3o de e-mail","About Us":"Sobre n\u00F3s","Portfolio":"Portf\u00F3lio","Pricing":"Pre\u00E7os",
      "Call Us":"Ligue para n\u00F3s","Request Callback":"Solicitar retorno","Get Quote":"Solicitar or\u00E7amento",
      "IT Services":"Servi\u00E7os de TI","Quick Links":"Links r\u00E1pidos","Company":"Empresa","Contact Us":"Fale conosco","Locations":"Localiza\u00E7\u00F5es","Software & Cloud":"Software e Nuvem","Software":"Software",
      "Managed IT Services":"Servi\u00E7os de TI gerenciados","Cybersecurity":"Ciberseguran\u00E7a","Networking":"Redes","Computer AMC & Repair":"AMC e reparo de computadores","Privacy Policy":"Pol\u00EDtica de privacidade","Terms of Service":"Termos de servi\u00E7o",
      "Mobile":"Celular","Office":"Escrit\u00F3rio","Email":"E-mail","Coverage":"Cobertura",
      "Get a Free IT Assessment":"Obtenha uma avalia\u00E7\u00E3o de TI gratuita","Explore":"Explorar","Read More":"Leia mais","Learn More":"Saiba mais","View All":"Ver tudo","Get Started":"Come\u00E7ar","Send Message":"Enviar mensagem","Subscribe":"Inscrever-se",
      "Name":"Nome","Full Name":"Nome completo","Email Address":"Endere\u00E7o de e-mail","Phone":"Telefone","Phone Number":"N\u00FAmero de telefone","Message":"Mensagem","Subject":"Assunto","Submit":"Enviar","Send":"Enviar"
    },
    ru: {
      "Home":"\u0413\u043B\u0430\u0432\u043D\u0430\u044F","IT Support":"IT-\u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430","IT Security":"IT-\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C","Managed IT":"\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u044B\u0435 IT","Services":"\u0423\u0441\u043B\u0443\u0433\u0438","Software & Web":"\u041F\u041E \u0438 \u0432\u0435\u0431","Cloud & Email":"\u041E\u0431\u043B\u0430\u043A\u043E \u0438 \u043F\u043E\u0447\u0442\u0430","Shop":"\u041C\u0430\u0433\u0430\u0437\u0438\u043D","Products":"\u041F\u0440\u043E\u0434\u0443\u043A\u0442\u044B","Industries":"\u041E\u0442\u0440\u0430\u0441\u043B\u0438","About":"\u041E \u043D\u0430\u0441","Contact":"\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B","Blog":"\u0411\u043B\u043E\u0433",
      "IT Support Overview":"\u041E\u0431\u0437\u043E\u0440 IT-\u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438","Fixed Cost IT Support":"IT-\u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 \u0441 \u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0439 \u0446\u0435\u043D\u043E\u0439","Prepaid IT Support":"\u041F\u0440\u0435\u0434\u043E\u043F\u043B\u0430\u0447\u0435\u043D\u043D\u0430\u044F IT-\u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430","Casual IT Support":"\u0420\u0430\u0437\u043E\u0432\u0430\u044F IT-\u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430","IT Security Overview":"\u041E\u0431\u0437\u043E\u0440 IT-\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438","Desktop Security":"\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u0441\u0442\u0430\u043D\u0446\u0438\u0439","Server Infrastructure":"\u0421\u0435\u0440\u0432\u0435\u0440\u043D\u0430\u044F \u0438\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430","Cloud Security":"\u041E\u0431\u043B\u0430\u0447\u043D\u0430\u044F \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C","Risk & Threat Assessment":"\u041E\u0446\u0435\u043D\u043A\u0430 \u0440\u0438\u0441\u043A\u043E\u0432 \u0438 \u0443\u0433\u0440\u043E\u0437","Internet & Content Security":"\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442\u0430 \u0438 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430","Managed IT Overview":"\u041E\u0431\u0437\u043E\u0440 \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u044B\u0445 IT","Managed Servers":"\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u044B\u0435 \u0441\u0435\u0440\u0432\u0435\u0440\u044B","Managed Security":"\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u0430\u044F \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C","Managed Network":"\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u0430\u044F \u0441\u0435\u0442\u044C","Managed Colocation":"\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u044B\u0439 \u043A\u043E\u043B\u043E\u043A\u0435\u0439\u0448\u043D","All Services":"\u0412\u0441\u0435 \u0443\u0441\u043B\u0443\u0433\u0438","Infrastructure Services":"\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438","Cloud Services":"\u041E\u0431\u043B\u0430\u0447\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438","Network Infrastructure":"\u0421\u0435\u0442\u0435\u0432\u0430\u044F \u0438\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430","DevOps Services":"\u0423\u0441\u043B\u0443\u0433\u0438 DevOps","Email Solutions":"\u041F\u043E\u0447\u0442\u043E\u0432\u044B\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F","Repair & AMC":"\u0420\u0435\u043C\u043E\u043D\u0442 \u0438 AMC","Remote & Onsite Support":"\u0423\u0434\u0430\u043B\u0451\u043D\u043D\u0430\u044F \u0438 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u0430\u044F \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430","Professional Services":"\u041F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438","IT Hardware Rental":"\u0410\u0440\u0435\u043D\u0434\u0430 IT-\u043E\u0431\u043E\u0440\u0443\u0434\u043E\u0432\u0430\u043D\u0438\u044F","Custom Software":"\u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E\u0435 \u041F\u041E","Website Design & Dev":"\u0414\u0438\u0437\u0430\u0439\u043D \u0438 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0441\u0430\u0439\u0442\u043E\u0432","Mobile App Development":"\u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u044B\u0445 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0439","Professional Email":"\u041F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430","Email Licensing":"\u041B\u0438\u0446\u0435\u043D\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u043E\u0447\u0442\u044B","Email Migration":"\u041C\u0438\u0433\u0440\u0430\u0446\u0438\u044F \u043F\u043E\u0447\u0442\u044B","About Us":"\u041E \u043D\u0430\u0441","Portfolio":"\u041F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E","Pricing":"\u0426\u0435\u043D\u044B",
      "Call Us":"\u041F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u0435 \u043D\u0430\u043C","Request Callback":"\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0437\u0432\u043E\u043D\u043E\u043A","Get Quote":"\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0440\u0430\u0441\u0447\u0451\u0442",
      "IT Services":"IT-\u0443\u0441\u043B\u0443\u0433\u0438","Quick Links":"\u0411\u044B\u0441\u0442\u0440\u044B\u0435 \u0441\u0441\u044B\u043B\u043A\u0438","Company":"\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F","Contact Us":"\u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438","Locations":"\u041B\u043E\u043A\u0430\u0446\u0438\u0438","Software & Cloud":"\u041F\u041E \u0438 \u043E\u0431\u043B\u0430\u043A\u043E","Software":"\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u043D\u043E\u0435 \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0435\u043D\u0438\u0435",
      "Managed IT Services":"\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u044B\u0435 IT-\u0443\u0441\u043B\u0443\u0433\u0438","Cybersecurity":"\u041A\u0438\u0431\u0435\u0440\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C","Networking":"\u0421\u0435\u0442\u0438","Computer AMC & Repair":"AMC \u0438 \u0440\u0435\u043C\u043E\u043D\u0442 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u043E\u0432","Privacy Policy":"\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438","Terms of Service":"\u0423\u0441\u043B\u043E\u0432\u0438\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F",
      "Mobile":"\u041C\u043E\u0431\u0438\u043B\u044C\u043D\u044B\u0439","Office":"\u041E\u0444\u0438\u0441","Email":"\u042D\u043B. \u043F\u043E\u0447\u0442\u0430","Coverage":"\u041F\u043E\u043A\u0440\u044B\u0442\u0438\u0435",
      "Get a Free IT Assessment":"\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u0443\u044E IT-\u043E\u0446\u0435\u043D\u043A\u0443","Explore":"\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435","Read More":"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u0435\u0435","Learn More":"\u0423\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435","View All":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0441\u0435","Get Started":"\u041D\u0430\u0447\u0430\u0442\u044C","Send Message":"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435","Subscribe":"\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F",
      "Name":"\u0418\u043C\u044F","Full Name":"\u041F\u043E\u043B\u043D\u043E\u0435 \u0438\u043C\u044F","Email Address":"\u0410\u0434\u0440\u0435\u0441 \u044D\u043B. \u043F\u043E\u0447\u0442\u044B","Phone":"\u0422\u0435\u043B\u0435\u0444\u043E\u043D","Phone Number":"\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430","Message":"\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435","Subject":"\u0422\u0435\u043C\u0430","Submit":"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C","Send":"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C"
    },
    zh: {
      "Home":"\u9996\u9875","IT Support":"IT \u652F\u6301","IT Security":"IT \u5B89\u5168","Managed IT":"\u6258\u7BA1 IT","Services":"\u670D\u52A1","Software & Web":"\u8F6F\u4EF6\u4E0E\u7F51\u7AD9","Cloud & Email":"\u4E91\u4E0E\u90AE\u7BB1","Shop":"\u5546\u5E97","Products":"\u4EA7\u54C1","Industries":"\u884C\u4E1A","About":"\u5173\u4E8E","Contact":"\u8054\u7CFB","Blog":"\u535A\u5BA2",
      "IT Support Overview":"IT \u652F\u6301\u6982\u89C8","Fixed Cost IT Support":"\u56FA\u5B9A\u8D39\u7528 IT \u652F\u6301","Prepaid IT Support":"\u9884\u4ED8\u8D39 IT \u652F\u6301","Casual IT Support":"\u4E34\u65F6 IT \u652F\u6301","IT Security Overview":"IT \u5B89\u5168\u6982\u89C8","Desktop Security":"\u684C\u9762\u5B89\u5168","Server Infrastructure":"\u670D\u52A1\u5668\u57FA\u7840\u8BBE\u65BD","Cloud Security":"\u4E91\u5B89\u5168","Risk & Threat Assessment":"\u98CE\u9669\u4E0E\u5A01\u80C1\u8BC4\u4F30","Internet & Content Security":"\u4E92\u8054\u7F51\u4E0E\u5185\u5BB9\u5B89\u5168","Managed IT Overview":"\u6258\u7BA1 IT \u6982\u89C8","Managed Servers":"\u6258\u7BA1\u670D\u52A1\u5668","Managed Security":"\u6258\u7BA1\u5B89\u5168","Managed Network":"\u6258\u7BA1\u7F51\u7EDC","Managed Colocation":"\u6258\u7BA1\u673A\u623F","All Services":"\u6240\u6709\u670D\u52A1","Infrastructure Services":"\u57FA\u7840\u8BBE\u65BD\u670D\u52A1","Cloud Services":"\u4E91\u670D\u52A1","Network Infrastructure":"\u7F51\u7EDC\u57FA\u7840\u8BBE\u65BD","DevOps Services":"DevOps \u670D\u52A1","Email Solutions":"\u90AE\u7BB1\u89E3\u51B3\u65B9\u6848","Repair & AMC":"\u7EF4\u4FEE\u4E0E AMC","Remote & Onsite Support":"\u8FDC\u7A0B\u4E0E\u73B0\u573A\u652F\u6301","Professional Services":"\u4E13\u4E1A\u670D\u52A1","IT Hardware Rental":"IT \u786C\u4EF6\u79DF\u8D41","Custom Software":"\u5B9A\u5236\u8F6F\u4EF6","Website Design & Dev":"\u7F51\u7AD9\u8BBE\u8BA1\u4E0E\u5F00\u53D1","Mobile App Development":"\u79FB\u52A8\u5E94\u7528\u5F00\u53D1","Professional Email":"\u4E13\u4E1A\u90AE\u7BB1","Email Licensing":"\u90AE\u7BB1\u8BB8\u53EF","Email Migration":"\u90AE\u7BB1\u8FC1\u79FB","About Us":"\u5173\u4E8E\u6211\u4EEC","Portfolio":"\u4F5C\u54C1\u96C6","Pricing":"\u4EF7\u683C",
      "Call Us":"\u8054\u7CFB\u6211\u4EEC","Request Callback":"\u8BF7\u6C42\u56DE\u7535","Get Quote":"\u83B7\u53D6\u62A5\u4EF7",
      "IT Services":"IT \u670D\u52A1","Quick Links":"\u5FEB\u901F\u94FE\u63A5","Company":"\u516C\u53F8","Contact Us":"\u8054\u7CFB\u6211\u4EEC","Locations":"\u5730\u70B9","Software & Cloud":"\u8F6F\u4EF6\u4E0E\u4E91","Software":"\u8F6F\u4EF6",
      "Managed IT Services":"\u6258\u7BA1 IT \u670D\u52A1","Cybersecurity":"\u7F51\u7EDC\u5B89\u5168","Networking":"\u7F51\u7EDC","Computer AMC & Repair":"\u7535\u8111 AMC \u4E0E\u7EF4\u4FEE","Privacy Policy":"\u9690\u79C1\u653F\u7B56","Terms of Service":"\u670D\u52A1\u6761\u6B3E",
      "Mobile":"\u624B\u673A","Office":"\u529E\u516C\u5BA4","Email":"\u90AE\u7BB1","Coverage":"\u8986\u76D6\u8303\u56F4",
      "Get a Free IT Assessment":"\u83B7\u53D6\u514D\u8D39 IT \u8BC4\u4F30","Explore":"\u63A2\u7D22","Read More":"\u9605\u8BFB\u66F4\u591A","Learn More":"\u4E86\u89E3\u66F4\u591A","View All":"\u67E5\u770B\u5168\u90E8","Get Started":"\u5F00\u59CB","Send Message":"\u53D1\u9001\u6D88\u606F","Subscribe":"\u8BA2\u9605",
      "Name":"\u59D3\u540D","Full Name":"\u5168\u540D","Email Address":"\u7535\u5B50\u90AE\u7BB1","Phone":"\u7535\u8BDD","Phone Number":"\u7535\u8BDD\u53F7\u7801","Message":"\u7559\u8A00","Subject":"\u4E3B\u9898","Submit":"\u63D0\u4EA4","Send":"\u53D1\u9001"
    },
    ja: {
      "Home":"\u30DB\u30FC\u30E0","IT Support":"IT \u30B5\u30DD\u30FC\u30C8","IT Security":"IT \u30BB\u30AD\u30E5\u30EA\u30C6\u30A3","Managed IT":"\u30DE\u30CD\u30FC\u30B8\u30C9 IT","Services":"\u30B5\u30FC\u30D3\u30B9","Software & Web":"\u30BD\u30D5\u30C8\u30A6\u30A7\u30A2\u3068Web","Cloud & Email":"\u30AF\u30E9\u30A6\u30C9\u3068\u30E1\u30FC\u30EB","Shop":"\u30B7\u30E7\u30C3\u30D7","Products":"\u88FD\u54C1","Industries":"\u696D\u754C","About":"\u4F1A\u793E\u6982\u8981","Contact":"\u304A\u554F\u3044\u5408\u308F\u305B","Blog":"\u30D6\u30ED\u30B0",
      "IT Support Overview":"IT \u30B5\u30DD\u30FC\u30C8\u6982\u8981","Fixed Cost IT Support":"\u5B9A\u984D IT \u30B5\u30DD\u30FC\u30C8","Prepaid IT Support":"\u30D7\u30EA\u30DA\u30A4\u30C9 IT \u30B5\u30DD\u30FC\u30C8","Casual IT Support":"\u30B9\u30DD\u30C3\u30C8 IT \u30B5\u30DD\u30FC\u30C8","IT Security Overview":"IT \u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u6982\u8981","Desktop Security":"\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3","Server Infrastructure":"\u30B5\u30FC\u30D0\u30FC\u30A4\u30F3\u30D5\u30E9","Cloud Security":"\u30AF\u30E9\u30A6\u30C9\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3","Risk & Threat Assessment":"\u30EA\u30B9\u30AF\u30FB\u8105\u5A01\u8A55\u4FA1","Internet & Content Security":"\u30A4\u30F3\u30BF\u30FC\u30CD\u30C3\u30C8\u30FB\u30B3\u30F3\u30C6\u30F3\u30C4\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3","Managed IT Overview":"\u30DE\u30CD\u30FC\u30B8\u30C9 IT \u6982\u8981","Managed Servers":"\u30DE\u30CD\u30FC\u30B8\u30C9\u30B5\u30FC\u30D0\u30FC","Managed Security":"\u30DE\u30CD\u30FC\u30B8\u30C9\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3","Managed Network":"\u30DE\u30CD\u30FC\u30B8\u30C9\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF","Managed Colocation":"\u30DE\u30CD\u30FC\u30B8\u30C9\u30B3\u30ED\u30B1\u30FC\u30B7\u30E7\u30F3","All Services":"\u3059\u3079\u3066\u306E\u30B5\u30FC\u30D3\u30B9","Infrastructure Services":"\u30A4\u30F3\u30D5\u30E9\u30B5\u30FC\u30D3\u30B9","Cloud Services":"\u30AF\u30E9\u30A6\u30C9\u30B5\u30FC\u30D3\u30B9","Network Infrastructure":"\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u30A4\u30F3\u30D5\u30E9","DevOps Services":"DevOps \u30B5\u30FC\u30D3\u30B9","Email Solutions":"\u30E1\u30FC\u30EB\u30BD\u30EA\u30E5\u30FC\u30B7\u30E7\u30F3","Repair & AMC":"\u4FEE\u7406\u3068 AMC","Remote & Onsite Support":"\u30EA\u30E2\u30FC\u30C8\u30FB\u30AA\u30F3\u30B5\u30A4\u30C8\u30B5\u30DD\u30FC\u30C8","Professional Services":"\u30D7\u30ED\u30D5\u30A7\u30C3\u30B7\u30E7\u30CA\u30EB\u30B5\u30FC\u30D3\u30B9","IT Hardware Rental":"IT \u30CF\u30FC\u30C9\u30A6\u30A7\u30A2\u30EC\u30F3\u30BF\u30EB","Custom Software":"\u30AB\u30B9\u30BF\u30E0\u30BD\u30D5\u30C8\u30A6\u30A7\u30A2","Website Design & Dev":"\u30A6\u30A7\u30D6\u30B5\u30A4\u30C8\u8A2D\u8A08\u30FB\u958B\u767A","Mobile App Development":"\u30E2\u30D0\u30A4\u30EB\u30A2\u30D7\u30EA\u958B\u767A","Professional Email":"\u30D7\u30ED\u30D5\u30A7\u30C3\u30B7\u30E7\u30CA\u30EB\u30E1\u30FC\u30EB","Email Licensing":"\u30E1\u30FC\u30EB\u30E9\u30A4\u30BB\u30F3\u30B9","Email Migration":"\u30E1\u30FC\u30EB\u79FB\u884C","About Us":"\u4F1A\u793E\u6982\u8981","Portfolio":"\u5B9F\u7E3E","Pricing":"\u6599\u91D1",
      "Call Us":"\u304A\u96FB\u8A71\u304F\u3060\u3055\u3044","Request Callback":"\u6298\u308A\u8FD4\u3057\u306E\u30EA\u30AF\u30A8\u30B9\u30C8","Get Quote":"\u898B\u7A4D\u3092\u53D6\u5F97",
      "IT Services":"IT \u30B5\u30FC\u30D3\u30B9","Quick Links":"\u30AF\u30A4\u30C3\u30AF\u30EA\u30F3\u30AF","Company":"\u4F1A\u793E","Contact Us":"\u304A\u554F\u3044\u5408\u308F\u305B","Locations":"\u62E0\u70B9","Software & Cloud":"\u30BD\u30D5\u30C8\u30A6\u30A7\u30A2\u3068\u30AF\u30E9\u30A6\u30C9","Software":"\u30BD\u30D5\u30C8\u30A6\u30A7\u30A2",
      "Managed IT Services":"\u30DE\u30CD\u30FC\u30B8\u30C9 IT \u30B5\u30FC\u30D3\u30B9","Cybersecurity":"\u30B5\u30A4\u30D0\u30FC\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3","Networking":"\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF","Computer AMC & Repair":"\u30B3\u30F3\u30D4\u30E5\u30FC\u30BF AMC \u3068\u4FEE\u7406","Privacy Policy":"\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC","Terms of Service":"\u5229\u7528\u898F\u7D04",
      "Mobile":"\u643A\u5E2F","Office":"\u30AA\u30D5\u30A3\u30B9","Email":"\u30E1\u30FC\u30EB","Coverage":"\u5BFE\u5FDC\u7BC4\u56F2",
      "Get a Free IT Assessment":"\u7121\u6599 IT \u8A3A\u65AD\u3092\u53D7\u3051\u308B","Explore":"\u8A73\u3057\u304F\u898B\u308B","Read More":"\u7D9A\u304D\u3092\u8AAD\u3080","Learn More":"\u8A73\u7D30\u3092\u898B\u308B","View All":"\u3059\u3079\u3066\u8868\u793A","Get Started":"\u59CB\u3081\u308B","Send Message":"\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u9001\u4FE1","Subscribe":"\u8CFC\u8AAD\u3059\u308B",
      "Name":"\u304A\u540D\u524D","Full Name":"\u6C0F\u540D","Email Address":"\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9","Phone":"\u96FB\u8A71","Phone Number":"\u96FB\u8A71\u756A\u53F7","Message":"\u30E1\u30C3\u30BB\u30FC\u30B8","Subject":"\u4EF6\u540D","Submit":"\u9001\u4FE1","Send":"\u9001\u4FE1"
    }
  };

  /* UI micro-copy for the switcher / banner / bridge, per language */
  var UI = {
    en: { label:"Language", suggest:"View this site in <strong>{lang}</strong>?", yes:"Switch to {lang}", no:"No thanks", content:"Interface translated. Translate the page content too?", translate:"Translate content", dismiss:"Keep English content" },
    hi: { label:"\u092D\u093E\u0937\u093E", suggest:"\u0907\u0938 \u0938\u093E\u0907\u091F \u0915\u094B <strong>{lang}</strong> \u092E\u0947\u0902 \u0926\u0947\u0916\u0947\u0902?", yes:"{lang} \u092E\u0947\u0902 \u092C\u0926\u0932\u0947\u0902", no:"\u0928\u0939\u0940\u0902, \u0927\u0928\u094D\u092F\u0935\u093E\u0926", content:"\u0907\u0902\u091F\u0930\u092B\u0947\u0938 \u0905\u0928\u0941\u0935\u093E\u0926\u093F\u0924\u0964 \u0915\u094D\u092F\u093E \u092A\u0947\u091C \u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u092D\u0940 \u0905\u0928\u0941\u0935\u093E\u0926 \u0915\u0930\u0947\u0902?", translate:"\u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u0905\u0928\u0941\u0935\u093E\u0926 \u0915\u0930\u0947\u0902", dismiss:"\u0905\u0902\u0917\u094D\u0930\u0947\u091C\u0940 \u0930\u0916\u0947\u0902" },
    ur: { label:"\u0632\u0628\u0627\u0646", suggest:"\u06CC\u06C1 \u0633\u0627\u0626\u0679 <strong>{lang}</strong> \u0645\u06CC\u06BA \u062F\u06CC\u06A9\u06BE\u06CC\u06BA\u061F", yes:"{lang} \u0645\u06CC\u06BA \u062A\u0628\u062F\u06CC\u0644 \u06A9\u0631\u06CC\u06BA", no:"\u0634\u06A9\u0631\u06CC\u06C1\u060C \u0646\u06C1\u06CC\u06BA", content:"\u0627\u0646\u0679\u0631\u0641\u06CC\u0633 \u062A\u0631\u062C\u0645\u06C1 \u06C1\u0648\u06AF\u06CC\u0627\u06D4 \u06A9\u06CC\u0627 \u0645\u0648\u0627\u062F \u0628\u06BE\u06CC \u062A\u0631\u062C\u0645\u06C1 \u06A9\u0631\u06CC\u06BA\u061F", translate:"\u0645\u0648\u0627\u062F \u062A\u0631\u062C\u0645\u06C1 \u06A9\u0631\u06CC\u06BA", dismiss:"\u0627\u0646\u06AF\u0631\u06CC\u0632\u06CC \u0631\u06A9\u06BE\u06CC\u06BA" },
    ne: { label:"\u092D\u093E\u0937\u093E", suggest:"\u092F\u094B \u0938\u093E\u0907\u091F <strong>{lang}</strong> \u092E\u093E \u0939\u0947\u0930\u094D\u0928\u0947?", yes:"{lang} \u092E\u093E \u092C\u0926\u0932\u094D\u0928\u0941\u0939\u094B\u0938\u094D", no:"\u092A\u0930\u094D\u0926\u0948\u0928", content:"\u0907\u0928\u094D\u091F\u0930\u092B\u0947\u0938 \u0905\u0928\u0941\u0935\u093E\u0926 \u092D\u092F\u094B\u0964 \u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u092A\u0928\u093F \u0905\u0928\u0941\u0935\u093E\u0926 \u0917\u0930\u094D\u0928\u0947?", translate:"\u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u0905\u0928\u0941\u0935\u093E\u0926", dismiss:"\u0905\u0902\u0917\u094D\u0930\u0947\u091C\u0940 \u0930\u093E\u0916\u094D\u0928\u0941\u0939\u094B\u0938\u094D" },
    ar: { label:"\u0627\u0644\u0644\u063A\u0629", suggest:"\u0639\u0631\u0636 \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0642\u0639 \u0628\u0640<strong>{lang}</strong>\u061F", yes:"\u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0625\u0644\u0649 {lang}", no:"\u0644\u0627 \u0634\u0643\u0631\u064B\u0627", content:"\u062A\u0645\u062A \u062A\u0631\u062C\u0645\u0629 \u0627\u0644\u0648\u0627\u062C\u0647\u0629. \u062A\u0631\u062C\u0645\u0629 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0623\u064A\u0636\u064B\u0627\u061F", translate:"\u062A\u0631\u062C\u0645\u0629 \u0627\u0644\u0645\u062D\u062A\u0648\u0649", dismiss:"\u0627\u0644\u0625\u0628\u0642\u0627\u0621 \u0639\u0644\u0649 \u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629" },
    fr: { label:"Langue", suggest:"Afficher ce site en <strong>{lang}</strong> ?", yes:"Passer en {lang}", no:"Non merci", content:"Interface traduite. Traduire aussi le contenu ?", translate:"Traduire le contenu", dismiss:"Garder l'anglais" },
    es: { label:"Idioma", suggest:"\u00BFVer este sitio en <strong>{lang}</strong>?", yes:"Cambiar a {lang}", no:"No, gracias", content:"Interfaz traducida. \u00BFTraducir tambi\u00E9n el contenido?", translate:"Traducir contenido", dismiss:"Mantener ingl\u00E9s" },
    de: { label:"Sprache", suggest:"Diese Seite auf <strong>{lang}</strong> ansehen?", yes:"Zu {lang} wechseln", no:"Nein danke", content:"Oberfl\u00E4che \u00FCbersetzt. Auch den Inhalt \u00FCbersetzen?", translate:"Inhalt \u00FCbersetzen", dismiss:"Englisch behalten" },
    pt: { label:"Idioma", suggest:"Ver este site em <strong>{lang}</strong>?", yes:"Mudar para {lang}", no:"N\u00E3o, obrigado", content:"Interface traduzida. Traduzir o conte\u00FAdo tamb\u00E9m?", translate:"Traduzir conte\u00FAdo", dismiss:"Manter ingl\u00EAs" },
    ru: { label:"\u042F\u0437\u044B\u043A", suggest:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u043D\u0430 <strong>{lang}</strong>?", yes:"\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043D\u0430 {lang}", no:"\u041D\u0435\u0442, \u0441\u043F\u0430\u0441\u0438\u0431\u043E", content:"\u0418\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u043F\u0435\u0440\u0435\u0432\u0435\u0434\u0451\u043D. \u041F\u0435\u0440\u0435\u0432\u0435\u0441\u0442\u0438 \u0438 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435?", translate:"\u041F\u0435\u0440\u0435\u0432\u0435\u0441\u0442\u0438 \u043A\u043E\u043D\u0442\u0435\u043D\u0442", dismiss:"\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0430\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u0438\u0439" },
    zh: { label:"\u8BED\u8A00", suggest:"\u4EE5<strong>{lang}</strong>\u67E5\u770B\u672C\u7AD9\uFF1F", yes:"\u5207\u6362\u5230{lang}", no:"\u4E0D\u4E86\uFF0C\u8C22\u8C22", content:"\u754C\u9762\u5DF2\u7FFB\u8BD1\u3002\u4E5F\u7FFB\u8BD1\u9875\u9762\u5185\u5BB9\uFF1F", translate:"\u7FFB\u8BD1\u5185\u5BB9", dismiss:"\u4FDD\u7559\u82F1\u6587" },
    ja: { label:"\u8A00\u8A9E", suggest:"\u3053\u306E\u30B5\u30A4\u30C8\u3092<strong>{lang}</strong>\u3067\u8868\u793A\u3057\u307E\u3059\u304B\uFF1F", yes:"{lang}\u306B\u5207\u308A\u66FF\u3048", no:"\u3044\u3044\u3048", content:"UI\u3092\u7FFB\u8A33\u3057\u307E\u3057\u305F\u3002\u30DA\u30FC\u30B8\u5185\u5BB9\u3082\u7FFB\u8A33\u3057\u307E\u3059\u304B\uFF1F", translate:"\u5185\u5BB9\u3092\u7FFB\u8A33", dismiss:"\u82F1\u8A9E\u306E\u307E\u307E" }
  };

  /* ---------- Small helpers ---------- */
  function byCode(code){ for (var i=0;i<LANGS.length;i++){ if (LANGS[i].code===code) return LANGS[i]; } return null; }
  function getSaved(){ try { return localStorage.getItem(STORAGE_KEY); } catch(e){ return null; } }
  function save(code){ try { localStorage.setItem(STORAGE_KEY, code); } catch(e){} }
  function ui(code){ return UI[code] || UI.en; }

  /* Detect browser language -> our supported code (or null) */
  function detectBrowser(){
    var list = navigator.languages || [navigator.language || ""];
    for (var i=0;i<list.length;i++){
      var base = String(list[i]).toLowerCase().split("-")[0];
      if (byCode(base) && base !== DEFAULT) return base;
    }
    return null;
  }

  /* ---------- DOM translation (content-match against the dictionary) ---------- */
  var SKIP_TAGS = { SCRIPT:1, STYLE:1, NOSCRIPT:1, CODE:1, PRE:1, TEXTAREA:1 };

  // Snapshot original English text the first time we translate a node,
  // so we can always restore or re-translate from the source.
  function originalText(node){
    if (node.__omnetEn == null) node.__omnetEn = node.nodeValue;
    return node.__omnetEn;
  }
  function originalAttr(el, attr){
    var key = "__omnetEn_" + attr;
    if (el[key] == null) el[key] = el.getAttribute(attr);
    return el[key];
  }

  function applyTo(code){
    var dict = code === DEFAULT ? null : DICT[code];

    // 1) Text nodes
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(n){
        var p = n.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        if (SKIP_TAGS[p.nodeName]) return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest(".notranslate, [translate='no'], .omnet-lang, .omnet-lang-suggest, .omnet-content-note")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);

    nodes.forEach(function(node){
      var en = originalText(node);
      var key = en.trim();
      if (!key) return;
      if (code === DEFAULT) { node.nodeValue = en; return; }
      if (dict[key]) {
        // preserve surrounding whitespace
        node.nodeValue = en.replace(key, dict[key]);
      }
    });

    // 2) Common translatable attributes (placeholder, aria-label, title, value of buttons)
    var attrEls = document.querySelectorAll("[placeholder],[aria-label],[title],input[type='submit'],input[type='button']");
    attrEls.forEach(function(el){
      if (el.closest(".notranslate,[translate='no'],.omnet-lang")) return;
      ["placeholder","aria-label","title"].forEach(function(attr){
        if (!el.hasAttribute(attr)) return;
        var en = originalAttr(el, attr);
        if (en == null) return;
        var key = en.trim();
        if (code === DEFAULT) { el.setAttribute(attr, en); return; }
        if (dict[key]) el.setAttribute(attr, dict[key]);
      });
      if ((el.type === "submit" || el.type === "button") && el.value){
        var enV = originalAttr(el, "value"); if (enV==null) enV = el.value;
        var kV = (enV||"").trim();
        if (code === DEFAULT) el.value = enV;
        else if (dict[kV]) el.value = dict[kV];
      }
    });
  }

  /* ---------- Right-to-left handling ---------- */
  function applyDir(code){
    var lang = byCode(code) || byCode(DEFAULT);
    document.documentElement.setAttribute("lang", code);
    document.documentElement.setAttribute("dir", lang.dir);
  }

  /* ════════════ Optional Google Translate bridge (body content) ════════════
     Loaded lazily only when the visitor asks for full-content translation.
     The interface stays on our clean dictionary translation; Google handles
     the remaining unique body text. See README_TRANSLATION.md for caveats. */
  var googleReady = false, googleLoading = false, pendingGoogle = null;

  function ensureGoogleHost(){
    if (document.getElementById("omnet-google-translate")) return;
    var d = document.createElement("div");
    d.id = "omnet-google-translate";
    d.className = "notranslate";
    document.body.appendChild(d);
  }
  function loadGoogle(targetCode){
    pendingGoogle = targetCode;
    if (googleReady) return fireGoogle(targetCode);
    if (googleLoading) return;
    googleLoading = true;
    ensureGoogleHost();
    window.googleTranslateElementInit = function(){
      /* eslint-disable no-undef */
      new google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false,
          includedLanguages: LANGS.map(function(l){return l.code;}).join(",") },
        "omnet-google-translate");
      googleReady = true;
      // give the widget a tick to build its hidden <select>
      setTimeout(function(){ if (pendingGoogle) fireGoogle(pendingGoogle); }, 600);
    };
    var s = document.createElement("script");
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    s.onerror = function(){ googleLoading = false; };
    document.body.appendChild(s);
  }
  function fireGoogle(code){
    var sel = document.querySelector("#omnet-google-translate select, select.goog-te-combo");
    if (!sel){ setTimeout(function(){ fireGoogle(code); }, 400); return; }
    sel.value = code;
    sel.dispatchEvent(new Event("change"));
  }
  function clearGoogle(){
    // Reset Google by selecting the empty/original option if present
    var sel = document.querySelector("select.goog-te-combo");
    if (sel){ sel.value = ""; sel.dispatchEvent(new Event("change")); }
    // Also clear the googtrans cookie so a reload returns to English
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  }

  /* ---------- Build the switcher UI ---------- */
  function buildDesktop(current){
    var wrap = document.createElement("div");
    wrap.className = "omnet-lang notranslate";
    wrap.setAttribute("translate","no");
    var cur = byCode(current) || byCode(DEFAULT);

    var btn = document.createElement("button");
    btn.className = "omnet-lang-btn";
    btn.type = "button";
    btn.setAttribute("aria-haspopup","listbox");
    btn.setAttribute("aria-expanded","false");
    btn.setAttribute("aria-label", ui(current).label);
    btn.innerHTML = '<i class="ri-global-line"></i><span class="omnet-lang-current">'+cur.code.toUpperCase()+'</span><i class="ri-arrow-down-s-line omnet-lang-caret"></i>';

    var menu = document.createElement("div");
    menu.className = "omnet-lang-menu";
    menu.setAttribute("role","listbox");
    LANGS.forEach(function(l){
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role","option");
      b.setAttribute("data-code", l.code);
      if (l.code === current) b.setAttribute("aria-current","true");
      b.innerHTML = '<span class="omnet-lang-flag">'+l.flag+'</span><span class="omnet-lang-native">'+l.native+'</span><span class="omnet-lang-en">'+l.en+'</span>';
      b.addEventListener("click", function(){ setLanguage(l.code); close(); });
      menu.appendChild(b);
    });

    function open(){ menu.classList.add("open"); btn.setAttribute("aria-expanded","true"); }
    function close(){ menu.classList.remove("open"); btn.setAttribute("aria-expanded","false"); }
    btn.addEventListener("click", function(e){ e.stopPropagation(); menu.classList.contains("open") ? close() : open(); });
    document.addEventListener("click", function(e){ if (!wrap.contains(e.target)) close(); });
    document.addEventListener("keydown", function(e){ if (e.key === "Escape") close(); });

    wrap.appendChild(btn); wrap.appendChild(menu);
    return wrap;
  }

  function buildMobile(current){
    var wrap = document.createElement("div");
    wrap.className = "omnet-lang-mobile notranslate";
    wrap.setAttribute("translate","no");
    wrap.innerHTML = '<div class="omnet-lang-mobile-label"><i class="ri-global-line"></i> '+ui(current).label+'</div>';
    var sel = document.createElement("select");
    sel.setAttribute("aria-label", ui(current).label);
    LANGS.forEach(function(l){
      var o = document.createElement("option");
      o.value = l.code; o.textContent = l.flag + "  " + l.native;
      if (l.code === current) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener("change", function(){ setLanguage(sel.value); });
    wrap.appendChild(sel);
    return wrap;
  }

  /* Reflect current language in already-built switchers */
  function refreshSwitchers(code){
    var cur = byCode(code) || byCode(DEFAULT);
    var curLabel = document.querySelector(".omnet-lang-current");
    if (curLabel) curLabel.textContent = cur.code.toUpperCase();
    document.querySelectorAll(".omnet-lang-menu button").forEach(function(b){
      if (b.getAttribute("data-code") === code) b.setAttribute("aria-current","true");
      else b.removeAttribute("aria-current");
    });
    var msel = document.querySelector(".omnet-lang-mobile select");
    if (msel) msel.value = code;
  }

  /* ---------- Content-bridge bar ---------- */
  function showContentNote(code){
    if (code === DEFAULT) { hideContentNote(); return; }
    var bar = document.getElementById("omnet-content-note");
    if (!bar){
      bar = document.createElement("div");
      bar.id = "omnet-content-note";
      bar.className = "omnet-content-note notranslate";
      bar.setAttribute("translate","no");
      document.body.insertBefore(bar, document.body.firstChild);
    }
    var u = ui(code);
    bar.innerHTML = '<span>'+u.content+'</span>'
      + '<button id="omnet-do-translate">'+u.translate+'</button>'
      + '<button class="omnet-content-dismiss" id="omnet-skip-translate">'+u.dismiss+'</button>';
    bar.classList.add("show");
    document.getElementById("omnet-do-translate").onclick = function(){
      loadGoogle(code); bar.classList.remove("show");
    };
    document.getElementById("omnet-skip-translate").onclick = function(){ bar.classList.remove("show"); };
  }
  function hideContentNote(){
    var bar = document.getElementById("omnet-content-note");
    if (bar) bar.classList.remove("show");
  }

  /* ---------- Master setter ---------- */
  function setLanguage(code, opts){
    opts = opts || {};
    if (!byCode(code)) code = DEFAULT;
    save(code);
    applyDir(code);
    if (code === DEFAULT) { clearGoogle(); }
    applyTo(code);
    refreshSwitchers(code);
    if (!opts.silent) showContentNote(code);
    document.dispatchEvent(new CustomEvent("omnet:langchange", { detail:{ code: code } }));
  }
  window.OMNET_setLanguage = setLanguage; // public hook

  /* ---------- Suggestion banner ---------- */
  function maybeSuggest(){
    if (getSaved()) return;                 // user already chose
    try { if (localStorage.getItem(DISMISS_KEY)) return; } catch(e){}
    var code = detectBrowser();
    if (!code) return;
    var l = byCode(code), u = ui(code);
    var bar = document.createElement("div");
    bar.className = "omnet-lang-suggest notranslate";
    bar.setAttribute("translate","no");
    bar.setAttribute("role","dialog");
    bar.setAttribute("aria-live","polite");
    bar.innerHTML =
      '<i class="ri-translate-2 omnet-suggest-icon"></i>'
      + '<div class="omnet-suggest-text">'+u.suggest.replace("{lang}", l.native)+'</div>'
      + '<div class="omnet-suggest-actions">'
      + '<button class="omnet-suggest-yes">'+u.yes.replace("{lang}", l.native)+'</button>'
      + '<button class="omnet-suggest-no">'+u.no+'</button>'
      + '</div>';
    document.body.appendChild(bar);
    requestAnimationFrame(function(){ setTimeout(function(){ bar.classList.add("show"); }, 400); });
    bar.querySelector(".omnet-suggest-yes").onclick = function(){
      setLanguage(code); bar.classList.remove("show"); setTimeout(function(){ bar.remove(); }, 300);
    };
    bar.querySelector(".omnet-suggest-no").onclick = function(){
      try { localStorage.setItem(DISMISS_KEY, "1"); } catch(e){}
      bar.classList.remove("show"); setTimeout(function(){ bar.remove(); }, 300);
    };
  }

  /* ---------- Inject switchers into header + mobile nav ---------- */
  function injectSwitchers(current){
    var cta = document.querySelector(".header-cta");
    if (cta && !cta.querySelector(".omnet-lang")){
      cta.insertBefore(buildDesktop(current), cta.firstChild);
    } else if (!cta){
      // Fallback: pages without .header-cta (e.g. 404, register) — drop into header
      var hdr = document.querySelector("header .header-inner") || document.querySelector("header");
      if (hdr && !hdr.querySelector(".omnet-lang")) hdr.appendChild(buildDesktop(current));
    }
    var mob = document.querySelector(".mobile-nav-inner");
    if (mob && !mob.querySelector(".omnet-lang-mobile")){
      mob.insertBefore(buildMobile(current), mob.firstChild);
    }
  }

  /* ---------- Init ---------- */
  function init(){
    var current = getSaved() || DEFAULT;
    injectSwitchers(current);
    if (current !== DEFAULT){
      applyDir(current);
      applyTo(current);
      refreshSwitchers(current);
      showContentNote(current);
    }
    maybeSuggest();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
