# Aerotech — design language

Rev 1 · 2026-09-11 · Binding for every component agent. Sources: `src/app/globals.css` (tokens), `docs/REDESIGN-BRIEF.md` §7, drafts in `design/*.dc.html`.

**Rules of engagement:** use tokens, never raw hex. Use the `container-site`, `eyebrow`, `band`, `measure`, `runway`, `prose-site` utilities already in `globals.css` rather than re-deriving them. Do not add a colour, a radius, a shadow or a font.

---

## 1. Colour roles

| Token | Value | Role |
|---|---|---|
| `ink` | `#16203A` | Headings, nav links at rest |
| `ink-soft` | `#343C5C` | Lede paragraphs, nav idle links |
| `body` | `#4B5570` | Body copy. Never pure black |
| `subtle` | `#6E7896` | Eyebrows, captions, meta |
| `paper` | `#F7F8FA` | Page ground |
| `surface` | `#FFFFFF` | Cards, white sections |
| `surface-2` | `#EEF1F6` | Callouts, tertiary cards |
| `line` | `#DDE2EC` | 1px rules and card edges |
| `orange-500` | `#FB722E` | Accent — CTAs, icons, eyebrow accent, rules |
| `orange-600` | `#C4470D` | Link text on light (contrast-safe) |
| `orange-100` | `#FFF3EC` | Tint — selected-chip fill (e.g. `LeadForm` topic chips), hover/selection backgrounds only. Never a section fill, never under body text |
| `band` / `band-deep` | `#16203A` / `#0F1729` | Navy section / footer |
| `band-ink` / `band-muted` / `band-line` | `#E9ECF4` / `#9AA4C0` / `#2C365A` | Text, secondary text, dividers inside a navy band |

**The ≤5% orange rule.** Orange marks actions and emphasis only, roughly 5% of pixels on any screen: primary buttons, link arrows, lucide icons, credential numerals, the 3px pull-quote rule, the runway dash, footer eyebrows. Never on headings, never as a section fill, never as a heading underline, never on more than one button in a group. On light grounds use `orange-600` for text; `orange-500` is a fill/stroke colour.

## 2. Type

Archivo (`font-display`) headings · Inter (`font-sans`) body · IBM Plex Mono (`font-mono`) data and labels. Weights 400/500/600/700 only — never 800/900.

| Element | Spec |
|---|---|
| h1 | `clamp(2.25rem, 4vw, 3.5rem)` / 700 / line-height 1.05 / `-0.018em` / max 20ch |
| h2 | `clamp(1.75rem, 2.5vw, 2.5rem)` / 600 / 1.14 / max 24ch |
| h3 | `1.375rem` / 600 / 1.3 |
| h4 (card sub) | `1.0625rem` / 600 |
| Body | `1.0625rem` / 1.62 / `measure` (68ch) / **left-aligned, never justified** |
| Lede | `1.1875rem` / 1.56 / `text-ink-soft` / max 54–58ch |
| Card body | `0.9375rem` / 1.58 |
| Small / meta | `0.875rem` |
| Eyebrow | `.eyebrow` — mono 11px / 500 / `0.11em` / uppercase / `subtle` (`.eyebrow-accent` for orange, `band-muted` inside a band) |
| Photo caption | mono 11px / `subtle` (or `band-muted`) / 9–10px above the image |
| Metric numeral | mono 25px / 500 / `orange-500` / line-height 1 |
| Wordmark | Real logo image (`Wordmark.tsx`), not text — see §10a |

All-caps is for eyebrows, wordmark and mono labels only.

## 3. Space and grid

- 8pt scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128.
- Section padding: `clamp(4rem, 8vw, 7.5rem)` vertical. Drafts sit at 80–100px desktop.
- Container: `.container-site` — max 1200px, 24px gutters.
- 12-column mental grid, **24px gap** between cards. Cards never touch.
- Card padding 28–30px (`p-7` / `px-7 pt-[30px] pb-7`). Image-topped cards: 26px 28px 28px below the image.
- Section heading → content: 40–44px. Eyebrow → h2: 12px. h2 → paragraph: 20–22px.
- Hairline grids (credential strip, deliverables): `gap: 1px` over a `band-line`/`line` background — the gap *is* the rule.
- Nav height 84px desktop, 64px mobile. Buttons 52px tall (`h-13`), 44px in the nav.
- Breakpoints: 640 / 1024 / 1280 only.

## 4. Shape

**One radius: 8px** (`rounded-lg`), plus `rounded-full` for pills and tags. 1px `line` borders (`band-line` inside navy). **No shadows, no gradients** except the hero's navy scrim and the runway dash. Images `rounded-lg`, `object-cover`, always with explicit dimensions.

## 5. The three surface modes

1. **Paper** — page ground. `bg-paper text-body`, headings `text-ink`, cards `surface` + `line` border.
2. **White** — `bg-surface`, usually delimited top or bottom by `border-line`. Alternates with paper to separate bands without adding colour.
3. **Navy band** — `.band`. Headings `#FFF`, body `band-muted`, dividers `band-line`, eyebrow `.eyebrow-accent` or `band-muted`, secondary buttons become ghost (`border-white/35 text-white`). Footer uses `band-deep`. Never place a paper card inside a band except the deliberate white form panel.

## 6. Motifs

- **Runway dash** — `.runway` (4px, `repeating-linear-gradient` 28/24px) pinned to the bottom of the hero. Used once per page, maximum.
- **Mono eyebrow** above every section heading; it names the section, it is not decoration.
- **Pull quote** — `border-l-[3px] border-orange-500 pl-5`, Archivo 500 20px, no quotation marks.
- **Captioned photography** — every project photo carries a mono 11px caption: client · airport · year. Uncaptioned photo = decoration; captioned = evidence. `alt` on every image, no exceptions, no stock, no AI aircraft.
- **Hairline metric grids** for credentials and facts; **2px top rule in `ink`** for "who it's for" columns.
- **Numbered items** use mono `01`–`06` in `orange-500`.

## 7. Icons

`lucide-react` only. 24px (26px in service cards, 19px in contact rows), `strokeWidth={1.6}`, `stroke` = `orange-500` on both grounds, `currentColor` when inline with text. Never emoji. Decorative icons get `aria-hidden`.

## 8. Motion

Fade + 8px rise, 200ms, `ease-out`, on scroll-in, via `motion` (`motion/react`). Stagger 60ms max within one group. Buttons/links: 150ms colour transition only. **Everything is visible at rest** — never ship `opacity: 0` as the resting state; gate the animation on `useReducedMotion()` and honour the `prefers-reduced-motion` block already in `globals.css`. No marquee, no parallax, no carousel, no counters.

## 9. Accessibility (WCAG 2.2 AA)

One `h1` per page. Real landmarks: `header`, `nav`, `main`, `footer`, `section` with `aria-labelledby`. 4.5:1 minimum — on paper use `body`/`ink`, on navy use `band-ink`/`band-muted`, links use `orange-600`. Visible focus everywhere via the `ring` token (`focus-visible:ring-3 focus-visible:ring-ring/50`); never remove outlines. 44×44px minimum hit targets on mobile. Keyboard-operable nav, accordion and form; labels plus `aria-describedby` for errors. Skip link to `#main`.

## 9a. Logo assets

The client's real logo (a swoosh mark + "Aerotech" + "Transforming Aviation" tagline, drawn as one angled composition) is not legible as a single raster at nav sizes — "Aerotech" is set at an angle across the swoosh, and the source is low-resolution, so shrinking the whole mark to a 36–48px nav height turns the word to mush. `Wordmark` instead renders a **horizontal lockup**: just the arrowhead glyph, cropped out of the source, beside the name set as real type. Source: `capture/assets/images/logo.png` (697×665 RGBA). Crops live in `scripts/source-images/logo-*.png`, built by `pnpm images` into `public/images/` + `public/images/manifest.json`:

| Asset | Crop | Use |
|---|---|---|
| `logo-lockup` | Full logo, transparent padding trimmed, tagline included (697×664) | Large/marketing use only, via `Wordmark withTagline` — dark palette, needs a light ground |
| `logo-mark` | Rows 1–570 (swoosh + "Aerotech"), tagline removed (697×570) | Unused by `Wordmark` directly; kept as the source `logo-glyph`/`logo-glyph-light` are cropped from |
| `logo-mark-light` | Same crop as `logo-mark`, recoloured per-pixel: near-black word text → white, swoosh → `#A8C0D8`/`#C3CADD` | Unused by `Wordmark` directly; source for `logo-glyph-light` |
| `logo-glyph` | Swoosh arrowhead only, no text, cropped from `logo-mark` at `{left:535,top:0,width:162,height:220}` (162×220) | `Wordmark variant="dark"` (default) lockup glyph; `icon.tsx` (32px tab icon) |
| `logo-glyph-light` | Same crop, taken from `logo-mark-light` (162×220) | `Wordmark variant="light"` lockup glyph — navy bands (footer, gate) |

`Wordmark.tsx` renders the lockup — `logo-glyph(-light)` beside a typeset name — via `next/image` + inline text, sized from the manifest (`resolveImage` in `image-size.ts`); it stays a server component. Layout, tuned at `height=38` (the nav size) and scaled proportionally for other heights:

- Glyph: `height` px tall (36–40px at nav size), left-aligned.
- 12px gap, then the name: `AEROTECH`, Archivo 700, 19px, `0.02em` tracking.
- Directly under it: `SUPPORT SERVICES`, IBM Plex Mono 500, 9px, `0.19em` tracking, uppercase.

Props: `variant?: "dark" | "light"` (navy glyph + ink name vs. light glyph + white name), `height?: number` (glyph height in px, scales the rest), `withTagline?: boolean` (swaps in the full raster `logo-lockup` — dark palette only, do not combine with `variant="light"`), plus the legacy `onBand`/`size` props kept for call sites outside this change's scope (`MobileNav.tsx`, `app/gate/page.tsx`). `icon.tsx` and `opengraph-image.tsx` render the real logo directly and are unaffected by the lockup.

**Minimum legible glyph height: ~24px.** Tested a sheet at 24/28/32/38px — the arrowhead's two chevron notches stay crisp at 1x down to ~24px; below that they start to fill in. `SiteHeader`/`MobileNav`/gate default to 38px (comfortably inside the 36–40px target), the footer runs the same lockup at 48px where there's more room.

## 10. Component inventory

| Component | Spec | Artboard |
|---|---|---|
| `Nav` | Sticky white, 84px, `border-b line`, wordmark left, 15px/500 links, active link 2px orange inset underline, one orange 44px CTA. Sheet drawer < 1024px. | Main, Orat, MobileHome |
| `Footer` | `band-deep`, 4 cols (1.4fr 1fr 1fr 1fr, 48px gap), orange mono column heads, 14px `#8C95B0` links, mono legal bar above a `#232A3D` rule. Compact one-line variant. | Main, Orat |
| `Hero` | 620px navy, photo at 0.5 opacity + 96° navy scrim, orange eyebrow, h1 max 17ch, 19px sub max 54ch, primary + ghost CTA, runway dash bottom. | Main, MobileHome |
| `CredentialStrip` | 5-up 1px hairline grid on navy, mono 25px orange numeral + 13px `band-muted` label, 30px/24px cells. Highest-value element on the site. | Main, MobileHome |
| `LogoRow` | White band, 44px padding, "Selected clients" eyebrow + `grayscale opacity-[0.62]` logos, space-between. Static — never a marquee. | Main |
| `ServiceCard` | White card, 30/28/28 padding, 26px orange lucide icon, h3 20px/600, 15px body, orange `Name →` link. Variants: `featured` (orange border + "New" pill), `tool` (`surface-2` fill, navy icon). | Main |
| `CaseCard` | White card, `overflow-hidden`, 232px cover image, mono uppercase client · location, h3 22px, 15px body, orange `Read the case →`. | Main |
| `CaseFeature` | Full-width navy, two columns 1fr/1fr 64px gap: copy + pull quote + 3-up fact grid on the left, captioned image stack on the right. | Main, Taxibot |
| `PersonCard` | 440px captioned portrait + copy: eyebrow, name h2, orange mono role, lede, 2×2 credential grid on `line` top rules, profile/LinkedIn links. | Main, About |
| `PhaseTimeline` | 4 equal columns, 28px right padding, orange mono `T−18 → T−12` range, h3 19px, 14px body. Accordion below 1024px. | Orat |
| `DeliverablesGrid` | 2-col 1px hairline grid inside an 8px `line` frame, cells 24/26px, orange mono `01`, h4 17px, 14px body. | Orat |
| `StatBand` | Hairline fact grid, mono numerals over 12–13px labels; navy or paper. Aggregate numbers, not client logos. | Main, Taxibot |
| `FAQ` | shadcn Accordion, `line` dividers, question Archivo 17px/600, answer 15px body. Visible text — no FAQ schema. | Orat |
| `CTABand` | Navy, `clamp` padding, h2 max 24ch, `band-muted` sub max 50ch, one orange CTA (+ optional ghost). | Orat, About |
| `LeadForm` | White 8px panel, 30/28/32 padding, eyebrow head, 13px/600 labels, 46px `paper` inputs with `line` border, full-width orange submit, 12px helper. Inline validation, honeypot, Turnstile. | Main, Contact |
| `WhatsAppButton` | `wa.me` pill, fixed bottom-right on mobile, `MessageCircle` icon, orange fill, `aria-label`. | Contact |
| `Breadcrumb` | Mono 11px `0.09em` uppercase `SERVICES / ORAT` above the page h1; `BreadcrumbList` JSON-LD. | Orat, Taxibot |
| `Prose` | `.prose-site` wrapper for MDX; mapping lives in `mdx-components.tsx`. Left-aligned, 68ch. | Taxibot, About |
| `SectionHeading` | Eyebrow + h2 (+ optional 15px/600 orange right-aligned "All … →"), `items-end justify-between`, 40–44px bottom margin. | Main, Orat |
