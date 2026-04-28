# How to Upload to GitHub — Final Version (Fixed)

This zip contains the **complete website** with the sticky bar bug fixed.

## What's fixed in this version

✅ **Sticky mobile CTA bar — desktop visibility bug FIXED**
   - Was showing on desktop because of CSS conflicts
   - Now uses inline SVG icons (no font CDN dependency)
   - Strict desktop hiding with `!important` rules
   - Will only show on mobile screens (≤ 768px wide)

✅ All previous fixes still in place:
   - 78 page titles tightened to ≤ 60 characters
   - 23 pages with keyword stuffing cleaned up
   - 29 meta descriptions trimmed
   - Accessibility CSS on every page

## Upload — GitHub Web (easiest)

1. **Extract this zip** on your computer
2. **Go to your repo** on GitHub.com
3. Click **"Add file" → "Upload files"**
4. **Select ALL files** from the extracted folder → drag into upload area
5. Commit message: `Fix: sticky mobile CTA visible on desktop`
6. Choose **"Create a new branch"** → name: `seo-sticky-cta-fix`
7. **"Propose changes"** → **"Create pull request"** → **"Merge"**

Site updates in 1–5 minutes.

## After upload — verify the fix

1. **Open your site on DESKTOP** (laptop/PC)
   → No sticky bar should be visible at the bottom ✓
2. **Open your site on MOBILE** (or resize browser to <768px wide)
   → Three-button sticky bar appears: Call · WhatsApp · Quote ✓
3. **The icons should render** as crisp SVG (phone, WhatsApp, document)

## What changed technically

- `partial-sticky-mobile-cta.html` — rewritten with:
  - Inline SVG icons (always render, no CDN dependency)
  - Unique ID `#omn-mobile-cta-bar` to avoid CSS conflicts
  - `display: none !important` on default state
  - `display: grid !important` only inside `@media (max-width: 768px)`
- This new partial was injected into all 90 site pages, replacing the old one

That's it. Upload, merge, verify on desktop and mobile.
