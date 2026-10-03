#!/usr/bin/env python3
"""
Idempotent injector: adds the OMNET i18n stylesheet + script includes to
every .html page in this directory.

  - <link rel="stylesheet" href="i18n.css">   inserted before </head>
  - <script src="i18n.js" defer></script>     inserted before </body>

Safe to run repeatedly: a page that already contains either include is
skipped for that include. Re-runnable after future edits.
"""
import glob
import re
import sys

CSS_TAG = '    <link rel="stylesheet" href="i18n.css">\n'
JS_TAG = '    <script src="i18n.js" defer></script>\n'

added_css = added_js = skipped = 0
touched = []

for path in sorted(glob.glob("*.html")):
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()
    original = html
    changed = False

    # CSS: insert before the first </head> if not already present
    if "i18n.css" not in html:
        if re.search(r"</head>", html, flags=re.IGNORECASE):
            html = re.sub(r"(</head>)", CSS_TAG + r"\1", html,
                          count=1, flags=re.IGNORECASE)
            changed = True
            globals()["added_css"] += 1
        else:
            print(f"  ! {path}: no </head> found, CSS not added", file=sys.stderr)

    # JS: insert before the last </body> if not already present
    if "i18n.js" not in html:
        m = list(re.finditer(r"</body>", html, flags=re.IGNORECASE))
        if m:
            last = m[-1]
            html = html[:last.start()] + JS_TAG + html[last.start():]
            changed = True
            globals()["added_js"] += 1
        else:
            print(f"  ! {path}: no </body> found, JS not added", file=sys.stderr)

    if changed and html != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(html)
        touched.append(path)
    else:
        skipped += 1

print(f"Pages touched : {len(touched)}")
print(f"CSS includes added: {added_css}")
print(f"JS includes added : {added_js}")
print(f"Pages skipped (already done): {skipped}")
