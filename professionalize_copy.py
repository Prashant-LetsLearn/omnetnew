#!/usr/bin/env python3
"""Apply reviewed, mechanical copy and structured-data cleanups."""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

REPLACEMENTS = {
    "Trusted IT Partner for 500+ Businesses Across India &amp; Globally": "Managed IT Support for Businesses Across Delhi NCR",
    "Trusted IT Partner for 500+ Businesses Across India": "Managed IT Support for Businesses Across Delhi NCR",
    "Trusted IT Partner for 500+ Delhi NCR Businesses": "Managed IT Support for Businesses Across Delhi NCR",
    "Since 2016 we've delivered IT, software, and security work for 500+ businesses across India and internationally. Written SLAs. Single GST invoice. One escalation path.": "Since 2016, we've delivered IT, software, and security projects for businesses across India and internationally. Written SLAs. Clear invoicing. One escalation path.",
    "Website Designing &amp; Development": "Website Design &amp; Development",
    "Website Designing & Development": "Website Design & Development",
    "CERT-In empanelled. growing businesses.": "CERT-In empanelled services for growing businesses.",
    "Guaranteed first-response time for remote support tickets.": "Contracted first-response target for eligible remote support tickets.",
    "Tooling rollout and full documentation. RMM, helpdesk portal, monitoring, and security baseline deployed in parallel with your existing IT. Zero downtime guaranteed.": "Tooling rollout and full documentation. RMM, helpdesk, monitoring, and the security baseline are deployed alongside your existing IT to minimize disruption.",
    "OMNET HQ at Nehru Place — India's largest IT hub": "Visit OMNET IT Solutions at Nehru Place",
    "Remote support delivered 24/7 across every Indian state and to international clients. Onsite engineers dispatched pan India for hardware, infrastructure, and project work.": "Remote support is available across India and for international clients. Onsite support can be arranged for hardware, infrastructure, and project work, subject to location and scope.",
    "Don't see your city? Remote support reaches every Indian PIN code. Onsite arranged on request.": "Outside our listed service areas? Remote support is available across India, and onsite visits can be arranged on request.",
    "across India and globally": "across India and internationally",
    "Across India &amp; Globally": "Across India &amp; Internationally",
    "Across India & Globally": "Across India & Internationally",
    "India's largest IT hub": "a major business and technology hub",
    "20-minute remote response, 4-hour onsite support across Delhi NCR and globally — SLA-backed on every plan.": "Response targets are defined by plan and location, with remote and onsite support options available.",
    "Noida (All Sectors 2–168) &bull; Greater Noida (Alpha, Beta, Gamma, Delta, Ecotech 1–14, Mahila Udyami Park, Kasna, Pari Chowk) &bull; Noida Extension &bull; Gurugram &bull; Delhi &bull; Aerocity &bull; Connaught Place &bull; Ghaziabad &bull; Indirapuram &bull; Vaishali &bull; Faridabad": "Noida and Greater Noida &bull; Gurugram &bull; Delhi, including Connaught Place and Aerocity &bull; Ghaziabad &bull; Faridabad",
    '<div class="hero-stat-item"><div class="num">4.9 / 5</div><div class="lbl">Client rating (verified reviews)</div></div>': '<div class="hero-stat-item"><div class="num">Written SLAs</div><div class="lbl">For managed service plans</div></div>',
    '<div class="num-card"><div class="n">4.9 / 5</div><div class="t">Average Client Rating</div></div>': '<div class="num-card"><div class="n">References</div><div class="t">Available on Request</div></div>',
    '<div><div class="n">4.9/5</div><div class="t">Google Rating (verified reviews)</div></div>': '<div><div class="n">24/7</div><div class="t">Helpdesk Availability</div></div>',
    '<div class="omn-vb__t"><i class="ri-star-fill"></i><strong>4.9/5</strong><span>verified reviews</span></div>': '<div class="omn-vb__t"><i class="ri-file-list-3-line"></i><strong>Written SLAs</strong><span>on managed plans</span></div>',
    '<div class="omn-trust-stat"><div class="num">4.9/5</div><div class="lbl">Average client rating</div></div>': '<div class="omn-trust-stat"><div class="num">Since 2016</div><div class="lbl">Supporting businesses</div></div>',
}


def clean_structured_data(value, visible_text: str):
    if isinstance(value, dict):
        value.pop("aggregateRating", None)
        if value.get("price") in (0, "0"):
            value.pop("price", None)
        if isinstance(value.get("@graph"), list):
            value["@graph"] = [
                child for child in value["@graph"]
                if not (
                    isinstance(child, dict)
                    and child.get("@type") == "FAQPage"
                    and any(
                        question.get("name", "") not in visible_text
                        for question in child.get("mainEntity", [])
                        if isinstance(question, dict)
                    )
                )
            ]
        for child in value.values():
            clean_structured_data(child, visible_text)
    elif isinstance(value, list):
        for child in value:
            clean_structured_data(child, visible_text)


def clean_jsonld(match: re.Match[str], visible_text: str) -> str:
    opening, payload, closing = match.groups()
    try:
        data = json.loads(payload)
    except json.JSONDecodeError:
        return match.group(0)
    if data.get("@type") == "FAQPage" and any(
        question.get("name", "") not in visible_text
        for question in data.get("mainEntity", [])
        if isinstance(question, dict)
    ):
        return ""
    clean_structured_data(data, visible_text)
    return opening + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + closing


def clean_file(path: Path) -> bool:
    original = path.read_text(encoding="utf-8")
    updated = original
    for old, new in REPLACEMENTS.items():
        updated = updated.replace(old, new)
    visible_text = re.sub(r"<script\b[^>]*>.*?</script>", " ", updated, flags=re.I | re.S)
    updated = re.sub(
        r'(<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>)(.*?)(</script>)',
        lambda match: clean_jsonld(match, visible_text),
        updated,
        flags=re.IGNORECASE | re.DOTALL,
    )
    if updated != original:
        path.write_text(updated, encoding="utf-8")
        return True
    return False


def main() -> None:
    changed = []
    for path in sorted(ROOT.glob("*.html")):
        if clean_file(path):
            changed.append(path.name)
    print(f"Updated {len(changed)} HTML files")
    for name in changed:
        print(name)


if __name__ == "__main__":
    main()
