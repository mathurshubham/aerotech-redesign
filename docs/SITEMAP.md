# aerotechss.com — Site Map

Captured 2026-09-10. Stack: static PHP includes, Bootstrap 4.5.2, jQuery 3.5.1, Font Awesome 4.7, Magnific Popup 1.1.0. No CMS, no build step.

## Navigation (from `<nav>` on every page)

```
Logo (assets/images/logo.png) -> index.php
Home                          -> index.php
About Us                      -> about-us.php
Projects (dropdown)           -> #
  ├─ Audit & Compliances                      -> audit.php
  ├─ Sustainable Aviation Solutions           -> sustainable.php
  ├─ Resource Optimization Tool               -> resource.php
  └─ ORAT - Opartional Readiness and Transfer -> orat.php   [sic: "Opartional"]
Contact Us                    -> contact-us.php
```

Floating action buttons (fixed, bottom-right, every page):
- WhatsApp -> `https://wa.me/919910294423?text=Aerotech`
- Call -> `tel:+91 9910294423`

## All pages

| URL | Status | Purpose | Notes |
|---|---|---|---|
| `index.php` | live, full | Home | Hero carousel, expertise, mission/vision, 4 project cards, 3 service blocks |
| `about-us.php` | live, full | About + director bio | Ashwani Khanna profile, experience/honors/affiliations/key projects |
| `audit.php` | live, thin | Audit & Compliances | Body copy + 34 images (client project gallery) |
| `sustainable.php` | live, thin | Sustainable Aviation Solutions | Body copy + 61 images (biggest gallery) |
| `resource.php` | live, thin | Resource Optimization Tool ("Aero Opt") | Copy only |
| `orat.php` | live, thin | ORAT | Copy only |
| `aircraft-recovery.php` | live, orphan | Aircraft Recovery | **Not in nav.** Only linked from footer/body text |
| `contact-us.php` | live | Contact | Form + address block. Requires cookie `humans_21909=1` (bot gate JS reload) |
| `services.php` | **EMPTY** | — | Header + footer only, zero content. Identical byte-for-byte to `blog.php` |
| `blog.php` | **EMPTY** | — | Header + footer only, zero content |
| `hire-a-designer.php` | **DEAD** | — | Serves a domain-parking redirect (`cdn.jsinit.directfwd.com`), not site content |

## Footer (identical every page)

4 columns: About Us (blurb + "Read More....." -> about-us.php) | Our Services (Home, About Us, Contact Us) | Our Projects (4 project pages) | Contact Us (address, phone, email).
Bottom bar: `Aerotech Support Services 2026 © All Rights Reserved` on orange.

Social icons present but all placeholder hrefs — `facebook.com/`, `twitter.com/`, `instagram.com/`, `linkedin.com/in/`, `youtube.com/`. No real accounts linked.

## NAP / contact data

- Address: Ground & First Floor, Coworks, WorldMark-I, Aerocity, New Delhi 110037, INDIA
- Phone: +91 9910294423
- Email: info@aerotechss.com

## Redesign implications

1. **Nav is incomplete** — Aircraft Recovery is a real service page with no nav entry. Home page lists 5 service focus areas but only 4 have pages.
2. **Two dead routes** (`services.php`, `blog.php`) are linked from nothing but exist; `hire-a-designer.php` is a parked-domain artifact — drop all three.
3. **Projects dropdown parent has `href="#"`** — no projects index page exists. Add one.
4. **No real blog** despite a `blog.php` stub. Decide in/out early.
5. **SEO is broken sitewide**: every page has `title` = "Aerotech", the same `meta description` "Aerotechs in Delhi.", keywords "Aerotechs", and `canonical` hardcoded to `https://aerotechss.com/index.php` — so every subpage canonicalizes away to home. Same `og:*` on all pages. Full rewrite needed.
6. **No sitemap.xml, no robots.txt, no structured data.**
7. **Bot gate on contact-us.php** (cookie + `document.location.reload(true)`) blocks crawlers and breaks first paint.
