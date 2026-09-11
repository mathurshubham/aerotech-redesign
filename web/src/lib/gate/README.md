# Preview PIN gate

Blocks the whole site behind a 4-digit PIN while it's in preview. Not a
security boundary — it blocks casual visitors and crawlers by design, not a
determined attacker. **Remove `src/proxy.ts`'s gate logic (or just delete
`GATE_PIN`) before launch.**

## Env vars

- `GATE_PIN` — the PIN. Unset → gate disabled, every request passes through.
- `GATE_SECRET` — random string, ≥32 chars, signs the session cookie.

Set locally in `.dev.vars` (gitignored). In production:

```
wrangler secret put GATE_PIN
wrangler secret put GATE_SECRET
```

Disable in production by deleting the secret: `wrangler secret delete GATE_PIN`.

## Brute force

5 wrong PINs → 15 min lockout per hashed IP, plus a 400-800ms delay on every
failure. Both are **in-memory per isolate** — best-effort only, reset on
isolate recycle. The durable layer is a Cloudflare **WAF rate-limit rule** on
`POST /gate` (dashboard → Security → WAF → Rate limiting rules).

## Sign out (testing)

Visit `/gate?logout=1` to clear the cookie.
