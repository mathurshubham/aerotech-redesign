# Lead capture

Env vars (`.dev.vars` locally, Worker secrets/vars in production):

- `RESEND_API_KEY` — Resend API key. Unset → email is stubbed (`console.info`).
- `LEAD_FROM_EMAIL` — e.g. `Aerotech Website <leads@aerotechss.com>`.
- `LEAD_TO_EMAIL` — inbox that receives new-enquiry emails.
- `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile secret. Unset → verification
  always passes (logs "Turnstile disabled" once).
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — public site key for the widget.

## D1 setup

```
wrangler d1 create aerotech-leads   # paste database_id into wrangler.jsonc
wrangler d1 migrations apply aerotech-leads --remote
```

Locally, `wrangler d1 migrations apply aerotech-leads --local` against the
dev database used by `next dev` / `opennextjs-cloudflare preview`.

## Stub mode

With no `DB` binding (plain `next dev`) or no `RESEND_API_KEY`, `storeLead`
and `sendLeadEmail` log to the console instead of writing to D1 / calling
Resend, so the form still returns `{ ok: true }` in local dev.
