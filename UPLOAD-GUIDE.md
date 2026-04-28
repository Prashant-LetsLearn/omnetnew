# How to Upload to GitHub — FINAL Fix

## What was actually wrong

On 15 pages including `infrastructure-services.html` and `products.html`, there
was a malformed HTML comment block at the bottom that looked like:

```
<!-- ================================================================
 ALL WIDGETS - paste just before <script src="carousel.js"></script>
 <script src="upi-payment.js"></script>

<!-- ── MOBILE STICKY BOTTOM BAR ── -->
```

The first `<!-- =====` opened a comment, but the next `-->` (inside the inner
`<!-- ── MOBILE STICKY BOTTOM BAR ── -->`) closed the comment in a confusing
way that some browsers may have rendered weirdly.

## What I fixed

✅ Removed the broken developer-instruction comment from all 15 pages
✅ Replaced with clean `<!-- ── MOBILE STICKY BOTTOM BAR ── -->` only
✅ Verified with proper HTML parsing — 0 pages have visible leaked text
✅ The site sticky bar continues to work correctly

## Pages fixed in this batch

- infrastructure-services.html
- products.html
- it-support-aerocity-delhi.html
- it-support-delhi.html
- it-support-greater-noida.html
- it-support-greater-noida-west.html
- it-support-gurugram.html
- it-support-noida.html
- it-support-noida-expressway.html
- it-support-noida-sector-62.html
- it-support-noida-sector-63.html
- managed-it-services-delhi.html
- managed-it-services-gurugram.html
- managed-it-services-noida.html
- managed-it-services-greater-noida.html

## Upload — GitHub Web

1. **Extract this zip** on your computer
2. **Go to your repo** on GitHub.com
3. Click **"Add file" → "Upload files"**
4. **Select ALL files** from the extracted folder → drag into upload area
5. Commit message: `Fix: clean malformed comment block on 15 pages`
6. Choose **"Create a new branch"** → name: `fix-comment-block`
7. **"Propose changes"** → **"Create pull request"** → **"Merge"**

## Verify after upload

Visit these pages on your live site (after merging):
- https://www.omnetit.in/infrastructure-services.html
- https://www.omnetit.in/products.html
- https://www.omnetit.in/it-support-noida.html

Scroll to the bottom — should be clean, no stray text visible.

That's it.
