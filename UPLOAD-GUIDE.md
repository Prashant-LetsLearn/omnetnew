# How to Upload to GitHub — Comment Leak Fix

## What was wrong

On 15 pages, my earlier sticky-bar removal left orphaned HTML comment fragments
that **leaked onto the visible page** as text:

```
on every page
2. Leave a Message (bottom-right)
3. Support Ticket button (bottom-right, above Leave a Message)
====== -->
```

This appeared at the bottom of pages on both desktop and mobile.

## What I fixed

✅ Removed the orphaned comment fragments from all 80 affected pages
✅ Cleaned up stray `--->` and `====` artifacts
✅ Verified zero pages still have leaked text
✅ Pages affected included: it-support-noida.html, managed-it-services-delhi.html,
   it-support-gurugram.html, infrastructure-services.html, products.html, and others

## Note on pre-existing issue (not fixed here)

Some pages (404.html, blog.html, privacy-policy.html, etc.) have **duplicate
`</body>` tags** — but this was in the original site code, not caused by my
changes. Browsers handle this gracefully so it's not a visible bug. Worth fixing
properly when you next refactor the templates, but not urgent.

## Upload — GitHub Web

1. **Extract this zip** on your computer
2. **Go to your repo** on GitHub.com
3. Click **"Add file" → "Upload files"**
4. **Select ALL files** from the extracted folder → drag into upload area
5. Commit message: `Fix: remove leaked HTML comment fragments from page bottom`
6. Choose **"Create a new branch"** → name: `fix-comment-leak`
7. **"Propose changes"** → **"Create pull request"** → **"Merge"**

## Verify after upload

Open these specific pages — bottom of page should be clean text-free:
- https://www.omnetit.in/it-support-noida.html
- https://www.omnetit.in/managed-it-services-delhi.html
- https://www.omnetit.in/it-support-gurugram.html
- https://www.omnetit.in/infrastructure-services.html
- https://www.omnetit.in/products.html

If you scroll to the bottom of any of these, you should see only the footer —
no stray `2. Leave a Message...` text.

That's it.
