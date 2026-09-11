# PIN Gate Verification — 2026-09-11

Tested against `https://aerotech-web.mathurshubham.workers.dev` (identical Worker to
`https://aerotech.shubhammathur.in`). The live custom-domain hostname failed to
resolve on this machine (`chrome-error://chromewebdata/` on first navigation) —
confirmed as a local stale-DNS issue per the task brief, not a site problem. All
tests below ran against the `.workers.dev` fallback.

| # | PASS/FAIL | screenshot | note |
|---|-----------|------------|------|
| 1 | PASS | gate-1-redirect.png | Root navigation redirected to `/gate?next=%2F`. Gate renders on-brand: AEROTECH wordmark, "SUPPORT SERVICES" sub-label, eyebrow "PREVIEW ACCESS", heading "Enter the access PIN", PIN input, orange "Continue" button. |
| 2 | PASS | gate-2-wrong-pin.png | Submitted `1111`. Inline error shown: **"Incorrect PIN. Please try again."** Stayed on `/gate?next=%2F`; `document.cookie` remained empty. |
| 3 | PASS | gate-3-correct-pin-homepage.png | Submitted `6678` (via Enter key). Redirected to `/`; homepage hero H1 ("From regulatory approval to day-one operations.") and nav rendered. `document.cookie` returned `""` — `aero_gate` not exposed to JS, consistent with HttpOnly. |
| 4 | PASS | gate-4a-services-orat.png, gate-4b-work-taxibot.png | `/services/orat` and `/work/taxibot-india` both rendered directly while authenticated, no gate interstitial. |
| 5 | PASS | gate-5-logout-regated.png | `/gate?logout=1` then `/about` redirected to `/gate?next=%2Fabout` — session cleared, gate re-applied. |
| 6 | PASS | gate-6a-robots-loggedout.png, gate-6b-sitemap-loggedin.png | `/robots.txt` reachable directly while logged out (no gate redirect). After re-entering `6678`, `/robots.txt` and `/sitemap.xml` both reachable (sitemap returned valid XML urlset). |
| 7 | PASS | gate-7-booking-widget.png | On `/contact`, "Consultation — 30 min" label present. Clicked day 15 (highlighted/available), then time slot 10:30, then "Confirm 10:30 IST". A `role="status"` element appeared: "Sample widget — booking goes live with Cal.com. Use the form or WhatsApp to reach us now." |
| 8 | PASS | — (console log, no image) | Console messages matching `error\|Hydration\|Warning` checked on `/` and `/contact` after fresh reloads — none found on either page. |

## Additional checks

- **Layout shift / unstyled flash on gate page:** none observed across repeated
  screenshots/navigations — page renders styled immediately, no FOUC.
- **PIN input focusable and submittable with Enter:** confirmed — clicking into
  the field and pressing Enter after typing `6678` submitted the form and
  redirected successfully (test case 3 and the case-6 re-login both did this).
- **Continue button height:** computed CSS height is `52px` (Tailwind `h-13`),
  which is ≥ 44px.

## Summary

8/8 test cases PASS. No failures observed.
