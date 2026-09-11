# E2E test plan — MVP review

Executed by Sonnet driver agents using the Claude-in-Chrome tools against `http://localhost:3000` (`pnpm dev` in `web/`). Every case records PASS/FAIL, a screenshot path under `docs/qa/<run-date>/`, and a one-line note. Failures become a fix list for the build agents; the suite re-runs after fixes.

Reference for "correct": `web/DESIGN.md`, `docs/REDESIGN-BRIEF.md` §6–7, and the six draft artboards in `reference/design/`.

## Viewports

- **D** desktop 1440×900
- **T** tablet 820×1180
- **M** mobile 390×844

Every route is captured at D and M full-page; T for Home, Services hub, one Service, Contact.

## Routes under test

```
/                                   /work
/services                           /work/taxibot-india
/services/orat                      /work/delhi-t3-orat
/services/audits-compliance         /work/stelia-aerospace
/services/sustainable-aviation      /work/aerowash
/services/aircraft-recovery         /about
/services/india-market-entry        /about/ashwani-khanna
/services/india-market-entry/dgca-guide   /insights
/tools/aero-opt                     /insights/what-is-orat
/compliance                         /insights/corsia-2027-india-operators
/contact                            /insights/dgca-car-map-foreign-oems
/privacy                            /this-does-not-exist  (404)
```

---

## Suite A — Functional (driver: Sonnet A)

| ID | Case | Pass condition |
|---|---|---|
| A1 | Every route above returns 200 (404 page for the last) | No Next error overlay; console has zero `error`-level messages (`read_console_messages`, pattern `error|Hydration|Warning`) |
| A2 | Nav links | Each top-nav item navigates to its route; active item is visually marked; logo returns to `/` |
| A3 | Footer links | Every footer link resolves (no 404); phone is `tel:+919910294423`; email is `mailto:info@aerotechss.com` |
| A4 | Mobile nav | At M, hamburger opens a Sheet; all nav items present, 44 px tall; Escape closes; focus returns to trigger; body scroll locked while open |
| A5 | Primary CTAs | "Book a consultation" in nav and hero go to `/contact#book`; "See our work" goes to `/work` |
| A6 | Service → Contact prefill | From `/services/orat` bottom CTA → `/contact?topic=orat`; the topic chip/select is preselected |
| A7 | Lead form validation | Empty submit shows inline errors on required fields; invalid email rejected; success state renders after valid submit (stub mode logs, no network error) |
| A8 | Honeypot | Filling the hidden field then submitting → silently accepted UI but no lead logged (check console/server log) |
| A9 | WhatsApp | Link href is `https://wa.me/919910294423?text=` + encoded prefill; opens in new tab (`target=_blank rel=noopener`) |
| A10 | Cal.com slot | Placeholder renders with clear "[PLACEHOLDER]" label, no broken iframe |
| A11 | Breadcrumbs | Present on all non-home pages; each crumb navigates; last item not a link |
| A12 | Related links | Service → related work and related services links resolve; case → related service resolves |
| A13 | Insights | Hub lists 3 posts with dates; each post renders MDX (h2s, lists, links); author card links to `/about/ashwani-khanna`; "draft" badge visible |
| A14 | Compliance downloads | Each item shows `[PLACEHOLDER]` state, no dead `href` |
| A15 | 404 | Custom 404 with nav, footer, link home |
| A16 | `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/feed.xml` | All 200; sitemap lists every route; robots has `Allow: /` and sitemap line, no AI-bot Disallow |
| A17 | Metadata | Per page: unique `<title>`, `<meta name=description>`, `<link rel=canonical>` self-referencing, `og:title`, `og:image` (use `javascript_tool` to read `document.head`) |
| A18 | JSON-LD | `/` has Organization + WebSite; `/about/ashwani-khanna` has Person; each service has Service; each insight/case has Article; each non-home page has BreadcrumbList. Validate JSON parses |
| A19 | Images | No broken images (`img.complete && naturalWidth>0` over all `img`); every `img` has non-empty `alt`; hero uses `priority`/`fetchpriority=high`; below-fold images `loading=lazy` |
| A20 | Keyboard | Tab from top of `/`: skip-link appears first; focus ring visible on nav, buttons, cards, form fields; no focus trap |

## Suite B — Design conformance (driver: Sonnet B)

Screenshot each route at D and M, then compare against the draft artboards and `DESIGN.md`. Use `zoom` on regions when judging type and spacing.

| ID | Case | Pass condition |
|---|---|---|
| B1 | Home vs `reference/design/Main.dc.html` | Same band order: nav, hero, credential strip, logo row, services grid, TaxiBot feature, principal, second proof row, contact band, footer. Hero H1 wording matches brief |
| B2 | Mobile home vs `reference/design/MobileHome.dc.html` | Credential strip 2-up; services stacked with "all services" link; phone becomes its own tap target |
| B3 | ORAT vs `reference/design/Orat.dc.html` | Dark page head with engagement-shape panel; who-it's-for 3-up; deliverables 2×3 grid; four phases with T-windows; why-us band |
| B4 | TaxiBot vs `reference/design/Taxibot.dc.html` | Photo hero with overlay; fact bar 4-up; challenge → approach (numbered 01–04) → outcome band with pull quote and stat tiles; PLACEHOLDER callout present |
| B5 | About vs `reference/design/About.dc.html` | Intro + photo card; four-number band incl. `119 → 1`; career list; certifications grid; honours; key projects 2-col |
| B6 | Contact vs `reference/design/Contact.dc.html` | Form ≤ 5 visible required fields + topic chips; "skip the form" navy card; office card with photo; recovery-hotline note |
| B7 | Palette discipline | Only token colours present. Orange appears only on CTAs, eyebrows, rules, active states — estimate ≤ 5 % of hero+first-fold pixels. No lime/green/blue leftovers |
| B8 | Type | H1/H2/H3 sizes within the `clamp()` scale; body 17 px/1.62 at D, 16 px at M; body text **left-aligned, never justified**; no weight 800/900 anywhere (`getComputedStyle` sweep) |
| B9 | Eyebrows | Mono, uppercase, 11 px, letter-spaced, above every section heading |
| B10 | Radius & borders | 8 px on cards/inputs/buttons, 999 px on pills only; 1 px `line` borders; **no box-shadows** (computed style sweep) |
| B11 | Spacing rhythm | Section vertical padding 64–120 px at D, 44–56 px at M; grid gaps 24 px; cards 28–30 px inner padding |
| B12 | Photography | Every project photo has a mono caption (client · airport · year); no stretched/cropped-face images; hero overlay keeps text ≥ 4.5:1 |
| B13 | Runway motif | Present once under hero on home and page heads; nowhere else |
| B14 | Nav | Sticky, white, 84 px at D / 66 px at M; single orange CTA button; active item underlined orange |
| B15 | Footer | Four columns at D, stacked at M; NAP, CIN/GSTIN placeholders, grievance contact placeholder; copyright year dynamic |
| B16 | Dark bands | `band` bg, `band-ink` headings, `band-muted` body, `band-line` dividers; orange only on eyebrows/stat values |
| B17 | Tablet | At T no horizontal scroll, grids drop to 2-col, nav still inline or collapses cleanly |
| B18 | Reduced motion | With `prefers-reduced-motion: reduce` emulated, no transforms/opacity transitions on scroll |

## Suite C — UX & performance (driver: Sonnet A, after A)

| ID | Case | Pass condition |
|---|---|---|
| C1 | First-fold clarity | At D and M, without scrolling: what they do, for whom, one primary CTA, and at least one proof point visible |
| C2 | Scan test | On each service page, headings alone answer: who for, what you get, how it runs, why us, next step |
| C3 | Placeholders | Every `[PLACEHOLDER…]` string is visibly styled (mono, orange border) — never blends into copy. Produce the full list with route |
| C4 | Copy | No "Opartional", no Title Case Every Word sentences, no "Welcome", no lorem |
| C5 | Contrast | axe-core via `javascript_tool` (inject from cdnjs is blocked — instead sample 10 text/background pairs per page with `getComputedStyle` and compute ratio) ≥ 4.5:1 body, ≥ 3:1 large |
| C6 | Landmarks | Exactly one `h1`; `header`, `nav`, `main`, `footer` present; heading levels don't skip |
| C7 | No horizontal scroll | `document.documentElement.scrollWidth <= innerWidth` at D, T, M on every route |
| C8 | Layout shift | Reload each page at M; no visible jump after fonts/images load (images have width/height) |
| C9 | Console hygiene | Zero errors, zero hydration warnings across all routes |
| C10 | Lighthouse-ish | `performance.getEntriesByType('largest-contentful-paint')` LCP element is the hero image/heading and < 2.5 s on localhost; total transferred < 1 MB on `/` (`read_network_requests`) |

## Output

Each driver writes `docs/qa/<date>/<suite>.md`: table of ID · PASS/FAIL · screenshot path · note, followed by a **Fix list** ordered by severity (blocker / major / minor). Screenshots saved with `save_to_disk` and copied into the folder with names `<route-slug>-<viewport>-<id>.png`.
