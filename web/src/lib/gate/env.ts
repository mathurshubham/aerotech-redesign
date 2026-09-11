/**
 * Resolves `GATE_PIN` / `GATE_SECRET` for both the proxy and the
 * `verifyGate` server action.
 *
 * On Cloudflare Workers, `@opennextjs/aws`'s `cloudflare-edge` wrapper (used
 * for both the OpenNext middleware bundle and the main server function)
 * copies every string-valued binding from the Workers `env` onto
 * `process.env` before invoking Next.js — see
 * `node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js`.
 * So `process.env.GATE_PIN` / `GATE_SECRET` are populated on Workers without
 * any Cloudflare-specific API. `process.env` is checked first.
 *
 * Locally, plain `next dev` does not read `.dev.vars` into `process.env` (it
 * is a wrangler convention, not a dotenv one) — but `next.config.ts` already
 * calls `initOpenNextCloudflareForDev()`, which makes `.dev.vars` reachable
 * via `getCloudflareContext()`. That is the fallback here, matching the
 * pattern in `src/app/actions/lead.ts`.
 */
import { getCloudflareContext } from "@opennextjs/cloudflare";

export type GateEnv = {
  GATE_PIN?: string;
  GATE_SECRET?: string;
};

export async function resolveGateEnv(): Promise<GateEnv> {
  const fromProcess: GateEnv = {
    GATE_PIN: process.env.GATE_PIN,
    GATE_SECRET: process.env.GATE_SECRET,
  };

  if (fromProcess.GATE_PIN && fromProcess.GATE_SECRET) {
    return fromProcess;
  }

  try {
    const { env } = await getCloudflareContext({ async: true });
    const cfEnv = env as Partial<GateEnv>;
    return {
      GATE_PIN: fromProcess.GATE_PIN ?? cfEnv.GATE_PIN,
      GATE_SECRET: fromProcess.GATE_SECRET ?? cfEnv.GATE_SECRET,
    };
  } catch {
    // Neither a Workers request nor `initOpenNextCloudflareForDev()` context
    // (e.g. a unit test, or dev without `.dev.vars`) — fall back to whatever
    // `process.env` had, which may be nothing (gate disabled).
    return fromProcess;
  }
}
