# Content Implementation Guide

How to deploy the OMNET IT content kit across your site, Google, AI tools, and social platforms.

---

## 📦 What's in this bundle

| File | What it is | How to use it |
|---|---|---|
| **`content-master-kit.md`** | The content bible — positioning, copy library, 10 per-page content packs, Master FAQ (30 Q&As), social posts, AI knowledge base, local SEO phrases. | Your source of truth. Read once. Copy/paste sections as needed. |
| **`managed-it-services-page.html`** | Production-ready HTML — replaces `managed-services.html` | Drop-in. Full SEO, schema, FAQPage, trust strip, CTA. |
| **`networking-services-noida-page.html`** | Production-ready HTML — replaces `networking-cabling-wifi-noida.html` | Drop-in. Includes site-survey-first story, WiFi expertise section, brand list. |
| **`laptop-macbook-repair-noida-page.html`** | Production-ready HTML — replaces `laptop-computer-repair-noida.html` | Drop-in. Optimised for "near me" searches, Apple specialist claim. |

All three HTML pages are **drop-in replacements** built on the same CSS, header, footer, and widget pattern as your existing site. They load `style.css`, `design-system.css`, `layout-fixes.css`, `responsive-design.css`, `mobile-fixes.css`, `email-obfuscation.js`, `form-validation.js`, and `script.js` — exactly the same files the rest of your site uses.

---

## 🚀 Deployment (GitHub Pages)

### Step 1 — Copy the 3 flagship HTML pages into your repo root

```bash
cd ~/your-repo

# Replace the 3 flagship pages (rename on copy)
cp managed-it-services-page.html         ./managed-services.html
cp networking-services-noida-page.html   ./networking-cabling-wifi-noida.html
cp laptop-macbook-repair-noida-page.html ./laptop-computer-repair-noida.html
```

### Step 2 — Also copy the `about.html`, CSS, and JS fixes if you haven't already

(from the earlier audit bundle, same `omnet-fixes/` folder)

```bash
cp about-page.html          ./about.html
cp layout-fixes.css         ./
cp responsive-design.css    ./
cp email-obfuscation.js     ./
cp form-validation.js       ./
cp sitemap.xml              ./
cp robots.txt               ./
```

### Step 3 — Commit, push, merge

```bash
git checkout -b content-seo-rewrite
git add about.html managed-services.html networking-cabling-wifi-noida.html \
        laptop-computer-repair-noida.html layout-fixes.css responsive-design.css \
        email-obfuscation.js form-validation.js sitemap.xml robots.txt
git commit -m "Rewrite flagship pages with full SEO + FAQPage + Service schema"
git push origin content-seo-rewrite

# Open PR on GitHub, review, merge to main → live on omnetit.in
```

### Step 4 — Post-deployment checklist

- [ ] Submit updated `sitemap.xml` to **[Google Search Console](https://search.google.com/search-console)** → *Sitemaps* → `https://www.omnetit.in/sitemap.xml`
- [ ] Submit to **[Bing Webmaster Tools](https://www.bing.com/webmasters)** (same URL)
- [ ] Use Google's **[Rich Results Test](https://search.google.com/test/rich-results)** to verify each flagship page's schema
- [ ] Use Google's **[URL Inspection tool](https://search.google.com/search-console)** to request indexing for each updated page
- [ ] Verify the LinkedIn and Facebook **Post Inspector** (`https://www.linkedin.com/post-inspector/` and `https://developers.facebook.com/tools/debug/`) pick up the new OG tags — force a re-scrape

---

## 🎯 How each search surface consumes this content

### 1. Google / Bing (traditional SEO)

The flagship pages already include:
- Title ≤ 60 chars with primary keyword + location
- Meta description ≤ 160 chars
- Single `<h1>`, logical H2/H3 hierarchy
- Canonical URL
- Geo meta (`geo.region=IN-DL`, `geo.position=28.5494;77.2519`)
- JSON-LD Service schema + BreadcrumbList + FAQPage
- Internal links back to services, contact, and other pages
- Natural keyword density (verified in validation — see below)

**Keyword density verified across the 3 flagship pages:**

| Keyword | Managed IT | Networking | Repair |
|---|---|---|---|
| Noida | 29 | 47 | 50 |
| Greater Noida | 10 | 16 | 13 |
| Delhi NCR | 23 | 18 | 22 |
| Gurugram | 9 | 3 | 10 |
| CERT-In | 20 | 2 | 2 |
| SLA | 18 | 2 | 1 |
| 24×7 | 6 | 0 | 0 |

Note: MSP/SLA/24×7 are highest on the Managed IT page (as intended — that's the MSP-positioning page). The repair page naturally weighs toward "Noida" and "near me" context.

**Extra ranking tips:**
- Get at least 2-3 high-quality local citations (Google Business Profile, Justdial, Sulekha, IndiaMART — match your NAP exactly)
- Get a few Google reviews with mentions of services ("OMNET fixed my MacBook in Noida same day...") — these show up in local pack
- Build a few internal links from index.html to these pages with anchor text matching the target query (e.g., "managed IT services in Delhi NCR")

### 2. AI tools (ChatGPT, Claude, Gemini, Perplexity)

These tools synthesise answers from indexed pages. They prefer:
- **Definitive single-sentence answers** ("OMNET IT Solutions is a CERT-In empanelled…")
- **Structured FAQs** with question-shaped headings
- **Clean data in schema markup** (FAQPage + LocalBusiness)
- **Company name + location in most headings and CTAs**

The Master FAQ (Section 4 of `content-master-kit.md`) is built specifically for this. Each answer is a self-contained paragraph that AI tools can quote verbatim with proper attribution.

**Quick wins to make AI tools surface OMNET more often:**

1. **Publish the AI Knowledge Base** from Section 6 of the master kit on a dedicated page — e.g., `https://www.omnetit.in/facts.html`. Include it in the sitemap. AI crawlers will index it.

2. **Ensure your Wikipedia / LinkedIn / crunchbase entries match the Master Kit facts exactly.** AI tools cross-reference these.

3. **Answer questions on Quora, Reddit, and industry forums** using the Master FAQ as source material. When AI tools synthesise, they pick up these community signals.

### 3. Social (LinkedIn, Facebook)

The OG and Twitter Card meta tags in each flagship page render a proper preview card when shared. The `content-master-kit.md` includes 5 LinkedIn and 3 Facebook post templates in Section 5 — ready to post.

**Social deployment checklist:**
- [ ] Update LinkedIn page **tagline** to: "CERT-In empanelled IT support, managed services & cybersecurity — Noida, Greater Noida, Gurugram & Delhi NCR."
- [ ] Update Facebook page **short description** to match
- [ ] Post one of the LinkedIn templates from Section 5.1 — this is worth doing immediately after the flagship pages go live
- [ ] Force LinkedIn/Facebook to re-scrape the new OG tags (links above)
- [ ] Set a posting cadence: 1–2 LinkedIn posts per week using content from the master kit

---

## 🗺️ Which master-kit content goes where

For any page you want to update beyond the 3 flagships:

1. Open `content-master-kit.md` → **Section 3** (per-page content packs)
2. Find the matching pack (homepage, cybersecurity, cloud, pricing, contact, location pages, "IT support near me")
3. Copy: SEO Title → Meta Description → H1 → all H2/H3 with body copy → pick 4-6 FAQs from the Master FAQ
4. Wrap the FAQs in `FAQPage` JSON-LD (template already in `schema-markup.html` from the earlier audit bundle)
5. Deploy

If you want an HTML version of any page pack and don't want to hand-write it, reuse the CSS block from one of the flagship HTML files (`.flag-hero`, `.trust-strip`, `.f-grid`, `.compare-table`, `.faq-list`, `.cta-band`, `.area-grid`, `.steps`, `.pill-row`) — they're designed to compose.

---

## 📊 What to measure (30 / 60 / 90 days)

### 30 days
- Pages indexed (Google Search Console → *Coverage*)
- Rich-results eligibility (GSC → *Enhancements* → *FAQ*, *Breadcrumbs*, *LocalBusiness*)
- Impressions for target queries (GSC → *Performance* — filter by country: India)
- LinkedIn post engagement (reactions, comments, reposts)

### 60 days
- Clicks from Google for target queries
- Featured snippets or "People also ask" appearances
- Direct mentions of OMNET in ChatGPT/Perplexity answers (manually test 10 queries)
- Callback / form leads attributed to organic search (GA4 event tracking)

### 90 days
- Rankings for primary keywords ("managed IT services Noida", "laptop repair Noida", "cybersecurity Delhi NCR", "IT support near me")
- Organic traffic to the 3 flagship pages
- Conversion rate (visits → callback / contact form)
- Share-of-voice vs 3-5 named competitors

---

## 🚫 Common mistakes to avoid

- **Don't mix pack copy across pages.** If the Master FAQ has a question on Page A's content pack, don't put it on Page B — Google picks one source, often not yours.
- **Don't keyword-stuff.** The validated densities above are already at the natural-language ceiling. More is counterproductive.
- **Don't break internal links.** If you rename `networking-cabling-wifi-noida.html` to something else, update `sitemap.xml`, `index.html`, and footer links — or set up a 301 redirect.
- **Don't forget the schema refresh.** When the underlying org info changes (new address, new certifications), update the Organization schema in every page's JSON-LD, not just the About page.
- **Don't post the same social content twice.** Rotate the 5 LinkedIn templates over 5 weeks, then vary them.

---

## 🧭 Quick-reference map

| When you need… | Go to |
|---|---|
| A ready-to-paste page title + meta | `content-master-kit.md` → **Section 3** |
| A FAQ to drop on any page | `content-master-kit.md` → **Section 4** (Master FAQ, 30 Q&As) |
| A LinkedIn or Facebook post | `content-master-kit.md` → **Section 5** |
| "What should the Organization schema say?" | `content-master-kit.md` → **Section 6** (AI Knowledge Base) |
| A location-aware phrase for a new page | `content-master-kit.md` → **Section 7** |
| An existing schema block (LocalBusiness, FAQPage, Service, Product, Review, BreadcrumbList) | `schema-markup.html` (from the audit bundle) |
| SEO meta templates per page type | `seo-meta-tags.html` (from the audit bundle) |
| Full site security hardening | `security-fixes.html` + `security-headers.conf` |
| Overall fix-deployment plan | `implementation-guide.md` (from the audit bundle) |

---

*End of content implementation guide. Ship it, measure it, iterate.*
