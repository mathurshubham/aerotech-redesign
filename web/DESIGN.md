# Aerotech — design language

Rev 2 · 2026-09-17 · Binding for every component agent. Sources: `src/app/globals.css` (tokens), `docs/REDESIGN-BRIEF.md` §7, drafts in `reference/design/*.dc.html`.

**Rules of engagement:** use tokens, never raw hex. Use the `container-site`, `eyebrow`, `band`, `measure`, `runway`, `prose-site` utilities already in `globals.css` rather than re-deriving them. Do not add a colour, a radius, a shadow or a font.

---

## 1. Colour roles

| Token | Value | Role |
|---|---|---|
| `ink` | `#232e49` | Headings, nav links at rest (`mist-900`) |
| `ink-soft` | `#3f4c6d` | Lede paragraphs (`mist-700`). Footer secondary text on `band-deep` |
| `body` | `#55628a` | Body copy (`mist-600`). Never pure black. Safe on paper and `band`; fails on `band-deep` |
| `subtle` / `subtle-ink` | `#5a6584` | Eyebrows, captions, meta — what `.eyebrow` and `text-subtle` render. AA on paper and `band`; fails on `band-deep` |
| `mist-500` | `#77839f` | Raw brand grey. Kept for non-text/shadcn `muted` use; do not use for text on any light ground — it sits under the 4.5:1 floor below 24px |
| `paper` | `#f6f8fc` | Page ground (`mist-50`) |
| `surface` | `#ffffff` | Cards, white sections |
| `surface-2` | `#ebeff7` | Callouts, tertiary cards (`mist-100`) |
| `line` / `line-soft` | `#dbe2ef` / `#e7ecf6` | 1px rules and card edges / softer hairlines |
| `aqua-400` | `#17a79b` | Decorative only. Never load-bearing |
| `aqua-500` | `#0c8a80` | Icon strokes, rules, numerals ≥24px (3:1 floor). Fill/stroke, not small text |
| `aqua-600` | `#0a736c` | Button fill under white text; numerals 19–23px |
| `aqua-700` | `#085853` | Link text, eyebrows, small mono labels (4.5:1, wide margin). Text-safe stop on light grounds |
| `aqua-100` | `#e2f2f0` | Tint — selected-chip fill (e.g. `LeadForm` topic chips), hover/selection backgrounds only. Never a section fill, never under body text |
| `band` / `band-deep` | `#dde7f6` / `#cbd9ee` | Pastel sky section / footer. Light grounds, dark text |
| `band-ink` / `band-muted` / `band-line` | `#232e49` / `#55628a` / `#b3c6e2` | Headings, secondary text, dividers inside a pastel band |

Verified contrast: on `paper` — ink 12.67:1 · body 5.64:1 · subtle 5.27:1 · aqua-700 7.80:1 · aqua-600 5.36:1 · aqua-500 3.98:1. On `band` — ink 10.8:1 · body/`band-muted` 4.81:1 · subtle 4.64:1 · aqua-700 6.65:1 · aqua-600 4.57:1 · aqua-500 3.39:1. On `band-deep` — ink 9.43:1 · ink-soft 5.96:1 · aqua-700 5.81:1; `body` 4.20:1, `subtle` 4.05:1, `aqua-600` 3.99:1 and `aqua-500` 2.96:1 all fail, so **never put those four on `band-deep`** — the unlayered guard at the end of `globals.css` promotes them if you do. White text on `aqua-600` 5.70:1 · on `aqua-700` 8.29:1.

**The ≤5% accent rule.** Aqua marks actions and emphasis only, roughly 5% of pixels on any screen: primary buttons, link arrows, lucide icons, credential numerals, the 3px pull-quote rule, the runway dash, footer eyebrows. Never on headings, never as a section fill, never as a heading underline, never on more than one button in a group. Grounds went pastel, so the accent went darker and more saturated — a pale teal on a pale sky band has nothing to push against. On light grounds the text-safe stop is `aqua-700`; `aqua-500` is a fill/stroke colour. `.eyebrow-accent` renders `aqua-700`, not the -500 stroke stop: an 11px eyebrow is small text, and -700 is the only accent stop that clears 4.5:1 on both paper and band.

## 2. Type

Archivo (`font-display`) headings · Inter (`font-sans`) body · IBM Plex Mono (`font-mono`) data and labels. Weights 400/500/600/700 only — never 800/900.

| Element | Spec |
|---|---|
| h1 | `.h1-hero` — `clamp(2.25rem, 4.4vw, 4rem)` / 700 / line-height 1.04 / `-0.018em` / max 20ch |
| h2 | `text-h2` — `clamp(1.875rem, 2.9vw, 2.5rem)` / 600 / 1.14 / max 24ch |
| h3 | `text-h3` — `clamp(1.25rem, 1.6vw, 1.4375rem)` / 600 / 1.3 |
| h4 (card sub) | `1.0625rem` / 600 |
| Body | `1.0625rem` / 1.62 / `measure` (68ch) / **left-aligned, never justified** |
| Lede | `1.1875rem` / 1.56 / `text-ink-soft` / max 54–58ch |
| Card body | `0.9375rem` / 1.58 |
| Small / meta | `0.875rem` |
| Eyebrow | `.eyebrow` — **sans 13px / 600 / `0.01em` / sentence case** / `subtle-ink` (`.eyebrow-accent` for aqua-700). Never mono, never uppercase, never wide-tracked: these labels carry real information and the visitor is not necessarily a designer. `.eyebrow` on `band-deep` is bumped to `ink-soft` automatically — see the guard at the end of `globals.css` |
| Photo caption | sans 13px / `subtle-ink` (or `band-muted`) / 9–10px above the image |
| Metric numeral | mono 25px / 500 / `aqua-500` / line-height 1 |
| Wordmark | Real logo image (`Wordmark.tsx`), not text — see §9a |

### Register

The buyers are institutions: airport operators, airlines, foreign aerospace OEMs
entering India, and DGCA-facing compliance teams. The work is official,
procurement-driven and involves dealing with regulators. So copy reads as a
professional services firm writing a scope of work, never as an agency writing a
slogan.

- **Lead with the mandate or the deliverable**, named the way a scope of work or
  an RFP line item names it. Not a hook, not a first-person confession ("I need a
  DGCA approval…"), not an aphorism ("An audit is worth the signature on it").
- **Authority and standard names carry the persuasion**: DGCA, CAR, ICAO, CORSIA,
  ISO 9001/45001/14064, AS9100D, ACI-ASQ, T−18, airframer, regulator, operator,
  ground handler. Specificity is the credibility; adjectives are not.
- **Formal but plain.** No hype adjectives, no exclamation, no rhetorical
  questions, no second-person challenges.
- Prefer *engagement*, *mandate*, *conducted*, *appointed*, *submission*,
  *verification* over *project*, *run*, *got*, *landed*.
- **Never fabricate a fact to make a line land.** An unquantified claim stays
  unquantified until someone supplies the number.

All-caps is for the wordmark only. Mono is for **data** — numerals, phone, email, credential values — never for a label a visitor has to read as prose.

h2 and h3 are `--text-h2`/`--text-h3` tokens (`globals.css`), the same fluid
idiom as `.h1-hero`. Never set a heading size per component: the same nominal
level used to render at 36/38/40px across three components because each one
picked its own arbitrary rem value.

## 3. Space and grid

- 8pt scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128.
- Section padding: `clamp(4rem, 8vw, 7.5rem)` vertical — the `.section-pad`
  utility, exported as `sectionPad`. It is the *only* section rhythm; never
  hand-roll a `py-NN` on a section. A slide (below) runs it at
  `clamp(2.5rem, 5vw, 5rem)`, since the slide already reserves the screen.
- Container: `.container-site` — max 1200px, 24px gutters.
- 12-column mental grid, **24px gap** between cards. Cards never touch.
- Card padding 28–30px (`p-7` / `px-7 pt-[30px] pb-7`). Image-topped cards: 26px 28px 28px below the image.
- Section heading → content: 40–44px. Marker → h2: 20px. h2 → paragraph: 20–22px.
- Every section heading is preceded by a **`SectionMarker`**: a 52×3 `aqua-500`
  rule plus the label. It is the runway motif at one dash, so a section label and
  the hero's closing rule read as the same system. Never a bare `.eyebrow` in a
  heading slot.
- **Every primary button carries one line of proof in the same eyeline** —
  `Hero`'s and `CTABand`'s `proof` prop. A visitor deciding whether to make
  contact is deciding about the person on the other end, and that line is the
  last thing they read before clicking. One primary action per screen, repeated
  down the page; never two competing buttons.
- Hairline grids (credential strip, deliverables): `gap: 1px` over a `band-line`/`line` background — the gap *is* the rule.
- Nav height 84px desktop, 66px mobile/tablet (67px including the 1px `border-b`) — `SiteHeader.tsx` (`h-[66px]`). Buttons 52px tall (`h-13`), 44px in the nav.
- Breakpoints: 640 / 1024 / 1280 only.

## 4. Shape

**One radius: 8px** (`rounded-lg`), plus `rounded-full` for pills and tags. 1px `line` borders (`band-line` inside a band). **No shadows, no gradients** except the hero's ground wash and the runway dash. Images `rounded-lg`, `object-cover`, always with explicit dimensions.

## 5. The three surface modes

1. **Paper** — page ground. `bg-paper text-body`, headings `text-ink`, cards `surface` + `line` border.
2. **White** — `bg-surface`, usually delimited top or bottom by `border-line`. Alternates with paper to separate bands without adding colour.
3. **Pastel band** — `.band`. Headings `band-ink`, secondary text `band-muted`, dividers `band-line`, eyebrow `.eyebrow-accent` or `band-muted`, secondary buttons an ink outline (`border-ink/25 text-ink`). Footer uses `band-deep` (headings `ink`, secondary `ink-soft` — not `body`/`subtle`/`.eyebrow`). A white (`surface`) card on a pastel band is a legitimate lift (lead-form panel). Do not nest a band inside a band; `paper` on `band` is too close in value to read as a card.

## 6. Motifs

- **Runway dash** — `.runway` (4px, `repeating-linear-gradient` 28/24px, `aqua-500`) pinned to the bottom of the hero. Used once per page, maximum.
- **Mono eyebrow** above every section heading; it names the section, it is not decoration.
- **Pull quote** — `border-l-[3px] border-aqua-500 pl-5`, Archivo 500 20px, no quotation marks.
- **Captioned photography** — every project photo carries a mono 11px caption: client · airport · year. Uncaptioned photo = decoration; captioned = evidence. `alt` on every image, no exceptions, no stock, no AI aircraft.
- **Hairline metric grids** for credentials and facts; **2px top rule in `ink`** for "who it's for" columns.
- **Numbered items** use mono `01`–`06` in `aqua-500`.
- **Hero wash** — a wash of the ground colour lifting the photo toward the pastel band, not a dark scrim pushing it away.

## 7. Icons

`lucide-react` only. 24px (26px in service cards, 19px in contact rows), `strokeWidth={1.6}`, `stroke` = `aqua-500` on both grounds, `currentColor` when inline with text. Never emoji. Decorative icons get `aria-hidden`.

## 8. Motion

Fade + 8px rise, 200ms, `ease-out`, on scroll-in, via `motion` (`motion/react`). Stagger 60ms max within one group. Buttons/links: 150ms colour transition only. **Everything is visible at rest** — never ship `opacity: 0` as the resting state; gate the animation on `useReducedMotion()` and honour the `prefers-reduced-motion` block already in `globals.css`. No marquee, no parallax, no carousel, no counters. Mobile menu: 200ms `ease-out` fade + slide-from-top of the panel under the sticky header; hamburger morphs to X in place. Overlay is `bg-ink/40` from `--header-h` down. Reduced-motion still kills it via the global block.

## 9. Accessibility (WCAG 2.2 AA)

One `h1` per page. Real landmarks: `header`, `nav`, `main`, `footer`, `section` with `aria-labelledby`. 4.5:1 minimum — on paper use `body`/`ink`, on band use `band-ink`/`band-muted`, on `band-deep` use `ink`/`ink-soft` (not `body` or `subtle`; both fail AA there), links use `aqua-700`. Visible focus everywhere via the `ring` token (`focus-visible:ring-3 focus-visible:ring-ring/50`); never remove outlines. 44×44px minimum hit targets on mobile. Keyboard-operable nav, accordion and form; labels plus `aria-describedby` for errors. Skip link to `#main`.

## 9a. Logo assets

The client's real logo (a swoosh mark + "Aerotech" + "Transforming Aviation" tagline, drawn as one angled composition) is not legible as a single raster at nav sizes — "Aerotech" is set at an angle across the swoosh, and the source is low-resolution, so shrinking the whole mark to a 36–48px nav height turns the word to mush. `Wordmark` instead renders a **horizontal lockup**: just the arrowhead glyph, cropped out of the source, beside the name set as real type. Source: `reference/capture/assets/images/logo.png` (697×665 RGBA). Crops live in `scripts/source-images/logo-*.png`, built by `pnpm images` into `public/images/` + `public/images/manifest.json`:

| Asset | Crop | Use |
|---|---|---|
| `logo-lockup` | Full logo, transparent padding trimmed, tagline included (697×664) | Large/marketing use only, via `Wordmark withTagline` — dark palette, needs a light ground |
| `logo-mark` | Rows 1–570 (swoosh + "Aerotech"), tagline removed (697×570) | Unused by `Wordmark` directly; kept as the source `logo-glyph`/`logo-glyph-light` are cropped from |
| `logo-mark-light` | Same crop as `logo-mark`, recoloured per-pixel: near-black word text → white, swoosh → `#A8C0D8`/`#C3CADD` | Unused by `Wordmark` directly; source for `logo-glyph-light` |
| `logo-glyph` | Swoosh arrowhead only, no text, cropped from `logo-mark` at `{left:535,top:0,width:162,height:220}` (162×220) | `Wordmark variant="dark"` (default) lockup glyph; `icon.tsx` (32px tab icon). Site chrome (header, footer) uses this |
| `logo-glyph-light` | Same crop, taken from `logo-mark-light` (162×220) | `Wordmark variant="light"` lockup glyph — dark grounds only (OG image). Drawn for navy bands that no longer exist in page chrome; footer uses the default dark lockup |

`Wordmark.tsx` renders the lockup — `logo-glyph(-light)` beside a typeset name — via `next/image` + inline text, sized from the manifest (`resolveImage` in `image-size.ts`); it stays a server component. Layout, tuned at `height=38` (the nav size) and scaled proportionally for other heights:

- Glyph: `height` px tall (36–40px at nav size), left-aligned.
- 12px gap, then the name: `AEROTECH`, Archivo 700, 19px, `0.02em` tracking.
- Directly under it: `SUPPORT SERVICES`, IBM Plex Mono 500, 9px, `0.19em` tracking, uppercase.

Props: `variant?: "dark" | "light"` (mist glyph + ink name vs. light glyph + white name). `variant="light"` is retained for dark grounds (the OG image) but is not used by site chrome. Also `height?: number` (glyph height in px, scales the rest), `withTagline?: boolean` (swaps in the full raster `logo-lockup` — dark palette only, do not combine with `variant="light"`), plus the legacy `onBand`/`size` props kept for `app/gate/page.tsx`. `icon.tsx` and `opengraph-image.tsx` render the real logo directly and are unaffected by the lockup.

**Minimum legible glyph height: ~24px.** Tested a sheet at 24/28/32/38px — the arrowhead's two chevron notches stay crisp at 1x down to ~24px; below that they start to fill in. `SiteHeader` and the gate default to 38px (comfortably inside the 36–40px target), the footer runs the same lockup at 48px where there's more room.

## 10. Component inventory

| Component | Spec | Artboard |
|---|---|---|
| `Nav` | Sticky white, 84px desktop / 66px mobile (67px with the `border-b line`), wordmark left, 15px/500 links, active link 2px aqua inset underline, one aqua 44px CTA. Below 1024px: 44px icon in the header morphs Menu ↔ X; panel fills the viewport under the header (no second wordmark, no second close). Display-size links, one CTA, phone + email. | Main, Orat, MobileHome |
| `Footer` | `band-deep`, 4 cols (1.4fr 1fr 1fr 1fr, 48px gap), aqua-700 mono column heads, 14px `ink-soft` links, mono legal bar above a `band-line` rule. Compact one-line variant. | Main, Orat |
| `Hero` | 620px band, photo at 0.5 opacity + 96° ground wash, aqua-700 eyebrow, h1 max 17ch, 19px sub max 54ch, primary + ink-outline CTA, runway dash bottom. | Main, MobileHome |
| `CredentialStrip` | 5-up 1px hairline grid on band, mono 25px aqua-500 numeral + 13px `band-muted` label, 30px/24px cells. Highest-value element on the site. | Main, MobileHome |
| `LogoRow` | White band, 44px padding, "Selected clients" eyebrow + `grayscale opacity-[0.62]` logos, space-between. Static — never a marquee. | Main |
| `ServiceCard` | White card, 30/28/28 padding, 26px aqua lucide icon, h3 20px/600, 15px body, aqua `Name →` link. Variants: `featured` (aqua border + "New" pill), `tool` (`surface-2` fill, mist icon). | Main |
| `CaseCard` | White card, `overflow-hidden`, 232px cover image, mono uppercase client · location, h3 22px, 15px body, aqua `Read the case →`. | Main |
| `CaseFeature` | Full-width band, two columns 1fr/1fr 64px gap: copy + pull quote + 3-up fact grid on the left, captioned image stack on the right. | Main, Taxibot |
| `PersonCard` | 440px captioned portrait + copy: eyebrow, name h2, aqua mono role, lede, 2×2 credential grid on `line` top rules, profile/LinkedIn links. | Main, About |
| `PhaseTimeline` | 4 equal columns, 28px right padding, aqua mono `T−18 → T−12` range, h3 19px, 14px body. Accordion below 1024px. | Orat |
| `DeliverablesGrid` | 2-col 1px hairline grid inside an 8px `line` frame, cells 24/26px, aqua mono `01`, h4 17px, 14px body. | Orat |
| `StatBand` | Hairline fact grid, mono numerals over 12–13px labels; band or paper. Aggregate numbers, not client logos. | Main, Taxibot |
| `FAQ` | shadcn Accordion, `line` dividers, question Archivo 17px/600, answer 15px body. Visible text — no FAQ schema. | Orat |
| `CTABand` | Band, `clamp` padding, h2 max 24ch, `band-muted` sub max 50ch, one aqua CTA (+ optional ink-outline ghost). | Orat, About |
| `LeadForm` | White 8px panel, 30/28/32 padding, eyebrow head, 13px/600 labels, 46px `paper` inputs with `line` border, full-width aqua submit, 12px helper. Inline validation, honeypot, Turnstile. | Main, Contact |
| `WhatsAppButton` | `wa.me` pill, fixed bottom-right on mobile, `MessageCircle` icon, aqua fill, `aria-label`. | Contact |
| `Breadcrumb` | Mono 11px `0.09em` uppercase `SERVICES / ORAT` above the page h1; `BreadcrumbList` JSON-LD. | Orat, Taxibot |
| `Prose` | `.prose-site` wrapper for MDX; mapping lives in `mdx-components.tsx`. Left-aligned, 68ch. | Taxibot, About |
| `SectionHeading` | Eyebrow + h2 (+ optional 15px/600 aqua right-aligned "All … →"), `items-end justify-between`, 40–44px bottom margin. | Main, Orat |
