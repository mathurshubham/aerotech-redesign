# Session handoff — aerotechss.com rebuild

Written 2026-09-11. Everything below reflects the repository and the live deployment at the end of the first working session. Read this first if you are picking the project up.

---

## 1. Where things stand

A complete redesigned marketing site for **Aerotech Support Services** (aviation and airport consultancy, Aerocity, New Delhi) is built and deployed to Cloudflare Workers on the free plan.

| | |
|---|---|
| **Live preview** | <https://aerotech.shubhammathur.in> — behind a PIN gate, PIN `6678` |
| **Fallback host** | <https://aerotech-web.mathurshubham.workers.dev> — same Worker |
| **Cloudflare account** | `mathurshubham@gmail.com`, account id `d8121063c5cc4b0e073b34b3280a2c1d` |
| **Worker** | `aerotech-web` |
| **Zone** | `shubhammathur.in` (free plan). `aerotechss.com` is **not** on Cloudflare yet |
| **Repo** | Local git only at `/Users/shubhammathur/Documents/projects/mathurshubham/aerotechss`. No remote |
| **Latest commit** | `75f4aed` — 16 commits, all 2026-09-11 |
| **Content status** | Real copy where it existed; **sample values elsewhere** — see §14 |
| **CMS** | None yet. Content is typed files in the repo. Phase 2 — see §17 |

The original site was captured before any work started, so nothing is lost: `reference/capture/` holds the raw HTML, all 60 original images, extracted text and full-page screenshots of the old site as it was on 2026-09-10.

### What is done

15 routes, 28 design-system components, 6 services, 4 case studies, 3 insight posts, a named-expert profile, a compliance/downloads page, a working contact form (in stub mode), the full SEO/AIEO layer, a mobile pass verified at 320–1280px, and a PIN gate for private preview.

### What is not done

Lead email delivery, Turnstile, a CMS, the cutover to `aerotechss.com`, Google Business Profile / Search Console, and replacing the sample content with real facts.

---

## 2. Running it locally

Prerequisites: Node ≥ 22 (the repo pins it via `.node-version`; `create-cloudflare` and Wrangler refuse Node 20), pnpm, and `fnm` or another version manager.

```bash
cd web
eval "$(fnm env)" && fnm use 22        # every shell — Node 20 is the system default here
pnpm install
pnpm dev                                # http://localhost:3000
```

`web/.dev.vars` exists locally (gitignored) and holds `GATE_PIN=6678` plus a 48-character `GATE_SECRET`. With those set, local dev is gated too. **Delete `GATE_PIN` from `.dev.vars` to browse locally without the gate** — an unset PIN disables it entirely by design.

Useful scripts, all run from `web/`:

| Command | Does |
|---|---|
| `pnpm dev` | Next dev server |
| `pnpm build` | Production Next build (also regenerates `.next/types`) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint |
| `pnpm test` | `tsx --test src/lib/**/*.test.ts` — 12 tests, gate cookie + lead schema |
| `pnpm images` | Regenerate `public/images` from `scripts/source-images` |
| `pnpm logo-data` | Regenerate the inlined base64 logos used by the icon/OG routes |
| `pnpm preview` | OpenNext build + local Workers runtime (closest thing to production) |
| `pnpm deploy` | OpenNext build + deploy to Cloudflare |
| `pnpm cf-typegen` | Regenerate `cloudflare-env.d.ts` from `wrangler.jsonc` |

Note `pnpm deploy` must be invoked as `pnpm run deploy` — bare `pnpm deploy` is a reserved pnpm command and fails with `ERR_PNPM_INVALID_DEPLOY_TARGET`.

---

## 3. Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js, App Router, React Server Components | 16.3.4 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS v4 (CSS-first config, no `tailwind.config`) | 4.x |
| Components | shadcn/ui, `radix-nova` style, `radix-ui` package | shadcn 4.21 |
| Icons | `lucide-react` | 1.43 |
| Motion | `motion` | 13.2 |
| Content validation | `zod` | 4.6 |
| MDX | `@next/mdx` | 16.3.4 |
| Images (build) | `sharp` | 0.35 |
| Deploy adapter | `@opennextjs/cloudflare` | 1.20.6 |
| CLI | `wrangler` | 4.130 |

Tailwind v4 has no config file — the design tokens live in `@theme inline` inside `web/src/app/globals.css`. Do not add a `tailwind.config.ts`; extend the CSS instead.

`cn` is imported from the `cn` npm package, not a local util, because the shadcn primitives in `src/components/ui` import it that way. `src/lib/utils.ts` re-exports it so app code and primitives resolve to the same implementation.

---

## 4. Repository layout

```
reference/                   Read-only inputs. Never edited after capture
  capture/                   The old site as it stood on 2026-09-10
    raw/                     11 pages of original HTML as served
    assets/                  Original CSS, JS and all 60 images
    content/                 site-content.json + per-page markdown extraction
    screenshots/             Full-page desktop and mobile captures of the old site
  design/                    Approved redesign drafts — the visual spec
    *.dc.html                6 artboards: Main, MobileHome, Orat, Taxibot, About, Contact
    img/                     Downsampled imagery used by the drafts
    canvas.json              Artboard layout for the design-canvas artifact
docs/
  HANDOFF.md                 This file
  BUILD-PLAN.md              Stack research and decisions, with sources
  REDESIGN-BRIEF.md          Positioning, IA, design system — the brief the build followed
  DESIGN-AUDIT.md            Audit of the old site + last-updated forensics
  SITEMAP.md                 Old site map, page status, 301 map for cutover
  CAPTURE.md                 How the capture was taken
  SAMPLE-CONTENT.md          Every fabricated value and what must replace it
  E2E-TEST-PLAN.md           48-case test plan, three suites
  qa/2026-09-11/             Desktop QA reports + screenshots
  qa/mobile/                 Mobile before/after screenshots
  qa/mobile-live/            Live mobile sweep report, raw JSON, 19 screenshots
web/                         The application
  DESIGN.md                  The design sheet every component follows
  src/app/                   Routes
    layout.tsx               Document shell only — html, body, fonts, metadata
    (site)/                  Everything behind the PIN: shell layout + all pages
    gate/, api/gate/         The PIN gate, deliberately outside the site group
  src/components/site/       28 design-system components
  src/components/ui/         12 shadcn primitives
  src/components/blocks/     BlockRenderer for generic pages
  src/components/seo/        JsonLd
  src/content/               All site content, Zod-validated
  src/lib/                   seo, jsonld, images, image-loader, utils, gate/, lead/
  scripts/                   Image pipeline, sample PDFs, logo inlining
  migrations/                D1 SQL
  public/images/             122 generated image files + manifest.json
  public/downloads/          7 sample PDFs
```

---

## 5. Routes

| Route | Rendering | Notes |
|---|---|---|
| `/` | Static | Nine bands per `reference/design/Main.dc.html` |
| `/services` | Static | Hub, 5 services + Aero Opt |
| `/services/[slug]` | SSG, `dynamicParams = false` | orat, audits-compliance, sustainable-aviation, aircraft-recovery, india-market-entry |
| `/services/india-market-entry/dgca-guide` | Static | Pillar explainer, renders the DGCA insight MDX |
| `/tools/aero-opt` | Static | Aero Opt is a Service with `isTool: true` |
| `/work` | Static | Hub |
| `/work/[slug]` | SSG | taxibot-india, delhi-t3-orat, stelia-aerospace, aerowash |
| `/about` | Static | |
| `/about/[slug]` | SSG | ashwani-khanna |
| `/insights` | Static | |
| `/insights/[slug]` | SSG | what-is-orat, corsia-2027-india-operators, dgca-car-map-foreign-oems |
| `/compliance` | Static | Downloads + Companies Act disclosures, via `BlockRenderer` |
| `/privacy` | Static | via `BlockRenderer` |
| `/contact` | Dynamic | Reads `?topic=` to preselect a chip |
| `/gate` | Dynamic | Preview PIN page, outside the `(site)` group so it renders bare |
| `/api/gate` | Route handler | POST, verifies the PIN and sets the cookie |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/feed.xml` | Static | |
| `/icon`, `/opengraph-image` | Static | `next/og`, logos inlined as base64 |
| 404 | Static | `not-found.tsx`, `robots: noindex` |

All `[slug]` routes set `dynamicParams = false` so unknown slugs return a real 404 rather than rendering a shell. A side effect worth knowing: an unknown slug never matches a route at all, so it is handled by the **root** `not-found.tsx`, not by any not-found inside the route group.

### Route groups and what the gate can see

`app/layout.tsx` is the document shell only — `<html>`, `<body>`, fonts and
metadata. The site shell (skip link, header, `<main>`, footer, WhatsApp pill
and the organisation JSON-LD) lives in `app/(site)/layout.tsx`, and every page
except `/gate` sits inside that group.

This exists so the gate gives nothing away. Before a visitor enters the PIN
they should not see the navigation, the Aerocity address, the phone number or
the service list — and that applies to the page source, not just the rendered
page. Two things had to be true for it to hold:

- **The root `not-found.tsx` must stay bare.** Next.js ships the nearest
  not-found boundary inside the RSC payload of *every* page, so a 404 that
  rendered the header and footer leaked both into `/gate`. The root 404 is
  therefore a wordmark, a line of copy and a link home. A richer 404 can be
  restored once the gate is removed.
- **`/gate` overrides its metadata.** It sets an absolute title and its own
  description and Open Graph values, otherwise it inherits the site-wide
  description naming Aerocity and the business.

Verified on the live deployment: the only business string in the unauthenticated
page source is "Support Services" inside the wordmark.

---

## 6. Editing content

**This is the most important section for whoever continues.** There is no CMS; content is typed TypeScript and MDX under `web/src/content/`, every export validated with Zod at module load. A bad edit fails `pnpm typecheck` or throws at build — it will not silently ship.

| File | Holds |
|---|---|
| `schema.ts` | Every Zod schema and inferred type. Change shapes here first |
| `site.ts` | Name, legal name, URL, nav, footer groups, NAP, WhatsApp, socials, legal identifiers, the six credentials, client logos, response promise, Cal.com handle |
| `services.ts` | Six services: `forWhom`, `deliverables`, `phases`, `whyUs`, `credentialsForThis`, `relatedWork`, `faqs`, `cta`, `seo` |
| `work.ts` | Four case studies: `challenge[]`, `approach[]`, `outcome.{quote,body,stats}`, `gallery`, `relatedService` |
| `people.ts` | Ashwani Khanna: bio, credentials, career, honours, affiliations, key projects |
| `pages.ts` | `compliance` and `privacy` as block arrays |
| `insights/*.mdx` | Post bodies; each exports a typed `meta` |
| `insights/index.ts` | Aggregates post meta |
| `index.ts` | Barrel plus `getAllRoutes()` — **the source of truth for `sitemap.ts` and `llms.txt`** |

Adding a service or case study: add the entry, and the `[slug]` route picks it up through `generateStaticParams`. Adding a route that is not in a collection means adding it to `getAllRoutes()` too, or it will be missing from the sitemap — that exact mistake was caught in QA and fixed for the DGCA guide.

The generic `Page` type composes from a fixed block set, rendered by `src/components/blocks/BlockRenderer.tsx`: `hero`, `richText`, `statBand`, `cardGrid`, `caseFeature`, `personCard`, `phaseTimeline`, `deliverablesGrid`, `faq`, `cta`, `imageGallery`, `logoRow`, `downloads`. This is deliberately the same shape a CMS would populate, so Phase 2 swaps the data source without touching components.

---

## 7. Design system

`web/DESIGN.md` is the authoritative sheet; `reference/design/*.dc.html` are the approved visual targets. Tokens live in `globals.css`.

- **Colour** — navy `#16203A` / `#343C5C`, paper `#F7F8FA`, line `#DDE2EC`, body `#4B5570`, small-text `--subtle-ink #5C6683`, orange `#FB722E` held to roughly 5% of pixels and used only for CTAs, eyebrows, rules and active states. Three surface modes: paper page, white card, navy band (`band` / `band-ink` / `band-muted` / `band-line`).
- **Type** — Archivo 600/700 display, Inter 400/500 body at 17px/1.62 with a 68ch measure and left alignment (never justified), IBM Plex Mono 500 for eyebrows, credentials, captions and data. Weights stop at 700; 900 is banned. Hero h1 uses one `.h1-hero` clamp, ceiling 56px.
- **Shape** — 1200px container with 24px gutters, one 8px radius plus 999px pills, 1px `line` borders, no shadows.
- **Motifs** — mono uppercase eyebrows, runway-dash rule under heroes, orange 3px left rule on pull quotes, mono captions naming client · airport · year on every project photo.
- **Motion** — fade plus 8px rise, 200ms, once; `Reveal` renders a plain div under `prefers-reduced-motion`, so nothing is ever parked invisible.
- **Icons** — lucide only, 24px, stroke 1.6. No emoji.

The logo is worth its own note. `reference/capture/assets/images/logo.png` is a 697×665 transparent raster: a swoosh with "Aerotech" inside it and "Transforming Aviation" beneath. It is a stacked, near-square composition, so at any height that fits a header the wordmark becomes an unreadable smudge — tested at 40, 48, 56 and 64px. The nav therefore uses a **horizontal lockup**: the real arrowhead glyph (`logo-glyph`) beside "AEROTECH" typeset in Archivo with "SUPPORT SERVICES" in mono beneath. `logo-lockup` (full artwork with tagline) and `logo-mark-light` (recoloured for navy bands) also exist. **Ask the client for vector artwork** — that is the actual fix, and it would let the real logo be used at any size.

---

## 8. Image pipeline

Cloudflare Workers cannot run `sharp`, and the free plan's 10 ms CPU limit rules out WASM resizing at request time. So images are pre-generated at build time and served as static assets, which are unbilled and unlimited on Workers.

- Drop a photo into `web/scripts/source-images/`, run `pnpm images`.
- `scripts/optimize-images.ts` emits `<name>.jpg` (canonical, max 1920w) plus `<name>-<W>.webp` and `<name>-<W>.avif` for each of 480/768/1080/1440/1920 that does not exceed the source width, and writes `public/images/manifest.json` with intrinsic dimensions.
- `src/lib/image-loader.ts` is a custom `next/image` loader. It is **manifest-aware**: it clamps to widths that were actually generated and falls back to the canonical file, because an earlier version requested widths that did not exist and every image 404'd.
- Components read intrinsic width and height from `manifest.json` so there is no layout shift.
- Current state: 25 source images, 122 generated files, roughly 3.3 MB total; largest canonical JPEG 171 KB.

Caution: `naturalWidth` in a browser can disagree with the file on disk if the browser has a stale cached variant. That cost real debugging time — verify with `fetch(url, {cache:'reload'})` before concluding the pipeline is broken.

---

## 9. SEO and AIEO

Built on evidence, not folklore — Google's May 2026 guidance is explicit that AEO/GEO is still SEO, and independent server-log work shows `llms.txt` receives essentially no AI-crawler traffic. Sources are in `docs/BUILD-PLAN.md` §3.

- `src/lib/seo.ts` — `buildMetadata()` and a `metaFor.*` map. `metadataBase` is set once in the root layout; every page has a self-referencing canonical. `viewport` is its own export, not part of `metadata`.
- `src/lib/jsonld.ts` — builders for `Organization` + `WebSite` (one `@graph`, stable `@id`s), `Person` with `hasCredential` and `knowsAbout`, `Service` per service page, `Article` for insights and case studies, `BreadcrumbList`, `WebPage`. A `clean()` helper strips nulls and any leftover placeholder strings so they can never leak into structured data. `ProfessionalService` is deliberately unused — schema.org deprecated it. There is no `CaseStudy` type, hence `Article`.
- `app/robots.ts` — `Allow: /` for every crawler, including all 14 AI user-agents (GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot and the rest). The business wants citations.
- `app/sitemap.ts` — driven by `getAllRoutes()`, real `lastModified` for insights.
- `llms.txt` and `feed.xml` — static route handlers.
- `icon.tsx` and `opengraph-image.tsx` — build-time `next/og`, logos inlined as base64.
- FAQ content is visible text only; Google removed FAQ rich results in May 2026, so no `FAQPage` markup is emitted.

**Not done and important: Cloudflare zone settings.** New Cloudflare zones have defaulted to blocking AI crawlers since July 2025. Before any public launch, in the dashboard for whichever zone serves the site: turn Bot Fight Mode **off**, set AI Crawl Control to **allow** GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, ChatGPT-User and Claude-User, turn managed `robots.txt` **off** (ours is better), and confirm Rocket Loader and Email Address Obfuscation are **off** — both break React hydration, and obfuscation also hides the contact email from crawlers and from JSON-LD. Never add a "Cache Everything" rule for HTML; it would fight ISR if ISR is ever enabled. A cache rule for `/_next/static/*` at one year immutable is fine.

---

## 10. Lead capture

Currently in **stub mode**: the form validates, applies anti-spam, and logs — it sends no email.

- `src/app/actions/lead.ts` — `submitLead(formData)` returning `{ ok: true } | { ok: false; error, fieldErrors? }`.
- `src/lib/lead/schema.ts` — Zod input. `LEAD_TOPICS` is derived from the real service slugs.
- Anti-spam: a hidden `website` honeypot read **before** any parsing (a filled honeypot returns a silent success and stores nothing), a submission-timestamp gate rejecting anything faster than 3 seconds, and optional Turnstile.
- `src/lib/lead/turnstile.ts` — verifies server-side; returns true and logs once if no secret is configured.
- `src/lib/lead/notify.ts` — Resend via `fetch`, no SDK. Falls back to `console.info` when `RESEND_API_KEY` is unset.
- `src/lib/lead/store.ts` — inserts into D1. IP is stored only as a SHA-256 hash with a daily salt, never raw.
- `migrations/0001_leads.sql` — already applied to the remote D1 database `aerotech-leads` (`98e98da9-ec3b-4e13-80d9-a1427713a8c0`).

To go live, set five values and redeploy:

```bash
cd web
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put LEAD_TO_EMAIL        # inbox that receives enquiries
npx wrangler secret put LEAD_FROM_EMAIL      # e.g. "Aerotech Website <leads@…>"
# NEXT_PUBLIC_TURNSTILE_SITE_KEY must be a build-time var, not a secret —
# add it to wrangler.jsonc "vars" so it is inlined into the client bundle
pnpm run deploy
```

Resend needs a verified sending domain. `shubhammathur.in` is the pragmatic choice while `aerotechss.com` DNS is elsewhere. Free tier is 3,000 emails/month, 100/day.

Reading leads: `npx wrangler d1 execute aerotech-leads --remote --command "SELECT created_at, name, email, topic FROM leads ORDER BY created_at DESC LIMIT 20"`.

---

## 11. The preview PIN gate

Private preview, not security. Four digits is 10,000 combinations.

- `/gate` lives outside the `(site)` route group, so it renders without the site shell — see §5.
- `src/middleware.ts` gates everything except `/gate`, `/api/*`, `/_next/*`, `/images/*`, `/downloads/*`, `robots.txt`, `sitemap.xml`, `llms.txt`, `feed.xml`, `favicon.ico`, `icon`, `opengraph-image`.
- `/gate` is a **plain HTML POST form** to `/api/gate`. No client JavaScript is involved, deliberately.
- The route handler verifies the PIN in constant time, then sets `aero_gate` — an HMAC-SHA256 signed value over `v1|<expiry>` using `GATE_SECRET`, HttpOnly, Secure, SameSite=Lax, 30 days — on its own 303 response. The PIN is never in the cookie.
- Five failures from one IP hash locks that hash out for 15 minutes, plus a 400–800 ms delay on every failure. The limiter is per-isolate and best-effort; a Cloudflare WAF rate-limit rule on `POST /api/gate` would be the durable layer.
- `/gate?logout=1` clears the cookie.
- Secrets `GATE_PIN` and `GATE_SECRET` are set on the Worker. **Deleting `GATE_PIN` disables the gate** — that is the intended removal path.

**Remove the gate before public launch.** It blocks search crawlers by design. `web/src/lib/gate/README.md` has the details. The PIN `6678` appears in this document because the handoff needs it; rotate it if the repository is ever pushed to a shared remote.

---

## 12. Deployment

```bash
cd web
eval "$(fnm env)" && fnm use 22
pnpm run deploy                 # OpenNext build, then wrangler deploy
```

Everything is prerendered, so `open-next.config.ts` uses the **static-assets incremental cache**. That is not optional: without it, prerendered `[slug]` pages 404 on Workers even though the build succeeds. No R2, Durable Object queue or D1 tag cache is needed until ISR or on-demand revalidation is introduced.

`wrangler.jsonc` highlights: `name: aerotech-web`, `compatibility_date: 2026-09-11`, `compatibility_flags: ["nodejs_compat"]`, assets from `.open-next/assets` bound as `ASSETS`, observability on, `workers_dev: true`, one custom-domain route, and the D1 binding `DB`.

`workers_dev: true` is pinned deliberately. Wrangler defaults it to **false** as soon as `routes` is present, which silently 404s every dynamic route on the `workers.dev` host while static assets keep serving — a confusing failure that cost real time.

Deployed version at handoff: `885aef0e-4eb6-47e4-b653-dfbe046bfed3`. Worker startup around 33 ms; total upload roughly 10.5 MB uncompressed, well inside the 64 MiB limit that now applies to the free plan.

CI is not set up. Cloudflare Workers Builds (3,000 free build-minutes/month, automatic PR preview URLs) is the intended route once the repo has a remote — point preview builds at **separate** D1 and KV bindings so a preview never writes to production data.

---

## 13. Gotchas discovered the hard way

Each of these cost debugging time. They are recorded so nobody pays twice.

1. **`Set-Cookie` from a Next server action does not reach the browser on Workers.** The gate originally used a server action with `cookies().set()` then `redirect()`; the cookie vanished and the visitor bounced back to the gate. Setting the cookie on a **route handler's own response** works. Same caution applies to any future auth or session work.
2. **A React `onSubmit` handler is not guaranteed to be attached.** The gate form was submitting natively as a GET — the URL came back as `/gate?next=%2F&pin=6678`, meaning nothing was verified. Anything security-relevant must work without JavaScript.
3. **`fs.readFileSync` of a `public/` file throws at runtime on Workers** — `no such file or directory, readAll '/bundle/public/...'`. `icon.tsx` and `opengraph-image.tsx` did this, which broke Next's metadata resolution and 500'd whole pages intermittently depending on isolate state. Fixed by inlining base64 via `pnpm logo-data`. Never read from disk at request time.
4. **`wrangler secret put` through a pipe can store a mangled value.** `printf '%s' "6678" | pnpm exec wrangler secret put GATE_PIN` stored something that was not `6678`; the correct PIN was rejected for an hour. Use `wrangler secret bulk <file.json>`, and verify — a temporary route that returns only a SHA-256 prefix of the secret is a safe way to confirm without exposing it.
5. **`routes` turns off `workers_dev`.** See §12.
6. **Next 16 renamed `middleware` to `proxy`.** `src/proxy.ts` builds with the OpenNext adapter but did not behave as expected here; `src/middleware.ts` (deprecated but supported, and what OpenNext's edge bundle actually wires up) does. Read `node_modules/next/dist/docs/` before trusting memory of the Next API — this version has real breaking changes.
7. **`_`-prefixed App Router folders are private** and never become routes. A debug endpoint at `app/api/_gate-probe/route.ts` silently 404'd.
8. **Deleting a route leaves a stale `.next/types/validator.ts`** referencing it, so `pnpm typecheck` fails with a phantom error. `rm -rf .next/types && pnpm build` fixes it.
9. **macOS caches negative DNS answers.** `aerotech.shubhammathur.in` resolved fine from 1.1.1.1 and 8.8.8.8 while `curl` on this machine said "Could not resolve host". `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`, or test with `curl --resolve`.
10. **A browser's `naturalWidth` can reflect a stale cached variant.** Led to a false conclusion that the image pipeline was generating wrong sizes. Verify with `cache: 'reload'`.
11. **Never deploy while a background agent is mid-edit.** Two production breakages in this session came from exactly that. Wait for completion, confirm `pnpm typecheck`, then deploy.
12. **`pnpm deploy` is reserved**; use `pnpm run deploy`.
13. **Claude-in-Chrome would not resize below roughly 668px** in this environment. Mobile verification used a separate headless Chrome driven over CDP with `Emulation.setDeviceMetricsOverride`. Worth knowing for future mobile QA.

---

## 14. Sample content — must be replaced before launch

`docs/SAMPLE-CONTENT.md` is the authoritative checklist: every fabricated value, the file and field it lives in, what real fact must replace it, and who can supply it. 47 placeholder strings were replaced with plausible sample values so the preview reads as a finished site rather than a wireframe.

Rules that were followed and should continue to be: no fabricated quote is attributed to a named real person; legal identifiers are visibly sample-formatted (`U62099DL2018PTC000000`, `07AAAAA0000A1Z5`); figures are conservative; citation links point only at canonical ICAO, DGCA, IATA and FAA landing pages.

The highest-value items to obtain, in order:

1. **Two or three client quotes.** There are none anywhere. For a consultancy this is the single biggest conversion gap after positioning.
2. **Real counts** — projects, airports, audits, ORATs delivered, countries. The `/work` hub and the About page's four-number band currently carry sample figures.
3. **TaxiBot fuel-burn and emissions savings per dispatch tow.** Deliberately left blank rather than estimated in the original draft.
4. **CIN, GSTIN and a named grievance contact.** Companies Act s.12 requires these on the site, so the current sample values are a compliance gap, not just a content one.
5. **ISO 9001 / 45001 / 14064 and AS9100D certificate scans**, the capability statement, and the incorporation certificate — `/compliance` currently serves seven generated sample PDFs. Real documents also unblock AAI tender prequalification.
6. **ACI-ASQ survey years** for the Terminal 1D "119th to No. 1, twice" claim, and Stelia's airline programme names (withheld as a confidentiality risk).
7. **A real Aerowash project photograph** — that case currently reuses a TaxiBot image.
8. **Vector logo artwork** — see §7.

One editorial note: the T3 Delhi ORAT and the ACI-ASQ 119→1 result were buried on the old About page and are, arguably, stronger proof for the ORAT practice than TaxiBot is, because they are the same service being sold. They are surfaced now, but the homepage credential strip could reasonably be rebuilt around them.

---

## 15. QA state

| Suite | Where | Result |
|---|---|---|
| Desktop functional + UX (A1–A20, C1–C10) | `docs/qa/2026-09-11/suite-A-C.md` | 21/30 initially; all real failures fixed and re-verified |
| Desktop design conformance (B1–B18) | `docs/qa/2026-09-11/suite-B.md` | 16/18; both failures fixed |
| PIN gate | `docs/qa/2026-09-11/gate-verification.md` | 8/8 |
| Live mobile sweep, 19 routes × 4 viewports | `docs/qa/mobile-live/report.md` + `raw-report.json` + 19 screenshots | 76/76 route×viewport checks pass, no blockers; 7 findings all fixed |
| Unit tests | `pnpm test` | 12/12 |

Verified properties: zero horizontal overflow at 320/360/390/414/768/820/1024/1280 on every route; no console errors or hydration warnings anywhere; 44px minimum hit areas; 16px form inputs so iOS does not zoom; hero text contrast 16.2:1 (h1) and 9.9:1 (lede), case hero 14.2:1 and 9.0:1, eyebrows 5.37:1 on paper and 5.70:1 on white; one `h1` per page with no heading-level skips; `alt` on every image.

`docs/E2E-TEST-PLAN.md` holds the full 48-case plan and is re-runnable. Cases A10, A13, A14 and B4 are **obsolete by decision** — they assert the presence of placeholder chips and draft badges, which were deliberately removed when the sample content went in.

---

## 16. Waiting on the client

Nothing is blocked on engineering. These are the open inputs, none dependent on each other:

1. Review notes on the preview — copy, imagery, layout.
2. Resend API key, the inbox that receives leads, and the sending domain.
3. Turnstile site key and secret for `aerotech.shubhammathur.in`, `aerotech-web.mathurshubham.workers.dev` and `localhost`.
4. Everything in §14.
5. Decisions: is the Aerocity address a real staffed office (determines whether `LocalBusiness` schema and a Google Business Profile are legitimate under the 2026 eligibility rules)? Is BHG building this for Aerotech as a client, and who owns the Cloudflare account and repository at handover? What is the launch target?

---

## 17. Roadmap

### Phase 2 — CMS

Researched in `docs/BUILD-PLAN.md` §2. Three viable paths:

| Option | Cost | Trade-off |
|---|---|---|
| **Keystatic** (git-based) | $0 | Editors need GitHub accounts; new page *types* are a code change; 2–3 minute publish latency; no drafts or roles |
| **Payload 3 + D1 + R2** | ~$5/month | Needs Workers **Paid** — the free plan's 10 ms CPU cap will not carry the admin panel. Full admin, drafts, live preview, roles, blocks builder. Open D1-adapter bugs around large block schemas (`blocksAsJSON: true` is the workaround) and versioned localized rich text |
| **Payload on the Raspberry Pi** | $0 | Headless: admin on the Pi behind a Cloudflare Tunnel with Access in front, public site stays on Workers, media to R2, publish webhook triggers revalidation. Pi is never in the request path, so an outage means stale content rather than downtime |

The content layer was designed so any of these is an adapter swap, not a rebuild.

### Cutover to aerotechss.com

1. Move `aerotechss.com` nameservers to Cloudflare, registrar stays at GoDaddy. **Export every DNS record first** and recreate MX with identical priorities, SPF, every DKIM selector, DMARC, plus `autodiscover`/`autoconfig` — Cloudflare's scan routinely misses DKIM and autodiscover. Keep all mail records DNS-only (grey cloud). Lower TTLs 24–48 hours ahead, verify with `dig @<assigned CF NS>` before flipping.
2. Apply the 301 map in `docs/SITEMAP.md` as Cloudflare Single Redirects — 10 free rules, edge-resolved before the Worker runs, so zero CPU and they survive a bad deploy. `/blog.php`, `/services.php` and `/hire-a-designer.php` should return 410.
3. Update `site.url`, add the custom domain to `wrangler.jsonc`, redeploy.
4. Remove the PIN gate.
5. Do the zone audit in §9.
6. Verify in Search Console and Bing, submit the sitemap, claim the Google Business Profile.
7. Add Cloudflare Web Analytics (cookieless, so no consent banner, and it reports Core Web Vitals).

### Later

Cal.com embed replacing the sample booking widget; a CRM if lead volume justifies it (Pipedrive has no free tier — HubSpot free or Zoho Bigin do); a weekly leads digest via a Cron Trigger; two insight posts a month, which is what actually drives AI citation and LinkedIn distribution.

---

## 18. Cost and free-tier headroom

Everything currently runs at **$0/month**. The relevant limits and the honest risk for this site:

| Resource | Free limit | Risk here |
|---|---|---|
| Workers requests | 100,000/day | Negligible; static asset hits are unbilled |
| Workers CPU | **10 ms per invocation** | The real constraint. Fine for a prerendered site; it is why a CMS admin panel cannot live here |
| Worker bundle | 64 MiB uncompressed (all plans since 2026-09-04) | Currently ~10.5 MB |
| Static assets | 20,000 files/version, requests unbilled | 122 images plus the build output — comfortable |
| D1 | 5M rows read, 100k written per day; **over-limit queries hard-fail since 2026-09-01** | Leads only. Negligible |
| KV | 1,000 writes/day | Unused. Do not use it as an ISR cache |
| R2 | 10 GB, free egress | Unused |
| Cloudflare Images transformations | 5,000 unique/month | Unused — images are pre-generated instead |
| Workers Builds | 3,000 minutes/month | CI not yet set up |
| Resend | 3,000/month, 100/day | Once configured, ample |
| Turnstile | ~1M verifications/month | Ample |

The only paid decision on the horizon is the $5/month for Workers Paid, and only if Payload-in-the-Worker is chosen over Keystatic or the Pi.
