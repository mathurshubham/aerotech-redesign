import { btnPrimary, focusRing } from "@/components/site";
import { cn } from "@/lib/utils";

const MESSAGES: Record<string, string> = {
  wrong: "Incorrect PIN. Please try again.",
  locked: "Too many attempts. Please try again in about 15 minutes.",
};

/**
 * A plain HTML form posting to `/api/gate`. Deliberately has no client
 * JavaScript: the gate is the first thing a visitor hits, so it must work
 * before any bundle has loaded.
 */
export function GateForm({ next, error }: { next: string; error?: string }) {
  const message = error ? (MESSAGES[error] ?? MESSAGES.wrong) : null;

  return (
    <form method="POST" action="/api/gate" className="mt-7">
      <input type="hidden" name="next" value={next} />
      <label htmlFor="gate-pin" className="mb-1.5 block text-[0.8125rem] font-semibold text-ink">
        Access PIN
      </label>
      <input
        id="gate-pin"
        name="pin"
        type="password"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="one-time-code"
        maxLength={8}
        required
        autoFocus
        aria-invalid={message ? true : undefined}
        aria-describedby={message ? "gate-pin-error" : undefined}
        className={cn(
          "h-14 w-full rounded-lg border border-line bg-paper px-4 text-center font-mono text-[1.75rem] tracking-[0.35em] text-ink placeholder:tracking-normal placeholder:text-subtle transition-colors duration-150 focus-visible:border-orange-500",
          focusRing,
          message && "border-destructive",
        )}
        placeholder="••••"
      />
      {message ? (
        <p id="gate-pin-error" role="alert" className="mt-2.5 text-[0.8125rem] text-destructive">
          {message}
        </p>
      ) : null}
      <button type="submit" className={cn(btnPrimary, "mt-6 w-full")}>
        Continue
      </button>
    </form>
  );
}
