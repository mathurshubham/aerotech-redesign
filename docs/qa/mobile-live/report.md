# Mobile E2E sweep — LIVE site (aerotech.shubhammathur.in)

Run date: 2026-09-11. Target: `https://aerotech.shubhammathur.in` (production/preview, PIN-gated).

**Method**: Claude-in-Chrome's `resize_window` would not go below ~668px in this environment, so per the fallback instruction this sweep was driven by a self-authored Playwright (Chromium) script over CDP — Node 20 lacked a native `WebSocket`/CDP client, so `playwright` was installed locally (`npm install playwright` + `npx playwright install chromium`) in the scratchpad and driven headless. Gate auth: `curl -X POST https://aerotech.shubhammathur.in/api/gate -d "pin=6678&next=%2F"`, the `aero_gate` cookie from `Set-Cookie` was injected via Playwright's `context.addCookies` (equivalent to CDP `Network.setCookie`, which — unlike page JS — can set `HttpOnly` cookies). Viewports emulated via Playwright's mobile device-metrics emulation (`deviceScaleFactor: 2`, `isMobile: true` for <768): **360×640, 390×844, 414×896, 768×1024**. No source code was changed; no git command was run.

Screenshots: `docs/qa/mobile-live/<route-slug>-390.png`, full page, for all 19 routes. Raw instrumented data: `docs/qa/mobile-live/raw-report.json`.

---

## Check × route matrix

Legend: PASS / MINOR / FAIL. "—" = not the primary target of that check.

| Route | 1. 200/console | 2. no h-scroll (4 vp) | 3. tap targets (390, small/total) | 8. images |
|---|---|---|---|---|
| `/` | PASS 200, 0 errors | PASS 360/390/414/768 | MINOR 19/55 small (mostly false-positive sr-only inputs; real: logo link 38px, card arrow-links) | PASS |
| `/services` | PASS 200, 0 errors | PASS | MINOR 6/34 | PASS |
| `/services/orat` | PASS 200, 0 errors | PASS | MINOR 10/38 | PASS |
| `/services/audits-compliance` | PASS 200, 0 errors | PASS | MINOR 9/37 | PASS |
| `/services/india-market-entry` | PASS 200, 0 errors | PASS | MINOR 9-10/38 | PASS |
| `/services/india-market-entry/dgca-guide` | PASS 200, 0 errors | PASS | MINOR 7/31 | PASS |
| `/tools/aero-opt` | PASS 200, 0 errors | PASS | MINOR 7-8/35 | PASS |
| `/work` | PASS 200, 0 errors | PASS | MINOR 9/31 | PASS |
| `/work/taxibot-india` | PASS 200, 0 errors | PASS | MINOR 6/29 | PASS |
| `/work/delhi-t3-orat` | PASS 200, 0 errors | PASS | MINOR 6/29 | PASS |
| `/about` | PASS 200, 0 errors | PASS | MINOR 5/30 | PASS |
| `/about/ashwani-khanna` | PASS 200, 0 errors | PASS | MINOR 6/29 | PASS |
| `/insights` | PASS 200, 0 errors | PASS | MINOR 5/33 | PASS |
| `/insights/what-is-orat` | PASS 200, 0 errors | PASS | MINOR 8/30 | PASS |
| `/compliance` | PASS 200, 0 errors | PASS | MINOR 5/33 | PASS |
| `/privacy` | PASS 200, 0 errors | PASS | MINOR 5/26 | PASS |
| `/contact` | PASS 200, 0 errors | PASS | MINOR 48/82 (41 real after excluding 7 sr-only radio false-positives — see below) | PASS |
| `/gate` | PASS 200, 0 errors | PASS | MINOR 4/27 | PASS |
| `/this-does-not-exist-xyz` | PASS 404 (correct), console shows the expected 404 resource-load line only, no JS error | PASS | MINOR 4/31 | PASS |

**Check 1 detail** — zero `error`-level console messages, zero hydration warnings, zero unexpected failed network requests on any of the 18 real routes at any of the 4 viewports. The only network "failure" logged anywhere was the deliberate 404 on the bogus route (expected) plus one benign `net::ERR_ABORTED` on a Next.js RSC prefetch (`/contact?_rsc=...`) fired while leaving the 404 page at 768px — not a user-visible failure, no error surfaced in the UI.

**Check 2** — `document.documentElement.scrollWidth <= window.innerWidth` held on **all 19 routes x all 4 viewports (76/76)**. No horizontal body scroll anywhere; check 9 (h-scroll confined to intended containers) is therefore moot — there was no page-level h-scroll to confine.

**Check 8 (images)** — Verified in two passes: an initial fast pass flagged several `naturalWidth=0` images, but these were confirmed **false positives** — a race between headless lazy-load and the check (images sit below the fold and Next `loading="lazy"` hadn't fired yet). A second pass scrolled the full page height before checking, and every URL flagged in pass 1 (`taxibot-goair-768.webp`, `ashwani-khanna-480.webp`, `delhi-apron-1080.webp`, `stelia-seat-1-768.webp`, `taxibot-indigo-768.webp`, `logo-glyph-light.png`) was independently confirmed **HTTP 200** via `curl -I`. No genuinely broken image on any route. No image had a missing `alt` attribute — the wordmark glyph images use `alt=""` (correctly decorative), not a missing attribute. No image's natural width exceeded 1080px at the 390 viewport (checked via `currentSrc`/`naturalWidth`).

---

## Detail: checks 4-11

**4. Contact form inputs (`/contact`, 390px)** — PASS. All 12 form controls measured (name, email, 7 topic radios, targetDate, message, honeypot `website`) have computed `font-size` >= 16px (name/email/date/message = 16px; radios/honeypot = 17px) — no iOS zoom-on-focus risk. `email` has `type="email"`, `inputMode="email"`, `autoComplete="email"`; `name` has `autoComplete="name"`. Every control has an associated label (via `<label for>`, wrapping `<label>`, or a `<legend>` for the topic radio group). Minor: `targetDate` is `type="text"` with no `inputMode` — a plain text field for a date; not wrong, but a numeric/date `inputMode` would improve the mobile keyboard.

**5. Mobile nav (390px)** — PASS on every sub-check. Hamburger `aria-expanded` flips `false->true` on open. All 5 items present in the sheet (Services, Work, About, Insights, Contact) plus Book-a-consultation CTA, phone, email — all measured **>=44px tall** (48-52px). `Escape` closes it (`aria-expanded` back to `false`). Focus returns to the trigger button after Escape (confirmed `document.activeElement === trigger`). Body scroll is locked while open (`overflow: hidden` on body/html).

**6. Text legibility** — PASS. Swept all leaf text nodes site-wide for computed `font-size < 14px`. Everything under 14px is an eyebrow (11px, matches `DESIGN.md` spec), a mono caption/legal-bar link (footer "Privacy"/"Compliance", PDF-size labels — 11px, in the mono legal bar), an author byline/RSS link (13px), or a form label/legend (13px, matches the documented `LeadForm` 13px/600 label spec). No body-copy paragraph was found rendering below 16px on mobile.

**7. Contrast** (`/` hero, `/work/taxibot-india` hero, sampled against real composited backgrounds):

| Route | Element | fg / effective bg | Size | Ratio | Threshold | Result |
|---|---|---|---|---|---|---|
| `/` | h1 | white / navy rgb(22,32,58) | 36px | 16.13:1 | 3:1 (large) | PASS |
| `/` | lede | rgb(195,202,221) / navy | 16px | 9.84:1 | 4.5:1 | PASS |
| `/` | eyebrow "Aviation & airport consulting..." | orange rgb(251,114,46) / navy | 11px | 5.80:1 | 4.5:1 | PASS |
| `/work/taxibot-india` | h1 | white / navy | 36px | 16.13:1 | 3:1 | PASS |
| `/work/taxibot-india` | lede | rgb(195,202,221) / navy | 18px | 9.84:1 | 4.5:1 | PASS |
| `/work/taxibot-india` | eyebrow (client strip) | orange / navy | 11px | 5.80:1 | 4.5:1 | PASS |
| `/` (paper bands) | `.eyebrow` sections ("What we do", "Selected work", "Book a consultation", "Who you actually work with") | subtle rgb(110,120,150) / white or paper rgb(247,248,250) | 11px | **4.13-4.38:1** | 4.5:1 (normal text) | **FAIL** — see fix list |

Hero/dark-band text is well clear of AA. The one systemic issue is the `subtle` (#6E7896) eyebrow token on light (`surface`/`paper`) grounds, which lands at 4.13-4.38:1 — just under the 4.5:1 floor for text below 24px. It repeats on every light-band eyebrow across the site (design-token level issue, not per-page).

**10. WhatsApp pill** — PASS. 139x56px at 390 on `/` and `/contact` (height exactly meets the 56px floor). No overlap with the footer or the lead-form submit button in either view tested. Absent (not rendered, 0x0) at 1280px — correctly desktop-hidden.

**11. Sticky header** — PASS (near the edge of "not much more than 70px"). Header height at 360px = **67px** (DESIGN.md's stated mobile nav height is 64px; measured is 3px over that internal spec but within the 70px sweep budget). Anchor test `/contact#book`: target `#book` renders at `top=96px`, header bottom at `67px` — the anchor is **not** covered by the sticky header.

---

## Fix list

### Blocker
None found. No broken routes, no console errors, no page-level horizontal scroll, no broken images, no mobile-nav functional failure.

### Major
1. **Header logo/wordmark link fails the 44px tap-target minimum on mobile, on every page.** Selector `header a.inline-flex.items-center.rounded-lg` (the `Wordmark` lockup link to `/`) measures **154x38px** at 390px — height is 38px, 6px under the 44px floor. It's the single highest-traffic tap target on the site (present in every page header) and the one most likely to be mis-tapped. Fix: increase the link's vertical padding/hit-slop to 44px min-height without changing the visible 38px glyph (e.g. `min-h-11 flex items-center` on the `<a>`, matching the pattern already used elsewhere for `About`/`ORAT` nav links).
2. **Contact page date-picker (`targetDate`) calendar day cells are 40x40px, below the 44px minimum**, on `/contact` at 390px (`button.relative.flex.h-10.w-10`, both enabled and `disabled` out-of-range days). This is a real, interactive control (not decorative) — worth bumping the shadcn `Calendar` cell size (`h-10 w-10` -> `h-11 w-11`) for mobile.

### Minor
3. **Eyebrow text on light (paper/white) bands is 4.13-4.38:1 against its background — just under the 4.5:1 AA floor for text <24px.** Token `subtle` `#6E7896` on `surface`/`paper`. Repeats site-wide on every section eyebrow ("What we do", "Selected work", "Book a consultation," etc. on `/`; "Client/Airports/Scope/Our role/Challenge/Approach" on `/work/taxibot-india`). A one-step darkening of `subtle` (or an eyebrow-specific darker variant) would clear AA without visibly changing the intended muted look.
4. **Breadcrumb links are 13px tall (well under 44px)** — e.g. `A.transition-colors.text-band-muted` "Services" (62x13) on `/services/orat`, "Home" (31x13) on `/about`/`/contact`/`/insights/what-is-orat`. Present on all 18 non-home routes. Low practical risk (small, low-traffic secondary nav) but technically fails the 44px rule; consider adding vertical padding to increase the hit area even if the visible text stays 13px/11px mono.
5. **In-card arrow-links ("Read the case ->", "Full profile ->", "LinkedIn ->", "All services ->", related-service pill links) render 20-28px tall**, below 44px — present on `/`, `/work`, `/services/*`, `/about/ashwani-khanna`, `/insights/what-is-orat` (roughly a dozen routes, ~2-5 instances each). These are supplementary links inside cards, not primary CTAs; low severity, but a larger invisible padding/hit-slop would help thumb accuracy.
6. **Single-word nav-adjacent links ("ORAT", "About", etc.) are 44px tall but only 37-39px wide**, failing the width half of the 44x44 rule (18 routes). Practically low-impact since the row height already meets 44px, but strictly non-conformant.
7. **`targetDate` input on `/contact` has no `inputMode`/date-specific keyboard hint** — `type="text"`, `inputMode` unset. Font-size (16px), label, and autoComplete are otherwise fine. A numeric or date `inputMode` would improve mobile entry.
8. **Sticky header is 67px tall at 360px vs. `DESIGN.md`'s documented 64px mobile nav-height spec** — 3px over the documented token, though still comfortably under the ~70px sweep budget and not covering the `/contact#book` anchor. Cosmetic/spec-drift only.

### Notes (not failures)
- Initial automated image checks flagged several images as "broken" (`naturalWidth=0`); these were confirmed **false positives** from lazy-load timing in headless automation — all URLs return HTTP 200 and load correctly once scrolled into view. No actual broken images.
- The 7 hidden `sr-only` radio `<input>` elements behind the `/contact` topic chips (1x1px) are not real tap targets — their wrapping `<label>` is the actual 44px-tall clickable surface; excluded from the "small tap target" fix items above.
- The honeypot `website` field is correctly hidden (1x1px clipped `sr-only` wrapper, `aria-hidden="true"`, `tabIndex={-1}`) — not visible to real users despite an unclipped bounding-rect artifact in the raw check data.
