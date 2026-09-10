# aerotechss.com — Redesign Direction

Rev 1 · 2026-09-10 · Based on the capture in `capture/raw/`, `capture/content/`, `capture/screenshots/` and the audit in `docs/DESIGN-AUDIT.md`.

---

## 1. The thesis

Aerotech buried a world-first credential under a 61-image marquee.

The site's own content says: *"World's first TaxiBot operations with Airbus (A321 family) and Boeing (B737-NG)"* — Aerotech developed the India market for TaxiBot, obtained the regulatory compliances, secured Airbus and Boeing OEM approvals, and ran the operational evaluation. The principal, Ashwani Khanna, has ~30 years in aviation and is a lead auditor for ISO 9001 / 45001 / 14064, an AS9100D certified aerospace auditor, and ICAO-certified on CORSIA verification.

None of that is visible above the fold. The homepage opens with a stock airport carousel and the headline **"DISCOVER OUR EXPERTISE"**, which asserts nothing and is indistinguishable from any other consultancy template.

**The redesign is a positioning fix delivered as a website.** Lead with the named expert and the specific proof. Everything else follows.

## 2. What the current site gets wrong strategically

| Problem | Consequence |
|---|---|
| No value proposition above the fold | A visitor cannot tell in 5 seconds what Aerotech does or why them |
| No proof layer | Zero testimonials, zero metrics, zero named outcomes. Real client logos are hidden in an auto-scrolling marquee, which reads as padding |
| "Projects" nav contains services | Buyer cannot find a buying path; proof and offer are conflated |
| One conversion path, and it's broken | A single form with no `action` and no handler, behind a bot-gate that force-reloads the page |
| The principal is invisible | Boutique consultancies are bought on the person. His bio is a justified wall of text mid-page on `/about` |
| Claims, not outcomes | Copy says "we assist organizations to be kinder to the environment". It never says what changed, by how much, for whom |
| Presents like a mid-size firm | Trying and failing to look like a 500-person firm. Boutique + named expert + specific proof is the stronger and more honest position |

## 3. Positioning

**Do not compete on scale.** Peers like To70 open with "25 years · 12 offices · 500+ clients · 4000+ projects". Aerotech cannot match that and should not imitate the format.

Compete on **specificity and access**:

> Thirty years of Indian aviation operations. Lead auditor across ISO 9001, 45001 and 14064 and AS9100D. ICAO-certified on CORSIA. The team that put the world's first TaxiBot into service with both Airbus and Boeing.

The differentiated wedge — currently invisible — is **India market entry and regulatory approval for foreign aviation OEMs and suppliers**. Aerotech has already done it twice: TaxiBot (market development, DGCA compliance, Airbus + Boeing approvals) and Stelia Aerospace (field representative in India). No competitor can claim the TaxiBot world-first. That deserves its own service page, not a card in a grid.

The Aerocity address is also an asset. Say "Aerocity, adjacent to Delhi IGI Airport" — anyone in Indian aviation reads that correctly.

## 4. Who is buying

Three buyers, none currently served by a clear path:

| Buyer | Wants | Needs to see | Target page |
|---|---|---|---|
| Airport operator opening a terminal | ORAT | Methodology, phase timeline, deliverables list, references | `/services/orat` |
| Airline / MRO / aerospace supplier | ISO & AS9100 audits, compliance, aircraft recovery plans | Auditor credentials, scope, turnaround | `/services/audits-compliance`, `/services/aircraft-recovery` |
| Foreign OEM entering India | Market entry, DGCA approval, field representation | The TaxiBot and Stelia proof | `/services/india-market-entry` |

## 5. Information architecture

Separate **Services** (what you buy) from **Work** (proof). This is the single biggest structural fix.

```
/                                     Home
/services                             Index — 5 cards
  /services/orat                      Operational Readiness & Transfer
  /services/audits-compliance         ISO 9001 / 45001 / 14064, AS9100D
  /services/sustainable-aviation      CORSIA, emissions monitoring
  /services/aircraft-recovery         ← currently orphaned, no nav entry
  /services/india-market-entry        ← NEW. The wedge
/tools/aero-opt                       Resource optimization tool. It is a product, not a service
/work                                 Index, filterable
  /work/taxibot-india                 Flagship. World-first
  /work/stelia-aerospace
  /work/aerowash
  /work/upes
/about                                Firm + Ashwani Khanna + credentials
/insights                             Optional. Only build it if they will actually publish
/contact
```

Delete `blog.php`, `services.php` (both empty stubs), `hire-a-designer.php` (parked-domain artifact).

Each service page is a landing page for a real query — "ORAT consultant India", "AS9100D auditor Delhi", "CORSIA verification India". For a site this size, six focused pages outrank one generic homepage.

**301 redirects are mandatory.** The old URLs carry five years of history:

```
/index.php        → /
/about-us.php     → /about
/audit.php        → /services/audits-compliance
/sustainable.php  → /services/sustainable-aviation
/orat.php         → /services/orat
/resource.php     → /tools/aero-opt
/aircraft-recovery.php → /services/aircraft-recovery
/contact-us.php   → /contact
/blog.php, /services.php, /hire-a-designer.php → 410 Gone
```

## 6. Homepage composition

Nine bands, in this scroll order.

1. **Hero.** One still frame — apron at dusk, navy overlay. Not a carousel. Three uncaptioned stock slides convey nothing and cost 1.3 MB; engagement past slide 1 is near zero.
   - H1: *Aviation and airport consulting — from regulatory approval to day-one operations.*
   - Sub: *Thirty years of aviation operations, compliance and ORAT. We delivered the world's first TaxiBot operations with Airbus and Boeing.*
   - Primary CTA **Book a consultation** · secondary **See our work**
2. **Credential strip.** Immediately under the hero. Not vanity metrics they don't have — the five real ones: `30 yrs aviation` · `World-first TaxiBot ops (A321 / B737-NG)` · `ISO 9001 / 45001 / 14064 lead auditor` · `AS9100D aerospace auditor` · `ICAO CORSIA verification`. **This is the highest-value single change on the site.** It answers "why you" in three seconds.
3. **Client logos.** TaxiBot/KSU, Stelia, SpiceJet, UPES, Aerowash. Static greyscale grid. A marquee says "we are padding this out"; five real logos standing still say "these are our clients".
4. **Services — five cards.** Icon, name, one-line outcome, "Learn more". One uniform navy/white treatment. Kill the four clashing saturated fills.
5. **Flagship case study, full-width.** TaxiBot, as Challenge → Approach → Outcome, with the world-first as a pull quote. One image. Link to the full case.
6. **The principal.** Photo, name, title, two-line bio, credential list, LinkedIn. Boutique consulting sells the person.
7. **Second proof row.** Two more case cards (Stelia, Aerowash) → `/work`.
8. **Insight teaser.** Only if they commit to publishing. An empty `/insights` is worse than none.
9. **Contact band.** Dark navy. "Talk to us about your project" — form or Cal.com embed, Aerocity address, direct phone, email.

## 7. Design system

### Color

Keep the navy/orange brand pair. Fix the ratio and add real neutrals.

```css
--navy-900:  #16203A;  /* headings, dark bands */
--navy-700:  #343C5C;  /* existing brand mark, surfaces, borders */
--slate-500: #5C6683;  /* body text — never pure black */
--paper:     #F7F8FA;  /* ground. Cool, slight navy bias */
--line:      #DDE2EC;  /* rules, card edges */
--orange-500:#FB722E;  /* accent — CTAs and emphasis ONLY */
```

**Rule: orange is for actions and emphasis only, roughly 5% of pixels.** Today it sits on the footer bar, every heading underline and every pill — so it emphasizes nothing. Delete the other ~20 one-off hexes, including the lime `rgba(186,244,36,.89)` card that fails contrast.

### Typography

Two families, self-hosted or properly linked. The current site declares Poppins 100+ times with **no `@font-face` and no font link** — it only renders for visitors who already have it installed.

Move off Poppins. It is geometric and friendly; it reads consumer. For aviation and engineering authority use a grotesque:

- **Display:** Archivo 600/700 (or Inter Tight / Instrument Sans)
- **Body:** Inter 400/500 — 17px, line-height 1.6, `max-width: 68ch`, **left-aligned, never justified**. The current justified narrow columns are what produce the visible rivers in the screenshots.
- **Data / labels:** IBM Plex Mono 500 for metrics, credentials, eyebrows

Fluid scale in rem:

```css
h1    clamp(2.25rem, 4vw,   3.5rem)
h2    clamp(1.75rem, 2.5vw, 2.5rem)
h3    1.375rem
body  1.0625rem
small 0.875rem
```

Weights 400 / 500 / 600 / 700 only. **Drop 900** — heavy weights at 40px read cheap, and the current site uses 900 twenty times. All-caps only for eyebrow labels at 0.75rem with 0.08em tracking; the current 40px all-caps 900-weight headings shout.

### Space, grid, shape

- 8px base scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128
- Section padding `clamp(4rem, 8vw, 7.5rem)` vertical
- Container `max-width: 1200px`, 24px gutters. Current `container-fluid` is edge-to-edge with no measure
- 12-column grid, 24px gutter. **Cards get gaps** — the four project cards currently touch, so they read as one colour-blocked banner rather than four cards
- **One radius: 8px** (plus 999px for pills). Current site mixes 5 / 10 / 20 / 50
- Breakpoints: 3 only — 640 / 1024 / 1280. Current site has 7 overlapping, including a min/max sandwich, and 909 lines of override

### Motion

Fade + 8px rise on scroll-in, 200ms, honouring `prefers-reduced-motion: reduce`. No marquee, no parallax. Sections rest visible; nothing parked at `opacity: 0`.

### Components

Nav (sticky, white, navy links, one orange CTA button) · hero · credential strip · logo grid · service card · case card · full-bleed case feature · person card · eyebrow label · accordion for ORAT phases · form with inline validation · dark contact band · footer · breadcrumb.

## 8. Photography

**They have 60 real client project photos.** Every competitor uses stock. This is the site's genuine advantage and it is currently squandered — 61 images in an auto-scrolling marquee, uncaptioned, 64% missing `alt`, 13.7 MB on one page.

Rules:
- Real project photos over stock, always. Never AI-generated aircraft — aviation buyers spot fake liveries and wrong gear geometry instantly, and it destroys credibility on contact
- Consistent treatment: slight desaturation and a navy duotone for background use; untouched for case studies
- **Caption every project photo** with client, airport and year. An uncaptioned photo is decoration; a captioned one is evidence
- `alt` on all 128 images
- AVIF/WebP with `srcset`, hero preloaded, everything else `loading="lazy"`

## 9. Build

**Astro, static output.** ~15 pages of mostly static content. Astro ships near-zero JS by default, holds case studies and services as Markdown content collections, and its `<Image>` component does AVIF/WebP + `srcset` + lazy automatically — that one feature fixes the 13.7 MB payload.

- **CMS:** Markdown in-repo, or Keystatic for a free git-based editing UI. The previous WordPress site went 3.5 years unedited, so a heavyweight CMS is not the constraint that matters
- **Forms:** Resend or Formspree + honeypot + Cloudflare Turnstile. No PHP mail handler, no bot-gate cookie
- **Booking:** Cal.com embed for "Book a consultation" — removes the form → email → reply latency
- **Host:** Netlify, Vercel or Cloudflare Pages. Free tier is ample and it retires the Apache setup
- **Analytics:** Plausible or GA4

### Performance budget

| Metric | Target | Today |
|---|---|---|
| LCP (4G) | < 2.0s | unmeasured, 2.4 MB single image on one page |
| INP | < 200ms | — |
| CLS | < 0.05 | no dimensions on any image |
| Homepage transfer | < 800 KB | ~1.3 MB images alone |
| Heaviest page | < 1 MB | `sustainable.php` at **13.7 MB** |
| Lighthouse | ≥ 95 all four | — |

## 10. SEO and accessibility

The largest quick win on the whole project: **`<link rel="canonical" href=".../index.php">` is hardcoded on all 11 pages**, so every subpage tells Google to index the homepage instead. All eight content pages are self-deindexing.

- Unique title + meta description per page. Pattern: `ORAT Consulting for Airports | Aerotech Support Services`
- Self-referencing canonical per page
- JSON-LD: `Organization`, `LocalBusiness` (Aerocity NAP), `Person` (Ashwani Khanna), `Service` per service page, `BreadcrumbList`
- `sitemap.xml` + `robots.txt` — Astro generates both
- Remove the bot-gate from the contact page; it blocks crawlers from the only page carrying the NAP
- Claim the Google Business Profile for the Aerocity address

Accessibility target **WCAG 2.2 AA**: semantic landmarks (currently zero), one `h1` per page (homepage has five), `alt` on every image (64% missing), 4.5:1 contrast throughout (the lime card fails), visible focus rings, keyboard-operable nav and accordion, form labels plus `aria-describedby` for errors, `prefers-reduced-motion` respected.

## 11. Content work

Roughly half the project, and the half usually skipped.

- Rewrite the About page out of Title Case On Every Word
- Fix the nav typo "Opartional" → "Operational"
- Restructure every service page: who it is for → what you get (deliverables) → how it runs (phases) → why us (the credential) → CTA
- Write four real case studies as Challenge / Approach / Outcome. TaxiBot first
- **Collect two or three client quotes.** There are currently zero testimonials. For a consultancy that is the biggest gap after positioning
- Add numbers wherever they exist: airports served, audits completed, aircraft types, years
- Replace the hardcoded footer year with `date('Y')` equivalent — it reads 2026 by coincidence and breaks on 1 Jan 2027

## 12. Phasing

| Phase | Duration | Output |
|---|---|---|
| 0 — Positioning | 1 week | Hero copy, credential strip content, client quotes, metrics gathered |
| 1 — Design | 1 week | Token system, homepage comp, one service page comp |
| 2 — Build | 2 weeks | Astro build, all pages, image pipeline, forms |
| 3 — Launch | 1 week | SEO, JSON-LD, a11y audit, 301 redirects, Lighthouse pass |

## 13. Do not

- No carousel
- No infinite logo marquee
- No stock photos of generic businesspeople in boardrooms
- No AI-generated aircraft imagery
- No "Welcome to our website"
- No parallax or heavy scroll animation
- No attempt to look like a 500-person firm
