# OMNET IT Website — Phase 1 Rewrite + Nav Fixes

**Version:** Phase 1 Delivery · April 2026
**Total files in this bundle:** 18 HTML pages (7 fully rewritten + 11 nav-fix repairs)

---

## What's in this zip

### 🆕 PHASE 1 REWRITES — 7 pages

These are **completely rewritten** with new content, new SEO meta, new JSON-LD schema, and the full site nav/footer. Replace the existing files in your repo with these.

| File | What changed |
|---|---|
| `index.html` | New headline "Predictable IT. Proactive Security. Written SLAs." · 9-section structure · priority-ordered services · engagement models · process steps · outcomes · 6-card trust grid · FAQ accordion · closing CTA. New FAQPage JSON-LD. |
| `services.html` | New services hub page — 6 priority-ordered main services + 6 supporting services + Why OMNET grid + closing CTA. |
| `managed-services.html` | Full rewrite — hero, what-it-is, problem/solution, 9-card inclusion grid, engagement models (Fully Managed vs Co-Managed), onboarding timeline, pricing table, outcomes strip, testimonial, 5 FAQs. |
| `it-support.html` | Full rewrite — audience cards, what's covered, SLA table (P1-P4 with response + resolution), 4 pricing models (AMC / Prepaid / Casual / FTC), onboarding timeline, outcomes, testimonial, 5 FAQs. |
| `it-security.html` | Full rewrite — "The Reality" (DPDP, client audits, threats), 6 security layers (XDR, Identity, Email, Network, Cloud, IR), VAPT section, Compliance frameworks (CERT-In, ISO 27001, DPDP, SOC 2, PCI), outcomes, testimonial, 5 FAQs. |
| `cloud-services.html` | Full rewrite — audience cards, 4 pillars (Productivity, Infrastructure, Migration, Governance), M365 engagement deliverables, 6-phase migration methodology, outcomes, testimonial, 5 FAQs. |
| `contact.html` | Full rewrite — urgency-based path cards (new enquiry / support / sales / emergency), full channels table, visit block, office hours, NCR coverage grid, closing CTA. |

### 🔧 NAV FIXES — 11 pages

These files had a **missing or broken nav bar** on the live site. Each has been repaired with the complete site header, mobile drawer, dual-action strip, sticky bottom bar, back-to-top button, and the correct script loads (`fixes.js`). Their **content is unchanged** — only the chrome was fixed.

| File |
|---|
| `about.html` *(full content rewrite + nav fix)* |
| `apple-products-page.html` *(nav fix)* |
| `chromebooks-page.html` *(nav fix)* |
| `dell-laptops-page.html` *(nav fix)* |
| `google-workspace-page.html` *(nav fix)* |
| `hp-products-page.html` *(nav fix)* |
| `lenovo-products-page.html` *(nav fix)* |
| `microsoft-365-page.html` *(nav fix)* |
| `laptop-computer-repair-noida.html` *(nav fix)* |
| `networking-cabling-wifi-noida.html` *(nav fix)* |
| `order.html` *(nav fix)* |

---

## How to deploy

### Option A — GitHub web interface
1. Go to your omnetit.in repo on GitHub
2. For each file in this zip, click the existing file in the repo → click the pencil (Edit) icon → delete existing content → paste the new content from the corresponding file here → commit
3. Commit message suggestion: `Phase 1 content rewrite + nav fixes across priority pages`
4. GitHub Pages (or your deployment pipeline) will redeploy automatically

### Option B — Git CLI (faster for all 18)
```bash
# From your local clone of the repo root
cd /path/to/omnetit-repo

# Unzip this bundle into a temp location
unzip omnet-website-rewrite.zip -d /tmp/omnet-new

# Copy all HTML files over (this replaces existing files)
cp /tmp/omnet-new/*.html ./

# Review changes
git status
git diff --stat

# Commit and push
git add *.html
git commit -m "Phase 1 content rewrite + nav fixes (18 pages)"
git push origin main
```

### Option C — Drag & drop
- Unzip locally
- Drag all `.html` files into your repo on GitHub's web UI (it will create a commit with all of them at once)

---

## What you still need on the server

These new pages reference your **existing** CSS and JS files. They are NOT included in this zip (unchanged from your current repo):

**CSS files (must exist in the same directory as HTML):**
- `style.css`
- `design-system.css`
- `layout-fixes.css`
- `responsive-design.css`
- `mobile-fixes.css`

**JS files:**
- `script.js`
- `fixes.js`
- `form-validation.js`
- `email-obfuscation.js`

**Assets:**
- Logo, favicon, og-banner.png — all referenced as existing on your site

---

## Pre-deployment checklist

**Content / trust signals to verify before going live:**

1. **Testimonials** — I used 3 illustrative placeholders (law firm / manufacturing firm / fintech / architecture firm / ed-tech). Before publishing, replace each with a real quote from one of your highest-NPS clients. Anonymised is fine — "IT Head, 120-person law firm, Gurugram" works. Fake testimonials damage trust if found out.

2. **Outcome numbers** — The pages claim: 98%+ SLA attainment · 20-35% cost reduction · 3+ yr average tenure · Zero successful ransomware · 95%+ phishing-click reduction · 99.9%+ email uptime · 15-30% licence savings. These are reasonable industry benchmarks but should be verified against your actual monthly reporting. Soften where unproven. Strengthen where you outperform.

3. **Pricing ranges** — The Managed IT page shows ₹35k-60k (30-user), ₹80k-1.4L (50-user), ₹1.75-3L (100-user). The IT Security page mentions ₹500-1,500 per endpoint per month. Review against your current quoted ranges before publishing.

4. **CERT-In empanelment** — Referenced in nearly every page. Confirm your empanelment status is active and the documentation is ready if a prospect asks.

5. **ISO 27001** — Pages say "aligned" not "certified." If you are certified (not just aligned), update to the stronger claim everywhere.

6. **Phone numbers** — Verified against your memory:
   - Sales: +91 89206 03270
   - Customer Service: +91 99717 76428
   - 24×7 Technical Support: +91 98183 91080
   - Landline: +91 120 522 3376
   Confirm all 4 are still correct before publishing.

7. **Address** — 405B Skylark Building, 60 Nehru Place, New Delhi 110019. Confirm.

---

## Post-deployment checks

After pushing live, test these on desktop AND mobile:

- [ ] Homepage loads and hero displays correctly
- [ ] Nav dropdowns open on hover (desktop) / tap (mobile drawer)
- [ ] All CTA buttons route correctly (phone: dial; WhatsApp: opens chat; email: opens mailto)
- [ ] Sticky bottom bar appears on scroll and is tappable
- [ ] FAQ accordions expand/collapse
- [ ] Footer email obfuscation reveals correctly when clicked
- [ ] Breadcrumb schema shows up in Google Search Console URL Inspection
- [ ] FAQPage schema on homepage shows up in URL Inspection
- [ ] Page speed — run one PageSpeed Insights check per new page
- [ ] Mobile view — no horizontal scroll, text readable, CTAs tap-able

---

## What's NOT in this zip (Phase 2+)

The full content rewrite document (`OMNET-COMPLETE-REWRITE-PHASE1.md`) contains the roadmap for the remaining ~80 pages. They are **not** in this zip. They will be delivered in future phases.

**Phase 2** — 12-15 sub-service pages (Managed Servers, Managed Security, Managed Network, Managed Colocation, Desktop Security, Cloud Security, Risk & Threat Assessment, Fixed-Cost IT Support, Prepaid IT Support, Casual IT Support, Network Infrastructure, DevOps, Email Solutions, Repair Services)

**Phase 3** — 15-20 city landing pages (IT Support Noida/Delhi/Gurugram/Ghaziabad/Faridabad, Managed IT city pages, neighbourhood pages)

**Phase 4** — 15+ product and Noida-specific pages

**Phase 5** — 10-15 blog post rewrites

**Phase 6** — Case studies, industry-specific pages, utility pages polish

---

## Rollback plan

If anything breaks after deployment:

```bash
# Immediate rollback
git revert HEAD
git push origin main
```

Or restore individual files from your repo's history via GitHub's web UI → file → History → Restore.

Keep the old files accessible locally until you've verified Phase 1 is running cleanly for 48 hours.

---

## Questions or issues

The content and HTML here are designed to drop cleanly into your existing CSS/JS system. If anything looks visually off after deploy, likely causes are:

1. **Missing CSS file** — check the page's DevTools Network tab for 404s on `style.css` / `design-system.css` etc.
2. **Script.js not loaded** — check DevTools Console for JS errors; nav dropdowns and mobile drawer rely on `script.js`
3. **Stale CDN cache** — hard-refresh (Ctrl+Shift+R / Cmd+Shift+R) or bust CDN cache if you use one

Everything here is vanilla HTML + your existing CSS/JS stack — no build step, no dependencies, no tooling required.

Ready for Phase 2 when you are.
