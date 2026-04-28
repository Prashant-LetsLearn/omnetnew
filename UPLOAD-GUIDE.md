# How to Upload to GitHub — Sticky Bar Fix

## What was wrong

The bottom strip you saw on desktop (showing `+91 89206 03270` and a WhatsApp icon)
was the site's **existing** sticky CTA bar (`omnet-sticky-bar`), which has its
hiding CSS in `mobile-redesign.css` and `omnet-improvements.css` — but those files
are NOT loaded by the HTML pages. So the bar leaked onto desktop.

## What I fixed

1. **Removed my redundant duplicate CTA bar** from all 90 pages
   (the one I added earlier was a duplicate — the site already had its own)
2. **Added CSS to `a11y-perf.css`** that:
   - Hides the existing `.omnet-sticky-bar` on desktop with `!important`
   - Re-implements the proper mobile styling so it shows correctly on phones

So now:
- **Desktop:** No sticky bar visible at the bottom ✓
- **Mobile:** The site's existing sticky bar shows properly with phone + WhatsApp ✓

## Upload — GitHub Web

1. **Extract this zip** on your computer
2. **Go to your repo** on GitHub.com
3. Click **"Add file" → "Upload files"**
4. **Select ALL files** from the extracted folder → drag into upload area
5. Commit message: `Fix: hide existing sticky bar on desktop, remove duplicate`
6. Choose **"Create a new branch"** → name: `fix-sticky-bar`
7. **"Propose changes"** → **"Create pull request"** → **"Merge"**

## Verify after upload

1. **Open the site on your laptop/desktop** — bottom of page should be CLEAN
   (no phone number bar) ✓
2. **Open the site on your phone** (or resize browser to <768px wide)
   — Sticky bar appears with phone icon + "+91 89206 03270" + WhatsApp icon ✓

That's it. The bottom-of-desktop white strip bug is fixed.
