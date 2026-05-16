#!/usr/bin/env python3
"""Generate 9 new service stub pages with consistent styling."""
import os

ROOT = "/home/claude/omnet-final"
os.chdir(ROOT)

SERVICES = [
    {
        "slug": "custom-software",
        "title": "Custom Software Development",
        "icon": "ri-code-box-line",
        "tagline": "Software Built Around Your Workflow",
        "short": "Tailor-made software solutions built for your business workflows — web apps, portals, ERP, CRM and more.",
        "meta_desc": "Custom software development across India & globally — bespoke web apps, business portals, ERP, CRM, and workflow automation. CERT-In empanelled IT partner.",
        "keywords": "custom software development India, bespoke software India, web application development, ERP development, CRM development, business automation India, software development company India, custom CRM India, workflow software India, Pan India software developer",
        "hero_paragraph": "Off-the-shelf software stops where your real workflow begins. We build production-grade custom software — web apps, internal portals, ERP modules, CRM systems and workflow automation — designed around how your team actually works.",
        "features": [
            ("Web Applications", "Multi-tenant SaaS, dashboards, internal tools, customer portals."),
            ("Business Portals", "Vendor portals, partner portals, customer self-service hubs."),
            ("ERP Customisation", "Custom ERP modules, integrations with Tally, SAP, Zoho, Odoo."),
            ("CRM Solutions", "Sales pipelines, lead scoring, opportunity management, custom reports."),
            ("Workflow Automation", "Approval chains, document routing, scheduled jobs, notifications."),
            ("API Integration", "REST/GraphQL APIs, third-party platform integration, data sync."),
        ],
        "stack": "React · Next.js · Node.js · Python · Django · Laravel · PostgreSQL · MySQL · MongoDB · AWS · Azure",
    },
    {
        "slug": "website-design",
        "title": "Website Designing & Development",
        "icon": "ri-layout-4-line",
        "tagline": "Websites That Actually Convert",
        "short": "Professional, responsive, and SEO-friendly websites for businesses of all sizes.",
        "meta_desc": "Professional website design & development across India and globally. Responsive, fast, SEO-optimised business websites, landing pages, and e-commerce stores.",
        "keywords": "website design India, website development India, responsive web design, SEO friendly website, business website India, e-commerce website India, web design company India, Pan India website designer, WordPress development India",
        "hero_paragraph": "A website is the first interview your business gets with most prospects. We design and build fast, accessible, mobile-first websites — corporate sites, landing pages, product showcases and full e-commerce — that load fast on Indian mobile networks and rank for the searches that matter.",
        "features": [
            ("Corporate & Business Websites", "Marketing sites, product pages, services pages, case studies."),
            ("Landing Pages", "High-conversion campaign pages for ads & launches."),
            ("E-Commerce Stores", "WooCommerce, Shopify, custom stores with Indian payment gateways."),
            ("Mobile-First Responsive", "Looks correct on every device from 320px upward."),
            ("Core Web Vitals Optimised", "LCP < 2.5s · CLS < 0.1 · INP < 200ms."),
            ("On-Page SEO Built In", "Semantic markup, schema, sitemaps, OG tags, alt text discipline."),
        ],
        "stack": "HTML5 · CSS3 · JavaScript · React · Next.js · WordPress · Shopify · WooCommerce · Tailwind · Webflow",
    },
    {
        "slug": "app-development",
        "title": "Mobile App Development",
        "icon": "ri-smartphone-line",
        "tagline": "Apps That Ship and Scale",
        "short": "Android & iOS apps designed for performance, usability, and business growth.",
        "meta_desc": "Mobile app development for Android & iOS across India and globally. Native and cross-platform apps for startups, SMEs and enterprises.",
        "keywords": "mobile app development India, Android app development, iOS app development, Flutter developer India, React Native India, cross platform app development, mobile app company India, enterprise app development, Pan India app developer",
        "hero_paragraph": "We build mobile apps for the way users actually behave — fast launch, offline tolerance, low data consumption, and clean UX. Cross-platform when it fits, native when performance demands it.",
        "features": [
            ("Native Android", "Kotlin, Jetpack Compose, Material 3 — built for Play Store distribution."),
            ("Native iOS", "Swift, SwiftUI — built for App Store distribution and TestFlight."),
            ("Cross-Platform", "Flutter & React Native — one codebase, both stores."),
            ("Backend APIs", "REST/GraphQL, real-time sync, push notifications, deep links."),
            ("App Store Submission", "Listing, screenshots, ASO, review-response handling."),
            ("Post-Launch Support", "Crash analytics, OS-version drift, store update cadence."),
        ],
        "stack": "Kotlin · Swift · Flutter · React Native · Firebase · AWS Amplify · Supabase · OneSignal",
    },
    {
        "slug": "email-licensing",
        "title": "Email Licensing",
        "icon": "ri-key-2-line",
        "tagline": "Genuine Licences. Authorised Channels.",
        "short": "Authorised licensing for business email platforms — Google Workspace, Microsoft 365, Zoho Mail, and more.",
        "meta_desc": "Authorised business email licensing across India — Google Workspace, Microsoft 365, Zoho Mail, Exchange Online. Discounted volume pricing, single invoice, GST input.",
        "keywords": "email licensing India, Google Workspace license, Microsoft 365 license, Zoho Mail license, business email license India, email subscription India, M365 reseller India, Workspace reseller India",
        "hero_paragraph": "Stop buying licences direct and losing the support layer. We're an authorised reseller for Google Workspace, Microsoft 365, Zoho Mail and Exchange Online — same prices (or better), one consolidated GST invoice, and a dedicated escalation path when something breaks.",
        "features": [
            ("Google Workspace Licences", "Business Starter / Standard / Plus, Enterprise, Frontline."),
            ("Microsoft 365 Licences", "Business Basic / Standard / Premium, E1 / E3 / E5."),
            ("Zoho Mail Licences", "Mail Lite, Mail Premium, Zoho Workplace, Zoho One."),
            ("Exchange Online", "Plan 1, Plan 2, Exchange Online Kiosk."),
            ("Volume Discounts", "Tiered pricing for 25+ seats, annual commitments."),
            ("Single GST Invoice", "Consolidated billing, full input tax credit, no cross-border headaches."),
        ],
        "stack": "Google Workspace · Microsoft 365 · Zoho Mail · Exchange Online · Outlook · Gmail",
    },
    {
        "slug": "email-migration",
        "title": "Email Migration",
        "icon": "ri-mail-send-line",
        "tagline": "Migrate Email. Don't Lose a Message.",
        "short": "Seamless, zero-downtime migration between Google Workspace, Microsoft 365, Zoho, cPanel, and any email platform.",
        "meta_desc": "Zero-downtime email migration across India — Google Workspace ⇄ Microsoft 365 ⇄ Zoho ⇄ cPanel. Mail, calendar, contacts, shared drives, and folder structure preserved.",
        "keywords": "email migration India, Google Workspace to Microsoft 365 migration, Microsoft 365 to Google Workspace migration, Zoho mail migration, cPanel email migration, email migration service India, Pan India email migration",
        "hero_paragraph": "Email migrations fail in predictable ways — lost mail, broken calendar invites, missing shared drives, MX cutover that breaks Monday morning. We've migrated hundreds of mailboxes. Every migration ships with a pre-cutover dry run, post-cutover reconciliation, and 48-hour parallel-running safety net.",
        "features": [
            ("Pre-Migration Audit", "Mailbox sizing, attachment patterns, alias map, distribution lists."),
            ("Mail + Calendar + Contacts", "Full migration of all three, not just inbox."),
            ("Shared Drives & SharePoint", "Google Drive ⇄ OneDrive ⇄ SharePoint ⇄ Zoho WorkDrive."),
            ("Zero-Downtime Cutover", "Pre-stage everything, switch MX off-hours, no Monday surprises."),
            ("48-Hour Parallel Run", "Old mailbox kept live for 48h post-cutover for safety."),
            ("Reconciliation Report", "Item-count diff, missing-item triage, sign-off document."),
        ],
        "stack": "BitTitan MigrationWiz · Google Workspace Migrate · MS Migration Manager · Cloudfuze · Zoho Migration Wizard",
    },
    {
        "slug": "google-workspace",
        "title": "Google Workspace Setup & Support",
        "icon": "ri-google-line",
        "tagline": "Authorised Google Workspace Partner",
        "short": "Official Google Workspace partner — setup, admin, migration, and ongoing support.",
        "meta_desc": "Authorised Google Workspace partner across India — setup, admin console hardening, user provisioning, migration, ongoing support. Pan India and global delivery.",
        "keywords": "Google Workspace partner India, Google Workspace setup, Google Workspace admin India, Gmail business setup, Google Workspace support India, GSuite India, Workspace India, Pan India Google Workspace",
        "hero_paragraph": "Google Workspace is more than Gmail — it's calendar, drive, meet, admin console, and a hundred security toggles most teams never touch. We're an authorised Workspace partner: licensing, deployment, MDM, 2SV/SSO, DLP, retention, vault — and ongoing admin support so your team isn't googling for help.",
        "features": [
            ("Tenant Provisioning", "Domain verification, MX records, DKIM/SPF/DMARC, custom URL routing."),
            ("Admin Console Hardening", "2SV enforcement, context-aware access, OAuth app whitelist, recovery."),
            ("User & Group Management", "Org units, dynamic groups, delegated admin, lifecycle automation."),
            ("Mobile Device Management", "Advanced MDM, app whitelist, remote wipe, work profile."),
            ("Vault & Retention", "Legal hold, retention policies, e-discovery, audit logs."),
            ("Ongoing L1–L3 Support", "Helpdesk, end-user issues, admin escalations, monthly reviews."),
        ],
        "stack": "Gmail · Drive · Meet · Calendar · Admin Console · Vault · GAM · Endpoint Manager",
    },
    {
        "slug": "microsoft-365",
        "title": "Microsoft 365 Setup & Support",
        "icon": "ri-microsoft-line",
        "tagline": "Microsoft 365 — Done Properly",
        "short": "Microsoft 365 deployment, licensing, Teams, OneDrive, Exchange setup and management.",
        "meta_desc": "Microsoft 365 deployment and support across India — Exchange Online, Teams, OneDrive, SharePoint, Intune, Entra ID. Authorised partner, Pan India and global delivery.",
        "keywords": "Microsoft 365 India, Microsoft 365 setup India, M365 partner India, Office 365 India, Teams setup India, Intune India, Entra ID India, Exchange Online India, Pan India Microsoft 365",
        "hero_paragraph": "Microsoft 365 only delivers when the admin centre is set up correctly. We deploy and operate full M365 estates — Exchange Online, Teams, OneDrive, SharePoint, Intune device management, Entra ID identity, Defender for Office, Purview compliance — for businesses across India and globally.",
        "features": [
            ("Tenant Setup & Domain", "Tenant provisioning, custom domain, MX, autodiscover, DKIM/SPF/DMARC."),
            ("Exchange Online", "Mailbox migration, mail flow rules, anti-spam, distribution lists, shared mailboxes."),
            ("Teams Deployment", "Teams policies, phone system, calling plans, meeting rooms."),
            ("OneDrive & SharePoint", "Sites, libraries, sync, sharing controls, governance."),
            ("Intune Device Management", "Windows/iOS/Android enrolment, compliance policies, app protection."),
            ("Entra ID & Defender", "Conditional access, MFA, identity protection, Defender for Office 365."),
        ],
        "stack": "Exchange Online · Teams · OneDrive · SharePoint · Intune · Entra ID · Defender · Purview · Power Platform",
    },
    {
        "slug": "zoho-suite",
        "title": "Zoho Suite Implementation",
        "icon": "ri-apps-2-line",
        "tagline": "Full Zoho Stack. One Implementation Partner.",
        "short": "Full Zoho suite setup — Zoho Mail, CRM, Books, People, Projects and more.",
        "meta_desc": "Zoho suite implementation across India — Zoho Mail, CRM, Books, People, Projects, Desk, Inventory. Authorised partner. Pan India and global delivery.",
        "keywords": "Zoho implementation India, Zoho partner India, Zoho CRM setup India, Zoho Books India, Zoho One India, Zoho Mail India, Zoho People India, Zoho Projects India, Pan India Zoho partner",
        "hero_paragraph": "Zoho is incredible value when implemented properly — and a maze when it isn't. We implement Zoho One end-to-end: Mail, CRM with sales workflows, Books with Indian GST compliance, People for HR, Projects for delivery, Desk for support. One stack, one bill, one partner.",
        "features": [
            ("Zoho Mail", "Custom-domain email, anti-spam, retention, mobile clients."),
            ("Zoho CRM", "Lead, deal & contact management, workflows, blueprints, integrations."),
            ("Zoho Books", "GST-compliant invoicing, e-invoice, e-way bill, bank feeds, reports."),
            ("Zoho People", "HRMS, leave & attendance, performance reviews, onboarding."),
            ("Zoho Projects", "Project planning, Gantt, time tracking, client portals."),
            ("Zoho One Bundle", "All 45+ apps under one licence — we configure what you actually use."),
        ],
        "stack": "Zoho Mail · CRM · Books · People · Projects · Desk · Inventory · Creator · Analytics · Flow",
    },
    {
        "slug": "professional-email",
        "title": "Professional Business Email",
        "icon": "ri-mail-star-line",
        "tagline": "Professional Email That Lands In The Inbox",
        "short": "Custom domain email setup with spam protection, DKIM/SPF/DMARC, and 24×7 support.",
        "meta_desc": "Professional business email setup across India — custom domain email, DKIM, SPF, DMARC, spam protection, mobile sync, 24×7 support. Pan India and global delivery.",
        "keywords": "professional business email India, custom domain email India, DKIM SPF DMARC India, business email setup India, anti spam email India, secure email India, Pan India email setup",
        "hero_paragraph": "you@yourcompany.com is the cheapest credibility upgrade your business can buy. We configure professional email properly — DKIM signing, SPF, DMARC enforcement, anti-phishing, anti-spam, mobile device sync, signature standards, retention — so your email lands in the inbox, not the spam folder.",
        "features": [
            ("Custom Domain Setup", "you@yourcompany.com on Google Workspace / Microsoft 365 / Zoho."),
            ("DKIM, SPF, DMARC", "Properly signed, aligned, enforced. p=reject when ready."),
            ("Anti-Spam & Anti-Phishing", "Sender reputation, link rewriting, attachment sandboxing."),
            ("Mobile & Desktop Sync", "iPhone, Android, Outlook, Mac Mail — set up correctly."),
            ("Email Signatures", "Centrally managed, branded, mobile-aware signature standards."),
            ("Retention & Archive", "Compliance-grade retention, legal hold, e-discovery if needed."),
        ],
        "stack": "Google Workspace · Microsoft 365 · Zoho Mail · Exchange · DKIM · SPF · DMARC · Mimecast · Proofpoint",
    },
]


# ─────────────────────────────────────────────────────────────────────
# Page template
# ─────────────────────────────────────────────────────────────────────
TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>{title} | OMNET IT Solutions — Pan India &amp; Global</title>
<meta name="description" content="{meta_desc}" />
<meta name="keywords" content="{keywords}" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
<meta name="author" content="OMNET IT Solutions" />
<meta name="format-detection" content="telephone=yes" />

<meta name="geo.region" content="IN" />
<meta name="geo.placename" content="India" />

<link rel="canonical" href="https://www.omnetit.in/{slug}.html" />
<link rel="alternate" hreflang="en-IN" href="https://www.omnetit.in/{slug}.html" />
<link rel="alternate" hreflang="x-default" href="https://www.omnetit.in/{slug}.html" />

<meta property="og:type" content="website" />
<meta property="og:title" content="{title} | OMNET IT Solutions" />
<meta property="og:description" content="{meta_desc}" />
<meta property="og:url" content="https://www.omnetit.in/{slug}.html" />
<meta property="og:image" content="https://www.omnetit.in/og-banner.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="OMNET IT Solutions" />
<meta property="og:locale" content="en_IN" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@omnetit" />
<meta name="twitter:title" content="{title} | OMNET IT Solutions" />
<meta name="twitter:description" content="{meta_desc}" />
<meta name="twitter:image" content="https://www.omnetit.in/og-banner.png" />

<meta name="theme-color" content="#0d9488" />

<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@graph": [
    {{
      "@type": ["ProfessionalService", "Organization"],
      "@id": "https://www.omnetit.in/#organization",
      "name": "OMNET IT Solutions",
      "url": "https://www.omnetit.in",
      "logo": "https://www.omnetit.in/logo.png",
      "telephone": ["+91-8920603270"],
      "email": "info@omnetit.in",
      "areaServed": ["India", "Global"]
    }},
    {{
      "@type": "Service",
      "serviceType": "{title}",
      "provider": {{ "@id": "https://www.omnetit.in/#organization" }},
      "areaServed": ["India", "Global"],
      "description": "{meta_desc}"
    }}
  ]
}}
</script>

<script async src="https://www.googletagmanager.com/gtag/js?id=G-GWE61BMZN1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('js', new Date());
  gtag('config', 'G-GWE61BMZN1');
</script>

<link rel="stylesheet" href="style.css" />
<link rel="stylesheet" href="design-system.css" />
<link rel="stylesheet" href="mobile-fixes.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.2.0/remixicon.min.css" />

<style>
.pg-hero{{background:linear-gradient(135deg,#0f4c5c 0%,#0d7377 55%,#14b8a6 100%);padding:146px 0 65px;color:#fff;text-align:center}}
.pg-hero h1{{font-size:clamp(1.9rem,4vw,2.8rem);font-weight:800;margin-bottom:1rem;line-height:1.15}}
.pg-hero p{{font-size:1.05rem;max-width:720px;margin:0 auto 2rem;color:rgba(255,255,255,.88);line-height:1.7}}
.pg-badge{{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);color:#fff;padding:.35rem 1.1rem;border-radius:2rem;font-size:.8rem;font-weight:700;display:inline-flex;align-items:center;gap:.4rem;margin-bottom:1.2rem}}
.hero-btns{{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}}
.hero-btns .btn-primary{{background:#fff;color:#0d7377;padding:.85rem 1.7rem;border-radius:.55rem;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;gap:.5rem;transition:all .25s}}
.hero-btns .btn-primary:hover{{transform:translateY(-2px);box-shadow:0 12px 30px rgba(0,0,0,.18)}}
.hero-btns .btn-ghost{{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.55);padding:.8rem 1.65rem;border-radius:.55rem;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;gap:.5rem;transition:all .25s}}
.hero-btns .btn-ghost:hover{{background:rgba(255,255,255,.12)}}
.section{{padding:60px 0}}
.section-sm{{padding:40px 0}}
.si{{max-width:1100px;margin:0 auto;padding:0 1.5rem}}
.lbl{{color:var(--teal-600);font-weight:700;font-size:.82rem;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.5rem}}
.ttl{{font-size:clamp(1.5rem,3vw,2.2rem);font-weight:800;color:var(--gray-900);margin-bottom:.9rem;line-height:1.2}}
.sub{{color:var(--gray-600);max-width:680px;margin-bottom:2.5rem;line-height:1.75}}
.feat-grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:1.5rem;margin-top:1.5rem}}
.feat-card{{background:#fff;border:1px solid var(--gray-200);border-radius:1.1rem;padding:1.8rem 1.5rem;transition:all .3s}}
.feat-card:hover{{box-shadow:0 8px 28px rgba(20,184,166,.12);border-color:var(--teal-300);transform:translateY(-4px)}}
.feat-card .ib{{width:3rem;height:3rem;border-radius:.75rem;background:var(--teal-50);display:flex;align-items:center;justify-content:center;font-size:1.35rem;color:var(--teal-600);margin-bottom:1.1rem}}
.feat-card h3{{font-size:1.05rem;font-weight:700;color:var(--gray-900);margin-bottom:.45rem}}
.feat-card p{{font-size:.895rem;color:var(--gray-600);line-height:1.65;margin:0}}
.stack-strip{{background:#f8fafc;border-top:1px solid var(--gray-200);border-bottom:1px solid var(--gray-200);padding:32px 0;text-align:center}}
.stack-strip .lbl{{justify-content:center;display:block;margin-bottom:.55rem}}
.stack-strip .stack{{color:var(--gray-700);font-size:.95rem;font-weight:500;line-height:1.65}}
.cta-sec{{background:linear-gradient(135deg,#14b8a6,#0891b2);padding:60px 0;text-align:center;color:#fff}}
.cta-sec h2{{font-size:clamp(1.5rem,3vw,2rem);font-weight:800;margin-bottom:1rem}}
.cta-sec p{{opacity:.92;max-width:560px;margin:0 auto 2rem;line-height:1.7}}
.cta-btns{{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}}
.cta-btns .btn-primary{{background:#fff;color:#0d7377;padding:.85rem 1.7rem;border-radius:.55rem;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;gap:.5rem}}
.cta-btns .btn-ghost{{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.55);padding:.8rem 1.65rem;border-radius:.55rem;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;gap:.5rem}}
.site-header {{ top: 36px !important; }}
@media (max-width: 768px) {{
  .site-header {{ top: 32px !important; }}
  .pg-hero {{ padding: 110px 0 50px; }}
  .section {{ padding: 40px 0; }}
  .si {{ padding: 0 1rem; }}
}}
</style>
</head>
<body>

<!-- Announcement strip -->
<div class="announce-strip" style="background:linear-gradient(90deg,#0d9488,#14b8a6);color:#fff;padding:8px 16px;text-align:center;font-size:13px;font-weight:600;position:fixed;top:0;left:0;right:0;z-index:9998">
  <i class="ri-global-line"></i> Serving clients Pan India &amp; Globally — Remote &amp; Onsite Support · Call <a href="tel:+918920603270" style="color:#fff;text-decoration:underline">+91 89206 03270</a>
</div>

<!-- ============== SITE HEADER ============== -->
{header}

<!-- ============== HERO ============== -->
<section class="pg-hero">
  <div class="si">
    <div class="pg-badge"><i class="ri-shield-star-line"></i> {tagline}</div>
    <h1>{title}</h1>
    <p>{hero_paragraph}</p>
    <div class="hero-btns">
      <a href="contact.html" class="btn-primary"><i class="ri-mail-send-line"></i> Get a Free Quote</a>
      <a href="tel:+918920603270" class="btn-ghost"><i class="ri-phone-line"></i> Talk to a Specialist</a>
    </div>
  </div>
</section>

<!-- ============== WHAT WE COVER ============== -->
<section class="section">
  <div class="si">
    <div class="lbl">What's Included</div>
    <h2 class="ttl">Everything You Need — Delivered End-to-End</h2>
    <p class="sub">We don't drop you mid-project. From the discovery call through go-live and the support period after, you have a single point of accountability.</p>
    <div class="feat-grid">
{feature_cards}
    </div>
  </div>
</section>

<!-- ============== TECH STACK STRIP ============== -->
<section class="stack-strip">
  <div class="si">
    <div class="lbl">Technologies &amp; Platforms</div>
    <div class="stack">{stack}</div>
  </div>
</section>

<!-- ============== WHY OMNET ============== -->
<section class="section" style="background:#f8fafc">
  <div class="si">
    <div class="lbl">Why OMNET</div>
    <h2 class="ttl">CERT-In Empanelled. Pan India &amp; Global Delivery.</h2>
    <p class="sub">Since 2016 we've delivered IT, software, and security work for 500+ businesses across India and internationally. Written SLAs. Single GST invoice. One escalation path.</p>
    <div class="feat-grid">
      <div class="feat-card">
        <div class="ib"><i class="ri-shield-check-line"></i></div>
        <h3>CERT-In Empanelled</h3>
        <p>Vetted by India's national cybersecurity authority — required for regulated-sector work.</p>
      </div>
      <div class="feat-card">
        <div class="ib"><i class="ri-global-line"></i></div>
        <h3>Pan India &amp; Global</h3>
        <p>Remote delivery anywhere, onsite available across India. Global clients welcome.</p>
      </div>
      <div class="feat-card">
        <div class="ib"><i class="ri-time-line"></i></div>
        <h3>20-Minute SLA</h3>
        <p>Written response SLAs in every contract. P1 incidents acknowledged in 20 minutes.</p>
      </div>
      <div class="feat-card">
        <div class="ib"><i class="ri-file-list-3-line"></i></div>
        <h3>Single GST Invoice</h3>
        <p>One consolidated invoice covering licences, services, and support. Full input tax credit.</p>
      </div>
    </div>
  </div>
</section>

<!-- ============== CTA ============== -->
<section class="cta-sec">
  <div class="si">
    <h2>Ready to get started?</h2>
    <p>Tell us what you need. We'll come back within one business day with a clear scope and a fixed quote — no fluff, no padding.</p>
    <div class="cta-btns">
      <a href="contact.html" class="btn-primary"><i class="ri-mail-send-line"></i> Get a Quote</a>
      <a href="mailto:info@omnetit.in" class="btn-ghost"><i class="ri-mail-line"></i> info@omnetit.in</a>
    </div>
  </div>
</section>

<!-- ============== FOOTER ============== -->
{footer}

<script src="script.js"></script>
<script src="fixes.js"></script>

</body>
</html>
"""


# Site header (consistent across all new pages). We'll include the full nav with the new services added.
SITE_HEADER = """<header class="site-header">
  <div class="header-inner">
    <a href="index.html" class="logo-wrap">
      <div class="logo-icon"><span>ON</span></div>
      <div class="logo-text-wrap">
        <div class="logo-name"><span class="om">OM</span><span class="net">NET</span></div>
        <div class="logo-tagline">IT Solutions</div>
      </div>
    </a>
    <div class="header-cta">
      <a href="tel:+918920603270" class="header-phone"><i class="ri-phone-line"></i> +91 89206 03270</a>
      <a href="mailto:info@omnetit.in" class="header-phone" style="margin-left:8px"><i class="ri-mail-line"></i> info@omnetit.in</a>
      <a href="contact.html" class="btn-primary">Get Quote</a>
    </div>
    <button class="mobile-menu-btn" aria-label="Toggle menu"><i class="ri-menu-line" style="font-size:1.5rem"></i></button>
  </div>
  <div class="header-nav-bar">
    <nav class="header-nav-bar-inner desktop-nav">
      <a href="index.html" class="nav-link">Home</a>
      <div class="nav-dropdown">
        <button class="dropdown-btn">IT Services <i class="ri-arrow-down-s-line"></i></button>
        <div class="dropdown-menu"><div class="dropdown-menu-inner" style="min-width:240px">
          <a href="services.html"><i class="ri-service-line"></i>All Services</a>
          <a href="managed-services.html"><i class="ri-settings-3-line"></i>Managed IT Services</a>
          <a href="it-support.html"><i class="ri-customer-service-2-line"></i>IT Support</a>
          <a href="it-security.html"><i class="ri-shield-check-line"></i>IT Security</a>
          <a href="cloud-services.html"><i class="ri-cloud-line"></i>Cloud Services</a>
          <a href="network-infrastructure.html"><i class="ri-global-line"></i>Network Infrastructure</a>
          <a href="email-solutions.html"><i class="ri-mail-line"></i>Email Solutions</a>
        </div></div>
      </div>
      <div class="nav-dropdown">
        <button class="dropdown-btn">Software &amp; Web <i class="ri-arrow-down-s-line"></i></button>
        <div class="dropdown-menu"><div class="dropdown-menu-inner" style="min-width:260px">
          <a href="custom-software.html"><i class="ri-code-box-line"></i>Custom Software</a>
          <a href="website-design.html"><i class="ri-layout-4-line"></i>Website Design &amp; Dev</a>
          <a href="app-development.html"><i class="ri-smartphone-line"></i>Mobile App Development</a>
          <a href="devops-services.html"><i class="ri-git-merge-line"></i>DevOps Services</a>
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
      </div>
      <a href="shop.html" class="nav-link" style="color:var(--teal-600);font-weight:700;"><i class="ri-store-2-line"></i> Shop</a>
      <a href="products.html" class="nav-link">Products</a>
      <a href="industry-expertise.html" class="nav-link">Industries</a>
      <a href="about.html" class="nav-link">About</a>
      <a href="pricing.html" class="nav-link">Pricing</a>
      <a href="contact.html" class="nav-link">Contact</a>
    </nav>
  </div>
</header>"""

SITE_FOOTER = """<footer class="site-footer">
  <div class="footer-main">
    <div class="footer-brand">
      <a href="index.html" class="logo-wrap" style="text-decoration:none;display:inline-flex">
        <div class="logo-icon"><span>ON</span></div>
        <div class="logo-text-wrap"><div class="logo-name"><span style="color:#fff">OM</span><span class="net">NET</span></div><div class="logo-tagline">IT Solutions</div></div>
      </a>
      <p>CERT-In empanelled IT support, managed services, software development and authorised hardware reseller — serving clients pan India and globally via remote &amp; onsite delivery.</p>
      <div class="footer-social">
        <a href="https://www.linkedin.com/company/omnet-it-system/" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="ri-linkedin-fill"></i></a>
        <a href="https://x.com/omnetit" target="_blank" rel="noopener" aria-label="X / Twitter"><i class="ri-twitter-x-fill"></i></a>
        <a href="https://www.facebook.com/OMNETITSYSTEMS" target="_blank" rel="noopener" aria-label="Facebook"><i class="ri-facebook-fill"></i></a>
      </div>
    </div>
    <div class="footer-col">
      <h4>IT Services</h4>
      <ul>
        <li><a href="managed-services.html"><i class="ri-arrow-right-s-line"></i>Managed IT Services</a></li>
        <li><a href="it-security.html"><i class="ri-arrow-right-s-line"></i>Cybersecurity</a></li>
        <li><a href="cloud-services.html"><i class="ri-arrow-right-s-line"></i>Cloud Services</a></li>
        <li><a href="network-infrastructure.html"><i class="ri-arrow-right-s-line"></i>Networking</a></li>
        <li><a href="repair-services.html"><i class="ri-arrow-right-s-line"></i>Computer AMC &amp; Repair</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Software &amp; Cloud</h4>
      <ul>
        <li><a href="custom-software.html"><i class="ri-arrow-right-s-line"></i>Custom Software</a></li>
        <li><a href="website-design.html"><i class="ri-arrow-right-s-line"></i>Website Design</a></li>
        <li><a href="app-development.html"><i class="ri-arrow-right-s-line"></i>Mobile Apps</a></li>
        <li><a href="google-workspace.html"><i class="ri-arrow-right-s-line"></i>Google Workspace</a></li>
        <li><a href="microsoft-365.html"><i class="ri-arrow-right-s-line"></i>Microsoft 365</a></li>
        <li><a href="zoho-suite.html"><i class="ri-arrow-right-s-line"></i>Zoho Suite</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <div class="footer-contact-item"><i class="ri-smartphone-line"></i><div><div class="label">Mobile</div><div class="value"><a href="tel:+918920603270" style="color:var(--teal-400);text-decoration:none;font-weight:600">+91 89206 03270</a></div></div></div>
      <div class="footer-contact-item"><i class="ri-mail-line"></i><div><div class="label">Email</div><div class="value"><a href="mailto:info@omnetit.in" style="color:var(--teal-400);text-decoration:none;font-weight:600">info@omnetit.in</a></div></div></div>
      <div class="footer-contact-item"><i class="ri-global-line"></i><div><div class="label">Coverage</div><div class="value">Pan India · Remote &amp; Onsite<br>Global Clients Welcome</div></div></div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-bottom-inner">
      <p>© <script>document.write(new Date().getFullYear())</script> OMNET IT SOLUTIONS. All rights reserved.</p>
      <div class="footer-legal"><a href="privacy-policy.html">Privacy Policy</a><a href="terms-of-service.html">Terms of Service</a></div>
    </div>
  </div>
</footer>"""


def render_service_page(svc: dict) -> str:
    feature_cards = "\n".join([
        f'      <div class="feat-card"><div class="ib"><i class="{ svc["icon"] }"></i></div><h3>{name}</h3><p>{desc}</p></div>'
        for (name, desc) in svc["features"]
    ])
    return TEMPLATE.format(
        slug=svc["slug"],
        title=svc["title"],
        tagline=svc["tagline"],
        meta_desc=svc["meta_desc"],
        keywords=svc["keywords"],
        hero_paragraph=svc["hero_paragraph"],
        feature_cards=feature_cards,
        stack=svc["stack"],
        header=SITE_HEADER,
        footer=SITE_FOOTER,
    )


def main():
    for svc in SERVICES:
        path = f"{svc['slug']}.html"
        with open(path, "w", encoding="utf-8") as f:
            f.write(render_service_page(svc))
        print(f"  ✓ Created {path}")


if __name__ == "__main__":
    main()
