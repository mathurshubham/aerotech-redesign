# aerotechss.com — Design System Audit

Reference for the redesign. Everything below is measured from the live CSS (`assets/css/style.css` 1494 lines, `responsive.css` 909, `style1.css` 40) and the captured screenshots.

## Colors (by frequency of use)

| Hex | Occurrences | Role today |
|---|---|---|
| `#343c5c` | 194 | Primary — navy. Nav text, headings, footer bg, dark cards, buttons |
| `#fb722e` | 25 | Accent — orange. Footer bottom bar, heading underlines, "Read More" pills, breadcrumb active |
| `#ffffff` | 23 | Page background, nav background, text on dark |
| `#0f3a91` | 8 | Secondary blue (link/body text on some project pages) |
| `#ebebeb` | 4 | Section band background (alternating grey) |
| `#008ae6` / `#0073e6` | 7 / 2 | Third blue — project card #3 |
| `#8cc53f` | 2 | Green — "Our Mission" panel |
| `rgba(52,60,92,0.89)` | 2 | Navy overlay on hero/banner images |
| `rgba(186,244,36,0.89)` | 1 | Lime — ORAT project card |

Plus ~15 one-off hexes (`#ed0b0b`, `#eb2525`, `#4747d1`, `#eef215`, `#e6005c`, `#2cadec`, `#122fc0`…) — dead or accidental. **Palette is uncontrolled: the 4 project cards use 4 unrelated saturated colors (navy / dark green / bright blue / lime) with white text, and the lime card fails contrast badly.**

Proposed token set for the rebuild:
```
--navy-900: #343c5c   (primary, keep — it is the brand)
--orange-500: #fb722e (accent, keep)
--grey-100: #ebebeb   (band)
```
Drop every other color. Re-derive the project-card colors as tints/shades of navy + orange instead of 4 arbitrary hues.

## Typography

- Single family: **Poppins** — declared as `font-family: "Poppins"` with **no `@font-face` and no Google Fonts link**. So it only renders for visitors who happen to have Poppins installed locally; everyone else gets the browser default. This is a real bug and explains the inconsistent look. Fix by self-hosting or linking the font properly.
- Icon font: Font Awesome 4.7.0 (CDN). Old — v4 icon names.
- Weights used: `700` (76×), `900` (20×), `bold`, `500`, `400`. Effectively only heavy weights — the whole site shouts.
- Sizes (px, no rem anywhere): `41, 40, 35, 30, 28, 27, 25, 24, 22, 20, 18, 15, 14, 11`. `35px` used 49× — the de-facto section heading. **No scale, no fluid type, no line-height system.**
- Heading semantics are wrong: `h4` is used for body paragraphs, `h5` for "Read More" links, and `h1` appears 4× on the home page (`DISCOVER OUR EXPERTISE`, `OUR PROJECTS`, `OPERATIONS MANAGEMENT`, `AIRLINE STRATEGY`, `AIRPORT STRATEGY`). Rebuild the outline properly.
- Body copy on subpages is **`text-align: justify`** with narrow columns — produces the visible rivers/gaps in the screenshots.
- About page body copy is set in **Title Case On Every Word**, which is a content problem, not CSS.

## Layout

- Bootstrap 4.5.2 grid, mostly `container-fluid` with no max-width — content stretches edge-to-edge on wide screens.
- Page shell repeated per page (no template engine): `nav.navbar.navbar-expand-md.sticky-top` → hero/banner → alternating `.container-fluid.about_us` (white) / `.our_service` bands → `.footer` → `.aerotech1` orange bar → 2 floating action divs.
- Home page: hero Bootstrap carousel (3 slides, indicators + prev/next chevrons) → centered `h1` + 2-col image/text → Mission/Vision 2-col colored panels → 4-col project cards (full-bleed, equal-width, no gaps) → 3 alternating image/list service blocks → footer.
- Subpages: navy banner strip with page title + breadcrumb `Home / <Page>` over a dimmed aviation photo → content → footer.
- Project galleries (`sustainable.php` 61 imgs, `audit.php` 34 imgs) use `style1.css` marquee: `.slide-track` with `animation: scroll 20s linear infinite`, `.slide img` fixed `250×180` `object-fit: cover`. Not accessible, no pause control except `:hover`, and the animation assumes the track is duplicated to 200% width.
- Border radii in use: `50px` (pills), `20px`, `10px`, `5px`. Pick one scale.

## Responsive

Breakpoints are ad hoc and overlapping:
```
max-width: 600px
min-width: 600px
min-width: 768px
min-width: 992px
min-width: 1024px
min-width: 1200px
max-width: 900px and min-width: 600px
```
That is Bootstrap's set plus two custom ones plus a min/max sandwich — 909 lines of override. Mobile capture heights (`index` 6879px vs desktop 3959px) show content just stacking with no mobile-specific hierarchy.

## Components inventory

Nav (sticky, white bg, navy links, hover fills navy) · Bootstrap carousel · section heading (centered, 35–40px, 900 weight, orange underline rule) · 2-col image+text · colored info panel (Mission/Vision) · 4-up colored project card with "Read More....." pill · image + red-arrow bullet list (`fa-arrow-right`) · breadcrumb banner · logo marquee · contact form (Name/Email/Mobile/Message + Submit) · 4-col footer · orange copyright bar · 2 floating action buttons (WhatsApp `.webp`, phone `.webp`).

## Code-quality notes worth knowing before you rebuild

- Class names are the previous vendor's personal namespace: `.shivanshtop`, `.shivanshtop2a`, `.shivanshtop4a`, `.best-interior-designer-company-patna-shivansh-creation1` — copied from an unrelated interior-design template.
- Hindi dev comments left in CSS (`/* Mobile m v kar skte h same code agar ispe nahi hua h to thik h*/`).
- `assets/js/script.js` contains a broken jQuery filter, and the **entire script is duplicated inside a stray `<script>` tag inside the .js file** — so the file is not valid JavaScript past line ~20. The `if(value == "all");` has a stray semicolon making the branch dead.
- `style1.css` ends with three loose `animation:` declarations outside any rule.
- `assets/photo/favicon.ico` 404s (returns the parked-domain HTML).
- `<meta http-equiv="refresh" content="30">` is present but commented out.
- Everything inline-duplicated across 11 files — one nav change = 11 edits.

## Recommended direction

Keep: navy + orange brand pair, the logo, the aviation photography (9.8MB of real client project photos is the site's actual asset), the Aerocity NAP.
Rebuild: template system (any of Next/Astro/11ty — the site is fully static), real type scale in `rem` with a properly loaded font, single design-token file, one radius scale, a proper 4-color palette, per-page SEO metadata, a real projects index, nav that includes Aircraft Recovery, accessible galleries with lazy loading (the photos are unoptimized JPEGs), and image compression to WebP/AVIF.

---

# Appendix A — When was the site last updated?

## Answer: **13 July 2026** (last file written 01:43 GMT). Untouched for ~2 months.

Evidence, in order of strength:

**1. Server `Last-Modified` headers** (the `.php` pages send none — dynamic — but every static asset does):

| Date | Files |
|---|---|
| Sat 04 Jul 2026 | 10 (`responsive.css`, `script.js`, `logo.png`, `whatsapp.webp`, `directors.jpg`, airport photos) |
| Sun 12 Jul 2026 | 21 (`style.css` 09:24, `global*`, `aircharter*`, `airline.jpg`) |
| Mon 13 Jul 2026 | 32 (`style1.css` 01:20, `aerowash*`, `taxibot*`, `stelia*` — newest is `stelia8.png` at **01:43:08**) |

Timestamps cluster into per-project upload batches minutes apart (`taxibot1`→`taxibot11` across 01:38:26–01:38:58). That is a person uploading, not a migration flattening mtimes.

**2. WHOIS**: `Updated Date: 2026-07-03T00:47:12Z` — registrar/nameserver change **one day before** the first file upload. Confirms a host move immediately followed by a fresh build.

**3. Wayback Machine** shows the previous site was a completely different platform, unchanged for 3.5 years:

| Snapshot | What was live |
|---|---|
| 2018-06-13 | Domain registered (GoDaddy, expires 2030-06-13) |
| 2021-12-08 | **WordPress 5.4.8 + Themify Builder** (`wp-content`, `themify-builder-*.css`, `theme-color-blue.css`) |
| 2024-09-09 | Same WordPress site, byte-identical content |
| 2024-12-13 | Same |
| 2025-03-24 | Same |
| 2025-07-10 | Last capture before the rebuild |
| 2026-07-04→13 | Current hand-coded static PHP + Bootstrap site |

The 2021–2025 homepage carried headings `AeroTech Support Services` / `Transforming Aviation` / `OPERATION MANAGEMENT` and **five** project cards including **Aircraft Recovery**. The July 2026 rebuild renamed `OPERATION` → `OPERATIONS`, demoted the `h3`s to a jumble of `h1`/`h2`/`h4`, dropped the `Transforming Aviation` tagline, and **removed Aircraft Recovery from the projects grid without deleting its page** — which is exactly why `aircraft-recovery.php` is orphaned today.

So: WordPress 2018/2021 → frozen → replaced by a hand-rolled static site in July 2026 → frozen again. The rebuild is 2 months old and was a **downgrade in platform** (CMS the client could edit → 11 hand-duplicated PHP files nobody can edit).

Footnote: the footer year `2026` is hardcoded, not `date('Y')`. It only looks correct by coincidence and will be wrong on 1 Jan 2027.

---

# Appendix B — Code quality and site level

## Verdict: **low-end agency template work. 3/10.** Functional, not professional.

This is entry-level freelance output — a repurposed interior-design template with the aviation copy pasted in. Not the work of anyone who builds sites for a living at a professional standard.

### Hard numbers

| Metric | Value | What good looks like |
|---|---|---|
| Templating | none — nav + footer hand-copied into 11 files | 1 layout file |
| Build step | none | any |
| `style="..."` inline attributes | **207** | ~0 |
| `<br>` tags used for layout | **128** | ~0 |
| `!important` | 15 | 0–2 |
| Semantic elements (`<main> <section> <header> <footer> <article>`) | **0** | throughout |
| `<img>` without `alt` | **82 of 128 (64%)** | 0 |
| `loading="lazy"` | **0** | on all below-fold images |
| `srcset` / `<picture>` | **0** | on all content images |
| `sustainable.php` image payload | **13.7 MB, 61 images, all eager** | <1 MB |
| Largest single image | `aerowash1.jpg` **2.4 MB** | <200 KB |
| CSS | 2443 lines across 3 files, no tokens/vars | tokenized |
| Responsive breakpoints | 7, overlapping, incl. a min/max sandwich | 3–4 |
| JS | one file, **invalid past line ~20** | valid |

### Specific defects

**Broken, not just ugly:**
- `assets/js/script.js` contains a literal `<script>` tag and a second copy of its own contents pasted inside it. The file is not parseable JavaScript past line ~20 — everything after it never runs. The gallery filter it implements is dead anyway: `if(value == "all");` has a stray semicolon terminating the `if`, so the `else` branch is unreachable and both paths run.
- `font-family: "Poppins"` is declared 100+ times with **no `@font-face` and no Google Fonts `<link>`**. The site's entire typeface only appears for visitors who happen to have Poppins installed locally. Most visitors see the browser default. Nobody QA'd this on a clean machine.
- `assets/photo/favicon.ico` 404s — returns the domain-parking HTML.
- `style1.css` ends with three orphan `animation:` declarations sitting outside any rule block.
- The marquee `@keyframes scroll { to { translateX(-50%) } }` assumes the track is duplicated to 200% width; it isn't consistently, so galleries jump.
- `contact-us.php` form is `<form method="post">` with **no `action`, no CSRF token, no server-side handler visible, no validation, and `type="text"` on the email field**. Submitting posts back to the same URL behind a bot-gate that force-reloads the page. The form almost certainly does not deliver mail.

**Inherited from the wrong template:**
- Class names are the previous vendor's personal namespace and a different industry entirely: `.shivanshtop`, `.shivanshtop2a`, `.shivanshtop4a`, and `.best-interior-designer-company-patna-shivansh-creation1`. An aviation consultancy is running CSS classes named after an interior-design company in Patna.
- Hindi developer notes left in production CSS: `/* Mobile m v kar skte h same code agar ispe nahi hua h to thik h*/`.
- `<meta http-equiv="refresh" content="30">` present but commented out — someone tried to auto-refresh the homepage every 30 seconds.

**SEO — effectively zero:**
- All 11 pages: `<title>Aerotech</title>`, `description="Aerotechs in Delhi."`, `keywords="Aerotechs"`.
- `<link rel="canonical" href="https://aerotechss.com/index.php">` is **hardcoded on every page**, so every subpage tells Google to index the homepage instead. All 8 content pages are self-deindexing.
- Identical `og:*` tags sitewide.
- No `sitemap.xml`, no `robots.txt`, no JSON-LD / structured data, no H1 discipline (5 `h1`s on the homepage).
- The bot-gate on `contact-us.php` (`document.cookie=...; document.location.reload(true)`) blocks crawlers from the one page with the NAP data.

**Accessibility:** fails WCAG A on multiple counts — 64% of images unlabelled, zero landmarks, heading order scrambled (`h4` used for paragraph text, `h5` for links), lime-on-white project card fails contrast, marquee animation has no pause/stop control and ignores `prefers-reduced-motion`, `<label>`s present on the form but the fields are typed wrong.

**Dependencies:** Bootstrap 4.5.2 (Aug 2020, superseded), jQuery 3.5.1 (2020), Font Awesome 4.7 (2016 — v4 names, two majors behind), Magnific Popup 1.1.0 (2016, unmaintained). All from 4 different third-party CDNs (`maxcdn`, `stackpath`, `cdnjs`, `ajax.googleapis`) with no SRI hashes and no fallbacks. `stackpath.bootstrapcdn.com` is a decommissioned host.

### What this means for the redesign

Nothing in this codebase is worth keeping. Rebuild from scratch.

Salvage only:
- **The photography** — 60 real client project photos (Taxibot, Stelia, Aerowash, UPES, SpiceJet). This is genuinely valuable and irreplaceable. Compress to WebP/AVIF.
- **The copy** — needs an editorial pass (About page is in Title Case On Every Word; ORAT nav label reads "Opartional") but the substance is real.
- **The brand pair** navy `#343c5c` + orange `#fb722e`, and the logo.
- **The NAP** — Aerocity address, phone, email.

Everything else — CSS, JS, markup, templating, SEO, the platform choice — is a rewrite. Given the site is 11 static pages, an Astro or Next static build with one layout, one token file, and per-page metadata replaces all 2443 lines of CSS and gets a real Lighthouse score.
