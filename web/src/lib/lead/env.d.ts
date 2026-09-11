// Ambient augmentation for `CloudflareEnv` (generated into `cloudflare-env.d.ts`
// by `pnpm cf-typegen`, which only knows about the `DB` D1 binding declared in
// `wrangler.jsonc`). These extra fields are Worker *secrets* — deliberately
// left out of `wrangler.jsonc` so real values never land in source control —
// set locally in `.dev.vars` and in production via `wrangler secret put`.
//
// This file is ambient (no imports/exports) so it merges with the generated
// `interface CloudflareEnv` at the global scope without being clobbered by
// re-running `pnpm cf-typegen`.
interface CloudflareEnv {
  RESEND_API_KEY?: string;
  LEAD_FROM_EMAIL?: string;
  LEAD_TO_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
  // Preview PIN gate (`src/proxy.ts`, `src/app/actions/gate.ts`) — see
  // `src/lib/gate/README.md`. Unset `GATE_PIN` disables the gate entirely.
  GATE_PIN?: string;
  GATE_SECRET?: string;
}
