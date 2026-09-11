"use client";

import { useRef, useState, useTransition } from "react";

import { verifyGate } from "@/app/actions/gate";
import { btnPrimary, focusRing } from "@/components/site";
import { cn } from "@/lib/utils";

export function GateForm({ next }: { next: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setError(null);
    startTransition(async () => {
      const result = await verifyGate(formData);
      // A successful verifyGate() redirects server-side and never resolves
      // here — only a failure result comes back.
      if (!result.ok) {
        setError(result.error);
        formRef.current?.reset();
        formRef.current?.querySelector("input")?.focus();
      }
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-7">
      <input type="hidden" name="next" value={next} />
      <label htmlFor="gate-pin" className="mb-1.5 block text-[0.8125rem] font-semibold text-ink">
        Access PIN
      </label>
      <input
        id="gate-pin"
        name="pin"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="one-time-code"
        maxLength={8}
        required
        autoFocus
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "gate-pin-error" : undefined}
        className={cn(
          "h-14 w-full rounded-lg border border-line bg-paper px-4 text-center font-mono text-[1.75rem] tracking-[0.35em] text-ink placeholder:tracking-normal placeholder:text-subtle transition-colors duration-150 focus-visible:border-orange-500",
          focusRing,
          error && "border-destructive",
        )}
        placeholder="••••"
      />
      {error ? (
        <p id="gate-pin-error" role="alert" className="mt-2.5 text-[0.8125rem] text-destructive">
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={isPending} className={cn(btnPrimary, "mt-6 w-full")}>
        {isPending ? "Checking…" : "Continue"}
      </button>
    </form>
  );
}
