#!/usr/bin/env python3
"""Add Software & Web and Cloud & Email dropdowns to navigation on all surviving pages.

We don't want to touch the brand-new 9 service pages (they already have these dropdowns).
We also handle two structural variations: pages with the full "Services" dropdown vs pages
with a simpler nav structure.
"""
import os, re, glob

ROOT = "/home/claude/omnet-final"
os.chdir(ROOT)

NEW_SERVICE_PAGES = {
    "custom-software.html", "website-design.html", "app-development.html",
    "email-licensing.html", "email-migration.html", "google-workspace.html",
    "microsoft-365.html", "zoho-suite.html", "professional-email.html",
}

NEW_DROPDOWNS = '''      <div class="nav-dropdown">
        <button class="dropdown-btn">Software &amp; Web <i class="ri-arrow-down-s-line"></i></button>
        <div class="dropdown-menu"><div class="dropdown-menu-inner" style="min-width:260px">
          <a href="custom-software.html"><i class="ri-code-box-line"></i>Custom Software</a>
          <a href="website-design.html"><i class="ri-layout-4-line"></i>Website Design &amp; Dev</a>
          <a href="app-development.html"><i class="ri-smartphone-line"></i>Mobile App Development</a>
        </div></div>
      </div>
      <div class="nav-dropdown">
        <button class="dropdown-btn">Cloud &amp; Email <i class="ri-arrow-down-s-line"></i></button>
        <div class="dropdown-menu"><div class="dropdown-menu-inner" style="min-width:260px">
          <a href="google-workspace.html"><i class="ri-google-line"></i>Google Workspace</a>
          <a href="microsoft-365.html"><i class="ri-microsoft-line"></i>Microsoft 365</a>
          <a href="zoho-suite.html"><i class="ri-apps-2-line"></i>Zoho Suite</a>
          <a href="professional-email.html"><i class="ri-mail-star-line"></i>Professional Email</a>
          <a href="email-licensing.html"><i class="ri-key-2-line"></i>Email Licensing</a>
          <a href="email-migration.html"><i class="ri-mail-send-line"></i>Email Migration</a>
        </div></div>
      </div>'''

# We anchor on the existing "Services" dropdown closing and insert ours right after.
# Pattern: the Services dropdown closes with </div></div></div> followed by either Shop link
# or the next dropdown. Look for the specific Services dropdown signature.

SERVICES_DD_PATTERN = re.compile(
    r'(<div class="nav-dropdown">\s*<button class="dropdown-btn">Services\s*<i class="ri-arrow-down-s-line"></i></button>'
    r'.*?<a href="it-hardware-rental\.html"><i class="ri-computer-line"></i>IT Hardware Rental</a>\s*'
    r'</div>\s*</div>\s*</div>)',
    re.DOTALL
)

def add_new_dropdowns(text: str) -> tuple[str, bool]:
    # Don't double-insert
    if 'dropdown-btn">Software &amp; Web' in text:
        return text, False
    new_text, count = SERVICES_DD_PATTERN.subn(r'\1\n' + NEW_DROPDOWNS, text, count=1)
    return new_text, count > 0


def main():
    changed = 0
    total = 0
    for f in sorted(glob.glob("*.html")):
        if f in NEW_SERVICE_PAGES:
            continue
        total += 1
        with open(f, "r", encoding="utf-8") as fh:
            text = fh.read()
        new_text, did_change = add_new_dropdowns(text)
        if did_change:
            with open(f, "w", encoding="utf-8") as fh:
                fh.write(new_text)
            changed += 1
            print(f"  ✓ {f}")
        else:
            print(f"  · {f} (no Services dropdown match — skipped)")
    print(f"\nNav update: {changed}/{total} files extended.")


if __name__ == "__main__":
    main()
