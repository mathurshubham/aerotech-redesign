// TEMPORARY diagnostic — reports only lengths and a hash prefix, never values.
// Delete once the gate is confirmed working.
import { resolveGateEnv } from "@/lib/gate/env";

export const dynamic = "force-dynamic";

export async function GET() {
  const { GATE_PIN, GATE_SECRET } = await resolveGateEnv();
  const enc = new TextEncoder();
  const digest = GATE_PIN
    ? Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(GATE_PIN))))
        .slice(0, 4)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
    : null;
  return Response.json({
    pinDefined: Boolean(GATE_PIN),
    pinLength: GATE_PIN?.length ?? 0,
    pinTrimmedLength: GATE_PIN?.trim().length ?? 0,
    pinSha256Prefix: digest,
    secretDefined: Boolean(GATE_SECRET),
    secretLength: GATE_SECRET?.length ?? 0,
    fromProcessEnv: Boolean(process.env.GATE_PIN),
  });
}
