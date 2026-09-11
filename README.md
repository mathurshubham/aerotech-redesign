# Aerotech Support Services — website rebuild

A redesign and rebuild of [aerotechss.com](https://aerotechss.com) for a New Delhi aviation and airport consultancy, deployed to Cloudflare Workers on the free plan.

**Live preview: <https://aerotech.shubhammathur.in>** — behind a PIN gate while the content is still being finalised.

---

## Layout

```
web/         The application — Next.js 16, Tailwind v4, shadcn/ui, OpenNext → Cloudflare Workers
docs/        Documentation, research and QA reports
reference/   Read-only inputs: the captured old site, and the approved design drafts
```

| Path | What is in it |
|---|---|
| `web/` | Everything that ships. `src/content/` holds all site copy as Zod-validated TypeScript and MDX; `web/DESIGN.md` is the design sheet |
| `docs/HANDOFF.md` | **Start here.** Current state, setup, deployment, gotchas, what still needs real content |
| `docs/BUILD-PLAN.md` | Stack research and the decisions behind it, with sources |
| `docs/REDESIGN-BRIEF.md` | Positioning, information architecture and the design system the build followed |
| `docs/DESIGN-AUDIT.md` | Audit of the old site, plus forensics on when it was last touched |
| `docs/SITEMAP.md` | The old site's routes and the 301 map for cutover |
| `docs/SAMPLE-CONTENT.md` | Every sample value currently on the site and the real fact that must replace it |
| `docs/E2E-TEST-PLAN.md` | 48-case test plan across three suites |
| `docs/qa/` | QA reports and screenshots from each verification run |
| `reference/capture/` | The old site exactly as it stood on 2026-09-10 — raw HTML, all 60 images, extracted text, screenshots |
| `reference/design/` | Six approved artboards (`.dc.html`) that the build was measured against |

`reference/` is never edited. It is the record of what existed before and what was agreed.

---

## Running it

Node ≥ 22 is required — Wrangler and `create-cloudflare` reject Node 20.

```bash
cd web
eval "$(fnm env)" && fnm use 22
pnpm install
pnpm dev                 # http://localhost:3000
```

Local dev is PIN-gated too if `web/.dev.vars` sets `GATE_PIN`. Remove that line to browse without the gate.

| Command | Does |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint |
| `pnpm test` | Unit tests (gate cookie, lead schema) |
| `pnpm images` | Regenerate optimised images from `scripts/source-images` |
| `pnpm preview` | Build and run under the real Workers runtime |
| `pnpm run deploy` | Build and deploy to Cloudflare |

---

## Where things stand

Built and deployed: 15 routes, 28 design-system components, six services, four case studies, three insight posts, the full SEO and AI-crawler layer, a contact form with anti-spam, and a mobile pass verified from 320px up.

Not done yet: lead email delivery (the form validates and logs but sends nothing until a Resend key is set), Turnstile, a CMS, and the cutover to the real domain.

Most of the copy is real, taken from the old site. The rest is **sample content** — plausible, clearly tracked, and listed in `docs/SAMPLE-CONTENT.md`. Nothing there should go public without being replaced, and the legal identifiers in the footer are deliberately sample-formatted.

See `docs/HANDOFF.md` for the full picture.
