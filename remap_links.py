#!/usr/bin/env python3
"""Remap broken links to live pages."""
import os, re, glob

ROOT = "/home/claude/omnet-final"
os.chdir(ROOT)

# Map: deleted/missing file → live page that best matches its intent
REMAP = {
    # 33 city pages we deleted → generic equivalents or kept flagships
    "it-support-faridabad.html":               "it-support.html",
    "it-support-ghaziabad.html":               "it-support.html",
    "it-support-ghaziabad-indirapuram.html":   "it-support.html",
    "it-support-greater-noida.html":           "it-support-noida.html",
    "it-support-greater-noida-west.html":      "it-support-noida.html",
    "it-support-noida-sector-62.html":         "it-support-noida.html",
    "it-support-noida-sector-63.html":         "it-support-noida.html",
    "it-support-noida-expressway.html":        "it-support-noida.html",
    "it-support-aerocity-delhi.html":          "it-support-delhi.html",
    "it-support-dwarka-delhi.html":            "it-support-delhi.html",
    "it-support-indirapuram.html":             "it-support.html",
    "it-support-nehru-place-delhi.html":       "it-support-delhi.html",
    "managed-it-services-greater-noida.html":  "managed-it-services-noida.html",
    "managed-it-services-gurugram.html":       "managed-services.html",
    "managed-it-services-cost-delhi-ncr.html": "pricing.html",
    "data-recovery-noida.html":                "repair-services.html",
    "printer-repair-noida.html":               "repair-services.html",
    "computer-repair-gurugram.html":           "repair-services.html",
    "laptop-computer-repair-noida.html":       "repair-services.html",
    "laptop-repair-delhi.html":                "repair-services.html",
    "laptop-repair-noida-tips.html":           "blog.html",
    "macbook-apple-repair-noida.html":         "repair-services.html",
    "macbook-repair-noida.html":               "repair-services.html",
    "refurbished-laptops-noida.html":          "products.html",
    "google-workspace-noida.html":             "google-workspace.html",
    "microsoft-365-office-365-noida.html":     "microsoft-365.html",
    "microsoft-365-benefits-noida-business.html": "microsoft-365.html",
    "jumpcloud-support-noida.html":            "it-security.html",
    "software-solutions-noida.html":           "custom-software.html",
    "tally-provider-noida.html":               "zoho-suite.html",
    "networking-cabling-wifi-noida.html":      "network-infrastructure.html",
    "server-management-noida-business.html":   "managed-servers.html",
    "cybersecurity-threats-sme-noida-2026.html": "it-security.html",
    "cloud-vs-on-premise-delhi-sme.html":      "cloud-services.html",
    "how-to-choose-it-support-company-noida.html": "it-support.html",
    "it-security-checklist-delhi-ncr.html":    "it-security.html",
    # Pages that never existed (broken before our changes)
    "apple-macbook-delhi-ncr.html":            "apple-products-page.html",
    "dell-laptops-delhi-ncr.html":             "dell-laptops-page.html",
    "hp-laptops-servers-delhi-ncr.html":       "hp-products-page.html",
    "lenovo-thinkpad-delhi-ncr.html":          "lenovo-products-page.html",
    "chromebooks-delhi-ncr.html":              "chromebooks-page.html",
    "google-workspace-delhi-ncr.html":         "google-workspace.html",
    "microsoft-365-delhi-ncr.html":            "microsoft-365.html",
}

# Verify all targets exist
existing = set(glob.glob("*.html"))
for src, tgt in REMAP.items():
    if tgt not in existing:
        print(f"⚠ Target {tgt} does not exist — remap of {src} will still be broken!")

# Apply remaps
changed_files = 0
total_replacements = 0
for f in sorted(existing):
    with open(f, 'r', encoding='utf-8') as fh:
        text = fh.read()
    original = text
    file_replacements = 0
    for old, new in REMAP.items():
        # Match href="old" or href='old' or href="./old" — all variants
        for pattern in [f'href="{old}"', f"href='{old}'", f'href="./{old}"']:
            cnt = text.count(pattern)
            if cnt:
                replacement = pattern.replace(old, new)
                text = text.replace(pattern, replacement)
                file_replacements += cnt
    if text != original:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(text)
        changed_files += 1
        total_replacements += file_replacements

print(f"\n✓ Remapped {total_replacements} links across {changed_files} files.")
