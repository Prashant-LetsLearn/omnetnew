#!/bin/bash
# ============================================================
# OMNET IT — Push updated codebase to GitHub
# Run this from the repo root after extracting the ZIP.
# ============================================================

set -e

echo "=== OMNET IT Solutions — GitHub Push Script ==="
echo ""

# 1. Ensure git is initialised
if [ ! -d ".git" ]; then
  echo "Initialising git..."
  git init
  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
  echo "⚠  Update the remote URL above before running this script."
fi

# 2. Stage all changes
git add -A

# 3. Commit
git commit -m "fix: update contact details, fix JSON-LD, redesign hero, fix all old phone numbers

- Replace all instances of +91 97172 70865 → +91 89206 03270
- Replace all instances of +91 99717 76428 → removed (consolidated)
- Replace all instances of +91 98183 91080 → removed (consolidated)
- Replace info@omnetit.in → hello@omnetit.in globally
- Update all WhatsApp links to 918920603270
- Fix 490 JSON-LD blocks (all now valid JSON)
- Remove unverified aggregateRating from schema
- Soften unverified '500+ businesses' claim
- Fix broken tel: links in contact.html and about.html
- Homepage hero redesigned: 3 primary service cards, correct CTAs
- CHANGES.md documents all modifications

Fixes: contact details, JSON-LD validation, hero layout, brand claims"

# 4. Push
git push origin main

echo ""
echo "✅ Done! Check your GitHub repository."
