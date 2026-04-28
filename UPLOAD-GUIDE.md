# How to Upload to GitHub — Simple Upload

This zip contains the **complete, ready-to-push website**. All files are at the root level (no subfolders to worry about). Every fix is already applied.

## What changed

✅ 78 page titles tightened to ≤ 60 characters
✅ 23 pages with keyword stuffing cleaned up
✅ 29 meta descriptions trimmed to ≤ 160 characters
✅ 1 missing canonical tag added
✅ Sitemap dates refreshed
✅ Sticky mobile CTA bar added to every page (Call · WhatsApp · Quote)
✅ Accessibility CSS (`a11y-perf.css`) added to every page

**Total: 131 SEO fixes + sitewide UX additions across 99 pages.**

---

## Upload — GitHub Web (easiest)

1. **Extract this zip** on your computer
2. **Go to your repo** on GitHub.com
3. Click **"Add file" → "Upload files"** (top right)
4. **Select ALL files from the extracted folder** and drag them into the upload area
5. At the bottom:
   - Commit message: `SEO batch update: 131 fixes + a11y CSS + sticky CTA`
   - Choose **"Create a new branch for this commit and start a pull request"**
   - Branch name: `seo-batch-update`
6. Click **"Propose changes"**
7. On the next page → **"Create pull request"** → **"Merge pull request"** → **"Confirm merge"**

Your site updates in 1–5 minutes.

---

## After upload — verify

1. **Visit your site on mobile** — you should see a sticky bar at the bottom (Call · WhatsApp · Quote)
2. **View source** of any page → `<title>` should be short
3. **Resubmit sitemap**: https://search.google.com/search-console/sitemaps

---

## About the `partial-*.html` files

Three optional files are at the root level:
- `partial-sticky-mobile-cta.html` — already injected into every page (reference only)
- `partial-breadcrumb-schema.html` — for adding breadcrumb structured data later
- `partial-internal-link-cluster.html` — for adding footer link clusters later

These are **safe to upload** — they won't affect your site (they're just files sitting in the repo, not linked from anywhere). Use them later when you want to add breadcrumbs or link clusters to specific pages.

If you'd rather not have them in your repo at all, just skip these 3 files when uploading. The site works the same either way.

---

That's it. Upload everything, merge, done.
