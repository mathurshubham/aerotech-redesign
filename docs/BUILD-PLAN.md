# aerotechss.com — Build Plan

Rev 1 · 2026-09-11 · Synthesis of four parallel research tracks (Cloudflare free tier, Payload vs Keystatic, SEO/AIEO, consultancy site patterns). Decisions marked **OPEN** need the client's answer before build starts.

---

## 0. Decisions taken 2026-09-11

| Decision | Choice |
|---|---|
| Delivery order | **Phase 1: redesign + rebuild on Cloudflare free, no CMS.** Phase 2: add CMS (Keystatic $0, Payload $5/mo, or Payload on rPi via Tunnel) |
| Content in Phase 1 | Typed content-as-code: MDX + Zod schemas in the repo, same shape a CMS adapter reads later. Editors can use GitHub web editor + PR previews meanwhile |
| Page model | Typed collections (Service, CaseStudy, Insight, Person) + generic Page built from a fixed block set |
| Leads | Resend email + D1 `leads` table. CRM later |
| Insights | Ship in v1 with 3 seed posts |
| Prerequisite | Node ≥ 22 locally (`create-cloudflare` refuses v20) |

## 0.1 Everything that runs on CF free without a CMS

| Capability | How | Free limit |
|---|---|---|
| Contact form | Server Action → Turnstile + honeypot + timing → Resend + D1 `leads` | Resend 3,000/mo; D1 100k writes/day |
| Booking | Cal.com embed | 1 user, branded |
| WhatsApp | `wa.me/919910294423` link | — |
| Analytics + CWV | Cloudflare Web Analytics | unlimited, 30-day retention |
| Images | Static assets / R2 + CF Images transformations binding for `next/image` | 5,000 unique transforms/mo |
| SEO | `generateMetadata`, `sitemap.ts`, `robots.ts`, JSON-LD `@graph`, build-time OG images | — |
| Legacy `.php` 301s | CF Single Redirects | 10 rules |
| Insights | MDX in repo, `Article` JSON-LD, RSS | — |
| Compliance downloads | PDFs as static assets or R2 | 25 MiB/file |
| PR previews | Workers Builds preview URLs | 3,000 min/mo |
| Form abuse | WAF rate-limit rule on the lead endpoint | 1 rule |
| Inbound mail alias | Email Routing forward | unlimited |
| Weekly leads digest | Cron Trigger → D1 → Resend | free |
| Error logs | Workers Logs | 200k events/day |
| Uptime | UptimeRobot / Better Stack free | external |
| Small settings (announcement bar) | KV via `wrangler kv` | 1,000 writes/day |

Not free — skip: CF Health Checks (Pro), Cloudflare Images storage/delivery, Polish/Mirage.

## 0.2 Phase 1 work breakdown

1. **Scaffold** — Next 16 App Router, TS, Tailwind v4, `@opennextjs/cloudflare`, `wrangler.jsonc` with D1 + R2 + Images bindings, `open-next.config.ts` (R2 incremental cache, DO queue, D1 tag cache). Workers Builds + preview envs with isolated bindings.
2. **Design system** — tokens from `REDESIGN-BRIEF.md`; components matching `design/*.dc.html`: nav, hero, credential strip, logo grid, service card, case card, case feature, person card, phase timeline, deliverables grid, form, contact band, footer, breadcrumb.
3. **Content layer** — `content/` with Zod schemas: `services/*.mdx`, `work/*.mdx`, `insights/*.mdx`, `people/*.mdx`, `pages/*.mdx` (blocks), `site.json` (NAP, legal, socials). Seeded from `content/site-content.json` + the redesign drafts.
4. **Routes** — `/`, `/services` + 5, `/services/india-market-entry/dgca-guide`, `/tools/aero-opt`, `/work` + 4, `/about`, `/about/ashwani-khanna`, `/insights` + 3, `/compliance`, `/contact`, `/privacy`.
5. **SEO/AIEO** — `metadataBase`, per-page canonical, `sitemap.ts`, `robots.ts` (Allow all AI tokens), JSON-LD graph (Organization, WebSite, Person, Service ×5, Article, BreadcrumbList), OG images, `llms.txt` (30 min), RSS.
6. **Forms & leads** — server action, Turnstile, Resend, D1 migration, Cal.com embed, WhatsApp.
7. **Cutover** — CF zone audit (Rocket Loader / Email Obfuscation / Bot Fight Mode OFF, AI crawlers allowed, managed robots.txt OFF), Single Redirects, nameservers with MX preserved, GSC + Bing, Lighthouse ≥ 95, WCAG 2.2 AA pass.


## 1. Target stack

Everything below runs on Cloudflare's free plan except where marked.

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16, App Router, TypeScript, Tailwind v4** | User comfort; OpenNext supports all Next 16 minors on Workers (Node runtime, not edge) |
| Hosting | **Cloudflare Workers via `@opennextjs/cloudflare`** | Workers is now the only recommended Next target on CF; Pages is legacy for anything non-static. `vinext` is beta — revisit in 6–12 months |
| CMS | **OPEN — Payload 3 (+D1 +R2) or Keystatic (git-based)** | See §2 |
| Images | **R2 storage + Cloudflare Images transformations binding** for `next/image` | 5,000 free *unique* transformations/month on Free plan; ~200 photos × 4 widths fits. No sharp on Workers; avoid wasm resize (10 ms CPU cap) |
| ISR cache (if dynamic) | R2 incremental cache + Durable Object queue + D1 tag cache | KV free tier is 1,000 writes/day — too tight for ISR. DO SQLite is free. Static export sidesteps all of it |
| Forms | Server Action → Turnstile + honeypot + timing → **Resend** (3,000/mo, 100/day) + D1 `leads` table | MailChannels free tier ended Aug 2024. Email Routing is inbound-only on Free |
| Booking | **Cal.com free** embed (1 user, branded) | Nobody in this vertical offers booking — cheap differentiation |
| Chat | `https://wa.me/919910294423?text=...` plain link | Zero cost, no API |
| Analytics | **Cloudflare Web Analytics** | Cookieless → no consent banner; includes Core Web Vitals; ~30-day retention only |
| CI/CD | **Workers Builds** (3,000 min/mo, PR preview URLs) + GitHub Actions for lint/typecheck | Preview builds must bind to separate KV/D1/R2 |
| Redirects | **Cloudflare Single Redirects** (10 free) for the legacy `.php` URLs | Edge-resolved, zero Worker CPU, survive a bad deploy |
| DNS | Nameservers → Cloudflare; **registrar stays GoDaddy** | Lowest risk with live business email; transfer later if wanted |

### Cloudflare zone settings that must be OFF or checked

- Rocket Loader OFF, Email Address Obfuscation OFF (both break React hydration; obfuscation also hides the email from JSON-LD/crawlers). Auto Minify and Mirage are already retired.
- Bot Fight Mode OFF (blocks Googlebot and AI search bots as collateral, cannot allowlist).
- **AI Crawl Control: explicitly Allow** GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, ChatGPT-User, Claude-User. New zones default-block AI crawlers since July 2025. Managed robots.txt OFF — ship our own `app/robots.ts` with `Allow: /`.
- No "Cache Everything" rule on HTML (fights ISR). Cache rule only for `/_next/static/*` → 1 year immutable.

### Free-tier limits that matter here

| Resource | Free limit | Risk |
|---|---|---|
| Workers CPU | **10 ms / invocation** | The constraint. Kills Payload admin SSR on Free; fine for a lean Next frontend |
| Workers requests | 100k/day | Negligible; static asset hits unbilled |
| KV writes | 1,000/day | Don't use KV for ISR cache |
| D1 | 5M reads / 100k writes per day; **hard-fails since 1 Sept 2026** | Fine for tag cache + leads |
| R2 | 10 GB, free egress | Fine |
| CF Images transformations | 5,000 unique/mo | Watch breakpoints × photo count |
| Worker bundle | 64 MiB uncompressed (all plans, since 4 Sept 2026) | Non-issue now |

## 2. The CMS decision (OPEN)

| | **A. Payload 3 + D1 + R2** (inside the Next app) | **B. Keystatic** (git-based) |
|---|---|---|
| Monthly cost | Realistically **$5/mo Workers Paid**. Size limit is gone, but Free's 10 ms CPU cap will very likely break the admin panel. No confirmed report of Payload on Free post-change | **$0**, guaranteed |
| Editor UX | Full admin: media library, drafts + versions, live preview of the real frontend, roles/access control, blocks Layout Builder, official SEO / redirects / form-builder / nested-docs plugins | Clean editor at `/keystatic`; component blocks inside a document field; images commit to repo. No drafts (branches/PRs only), no roles, no scheduling |
| "Create new pages" | Editors create any page from blocks, no dev | Editors create new *entries* in collections we define (Service, Case Study, Insight, generic Page with blocks). New *page types* = code change |
| Auth | Email/password in Payload | GitHub account per editor (Keystatic Cloud free ≤ 3 users) |
| Publish latency | Instant (ISR revalidate) | Git commit → Workers Build → live, ~2–3 min |
| Rendering | Dynamic + ISR (R2/DO/D1 cache stack) | Fully static export possible — best CWV, simplest ops |
| Known risks | Open D1 adapter bugs: `too many SQL variables` on large block schemas (workaround `blocksAsJSON: true`), localized richText in version tables, nested-docs drafts. Stale "Paid only" note in Payload's own template | Keystatic local mode can't run on Workers (GitHub mode required); one documented OAuth `redirect_uri` 401 on Workers with a known fix |

**Recommendation:** if $5/mo is acceptable, **Payload** — it is the better product for "editors create pages" and dynamic SEO. If the budget is strictly ₹0, **Keystatic** with a well-designed generic Page collection covers 90% of the need at zero risk. Either way the frontend, design system, SEO layer and forms are identical; only the content adapter changes.

## 3. SEO + AIEO — what the evidence says

- **Google's May 2026 guidance: AEO/GEO is still SEO.** No `llms.txt`, no AI-specific markup, no chunking needed. Ahrefs server logs: 97% of `llms.txt` files receive zero requests. We ship a short one anyway (30 min), nothing more.
- **Strongest correlates with AI citation** (Ahrefs, 75k brands): brand mentions on YouTube and the web ≫ backlinks. Organic ranking still the main lever (AI Overview / organic overlap 54%).
- **On-page (KDD 2024 GEO paper):** adding statistics, quotations and citations to primary sources lifted visibility 28–41%. So: answer-first sections, entity-named ("Aerotech provides ORAT…"), inline citations to ICAO / DGCA / IATA documents.
- **Structured data is entity hygiene, not an AI lever** (Ahrefs: no citation uplift from schema). Still do it: `Organization` (+`LocalBusiness` only if the Aerocity office is real and staffed), `Person` with `hasCredential`/`knowsAbout`, `Service` per page, `Article` for case studies (no `CaseStudy` type exists), `BreadcrumbList`. `ProfessionalService` is deprecated. FAQ rich results were removed May 2026 — keep FAQ as visible text.
- **robots.txt: `Allow: /` for every AI token.** We want citations; training exposure for a brochure site is irrelevant.
- **Off-site:** Google Business Profile (2026 rules require a real staffed office), LinkedIn company page with identical NAP, Wikidata item, IATA/ACI/AAAE listings, trade-press bylines. Avoid IndiaMART-grade directories.
- **Next.js specifics:** `metadataBase` in root layout; per-page `alternates.canonical`; `viewport` export (not in `metadata`); `app/sitemap.ts` + `app/robots.ts` prerendered; build-time OG images (runtime Satori is fragile on Workers); `revalidateTag` silently no-ops without a tag cache.

## 4. What the vertical expects (10 peer sites benchmarked)

- Common anatomy: what we do → who for → who we are → insights → contact. 5–8 services following the airport lifecycle, one page each. **Aggregate stat bands, not client logos** — airports rarely permit logos. Nobody offers calendar booking.
- Boutiques (To70, Airbiz, NACO) **lead with projects and make people reachable** (direct emails, named heads); big firms lead with capability categories.
- **ORAT buyer expects:** phase methodology diagram, Master ORAT Plan, Master Work Activity Register, trials programme, Day-1 command & control, T-24→T+90 timeline, deliverables table, references.
- **Audit buyer expects:** auditor status under IAQG ICOP (AEA/AA), lead-auditor certs listed, scope matrix, audit stages, sample redacted report.
- **Foreign OEM expects:** eGCA registration, DGCA CAR map (CAR-145 / CAR-M / CAR-21), FAA–DGCA IPA route, indicative timeline. DGCA revised 100+ CARs in six months — a maintained regulatory changelog is real differentiation.
- **Conversion evidence:** forms ≤5 fields (3 fields ≈10% vs 9 fields ≈3.6%); case studies are the top B2B content type (42%); named-expert pages matter (buyers use ~4.8 research techniques on the individual); response *speed* matters far more than widget choice (avg B2B first response 42 h, 23% never reply).
- **Tender/legal extras:** Companies Act s.12 requires name, registered office, **CIN**, phone, email + a named grievance contact on the homepage/footer. AAI tenders want ISO cert scans, GST, completion certificates → a **Compliance & Downloads** page unblocks prequalification.

## 5. Proposed sitemap

```
/                                      Home
/services                              hub
  /services/orat
  /services/audits-compliance          ISO 9001 / 45001 / 14064, AS9100D
  /services/sustainable-aviation       CORSIA, ISO 14064, emissions monitoring
  /services/aircraft-recovery
  /services/india-market-entry
  /services/india-market-entry/dgca-guide   pillar explainer (the page OEMs actually search)
/tools/aero-opt
/work                                  references + counters
  /work/taxibot-india · /work/delhi-t3-orat · /work/stelia-aerospace · /work/aerowash
/about
  /about/ashwani-khanna                named-expert page, Person JSON-LD, author entity
/insights · /insights/[slug]           two posts/month or don't ship it
/compliance                            capability statement PDF, ISO certs, CIN, GSTIN
/contact                               Cal.com + 5-field form + WhatsApp + direct email/phone
```

301 map from the eleven legacy `.php` URLs as in `SITEMAP.md`.

## 6. Phases (after answers)

| Phase | Output |
|---|---|
| 0 — Decisions & access | CMS choice, CF account, GitHub repo, GoDaddy DNS access, email host confirmed, content owner named |
| 1 — Scaffold | Next 16 + OpenNext + Tailwind, design tokens from `REDESIGN-BRIEF.md`, layout/nav/footer, Workers Builds + preview envs, D1/R2 bindings |
| 2 — Content model | Collections: Service, CaseStudy, Insight, Person, Page (blocks), SiteSettings, Redirects, Leads. Seed from `content/site-content.json` |
| 3 — Pages | Home, services ×5 + hub, work ×4 + hub, about + principal, contact, compliance, insights |
| 4 — SEO/AIEO layer | metadata, sitemap/robots, JSON-LD graph, OG images, CF zone audit, GSC/Bing, GBP |
| 5 — Forms & leads | Server action, Turnstile, Resend, D1 leads, Cal.com, WhatsApp |
| 6 — Cutover | DNS to Cloudflare with MX preserved, Single Redirects, Lighthouse ≥ 95, WCAG 2.2 AA pass, go-live |

## 7. Open questions

See the list in the conversation of 2026-09-11; answers get folded back into this file.

## Sources

Consolidated from the four research reports — key ones:
Cloudflare: [64 MiB Worker limit](https://developers.cloudflare.com/changelog/post/2026-09-04-increased-worker-size-limit/) · [D1 free-tier enforcement](https://developers.cloudflare.com/changelog/post/2026-09-01-d1-free-tier-limit-enforcement/) · [Workers limits](https://developers.cloudflare.com/workers/platform/limits/) · [Images pricing](https://developers.cloudflare.com/images/pricing/) · [AI Crawl Control](https://developers.cloudflare.com/ai-crawl-control/) · [Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) · [Single Redirects](https://developers.cloudflare.com/rules/url-forwarding/) · [Workers Builds limits](https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/)
OpenNext: [Cloudflare adapter](https://opennext.js.org/cloudflare) · [Caching](https://opennext.js.org/cloudflare/caching) · [Images](https://opennext.js.org/cloudflare/howtos/image)
Payload: [with-cloudflare-d1 template](https://github.com/payloadcms/payload/blob/main/templates/with-cloudflare-d1/README.md) · [db-d1-sqlite](https://www.npmjs.com/package/@payloadcms/db-d1-sqlite) · issues [#14766](https://github.com/payloadcms/payload/issues/14766), [#14347](https://github.com/payloadcms/payload/issues/14347), [#14943](https://github.com/payloadcms/payload/issues/14943)
Keystatic: [GitHub mode](https://keystatic.com/docs/github-mode) · [OAuth on Workers fix](https://1ar.io/updates/keystatic-oauth-cloudflare)
SEO/AIEO: [Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) · [Ahrefs brand-visibility correlations](https://ahrefs.com/blog/ai-brand-visibility-correlations) · [Ahrefs llms.txt study](https://ahrefs.com/blog/llmstxt-study/) · [GEO paper, KDD 2024](https://arxiv.org/abs/2311.09735) · [FAQ rich results removed](https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/) · [OpenAI bots](https://developers.openai.com/api/docs/bots) · [Anthropic crawlers](https://support.claude.com/en/articles/8896518) · [Perplexity bots](https://docs.perplexity.ai/guides/bots)
Vertical: [To70](https://www.to70.com) · [NACO](https://www.naco.nl) · [Landrum & Brown](https://www.landrumbrown.com/en/) · [Munich Airport Int'l references](https://www.munich-airport.com/international/project-references) · [Airbiz](https://airbiz.aero) · [Arup ORAT](https://www.arup.com/en-us/services/orat/) · [Hinge High Growth 2026](https://hingemarketing.com/library/article/high-growth-study-2026-executive-summary) · [NN/g scrolling & attention](https://www.nngroup.com/articles/scrolling-and-attention/) · [Form-length benchmarks](https://www.digitalapplied.com/blog/form-conversion-rate-benchmarks-2026-data-points) · [AAI tender eligibility](https://www.aai.aero/en/content/what-are-eligibility-criteria-participating-aais-tenders) · [Companies Act s.12](https://taxguru.in/company-law/companies-act-section-123-mandatory-disclosures.html) · [Resend limits](https://resend.com/docs/knowledge-base/account-quotas-and-limits) · [Cal.com pricing](https://cal.com/pricing)
