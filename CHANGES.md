# OMNET IT — Change Log

**Delivery date:** 16 May 2026
**Previous state:** 134 files (102 HTML), heavily Delhi-NCR focused, email hidden behind obfuscator
**New state:** 78 production files (66 HTML), India & Global positioning, visible `info@omnetit.in` throughout

---

## 🧮 At a glance

| Metric | Before | After |
|---|---:|---:|
| Total files in repo root | 134 | 78 |
| HTML files | 102 | 66 |
| Files with `info@omnetit.in` (visible) | 0 | 59 / 66 |
| Files with `hello@omnetit.in` | 102 (1,219 instances) | 0 |
| Files with `format-detection: telephone=no` (iOS click-to-call breaker) | 11 | 0 |
| Files loading the email-obfuscation script | 18 | 0 |
| Broken internal `.html` links | 31 targets / 100+ links | **0** |
| City-targeted SEO landing pages | 38 | 5 (flagships kept) |
| Service pages | 30 | 39 (+9 new) |
| Files with "Delhi NCR" left | every page | 6 (5 city pages + contact office) |

---

## 1. 🗑️ Files deleted (45 total)

### Bucket 1 — Truly orphaned (12)
`omnet-audit-fixes.zip` (163KB internal ZIP) · `og-banner.html` · `og-banner-instructions.txt` · `omnet-mobile-redesign.html` · `partial-breadcrumb-schema.html` · `partial-internal-link-cluster.html` · `partial-sticky-mobile-cta.html` · `schema-markup.html` · `seo-meta-tags.html` · `security-fixes.html` · `faq-section.html` · `mobile-redesign.css`

### Bucket 3 — 33 city-specific SEO pages (Decision A2 — kept 5 flagships)
**Deleted:** all `it-support-*` city pages except `it-support-noida/delhi/gurugram.html`; all `managed-it-services-*` except `-noida/-delhi`; every Noida-specific repair/printer/Tally/etc. landing; every `*-delhi-ncr.html` blog page.
**Kept (5):** `it-support-noida.html`, `it-support-delhi.html`, `it-support-gurugram.html`, `managed-it-services-noida.html`, `managed-it-services-delhi.html` — these continue to rank for local searches.

### Files removed during rebuild
- `shop.html` (153 KB) — replaced with self-contained 64 KB rebuild
- `shop.js` — folded into the new shop.html (no external JS for shop)
- `404.html` (70 KB) — replaced with 6.5 KB lightweight branded version

## 2. 📦 Files moved into `/docs/` (10)
Dev documentation no longer ships at the site root:
`README.md` · `IMPLEMENTATION_NOTES.md` · `SEO-CONTENT-REFERENCE.md` · `SEO-GUIDE.md` · `UPLOAD-GUIDE.md` · `content-implementation-guide.md` · `content-master-kit.md` · `implementation-guide.md` · `google-ads-keywords.csv` · `security-headers.conf`

These are blocked from crawlers via `robots.txt` (Disallow `/docs/`).

## 3. ✨ Files created (12)

### 9 new service stub pages (Part 2 of brief)
`custom-software.html` · `website-design.html` · `app-development.html` · `email-licensing.html` · `email-migration.html` · `google-workspace.html` · `microsoft-365.html` · `zoho-suite.html` · `professional-email.html`

Each has: proper `<title>` + meta description + keywords + canonical, OG/Twitter cards, JSON-LD `Service` schema with `areaServed: ["India","Global"]`, hero, 6-card feature grid, tech stack strip, Why-OMNET grid, CTA section, and the unified site nav including the two new dropdowns.

### Rebuilt from scratch
- **`shop.html`** — full Part 5 rebuild (see section 6 below)
- **`404.html`** — branded gradient lightweight page (down from 70KB → 6.5KB)
- **`sitemap.xml`** — regenerated from live file list, 65 URLs across 5 tiers
- **`robots.txt`** — rewritten, removes disallows for deleted files, adds `/docs/` block

---

## 4. 🌍 Bulk find-and-replace applied to all 66 HTML pages

Run as a Python script (`bulk_transform.py`, included in the ZIP for transparency).

### Universal changes (every page)
- `hello@omnetit.in` → `info@omnetit.in` (1,219 replacements)
- `aGVsbG8=` → `aW5mbw==` (base64 of the email used by the old obfuscator)
- `<meta name="format-detection" content="telephone=no">` → `…telephone=yes` (iOS click-to-call now works)
- `<script src="email-obfuscation.js">` tags — removed
- `<span class="omnet-email" data-user="..." data-domain="...">[ click to reveal ]</span>` blocks — replaced with plain `<a href="mailto:info@omnetit.in">info@omnetit.in</a>`
- Excessive whitespace patterns (`<br><br><br>+`, `<p>&nbsp;</p>`, empty `<div></div>`) — stripped

### Applied to non-city pages (everything except the 5 flagship city pages and contact.html)
- "Managed IT Services Delhi NCR" → "Managed IT Services Across India"
- "500+ Delhi NCR businesses" → "500+ businesses across India"
- "4-hour onsite anywhere in NCR" → "Remote support nationwide · Onsite available pan India"
- "across Delhi, Noida, Gurugram, Ghaziabad and Faridabad" → "across India and internationally"
- "Delhi NCR" → "India" (in titles, descriptions, og/twitter)
- `geo.region: IN-DL` → `geo.region: IN`
- `geo.placename: New Delhi, Delhi NCR` → `geo.placename: India`
- `<meta geo.position>` and `<meta ICBM>` (lat/long) — removed from non-contact pages
- `LocalBusiness` schema `@type` → `ProfessionalService` + `Organization`
- `areaServed: "Delhi NCR"` → `areaServed: ["India", "Global"]`
- Footer brand tagline → "serving clients pan India and globally"
- Footer "Locations" column (Noida/Delhi/etc. links) → "Quick Links" column
- Footer office line (Nehru Place address) → "Pan India · Remote & Onsite · Global Clients Welcome"

### Why some pages still mention Delhi/NCR
- **`contact.html`** — keeps the office address per your brief (postal address in schema + visible address block); but its trust badge, hero, and coverage section all flipped to India & Global
- **5 flagship city pages** — intentionally kept their local schema because they're city-targeted SEO landings
- **Testimonial author signatures** (e.g. "— IT Head, 120-person law firm, Gurugram") — these add credibility without limiting the audience, left in place

---

## 5. 🧭 Navigation refresh — every page

Added two new dropdowns to the desktop nav across 65 pages (every page that had a `Services` dropdown):

- **"Software & Web"** → Custom Software · Website Design & Dev · Mobile App Development
- **"Cloud & Email"** → Google Workspace · Microsoft 365 · Zoho Suite · Professional Email · Email Licensing · Email Migration

Existing Services dropdown left intact. The new dropdowns sit between Services and Shop in the menu order.

`index.html` was hand-edited because it has the most modern nav structure; the rest was patched by the `add_nav_dropdowns.py` script (also in the ZIP).

`register.html` skipped — it's a minimal standalone page with no site nav.

---

## 6. 🛒 New `shop.html` — Part 5 spec, in detail

**Single self-contained file** (64 KB, 1891 lines). No external CSS, no external JS. Razorpay SDK loaded from their CDN.

### Filter sidebar
- Category radio: All, Laptops, Desktops, Printers, Networking, UPS, CCTV, Accessories
- Price range: dual `<input type="range">` sliders, ₹500–₹1,00,000, ₹500 step; auto-correct when min > max
- Brand checkboxes: Dell, HP, Lenovo, Canon, D-Link, Hikvision, APC, Logitech
- Per-category live count (e.g. "Laptops (3)")
- "Clear All" button
- Sticky on desktop · collapsible on mobile

### Product grid — 15 products
Each card: brand badge · name · 1-line specs · current price · MRP (strike-through) · discount % tag · status badges (`New` / `Hot Deal` / `Bestseller`) · "Add to Cart" button with state ("Added · 2" once in cart).

Catalogue: 3 laptops (Dell Latitude 3520, HP EliteBook 840 G9, Lenovo ThinkPad E15), 2 desktops (Dell OptiPlex 7010, HP ProDesk 600 G6), 2 printers (Canon LBP6230dn, Canon PIXMA G3010), 2 networking (D-Link DIR-825 router, D-Link DGS-1024D switch), 2 UPS (APC BX1100C-IN, APC BV800I-IN), 2 CCTV (Hikvision IP cam, Hikvision DVR), 2 accessories (Logitech MK270r combo, Dell MS3320W mouse).

### Toolbar
- Search box (filters by product name, live as you type)
- Sort dropdown: Default · Price Low–High · Price High–Low · Newest
- Results count ("Showing 15 products")

### Cart drawer (slides from right)
- Item rows with brand chip, name, line total, qty +/− controls, remove button
- Subtotal · GST (18%) · Grand Total
- "Proceed to Checkout" button
- Esc to close · click overlay to close · body scroll locked while open

### Checkout modal
- Customer fields: Full Name · Email · Phone · City · State · PIN · Full Delivery Address (validated)
- Payment method picker: UPI · Card · Net Banking · Cash on Delivery (visual selector cards)
- Live order summary
- Field-level inline validation with error states

### Razorpay payment integration
```js
const RAZORPAY_KEY_ID = 'YOUR_RAZORPAY_KEY_ID';  // ⚠️ Replace with your live Razorpay key
```
- Placeholder constant clearly commented
- When key is the placeholder string, the order flow falls into "demo mode" and simulates success (so you can test the UI without a live key)
- When you swap in a real `rzp_live_xxx` key, the real Razorpay Checkout opens on Place Order
- Order metadata passed through: name, email, phone, full address, line items, amount in paise, theme color `#0d9488`
- COD path: skips Razorpay entirely, finishes the order immediately

### Success / Error
- Toast appears bottom-centre, green for success / red for error / 3.2s timeout
- On success: cart cleared, drawer & modal closed, toast confirms order ID (`OMN-XXXXX`)
- Failed payment: red toast with Razorpay's error description; cart preserved

### Theme
Teal `#0d9488` primary, deep teal `#0f4c5c` headers, accent `#14b8a6`, consistent with the rest of the site.

### Mobile responsiveness
- 980px breakpoint collapses sidebar to a togglable panel
- 480px breakpoint switches product grid to 2-column

### Storage note
No localStorage / sessionStorage — cart state lives in memory only (page refresh = empty cart). If you want cart persistence across reloads, add a few `localStorage.setItem` calls in the shop's JS once the site is hosted (browser-storage APIs work fine on production hosts; just can't be used inside Claude artifacts during testing).

---

## 7. 🔧 Specific page rewrites

### `index.html` — new "Software · Cloud · Email" section
Inserted between the existing priority services block and the engagement-models block. Nine cards in a responsive auto-fit grid, each linking to its dedicated stub page. Bold teal gradient accent bar slides in on hover.

### `services.html`
Added the same 9 cards under a new sub-heading "Software, web & cloud services" (matching the existing `x-grid` / `x-card` style for visual consistency). Also fixed the stray "NCR-wide onsite reach" Why-OMNET card → "Pan India & global reach".

### `contact.html`
- Title: "Contact OMNET IT — India & Global IT Partner"
- Description / og / twitter — updated
- Trust badge → "Trusted IT Partner for 500+ Businesses Across India & Globally"
- Coverage section completely rebuilt: was 6-card Delhi/Noida/Gurugram/Ghaziabad/Faridabad/Greater-Noida grid → now 6-card Pan India + Global grid (Remote — Pan India · Remote — Global · North India · West India · South India · East India) with a "Don't see your city? Remote support reaches every Indian PIN code." note
- Office address (`405B, Skylark Building, 60 Nehru Place, New Delhi 110019`) — **preserved** as you asked
- All email occurrences visible as `mailto:` (no obfuscation)

### `about.html`
Bulk-pass updates applied — `h1`: "India's trusted partner for secure, well-managed IT operations" · description: "Since 2016, OMNET IT Solutions has been India's CERT-In empanelled managed IT partner for 500+ businesses."

### `404.html`
Replaced 70 KB old version with 6.5 KB lightweight, branded, gradient-styled page. Links to top destinations (services, managed IT, IT support, security, shop, pricing, custom software, web design). Visible phone + email in footer. `noindex, follow` robots directive.

---

## 8. 🔗 Broken link cleanup (156 link rewrites across 16 files)

All `href="some-deleted-page.html"` references rewritten to sensible live targets — e.g.:
- `it-support-faridabad.html` → `it-support.html`
- `it-support-greater-noida.html` → `it-support-noida.html` (kept flagship)
- `managed-it-services-gurugram.html` → `managed-services.html`
- `data-recovery-noida.html`, `printer-repair-noida.html`, `laptop-repair-noida-*.html`, `macbook-repair-noida.html` → all → `repair-services.html`
- `google-workspace-noida.html` → new `google-workspace.html`
- `microsoft-365-*-noida.html` → new `microsoft-365.html`
- `tally-provider-noida.html` → `zoho-suite.html` (Zoho Books fills similar role)
- `software-solutions-noida.html` → new `custom-software.html`
- `networking-cabling-wifi-noida.html` → `network-infrastructure.html`
- Pre-existing broken links (`dell-laptops-delhi-ncr.html`, `apple-macbook-delhi-ncr.html`, etc.) → respective `*-page.html` files

**Final state: 0 broken internal links.** Verified.

---

## 9. 📈 SEO impact estimate

**Expected positive:**
- Cleaner schema (`ProfessionalService` matches non-local positioning)
- Visible email = easier for AI search crawlers to extract a contact point
- Fewer thin/orphan pages = better crawl-budget allocation
- 9 new service pages = 9 new keyword landings

**Expected risk (acceptable):**
- 33 city pages dropped = some local long-tail traffic loss (kept 5 flagships to mitigate the worst of it)
- Spam to `info@` will increase now that the address is plaintext (mitigation: rely on your provider's spam filter; reCAPTCHA on contact forms is already in place)

**Migration recommendation:**
After upload, in Google Search Console:
1. Submit the new sitemap (`https://www.omnetit.in/sitemap.xml`)
2. Use the URL inspection tool on a few changed pages to request re-indexing of `index.html`, `services.html`, `contact.html`, and the 9 new service stubs
3. Optionally set up 301 redirects at your host level for the 33 deleted city pages → the kept-5 flagships or generic equivalents (your hosting provider's edge config; this repo doesn't include redirect rules)

---

## 10. ⚠️ Decisions still owed to you

These are minor; the site is shippable as-is. Address them when you can:

1. **`hello@omnetit.in` mailbox** — your live mail provider still has this address. Decide whether to:
   (a) keep it active as an alias forwarding to `info@`, OR
   (b) auto-reply to it with "We've moved to info@omnetit.in" for 60 days then disable, OR
   (c) leave it untouched (mail still arrives there, but the site no longer advertises it)
2. **301 redirects** for the 33 deleted city pages — best done at your hosting layer (Cloudflare Pages / Apache / Nginx). I'd suggest mapping them to the same targets the in-site link rewrite used (see section 8).
3. **Razorpay key** — replace `YOUR_RAZORPAY_KEY_ID` in `shop.html` with your live `rzp_live_xxx` key before going live. The placeholder is clearly commented.
4. **`order.html` and `register.html`** — both still ship as before (script-skipped due to non-standard nav). If they're not actively used, deletion candidates for the next pass.
5. **The 5 kept city pages** — their internal schema still lists all 6 NCR cities under `areaServed`. That's intentional for local SEO, but if you'd rather neutralise them too, say the word.

---

## 11. 🧪 How to test locally before pushing

```bash
unzip omnet-final.zip
cd omnet-final
# Quick static server (Python 3)
python3 -m http.server 8000
# Open http://localhost:8000/
```

Spot-check:
- `index.html` — scroll to the "Software · Cloud · Email" section, all 9 cards link out correctly
- `services.html` — same 9 services appear under the lower section
- `contact.html` — email visible as `info@omnetit.in`, India & Global coverage grid present
- `shop.html` — add items, open cart drawer, hit Proceed to Checkout, fill the form, hit Place Order → expect demo-mode success toast (live Razorpay only fires once the placeholder key is replaced)
- `404.html` — navigate to `/anything-that-doesnt-exist.html` (depending on hosting config)

---

## 12. 📁 Scripts included in `/docs/`

For transparency / future maintenance the four Python scripts used in this pass are included:
- `bulk_transform.py` — bulk find/replace across every HTML page
- `build_service_pages.py` — generates the 9 service stubs from a single template
- `add_nav_dropdowns.py` — inserts the two new nav dropdowns site-wide
- `remap_links.py` — fixes broken internal links after deletions
- `build_sitemap.py` — regenerates `sitemap.xml` from the live file list

Re-run any of them after future content edits and the site will stay consistent.

---

**End of change log. Ship it. 🚀**
