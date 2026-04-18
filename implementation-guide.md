# OMNET IT — Implementation Guide

This bundle contains 20 files that fix the issues raised in your website audit. Below is a phased deployment plan: **deploy in order**, test each phase on a staging branch before promoting, and don't skip the backup step.

---

## 0. Pre-flight checklist (do this first, no exceptions)

1. **Back up the live site.**
   ```bash
   cd ~/your-repo
   git checkout -b backup-pre-audit-fixes
   git push origin backup-pre-audit-fixes
   ```
2. **Make a working branch.**
   ```bash
   git checkout main
   git checkout -b audit-fixes
   ```
3. **Confirm where the site is hosted.** Your repo has a `CNAME` file → it's GitHub Pages today. That matters because GitHub Pages **cannot set custom HTTP headers** — see Phase 4.
4. **Sign up for the two free third-party services we'll need:**
   - **reCAPTCHA v3** — https://www.google.com/recaptcha/admin/create (pick v3, add `omnetit.in` and `www.omnetit.in`). Save the **site key** and **secret key**.
   - **Cloudflare** (free plan) — required for headers if you stay on GitHub Pages. Add `omnetit.in`, change nameservers at your registrar, and switch the orange cloud ON for `www`.

---

## 1. File map — what goes where

```
your-repo/
├── (existing files unchanged)
├── layout-fixes.css          ← NEW · loaded after design-system.css
├── responsive-design.css     ← NEW · loaded LAST
├── form-validation.js        ← NEW · referenced from every page with a form
├── email-obfuscation.js      ← NEW · referenced from every page
├── about.html                ← REPLACE with about-page.html (rename on copy)
├── dell-laptops-delhi-ncr.html      ← NEW
├── hp-laptops-servers-delhi-ncr.html ← NEW (rename hp-products-page.html)
├── lenovo-thinkpad-delhi-ncr.html    ← NEW (rename lenovo-products-page.html)
├── apple-macbook-delhi-ncr.html      ← NEW (rename apple-products-page.html)
├── chromebooks-delhi-ncr.html        ← NEW
├── microsoft-365-delhi-ncr.html      ← NEW
├── google-workspace-delhi-ncr.html   ← NEW
├── robots.txt                ← REPLACE the existing one
├── sitemap.xml               ← REPLACE the existing one
└── _headers                  ← NEW · ONLY if migrating to Netlify/Cloudflare Pages
```

When copying landing pages from this bundle, **rename them on the way in** so the URL slug matches what's in `sitemap.xml` and the meta `<link rel="canonical">`:

| Bundle filename                 | Repo filename                          |
|---------------------------------|----------------------------------------|
| `dell-laptops-page.html`        | `dell-laptops-delhi-ncr.html`          |
| `hp-products-page.html`         | `hp-laptops-servers-delhi-ncr.html`    |
| `lenovo-products-page.html`     | `lenovo-thinkpad-delhi-ncr.html`       |
| `apple-products-page.html`      | `apple-macbook-delhi-ncr.html`         |
| `chromebooks-page.html`         | `chromebooks-delhi-ncr.html`           |
| `microsoft-365-page.html`       | `microsoft-365-delhi-ncr.html`         |
| `google-workspace-page.html`    | `google-workspace-delhi-ncr.html`      |
| `about-page.html`               | `about.html` (overwrite existing)      |

---

## 2. Phase 1 — Layout fixes (deploy first; lowest risk)

### Step 2.1 — Add the two CSS files

Copy `layout-fixes.css` and `responsive-design.css` into the repo root.

### Step 2.2 — Link them on every page

In every `.html` file, find the existing `<link rel="stylesheet" href="design-system.css" />` line and add the two new files **immediately after** it:

```html
<link rel="stylesheet" href="style.css" />
<link rel="stylesheet" href="design-system.css" />
<link rel="stylesheet" href="layout-fixes.css" />        <!-- NEW -->
<link rel="stylesheet" href="responsive-design.css" />   <!-- NEW -->
<link rel="stylesheet" href="mobile-fixes.css" />
<link rel="stylesheet" href="mobile-redesign.css" />
```

Use this one-liner from the repo root:
```bash
# macOS
find . -name "*.html" -not -path "./node_modules/*" -exec \
  sed -i '' 's|<link rel="stylesheet" href="design-system.css" />|<link rel="stylesheet" href="design-system.css" />\n<link rel="stylesheet" href="layout-fixes.css" />\n<link rel="stylesheet" href="responsive-design.css" />|' {} +

# Linux
find . -name "*.html" -not -path "./node_modules/*" -exec \
  sed -i 's|<link rel="stylesheet" href="design-system.css" />|<link rel="stylesheet" href="design-system.css" />\n<link rel="stylesheet" href="layout-fixes.css" />\n<link rel="stylesheet" href="responsive-design.css" />|' {} +
```

### Step 2.3 — Visual QA

Open these on desktop, tablet, and phone:
- `index.html` · `about.html` · `services.html` · `contact.html` · `shop.html`

Look for:
- ✓ No huge blank white stripes between sections
- ✓ Hero copy not hidden behind sticky header on mobile
- ✓ Footer doesn't have 280 px of empty space below
- ✓ Forms don't overflow the screen on phone

If a specific page still looks bad, it has hard-coded inline styles that override the CSS. Inspect the page in DevTools and add a more-specific override to the bottom of `layout-fixes.css`.

### Step 2.4 — Commit + deploy
```bash
git add layout-fixes.css responsive-design.css *.html
git commit -m "Phase 1: layout + responsive fixes"
git push origin audit-fixes
```
Merge to `main` once tested.

---

## 3. Phase 2 — Form security & email obfuscation

### Step 3.1 — Add the two JS files
Copy `form-validation.js` and `email-obfuscation.js` into the repo root.

### Step 3.2 — Edit the two config placeholders

**`form-validation.js`, line ~26:**
```javascript
RECAPTCHA_SITE_KEY: 'YOUR_RECAPTCHA_SITE_KEY',  // ← paste your reCAPTCHA v3 site key
```

**`form-validation.js`, line ~28:**
```javascript
SAME_ORIGIN_HOSTS: ['www.omnetit.in', 'omnetit.in', 'localhost', '127.0.0.1'],
```
Add any additional hosts (staging URL etc.) here.

### Step 3.3 — Add reCAPTCHA + scripts to every page

In every `.html` file, just before `</head>`, add:
```html
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_RECAPTCHA_SITE_KEY" defer></script>
<script src="form-validation.js" defer></script>
<script src="email-obfuscation.js" defer></script>
```
Replace `YOUR_RECAPTCHA_SITE_KEY` with your actual key.

### Step 3.4 — Replace the existing forms

Open `security-fixes.html`. It contains 4 forms ready to drop in:
- `contactForm` — paste into `contact.html` (replace existing `<form id="...">`)
- `callbackForm` — paste into the callback modal block in every page (or load from a single include)
- `supportTicketForm` — paste into the support-ticket modal
- `messageForm` — paste into the leave-a-message widget

Each replacement form already has the right hidden inputs (`access_key`, `botcheck`, `csrf_token`, `form_loaded_at`, `recaptcha_token`) and the `class="omnet-secure-form"` that wires it to the validation library.

### Step 3.5 — Replace plain email addresses with obfuscated spans

Wherever your HTML has `hello@omnetit.in` as visible text or inside a `mailto:` link, replace it with:

```html
<span class="omnet-email"
      data-user="aGVsbG8="
      data-domain="b21uZXRpdC5pbg==">
  <span class="email-placeholder">[ click to reveal email ]</span>
</span>
```

Bulk replace from the repo root:
```bash
# Quick audit — list every page that still exposes the address in plain text
grep -l "hello@omnetit\.in" *.html | grep -v "\.bak"
```

You'll get back a list of pages still leaking the address. Edit each by hand — automated `sed` on this is risky because the address appears inside `<script type="application/ld+json">` blocks too, where you must keep it as plain text.

### Step 3.6 — Configure Web3Forms domain restriction

Log in to https://web3forms.com → your form (access key `2af0c0f5-…`) → **Settings** → enable **Restrict by Domain** and add `omnetit.in` and `www.omnetit.in`. This is your real anti-CSRF defence — the in-page nonce just adds friction.

### Step 3.7 — Test every form

For each form, confirm:
- ✓ Submitting with empty required fields shows red errors
- ✓ Submitting in under 3 seconds shows the "fill more carefully" message
- ✓ Submitting 4 times in 10 minutes triggers the rate-limit message
- ✓ A real submission lands in your Web3Forms inbox
- ✓ Clicking a `<span class="omnet-email">` opens the mail client

### Step 3.8 — Commit
```bash
git add form-validation.js email-obfuscation.js *.html
git commit -m "Phase 2: form security + reCAPTCHA + email obfuscation"
git push
```

---

## 4. Phase 3 — Security headers (the GitHub Pages problem)

### The problem
GitHub Pages serves only static files; it cannot set custom HTTP response headers. CSP, HSTS, X-Frame-Options etc. **must** come from the response header, not from a `<meta>` tag (browsers ignore most of them in meta form). Your three options:

### Option A — Cloudflare in front of GitHub Pages (recommended; free; ~30 min)

1. Sign up at cloudflare.com, add `omnetit.in`, switch nameservers at your registrar.
2. Once the zone is active, go to **Rules → Transform Rules → Modify Response Header**.
3. Click **Create rule**. Match: `Hostname` equals `www.omnetit.in`.
4. For each header in `security-headers.conf` → "Cloudflare Transform Rules (UI-driven)" section, add a `Set static header` action.
5. Enable **SSL/TLS → Edge Certificates → Always Use HTTPS** + **HSTS** (12-month max-age).
6. Done — every response now ships the headers.

### Option B — Migrate to Cloudflare Pages or Netlify (~15 min, slightly disruptive)

1. Connect your GitHub repo to Cloudflare Pages (or Netlify).
2. Build command: leave empty (static site). Output dir: `/`.
3. Drop `_headers` (the file shown in `security-headers.conf` under "Netlify / Cloudflare Pages") into the repo root.
4. Update DNS: point `www` to the new platform; remove the GitHub Pages CNAME.
5. The headers ship from the next deploy.

### Option C — Host on your own VPS (Nginx/Apache)

Use the Nginx or Apache block from `security-headers.conf` directly in your server config.

### Test

Once deployed, run:
```bash
curl -I https://www.omnetit.in | grep -i "strict-transport\|content-security\|x-frame"
```

Or use https://securityheaders.com — aim for **A or A+**.

---

## 5. Phase 4 — SEO meta tags & schema

### Step 5.1 — Update homepage meta

Open `index.html`. Find the existing `<title>` … `</script>` (LD-JSON) block in `<head>`. Replace it with the **`## HOMEPAGE ##`** block from `seo-meta-tags.html` plus the `## SUPPORTING TAGS ##` block at the bottom.

### Step 5.2 — Update About page

Replace the entire `about.html` with the new `about-page.html` from the bundle.

### Step 5.3 — Add canonical + meta to every other page

For every existing service / location / blog page, copy the relevant block from `seo-meta-tags.html`. **Always update `og:url` and the canonical link** to match the page's actual URL.

### Step 5.4 — Drop in JSON-LD schema

`schema-markup.html` contains ready-to-use blocks for:
- LocalBusiness (one per site, paste into `index.html` only)
- Service (one per service page)
- Product (already inside the new landing pages)
- FAQ (already inside the new landing pages and in `faq-section.html`)
- BreadcrumbList (paste into every non-homepage)

Each block is wrapped in `<!-- ## NAME ## -->` markers. Copy what you need into the relevant page's `<head>`.

### Step 5.5 — Add the FAQ section

`faq-section.html` contains a 10-question FAQ block with both visible HTML and matching JSON-LD `FAQPage` schema. Paste it into `index.html` (just before `<footer>`) or any page where you want the FAQ visible. **One FAQPage per page maximum** — Google ignores duplicates.

### Step 5.6 — Validate

Use these free tools:
- https://search.google.com/test/rich-results — paste each landing-page URL
- https://validator.schema.org — paste the JSON-LD blocks
- https://search.google.com/search-console — submit `sitemap.xml`

---

## 6. Phase 5 — Add the new pages

### Step 6.1 — Copy the 7 new pages
Copy **with the renamed filenames** (see the table in section 1):

```
about.html                          ← overwrite existing
dell-laptops-delhi-ncr.html
hp-laptops-servers-delhi-ncr.html
lenovo-thinkpad-delhi-ncr.html
apple-macbook-delhi-ncr.html
chromebooks-delhi-ncr.html
microsoft-365-delhi-ncr.html
google-workspace-delhi-ncr.html
```

### Step 6.2 — Wire up navigation

Each landing page links back to `pricing.html`, `contact.html`, etc. but is **not yet linked from the rest of the site**. Add a "Products" or "Brands" dropdown to your main nav in `style.css` / page headers, with entries pointing to the 7 new pages. The new pages also link to each other in the footer block — that creates a healthy internal-linking cluster for SEO.

### Step 6.3 — Update `sitemap.xml`

The bundled `sitemap.xml` already lists the 7 new URLs. Just replace the existing `sitemap.xml` in the repo root.

### Step 6.4 — Update `robots.txt`

The bundled `robots.txt` is your existing one with explicit `Sitemap:` line and one extra `Disallow:` for `/cdn-cgi/`. Replace the existing file.

### Step 6.5 — Submit to Google Search Console
- Re-submit `sitemap.xml`
- Use **URL inspection** on each new landing page → request indexing

---

## 7. Phase 6 — Performance (do this last, lowest urgency)

Already shipped via the meta tags and CSS:
- ✓ `preconnect` to Web3Forms, GA, Remixicon CDN, Google Fonts
- ✓ `dns-prefetch` to Google + gstatic
- ✓ `loading="lazy"` should be added to every below-the-fold `<img>` — search-replace:
  ```bash
  # Add lazy loading to all images that don't already have it
  # (manual review recommended — don't lazy-load above-the-fold hero images)
  grep -rln '<img ' *.html | xargs -I{} grep -L 'loading=' {}
  ```
- ✓ Consider minifying `style.css` + `script.js` — they're 71 KB and 15 KB unminified. Use https://cssnano.co / https://terser.org or a build step.
- ✓ Move the GA `<script async>` after critical content if Lighthouse complains.
- ✓ Add `width=` and `height=` to every `<img>` to prevent CLS (cumulative layout shift) — biggest performance wins for typical Lighthouse audits.

---

## 8. What's still your responsibility (we couldn't automate)

1. **Generate proper `og-banner.png`** if the existing one is generic. 1200×630 PNG with the OMNET logo and a clean tagline.
2. **Take real photos** for the landing pages (showroom, team, customer sites) and replace stock imagery on the new pages.
3. **Write 2-3 customer testimonials** with permission and add them with `Review` schema (see `schema-markup.html`).
4. **Submit DPDP Act 2023 compliance** — the consent checkbox and Privacy Policy link are in place but you still need a documented data-processing register internally.
5. **Rotate the Web3Forms access key** quarterly and update it in every form (it's the same key in all 4 forms; one search-replace).

---

## 9. Quick reference — the 20 deliverables in this bundle

| # | File                       | Purpose                                                   |
|---|----------------------------|-----------------------------------------------------------|
| 1 | `security-fixes.html`      | All 4 hardened forms — drop-in replacements              |
| 2 | `security-headers.conf`    | Header configs for Nginx, Apache, Netlify, Cloudflare    |
| 3 | `layout-fixes.css`         | Kills excessive whitespace, fixes typography             |
| 4 | `responsive-design.css`    | Breakpoints 1024 / 768 / 540 / 380 px                    |
| 5 | `seo-meta-tags.html`       | Per-page-type meta tag templates                         |
| 6 | `schema-markup.html`       | LocalBusiness, Service, Product, FAQ, Breadcrumb JSON-LD |
| 7 | `about-page.html`          | New About page with provided copy                        |
| 8 | `dell-laptops-page.html`   | Dell Latitude / Precision / XPS / Vostro landing         |
| 9 | `hp-products-page.html`    | HP EliteBook / ProBook / ZBook / ProLiant landing        |
| 10 | `lenovo-products-page.html` | Lenovo ThinkPad / ThinkSystem landing                  |
| 11 | `apple-products-page.html` | Apple MacBook / Mac Mini / iMac landing                 |
| 12 | `chromebooks-page.html`    | HP / Acer / ASUS / Lenovo Chromebooks + Chrome Enterprise |
| 13 | `microsoft-365-page.html`  | M365 Business / Enterprise + migration services         |
| 14 | `google-workspace-page.html` | Workspace Starter / Standard / Plus + migration       |
| 15 | `robots.txt`               | Crawler directives + sitemap reference                   |
| 16 | `sitemap.xml`              | All pages + new landing pages                            |
| 17 | `faq-section.html`         | 10-question FAQ + matching FAQPage schema                |
| 18 | `email-obfuscation.js`     | Click-to-reveal email reconstruction                     |
| 19 | `form-validation.js`       | Validation, sanitisation, rate-limit, CSRF, reCAPTCHA    |
| 20 | `implementation-guide.md`  | This file                                                |

---

## 10. Questions to ask yourselves before going live

- ☐ Have you backed up the live site to a separate branch?
- ☐ Have you got a reCAPTCHA v3 site key + secret key from Google?
- ☐ Have you decided where to host (GitHub Pages + Cloudflare, or a move)?
- ☐ Have you set Web3Forms "Restrict by Domain" on the dashboard?
- ☐ Have you got a real `og-banner.png` (1200×630)?
- ☐ Have you tested every form on a staging URL?
- ☐ Have you added the new pages to your main nav?
- ☐ Have you submitted the new sitemap to Google Search Console?

If all 8 are ticked, you're ready to merge to `main`. Good luck.
