#!/usr/bin/env python3
"""
OMNET IT — bulk transformation script.
Applies location scrub, email fix, format-detection fix, schema overhaul to all
surviving HTML pages EXCEPT contact.html (which keeps office address).
"""
import os, re, glob, html as htmllib

ROOT = "/home/claude/omnet-final"
os.chdir(ROOT)

# Pages that should keep Delhi mentions (office address) — handled separately
SKIP_FULL_REWRITE = {"contact.html"}
# Pages that are city-targeted SEO landings — we keep them but they may keep some city
# refs since they're intentionally city-targeted. We'll still scrub the most egregious
# (footers, generic descriptions) but leave the H1 / hero geo intact.
CITY_PAGES = {
    "it-support-noida.html", "it-support-delhi.html", "it-support-gurugram.html",
    "managed-it-services-noida.html", "managed-it-services-delhi.html",
}

# =====================================================================
# REPLACEMENTS — ordered. Earlier replacements run first.
# =====================================================================
GLOBAL_REPLACEMENTS = [
    # Email — replace hello@ with info@ everywhere
    (r"hello@omnetit\.in", "info@omnetit.in"),
    (r"aGVsbG8=", "aW5mbw=="),  # base64(hello) → base64(info), for any leftover obfuscation
    # Phone meta-detection bug
    (r'<meta name="format-detection" content="telephone=no"\s*/?>', '<meta name="format-detection" content="telephone=yes">'),
    # email-obfuscation.js script — remove (we now use plain mailto)
    (r'<script[^>]*src="email-obfuscation\.js"[^>]*></script>\s*', ''),
    (r'<script[^>]*src="\./email-obfuscation\.js"[^>]*></script>\s*', ''),
]

# Replacements for non-city pages only (the city pages keep their geo)
NON_CITY_REPLACEMENTS = [
    # Title / heading geo
    (r"Managed IT Services Delhi NCR", "Managed IT Services Across India"),
    (r"Managed IT Services in Delhi NCR", "Managed IT Services Across India"),
    (r"IT Services Delhi NCR", "IT Services Across India"),
    (r"IT Support Delhi NCR", "IT Support Across India"),
    (r"500\+ Delhi NCR businesses", "500+ businesses across India"),
    (r"500\+ Delhi NCR Businesses", "500+ Businesses Across India"),
    (r"500\+ businesses across Delhi NCR", "500+ businesses across India"),
    (r"businesses across Delhi NCR", "businesses across India"),
    (r"Businesses Across Delhi NCR", "Businesses Across India"),
    (r"Delhi NCR Businesses", "Businesses Across India & Globally"),
    (r"4-hour onsite anywhere in NCR", "Remote support nationwide · Onsite available pan India"),
    (r"4-hour onsite anywhere in Delhi NCR", "Remote support nationwide · Onsite available pan India"),
    (r"onsite anywhere in NCR", "onsite available pan India"),
    (r"across Delhi NCR since 2016", "across India and globally since 2016"),
    (r"across Delhi NCR", "across India and globally"),
    (r"in Delhi NCR", "across India"),
    (r"throughout Delhi NCR", "across India"),
    (r"serving Delhi NCR", "serving clients pan India & globally"),
    (r"Delhi NCR and", "India and"),
    (r"Delhi NCR\.", "India and globally."),
    (r"Delhi NCR,", "India,"),
    (r"Delhi NCR ", "India "),
    (r"\bDelhi NCR\b", "India"),
    # Specific city groupings
    (r"across Delhi, Noida, Gurugram, Ghaziabad and Faridabad", "across India and internationally"),
    (r"across Delhi, Noida, Gurugram, Ghaziabad, and Faridabad", "across India and internationally"),
    (r"Delhi, Noida, Gurugram, Ghaziabad and Faridabad", "Pan India"),
    (r"Delhi, Noida, Gurugram, Ghaziabad, Faridabad", "Pan India"),
    (r"Delhi · Noida · Gurugram · Ghaziabad · Faridabad", "Pan India · Global"),
    (r"Noida, Gurugram, Ghaziabad and Faridabad", "Pan India"),
    # Geo meta tags — neutralise to India-level (remove the NCR/Delhi specifics)
    (r'<meta name="geo\.region" content="IN-DL"\s*/?>', '<meta name="geo.region" content="IN">'),
    (r'<meta name="geo\.placename" content="New Delhi, Delhi NCR"\s*/?>', '<meta name="geo.placename" content="India">'),
    (r'<meta name="geo\.placename" content="New Delhi"\s*/?>', '<meta name="geo.placename" content="India">'),
    (r'<meta name="geo\.placename" content="Delhi NCR"\s*/?>', '<meta name="geo.placename" content="India">'),
    # Remove ICBM and position (lat/long) on non-contact pages
    (r'<meta name="geo\.position" content="[^"]+"\s*/?>\s*', ''),
    (r'<meta name="ICBM" content="[^"]+"\s*/?>\s*', ''),
    # Schema overhauls — flip LocalBusiness to ProfessionalService
    (r'"@type":\s*\["LocalBusiness", "ProfessionalService", "Organization"\]',
     '"@type": ["ProfessionalService", "Organization"]'),
    (r'"@type":\s*\["LocalBusiness",\s*"ProfessionalService",\s*"Organization"\]',
     '"@type": ["ProfessionalService", "Organization"]'),
    # areaServed adjustments
    (r'"areaServed":\s*"Delhi NCR"', '"areaServed": ["India", "Global"]'),
    (r'"areaServed":\s*\[\s*"Delhi"[^\]]*\]', '"areaServed": ["India", "Global"]'),
    # Footer brand tagline
    (r"CERT-In empanelled IT support, managed services and authorised hardware reseller across Delhi NCR\.",
     "CERT-In empanelled IT support, managed services and authorised hardware reseller — serving clients pan India and globally via remote & onsite delivery."),
    (r"managed IT, AMC, cybersecurity (?:&amp;|and) cloud for 500\+ Delhi NCR businesses",
     "managed IT, AMC, cybersecurity & cloud for 500+ businesses across India and globally"),
    # Keywords meta tag
    (r'managed IT services Delhi NCR', 'managed IT services India'),
    (r'IT support Noida', 'remote IT support India'),
    (r'AMC Delhi NCR', 'AMC India'),
    (r'cybersecurity services Delhi', 'cybersecurity services India'),
    (r'cloud services Gurugram', 'cloud services India'),
    (r'Microsoft 365 partner Delhi', 'Microsoft 365 partner India'),
    (r'Google Workspace partner Noida', 'Google Workspace partner India'),
    (r'managed service provider Delhi', 'managed service provider India'),
    # Hero copy phrasing
    (r"Managed IT Services (?:&amp;|&|and) 24×7 Support for Delhi NCR Businesses",
     "Managed IT Services & 24×7 Support for Businesses Across India & Globally"),
]

# Footer Locations column — full strip on non-city pages (replace with quick-links column)
FOOTER_LOCATIONS_BLOCK = re.compile(
    r'<div class="footer-col">\s*<h4>Locations</h4>\s*<ul>.*?</ul>\s*</div>',
    re.DOTALL
)
FOOTER_LOCATIONS_REPLACEMENT = '''<div class="footer-col">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="services.html"><i class="ri-arrow-right-s-line"></i>All Services</a></li>
        <li><a href="about.html"><i class="ri-arrow-right-s-line"></i>About Us</a></li>
        <li><a href="pricing.html"><i class="ri-arrow-right-s-line"></i>Pricing</a></li>
        <li><a href="shop.html"><i class="ri-arrow-right-s-line"></i>Shop</a></li>
        <li><a href="contact.html"><i class="ri-arrow-right-s-line"></i>Contact</a></li>
      </ul>
    </div>'''

# Email obfuscation footer item — replace with plain visible mailto
EMAIL_OBFUSC_BLOCK = re.compile(
    r'<div class="footer-contact-item"><i class="ri-mail-line"></i><div><div class="label">Email</div><div class="value"><span class="omnet-email"[^>]*>.*?</span></div></div></div>',
    re.DOTALL
)
EMAIL_VISIBLE_REPLACEMENT = '<div class="footer-contact-item"><i class="ri-mail-line"></i><div><div class="label">Email</div><div class="value"><a href="mailto:info@omnetit.in" style="color:var(--teal-400);text-decoration:none;font-weight:600">info@omnetit.in</a></div></div></div>'

# Office address footer item — replace location tagline on non-contact pages
OFFICE_FOOTER_BLOCK = re.compile(
    r'<div class="footer-contact-item"><i class="ri-map-pin-line"></i><div><div class="label">Office</div><div class="value">405B, Skylark Building,<br/?>\s*60 Nehru Place, New Delhi 110019</div></div></div>',
    re.DOTALL
)
OFFICE_FOOTER_REPLACEMENT_NONCONTACT = '<div class="footer-contact-item"><i class="ri-global-line"></i><div><div class="label">Coverage</div><div class="value">Pan India · Remote &amp; Onsite<br>Global Clients Welcome</div></div></div>'


def transform(path: str) -> bool:
    """Transform an HTML file. Returns True if changed."""
    fname = os.path.basename(path)
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    original = text

    # Apply global replacements everywhere
    for pat, repl in GLOBAL_REPLACEMENTS:
        text = re.sub(pat, repl, text)

    # Skip aggressive geo-scrub on city pages and contact page
    if fname not in CITY_PAGES and fname not in SKIP_FULL_REWRITE:
        for pat, repl in NON_CITY_REPLACEMENTS:
            text = re.sub(pat, repl, text)
        # Footer locations → quick links
        text = FOOTER_LOCATIONS_BLOCK.sub(FOOTER_LOCATIONS_REPLACEMENT, text)
        # Office footer block → coverage tagline (non-contact pages)
        text = OFFICE_FOOTER_BLOCK.sub(OFFICE_FOOTER_REPLACEMENT_NONCONTACT, text)
    elif fname in CITY_PAGES:
        # On city pages: still fix the email obfuscation and format-detection,
        # but leave geo phrasing intact since those pages are intentionally local.
        pass

    # Email obfuscation block → visible mailto (everywhere including city pages and contact)
    text = EMAIL_OBFUSC_BLOCK.sub(EMAIL_VISIBLE_REPLACEMENT, text)

    # Strip excessive whitespace patterns
    text = re.sub(r'(<br>\s*){3,}', '<br><br>', text)
    text = re.sub(r'<p>&nbsp;</p>\s*', '', text)
    text = re.sub(r'<div>\s*</div>\s*', '', text)

    if text != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(text)
        return True
    return False


def main():
    html_files = sorted(glob.glob("*.html"))
    changed = 0
    for f in html_files:
        if transform(f):
            changed += 1
            print(f"  ✓ {f}")
        else:
            print(f"  · {f} (unchanged)")
    print(f"\nTotal: {changed}/{len(html_files)} HTML files modified.")


if __name__ == "__main__":
    main()
