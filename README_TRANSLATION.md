# OMNET IT — Multi-Language Translation: Implementation & SEO Strategy

This document explains the translation feature that has been added to the
OMNET IT website (`www.omnetit.in`), how to operate and extend it, and —
just as importantly — what it does **not** do, so you can plan the next
phase with clear expectations.

---

## 1. What was built

A **two-tier translation system** designed specifically for a static,
build-pipeline-free site of ~72 hand-written HTML pages hosted on GitHub
Pages.

### Tier 1 — Self-hosted dictionary (primary, default, always on)

A small JavaScript engine (`i18n.js`) plus a stylesheet (`i18n.css`) that:

- Adds a **language switcher** to every page — a globe pill in the header
  on desktop, and a native dropdown inside the mobile menu. Both
  self-inject via JS, so no per-page header surgery was required.
- Instantly translates all **shared interface "chrome"** — navigation,
  dropdown menus, header CTAs, footer headings and links, common buttons,
  form labels and placeholders — across all **12 launch languages**:
  English, Hindi, Urdu, Nepali, Arabic, French, Spanish, German,
  Portuguese, Russian, Chinese, Japanese.
- **Detects the browser language** and shows a dismissible suggestion
  banner ("View this site in हिन्दी?") while keeping **English as the
  default** for everyone else.
- **Persists** the visitor's choice in `localStorage` (`omnet_lang`) so it
  survives page navigation and repeat visits.
- Handles **right-to-left** layout automatically for Arabic and Urdu
  (`<html dir="rtl">`), while keeping Latin brand marks readable.
- **Preserves brand and product names** verbatim — "OMNET", "Microsoft
  365", "Google Workspace", "Zoho", "CERT-In", "DevOps", "AMC" etc. are
  intentionally never translated.
- Costs **nothing for English visitors** — no network calls, no third-party
  scripts; the engine only does work once another language is chosen.

This tier is reliable, fast, fully owned by you, and offline-capable. It is
the part you should rely on.

### Tier 2 — Google Translate bridge (optional, opt-in, body copy only)

Tier 1 translates the interface, but the **unique body copy** on each of the
72 pages is not in the dictionary (hand-translating every paragraph on every
page in 11 languages is not maintainable). For visitors who want the full
page translated anyway, the switcher can lazily load **Google Website
Translator** to machine-translate the remaining body text on demand. Its
default banner and branding are hidden via CSS so it stays on-brand.

> **Important caveat — read before relying on Tier 2.** Google's free
> *Website Translator* widget is effectively **deprecated**: Google stopped
> offering it to new sites around 2019 and provides no support or SLA. It
> may degrade or stop working at any time, it adds a third-party dependency,
> and — critically — **it provides zero SEO value** (see §2). Treat Tier 2
> as a temporary convenience for human readers, **not** as your multilingual
> strategy. The real solution for full-page translation + SEO is §3.

### Files added

| File | Purpose |
|------|---------|
| `i18n.css` | Switcher styling, RTL overrides, Google-chrome hiding |
| `i18n.js` | The engine: dictionary, switcher, detection, RTL, bridge |
| `inject_i18n.py` | One-shot, idempotent script that added the two `<link>`/`<script>` includes to all 72 pages (kept for re-runs after future page edits) |

Each page now has `<link rel="stylesheet" href="i18n.css">` before
`</head>` and `<script src="i18n.js" defer></script>` before `</body>`.

---

## 2. SEO analysis — the honest answer

### Is automatic / client-side translation sufficient for SEO?

**No.** This is the single most important point in this document.

Both Tier 1 (JS dictionary) and Tier 2 (Google widget) translate **in the
visitor's browser, after the page loads**. Search engines index the
**original English HTML** that the server delivers. From Google's point of
view there is still exactly **one English page per URL** — the Hindi,
Arabic, or Spanish versions don't exist as crawlable, indexable documents.

So the current feature is excellent for **user experience, accessibility,
and engagement** — a Hindi-speaking visitor who lands on your English page
can immediately read it — but it does **not** by itself make you rank for
Hindi, Arabic, or Spanish queries, and it won't get translated pages into
Google's index. To actually capture international **search traffic**, you
need real, separate, server-delivered language pages (§3).

### Should dedicated language URLs be created?

**Yes — that is the requirement for multilingual SEO.** Each language needs
its own crawlable URL with the translated content present in the HTML *as
delivered*. The standard, Google-recommended options:

- **Subdirectories** — `omnetit.in/hi/`, `omnetit.in/ar/` *(recommended for
  you)*. Easiest on GitHub Pages, inherits domain authority, no extra DNS.
- Subdomains — `hi.omnetit.in/`. More setup, splits authority somewhat.
- ccTLDs — `omnetit.co.uk`. Strongest geo-signal, highest cost; overkill
  here since your split is by *language*, not country.

For OMNET, **subdirectories** are the clear choice.

### hreflang best practices

`hreflang` tells Google which language/region version to show which user. It
only works once the dedicated URLs (above) actually exist. Rules that matter:

1. **Every language version lists every version, including itself.** The set
   of `hreflang` links must be identical and reciprocal across all variants
   — if `/hi/` points to `/ar/`, then `/ar/` must point back to `/hi/`.
2. **Always include `x-default`** for the fallback/language-selector page
   (your English homepage is the natural `x-default`).
3. **Use correct codes** — language `hi`, `ar`, `fr`… optionally with region
   (`en-IN`, `pt-BR`, `zh-CN`). Use `zh-Hans` for Simplified Chinese.
4. **Use absolute URLs** and keep them consistent with your `canonical`
   tags. Each language page should be **self-canonical** (canonical points
   to itself, *not* to the English page — a common, ranking-killing mistake).
5. Place them in `<head>` (you already do this for `en-IN` and `x-default`
   on the homepage) **or** in the XML sitemap; don't duplicate across both.

Example for the homepage set once `/hi/` and `/ar/` exist:

```html
<link rel="alternate" hreflang="en-IN"     href="https://www.omnetit.in/" />
<link rel="alternate" hreflang="hi"        href="https://www.omnetit.in/hi/" />
<link rel="alternate" hreflang="ar"        href="https://www.omnetit.in/ar/" />
<link rel="alternate" hreflang="x-default" href="https://www.omnetit.in/" />
```

### Multilingual indexing best practices

- **One language per URL.** Don't mix languages on a page; don't swap
  language via cookie/JS at the same URL (Google sees only one version).
- **Translate metadata too** — `<title>`, `<meta description>`, Open Graph,
  image `alt`, and `<html lang="…">` per page, not just visible copy.
- **Localise the XML sitemap** — list every language URL. Your current
  `sitemap.xml` (97 lines) covers the English pages; the build in §3 should
  emit entries for each `/xx/` page, ideally with `xhtml:link` hreflang
  annotations.
- **Internal links** should point within the same language (Hindi pages link
  to Hindi pages).
- After launch, submit the sitemap in **Google Search Console** and watch
  the *Pages* and *International Targeting* reports for hreflang errors.
- Keep `robots.txt` allowing `/hi/`, `/ar/`, … (your current
  `Allow: /` already does).

---

## 3. Recommended long-term strategy: a static i18n build pipeline

This is the proper, SEO-complete solution, and it fits your stack — you're
comfortable in Node.js, and the site is already static.

**The idea:** keep authoring in English, then *generate* a full translated
copy of every page into `/hi/`, `/ar/`, etc. at build time, so each language
is real HTML on disk that Google can crawl.

### Suggested architecture

1. **Source of truth:** keep the English `.html` files as templates.
2. **Extraction:** a Node script walks each page, extracts translatable text
   nodes + key attributes (`title`, `meta description`, `alt`,
   `placeholder`), and writes them to per-page JSON (`content/about.en.json`).
   Reuse the same skip rules already proven in `i18n.js` (skip
   `script`/`style`/`code`/`.notranslate`, preserve brand names).
3. **Translation:** fill `about.hi.json`, `about.ar.json`, … Three options,
   best-first:
   - **Professional/human review** for the ~10 highest-value pages
     (homepage, top services, contact). Highest quality, best conversion.
   - **LLM translation** (e.g. the Claude API — you already use it
     elsewhere) for the long tail, with a glossary that pins brand/product
     terms and your preferred renderings of "Managed IT", "AMC", etc. A
     review pass on the output is strongly advised.
   - Machine-translation API (Google Cloud Translation v3, DeepL) as a
     bulk baseline.
   Store translations in version control so they're diffable and reusable.
4. **Generation:** a Node build (a ~150-line script, or
   [`eleventy`](https://www.11ty.dev/) which has first-class i18n) renders
   `English template + xx.json → /xx/page.html`, and injects the correct
   per-page `hreflang` + self-canonical + translated `<title>`/meta and
   `<html lang dir>`.
5. **Sitemap:** emit `sitemap.xml` with all language URLs and `xhtml:link`
   hreflang annotations.
6. **Deploy:** commit the generated tree; GitHub Pages serves it. A GitHub
   Action can run the build on push.

### Migration path (no big-bang needed)

- **Now → live today:** Tier 1 + Tier 2 (done) give every visitor an
  immediately usable translated experience.
- **Phase 1:** stand up the pipeline; generate the **homepage + top ~10
  pages** in your 3–4 highest-demand languages (likely Hindi, plus your
  strongest export markets). Add hreflang. Measure in Search Console.
- **Phase 2:** expand to all pages / all languages as the data justifies it.
- **Phase 3:** retire the Tier 2 Google bridge once real pages exist; keep
  the Tier 1 switcher as the navigation between language versions.

The client-side system and the build pipeline are **complementary**, not
throwaway: the switcher UI, language list, RTL handling, brand glossary, and
detection logic all carry straight over.

---

## 4. How to extend the feature (maintainability)

### Add a new language

In `i18n.js`:

1. Add one entry to the `LANGS` array (code, native name, English name, flag
   emoji, `dir`). RTL languages just set `dir: "rtl"` — no other change.
2. Add a matching block to the `DICT` object: copy the English keys and
   provide translations. Untranslated keys safely fall back to English.
3. Optionally add the language's strings to the small `UI` micro-copy object
   (switcher label, suggestion text). That's it — the switcher, detection,
   persistence, and RTL all pick it up automatically.

### Add or change a UI string

Add the **exact English string** as a key in each language block of `DICT`.
The engine matches on exact, trimmed text, so the key must match the visible
English text character-for-character.

### After editing pages

If you add new HTML pages later, re-run `python3 inject_i18n.py` — it's
idempotent and will only touch pages missing the includes.

---

## 5. Additional recommendations for global accessibility

Beyond language, a few changes make OMNET genuinely usable for international
and assistive-tech visitors:

- **Number / currency / date formatting** — show prices and dates in
  locale-aware formats where shown (₹ vs international notation).
- **Phone numbers in E.164** — display the country code (`+91 …`) so
  overseas visitors can dial.
- **`lang` attributes on inline foreign text** — the engine already sets
  `<html lang>`; for any permanently mixed-language snippets, mark them so
  screen readers pronounce them correctly.
- **Accessible switcher** — the switcher already uses `aria-label`s and a
  native `<select>` on mobile; keep that pattern. Ensure it's reachable by
  keyboard (Tab/Enter) — verify after any header redesign.
- **Contrast & font fallbacks** — confirm your webfont stack includes
  fallbacks that cover Devanagari, Arabic, Cyrillic, and CJK glyphs so
  translated text never renders as tofu (□). System fonts usually cover
  these; spot-check Hindi/Arabic/Chinese after launch.
- **Performance for distant visitors** — you're on GitHub Pages' CDN, which
  is global; keep images compressed and lazy-loaded so first paint stays
  fast on slower international connections.
- **Time-zone clarity** — if support hours are shown, label them with the
  zone (IST) so overseas clients aren't confused.

---

## 6. Quick test checklist (already verified)

The engine was tested headlessly (switcher injection on desktop + mobile,
nav/heading/label/placeholder translation, brand-name preservation, Arabic
RTL, exact English restore, and persistence — all passing). Before you
publish, do a 2-minute manual pass:

- [ ] Open the homepage; confirm the globe switcher appears in the header.
- [ ] Pick Hindi → nav, footer, buttons, form labels translate; OMNET /
      Microsoft 365 stay in English.
- [ ] Pick Arabic → layout flips to RTL and reads correctly.
- [ ] Reload → your language choice is remembered.
- [ ] Shrink to mobile width → the dropdown appears inside the mobile menu.
- [ ] Set your browser to a non-English language → the suggestion banner
      appears and is dismissible.
- [ ] (Optional) Enable the content bridge → body paragraphs translate.

---

### TL;DR

- ✅ **Done now:** professional 12-language switcher on every page, browser
  detection, RTL, brand preservation, instant UI translation, optional
  Google body-translation — great for **UX and accessibility**.
- ⚠️ **Not covered by client-side translation:** **SEO / search rankings**
  in other languages. For that you need **real `/hi/`, `/ar/` … pages**.
- 🎯 **Next step:** stand up the Node build pipeline (§3) for your top pages
  and top languages, add reciprocal `hreflang` + self-canonical, submit the
  localised sitemap in Search Console.
