#!/usr/bin/env python3
"""Build sitemap.xml from current set of HTML pages."""
import os, glob

ROOT = "/home/claude/omnet-final"
os.chdir(ROOT)

DATE = "2026-05-16"
BASE = "https://www.omnetit.in"

# Priority tiers
TIER_1_HOME = {"index.html": ("1.0", "weekly")}
TIER_2_TOP = {  # major pages
    "about.html":           ("0.9", "monthly"),
    "contact.html":         ("0.9", "monthly"),
    "services.html":        ("0.9", "weekly"),
    "pricing.html":         ("0.9", "monthly"),
    "shop.html":            ("0.9", "weekly"),
    "products.html":        ("0.9", "weekly"),
    "managed-services.html":("0.9", "monthly"),
    "it-support.html":      ("0.9", "monthly"),
    "it-security.html":     ("0.9", "monthly"),
    "cloud-services.html":  ("0.9", "monthly"),
}
TIER_3_SERVICES = {  # 0.8 — service detail
    # New service stubs
    "custom-software.html", "website-design.html", "app-development.html",
    "email-licensing.html", "email-migration.html", "google-workspace.html",
    "microsoft-365.html", "zoho-suite.html", "professional-email.html",
    # Existing services
    "infrastructure-services.html", "network-infrastructure.html", "devops-services.html",
    "email-solutions.html", "repair-services.html", "remote-onsite-support.html",
    "professional-services.html", "it-hardware-rental.html",
    "managed-servers.html", "managed-security.html", "managed-network.html",
    "managed-colocation.html", "computer-amc-services.html",
    "desktop-security.html", "server-infrastructure-security.html",
    "cloud-security.html", "internet-content-security.html",
    "risk-threat-assessment.html", "digital-transformation.html",
    "casual-it-support.html", "fixed-cost-it-support.html", "prepaid-it-support.html",
    "spare-parts.html",
    # 5 flagship city pages
    "it-support-noida.html", "it-support-delhi.html", "it-support-gurugram.html",
    "managed-it-services-noida.html", "managed-it-services-delhi.html",
}
TIER_4_INFO = {  # 0.7 — info / hub
    "blog.html", "portfolio.html", "industry-expertise.html",
    "technology-domains.html", "it-support-response-time-sla.html",
    "what-is-computer-amc-do-i-need-one.html",
}
TIER_5_PRODUCT_LANDING = {  # 0.7 — product brand pages
    "dell-laptops-page.html", "hp-products-page.html", "lenovo-products-page.html",
    "apple-products-page.html", "chromebooks-page.html",
    "google-workspace-page.html", "microsoft-365-page.html",
}
TIER_6_UTILITY = {  # 0.5 — legal / utility
    "privacy-policy.html", "terms-of-service.html",
    "order.html", "register.html",
}

# Pages excluded from sitemap (utility pages)
EXCLUDED = {"404.html"}

def priority_for(filename):
    if filename in TIER_1_HOME: return TIER_1_HOME[filename]
    if filename in TIER_2_TOP: return TIER_2_TOP[filename]
    if filename in TIER_3_SERVICES: return ("0.8", "monthly")
    if filename in TIER_4_INFO: return ("0.7", "weekly")
    if filename in TIER_5_PRODUCT_LANDING: return ("0.7", "monthly")
    if filename in TIER_6_UTILITY: return ("0.5", "yearly")
    return ("0.6", "monthly")  # default catch-all

pages = sorted(glob.glob("*.html"))
print(f"Found {len(pages)} HTML pages")

# Build sitemap
lines = ['<?xml version="1.0" encoding="UTF-8"?>',
         '<!--',
         '═══════════════════════════════════════════════════════════════════════════',
         '  OMNET IT — sitemap.xml',
         '  https://www.omnetit.in/sitemap.xml',
         '═══════════════════════════════════════════════════════════════════════════',
         f'  Last updated: {DATE}',
         '  Auto-generated from live HTML files.',
         '  Excluded utility pages: 404.html',
         '═══════════════════════════════════════════════════════════════════════════',
         '-->',
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
         '']

# Homepage explicit (no .html suffix in URL)
lines.append(f'  <url><loc>{BASE}/</loc><lastmod>{DATE}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>')

# Order: top tiers first
for tier_label, page_set in [
    ("Top entry points",       TIER_2_TOP.keys()),
    ("Service detail pages",   TIER_3_SERVICES),
    ("Information / hub",      TIER_4_INFO),
    ("Product landing pages",  TIER_5_PRODUCT_LANDING),
    ("Legal / utility",        TIER_6_UTILITY),
]:
    lines.append('')
    lines.append(f'  <!-- ═══ {tier_label} ═══ -->')
    for page in sorted(p for p in page_set if p in pages):
        prio, freq = priority_for(page)
        lines.append(f'  <url><loc>{BASE}/{page}</loc><lastmod>{DATE}</lastmod><changefreq>{freq}</changefreq><priority>{prio}</priority></url>')

# Catch any uncategorised page (safety net)
categorised = set(TIER_1_HOME) | set(TIER_2_TOP) | TIER_3_SERVICES | TIER_4_INFO | TIER_5_PRODUCT_LANDING | TIER_6_UTILITY | EXCLUDED | {"index.html"}
uncategorised = [p for p in pages if p not in categorised]
if uncategorised:
    lines.append('')
    lines.append('  <!-- ═══ Other ═══ -->')
    for page in sorted(uncategorised):
        prio, freq = priority_for(page)
        lines.append(f'  <url><loc>{BASE}/{page}</loc><lastmod>{DATE}</lastmod><changefreq>{freq}</changefreq><priority>{prio}</priority></url>')

lines.append('')
lines.append('</urlset>')

with open("sitemap.xml", "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"\n✓ Wrote sitemap.xml — {len(lines)} lines, {sum(1 for l in lines if '<loc>' in l)} URLs")
if uncategorised:
    print(f"⚠ {len(uncategorised)} uncategorised pages caught by safety net: {uncategorised}")
