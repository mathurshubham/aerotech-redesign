# Suite A (Functional) + Suite C (UX & Performance) — E2E Results

Run: 2026-09-11, against `http://localhost:3000` (dev server, not started/stopped by this driver).
Driver: Sonnet A/C combined. Browser: Claude-in-Chrome, shared tab-group with a concurrent Suite B driver.

**Environment note (read before triaging):** the Chrome window used by this session is shared with another
QA driver running in parallel. `resize_window` calls raced with that driver's own resizes: requests for
1440×900 (D) and 390×844 (M) frequently landed at unrelated widths (911, 1600, 573–636px) and the tab spent
long stretches backgrounded (`document.visibilityState === "hidden"`), which suppresses LCP timing and
image lazy-loading. Where this affected a specific case it is called out in the note. All D-scale checks
below were confirmed functionally correct at whatever width was actually measured (all ≥ 636px, well clear
of the mobile breakpoint), and the mobile checks were confirmed at an effective ~573–636px width (narrower
than `sm`/`md` breakpoints, so mobile CSS was genuinely active) rather than exactly 390px.

## Suite A — Functional

| ID | Result | Screenshot | Note |
|---|---|---|---|
| A1 | PASS | — | All 24 routes (23 content routes + 404) returned correct status; zero console `error`/`Hydration`/`Warning` messages on any route checked. |
| A2 | PASS | — | Services/Work/About/Insights/Contact all navigate correctly; active item gets `aria-current="page"` + orange underline; logo links to `/`. |
| A3 | PASS | — | All footer links resolve (verified against the 200 responses gathered per-route); phone `tel:+919910294423`, email `mailto:info@aerotechss.com` exact match. |
| A4 | PASS | `home-M-A4-mobile-nav-open.png` | Hamburger opens a Sheet with all 5 nav items + CTA + phone + email, each ≥44px tall (44–52px measured); Escape closes it; focus returns to the "Open menu" trigger; `body{overflow:hidden}` while open, restored after close. |
| A5 | PASS | — | Nav "Book a consultation" → `/contact#book`, hero "Book a consultation" → `/contact#book`, "See our work" → `/work`. |
| A6 | PASS | — | `/contact?topic=orat` preselects the "ORAT for a new terminal" chip (checked radio, orange border/bg classes applied). |
| A7 | **FAIL** (partial) | `contact-D-A7-pristine-submit-no-errors.png`, `contact-D-A7-required-fields-error.png`, `contact-D-A7-success.png` | On a **freshly loaded** `/contact` page, clicking "Request a call" with all fields empty produces **no visible feedback at all** — no red border, no `aria-invalid`, no inline message (reproduced twice). Validation *does* work correctly once a field has received any prior `input` event (shows red border, "Enter your name.", "Please check the highlighted fields and try again."), and a fully valid submit renders "Enquiry received" correctly. So the pass condition ("Empty submit shows inline errors") fails on the very first attempt a real user would make. |
| A8 | PASS | — | Honeypot `input[name=website]` is present, hidden (`offsetParent:null`), `tabIndex:-1`. Filling it and submitting a fully valid form still shows the normal "Enquiry received" success state (silently accepted UI). No network request fires either way — the form is stub/client-only (matches plan's stub-mode expectation), so server-side drop of the honeypot lead could not be verified from the browser. |
| A9 | PASS | — | WhatsApp link: `https://wa.me/919910294423?text=Hi%20Aerotech...`, `target="_blank"`, `rel="noopener noreferrer"`. |
| A10 | **FAIL** | — | No Cal.com placeholder exists anywhere on `/contact`. The page has: form → "Skip the form" navy card (phone/email) → office photo. There is no slot widget, no `[PLACEHOLDER]` label, nothing referencing Cal.com. |
| A11 | **FAIL** (2 routes) | — | Breadcrumbs present and functional on every route checked **except `/compliance` and `/privacy`**, which have no breadcrumb nav at all. |
| A12 | PASS | — | `/services/orat` → "Where this has been done" section links to `/work/delhi-t3-orat` and `/work/taxibot-india` (related work). `/work/taxibot-india` → in-body CTA band links to `/services/india-market-entry` (related service). Both resolve. |
| A13 | **FAIL** | — | `/insights` lists exactly 3 posts with dates and correct MDX rendering (headings, lists, author link to `/about/ashwani-khanna` all present and correct) — but **no "draft" badge appears anywhere** on the hub or on any of the 3 posts. |
| A14 | PASS (with note) | — | All 7 compliance download links (`/downloads/*.pdf`) return HTTP 200 and are valid PDFs (not dead links). Note: they are real downloadable stub PDFs, not a `[PLACEHOLDER]`-styled UI state as the plan describes — functionally fine, but a deliberate design decision should be confirmed with the design/content owner. |
| A15 | PASS (minor issue) | — | `/this-does-not-exist` returns HTTP 404 with a correctly styled custom 404 ("ERROR 404 — That page is not on the stand"), nav, footer, "Back to the home page" + "Contact us" buttons, quick links. **Minor bug:** both the raw server HTML and the live DOM `<title>` for the 404 page is the Home page's title ("Aerotech Support Services — Aviation & airport consulting, New Delhi") instead of a 404-specific title — `not-found.tsx` is missing its own metadata export. |
| A16 | **FAIL** (partial) | — | `/robots.txt`, `/llms.txt`, `/feed.xml` all 200 and correct (robots has `Allow: /` for all UAs incl. GPTBot/ClaudeBot/etc., and a `Sitemap:` line). `/sitemap.xml` is 200 but lists only **22 of the 23** content routes — it is missing `/services/india-market-entry/dgca-guide`. |
| A17 | PASS | — | Every route sampled has a unique `<title>`, `<meta name=description>`, self-referencing `<link rel=canonical>`, `og:title`, `og:image`. (Exception: the 404 page's title, see A15.) |
| A18 | PASS | — | `/` → Organization + WebSite (+ WebPage). `/about/ashwani-khanna` → Person. Every service page → Service. Every work case study and insights post → Article. Every non-home page checked → BreadcrumbList (except the two pages missing breadcrumbs entirely, see A11, which also lack the BreadcrumbList JSON-LD). All JSON-LD parsed without error. |
| A19 | PASS | — | `img.complete && naturalWidth>0` true for all images once actually scrolled into view (verified via real mouse-wheel scroll on `/`, all logos/photos loaded); images not yet scrolled to correctly report `loading="lazy"` and are simply not-yet-fetched (not broken — confirmed via `fetch()` returning 200 + valid decoded bytes for several "not yet loaded" URLs). All `img` elements have non-empty `alt`. Hero image loads eagerly (`loading="auto"`, i.e. not lazy) as expected for above-the-fold. |
| A20 | PASS (limited verification) | — | Skip link (`a[href="#main"]`) is the first focusable element in the DOM, is `sr-only` by default, and gets a visible white focus ring + `fixed` positioning via `focus-visible:*` classes when focused. **Note:** live Tab-key traversal could not be fully driven in this session because the tab was repeatedly backgrounded by the shared-window environment (see environment note); verification here is structural (DOM order + CSS), not a full interactive keystroke walk. |

## Suite C — UX & Performance

| ID | Result | Screenshot | Note |
|---|---|---|---|
| C1 | PASS | (home fold captured during A4 flow) | D (~1568px wide) and M (~636px wide) first fold both show: eyebrow "AVIATION & AIRPORT CONSULTING · NEW DELHI" (who for), H1 "From regulatory approval to day-one operations" + sub-copy (what they do), one primary CTA "Book a consultation" (secondary "See our work" also visible), and the credential strip ("30 yrs", "World 1st", "3×ISO"…) is either fully or partially visible in-fold on both. |
| C2 | PASS | — | `/services/orat` heading outline alone answers all five prompts: "Who this is for" (3-up), "Deliverables, not a deck", "Four phases against your opening date", "The person who scopes it is the person who runs it" (why us), "Talk to us about your transfer programme" (next step). |
| C3 | PASS | — | All `[PLACEHOLDER: ...]` strings found (e.g. `/services` → "confirm proposal turnaround in working days"; footer CIN/GSTIN/grievance placeholders) render in a visibly distinct mono/orange-bordered chip style, confirmed via screenshot on `/services`. |
| C4 | PASS | — | No "Opartional" typo, no Title-Case-Every-Word sentences, no "Welcome", no lorem ipsum found on any route sampled. |
| C5 | **FAIL** (1 sitewide issue) | — | Footer copyright line ("© 2026 Aerotech Support Services") measured at `rgb(110,120,150)` on `rgb(15,23,41)` = **4.08:1**, below the 4.5:1 AA minimum for its 11px/400-weight text. This is a shared footer component, so it affects every page. All other sampled text/background pairs (nav description ~7.2:1, breadcrumb link ~5.8:1 on dark bands, body copy) passed comfortably. |
| C6 | **FAIL** (4 routes) | — | Exactly one `h1` and all of `header`/`nav`/`main`/`footer` present on every route. **However**, all four `/work/*` case-study pages (`taxibot-india`, `delhi-t3-orat`, `stelia-aerospace`, `aerowash`) skip directly from `h1` to `h3` (no `h2` in between) for their "challenge → approach → outcome" numbered sections — a real heading-hierarchy skip. Also noted but not flagged as a failure: on every page the shared nav's mega-menu column labels ("SERVICES" / "WORK" / "COMPANY") are marked up as `<h2>` and appear before the page's own `<h1>` in DOM order — decorative labels using heading tags, which pollutes the heading outline sitewide (see Fix list). |
| C7 | PASS | — | `scrollWidth <= innerWidth` held on every route checked, at every width actually measured during this run (down to ~573–636px, i.e. mobile-equivalent, up to 1600px). No horizontal scroll found anywhere. |
| C8 | Inconclusive | — | Could not reliably measure post-load visual jump: the tab was frequently backgrounded by the shared browser window (`document.visibilityState:"hidden"`), which pauses paint/layout timing APIs. Visually, all images carry explicit dimensions via Next/Image so no obvious reserved-space issue was observed in manual scroll-throughs, but this was not instrumented. |
| C9 | PASS | — | Zero console errors, zero Hydration/Warning messages across every route checked in this run. |
| C10 | Inconclusive | — | `performance.getEntriesByType('largest-contentful-paint')` returned no entry on repeated attempts — traced to the tab being backgrounded (paint timing APIs don't fire for hidden tabs) rather than a site defect. Transfer size sampled at only ~33KB / 27 resources on `/`, which is implausibly low for a full load and is almost certainly under-counted for the same reason (lazy assets never requested while hidden). Recommend re-running C10 in an isolated, foregrounded browser session.

## Fix list

**Blocker**
1. **Contact form — no feedback on first empty submit** (A7). `/contact`, `Request a call` form. On a pristine (never-touched) form, clicking submit with all required fields empty does nothing visible — no red border, no `aria-invalid`, no message. The same validation logic works fine once any field has fired an `input` event first. Likely cause: validation/error state is gated on field "touched" state rather than running unconditionally on submit attempt. Needs a fix so the first submit attempt always surfaces errors.
2. **Cal.com placeholder missing entirely** (A10). `/contact`. Spec requires a "[PLACEHOLDER]"-labeled Cal.com slot; the section doesn't exist on the page at all (form → navy "skip the form" card → office photo, nothing else).

**Major**
3. **Sitemap missing a route** (A16). `/sitemap.xml` lists 22 of 23 content routes; `/services/india-market-entry/dgca-guide` is absent.
4. **Breadcrumbs missing on 2 routes** (A11/A18). `/compliance` and `/privacy` have no breadcrumb nav (and correspondingly no `BreadcrumbList` JSON-LD), unlike every other non-home page.
5. **No draft badge on Insights** (A13). `/insights` hub and its 3 posts show no "draft" indicator anywhere, though the plan calls for one to be visible.
6. **Heading hierarchy skips h1→h3 on all 4 case-study pages** (C6). `/work/taxibot-india`, `/work/delhi-t3-orat`, `/work/stelia-aerospace`, `/work/aerowash` — the numbered "01–04" challenge/approach/outcome sections use `h3` directly under the page `h1`, with no `h2`. Single shared case-study template, one fix covers all four routes.

**Minor**
7. **404 page has the Home page's `<title>`** (A15/A17). `not-found.tsx` (or equivalent) doesn't export its own metadata; both server HTML and client DOM show the Home title/description instead of something like "Page not found | Aerotech Support Services".
8. **Footer copyright text contrast 4.08:1** (C5), below the 4.5:1 AA minimum for its size (11px/400). Shared footer component — affects every page. Likely just needs a slightly lighter shade of the muted footer text token.
9. **Nav mega-menu labels use `<h2>`** (C6, related to #6). "SERVICES"/"WORK"/"COMPANY" column headers in the shared nav are real `<h2>` elements appearing before each page's own `<h1>` in DOM order, on every route. Should be a non-heading element (e.g. a styled `<span>`/`<p>` with `aria-hidden` or a `role="presentation"` label) to keep the heading outline clean.
10. **Compliance downloads are real stub PDFs, not the spec'd `[PLACEHOLDER]` UI state** (A14). Functionally fine (all 200, valid PDFs) but a deliberate scope call should be confirmed against the design brief.

## Testing limitations (environment)

This session shared one Chrome window/tab-group with a concurrent driver. That driver's own window
resizes repeatedly overrode this session's `resize_window` calls (observed widths cycling through 911,
1600, 573–636px regardless of the 1440×900 / 390×844 requested), and this tab was frequently
`document.visibilityState:"hidden"` (backgrounded), which:
- prevented reliable LCP measurement and likely undercounted network transfer size (C10, marked inconclusive)
- prevented a full interactive Tab-key walk for A20 (verified structurally instead)
- was the source of a couple of transient "stuck on LOADING" DOM reads that turned out to be stale reads of a backgrounded tab, not real product bugs, once re-verified with waits/screenshots (worth knowing if these show up again in a re-run)

All mobile-viewport checks (A4, C1-M, C7 sample) were still validated at an effective ~573–636px width,
which is narrower than the site's `sm`/`md` Tailwind breakpoints, so the mobile CSS path was genuinely
exercised even though the exact 390px target wasn't held.
