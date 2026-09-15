# OMNET IT SOLUTIONS — Website Update Changelog
**Update date:** 2026-09-15  
**Repository:** https://github.com/Prashant-LetsLearn/omnetnew

---

## Summary of Changes

### Contact Information Standardized (83 HTML/JS files)
- **Primary phone replaced sitewide:** `9717270865` → `8920603270` (`+91 89206 03270`)
  - All tel: links, WhatsApp URLs, JSON-LD telephone fields, and formatted display numbers updated
  - **PAYMENT PRESERVED:** `9717270865@ybl` in `upi-payment.js` is intentionally unchanged (UPI payment identifier, not a contact number)
- **Primary email replaced sitewide:** `info@omnetit.in` → `hello@omnetit.in`
  - Updated in all headers, footers, forms, JSON-LD, and body references

---

## New Files

| File | Description |
|------|-------------|
| `dedicated-onsite-it-engineer-delhi-ncr.html` | New page — Full-Time Onsite IT Engineers for Delhi NCR offices |
| `india-it-support-for-global-companies.html` | New page — IT Support in India for Global Companies |

---

## Modified Files

### Core Pages

**`index.html`** (Homepage — major rewrite)
- `lang="en"` → `lang="en-US"` (American English designation)
- Page title: → *IT Support for Businesses in Noida, Delhi & Gurugram | OMNET IT SOLUTIONS*
- H1: → *IT Support for Businesses in Noida, Delhi & Gurugram*
- Hero eyebrow: updated to Noida/NCR local focus
- Hero lede: new copy with Sector 62/63 local-focus line
- Hero CTAs: replaced with Call Now / WhatsApp Us / Discuss Your Requirements
- Hero service grid: replaced with 4 business-priority service paths (IT Support & AMC, Dedicated Onsite Engineers, Custom Software, India IT for Global Companies)
- Trust row: removed unverifiable "worldwide" claim; replaced with local service highlights
- JSON-LD: fixed malformed schema (identifier/award were outside Organization node); replaced with clean, validated graph including FAQPage, areaServed, correct phone/email
- Footer contact: updated display phone, removed landline, clarified service area

**`custom-software.html`**
- Title: → *Custom Software Development for Startups & Businesses | OMNET IT SOLUTIONS*
- H1: → *Custom Software Development for Startups and Growing Businesses*
- Hero lede: updated with Noida/NCR local focus and clear service scope
- CTA buttons: → *Discuss Your Software Project* / *Request an MVP Scope & Estimate*
- Announcement strip: updated to accurate coverage statement

**`it-support-noida.html`**
- Title: → *IT Support Noida Sector 62 & 63 | Business IT Support Noida | OMNET IT SOLUTIONS*
- H1: → *IT Support for Businesses in Noida*
- Hero lede: updated to highlight Sector 62 and Sector 63 as priority coverage
- Meta description: updated to reflect Sector 62/63 priority

**`contact.html`**
- Added "Dedicated / Full-Time Onsite IT Engineer" option to callback topic select
- Added "India IT Support for Global Companies" option to callback topic select
- Added "Custom Software Development" option to callback topic select
- Title updated to reflect Noida/Delhi NCR focus

**`about.html`**
- Title updated; `lang` attribute fixed

**`site.webmanifest`**
- `name`: OMNET IT SOLUTIONS
- `description`: updated to reflect Noida/Delhi NCR business focus
- `theme_color`: corrected to match site teal (#0d9488)

**`robots.txt`**
- Company name and last-updated date corrected

**`sitemap.xml`**
- Added `dedicated-onsite-it-engineer-delhi-ncr.html` (priority 0.9)
- Added `india-it-support-for-global-companies.html` (priority 0.9)
- Updated `lastmod` dates for homepage, custom-software.html, it-support-noida.html
- Updated last-updated comment date

### Coverage Claims Fixed (80+ pages)

All pages corrected:
- "Pan India · Remote & Onsite / Global Clients Welcome" → "24/7 Remote Support Across India / Onsite: Noida · Delhi · Gurugram"  
- "Serving clients Pan India & Globally — Remote & Onsite Support" → accurate coverage strip
- Footer brand description: no longer implies worldwide onsite delivery

### Navigation Updated (25 pages)

IT Support dropdown in desktop and mobile nav updated to include:
- Computer AMC Services
- Dedicated Onsite Engineer (new)
- India IT for Global Companies (new)

Footer services column updated across 17 pages to include new service links.

### Technical Fixes (all pages)
- `lang="en"` → `lang="en-US"` (75 files)
- `og:locale` → `en_US` (63 files)  
- `hreflang="en-IN"` → `hreflang="en-US"` (23 files)
- SLA card wording: "Guaranteed" → "target" for response time cards
- Page `<title>` tags: "OMNET IT Solutions" → "OMNET IT SOLUTIONS" (13 files)
- `alt` and `title` attributes: company name casing fixed

---

## Intentionally Unchanged

- `upi-payment.js` — UPI ID `9717270865@ybl` preserved (payment destination)
- Social profile URLs (LinkedIn, Facebook, X/Twitter)
- Google Analytics tag (G-GWE61BMZN1)
- EmailJS integration and form backend access keys
- Business address (405B, Skylark Building, 60 Nehru Place, New Delhi 110019)
- Office landline (+91-120-522-3376) — not the old sales number
- Support phone +91-9971776428 (customer service) and +91-9818391080 (technical support) in JSON-LD — kept as secondary contacts, not replaced
- Udyam registration number UDYAM-UP-29-0254285
- Shop, order, register, and client portal functionality

---

## Not Changed (Owner Action Required)

See OWNER_CHECKLIST below for items requiring manual verification or external setup.

