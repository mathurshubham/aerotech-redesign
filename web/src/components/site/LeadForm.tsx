"use client";

import { CalendarDays, Check, Lock } from "lucide-react";
import Script from "next/script";
import { useEffect, useId, useRef, useState } from "react";

import { submitLead } from "@/app/actions/lead";
import { site } from "@/content";
import { cn } from "@/lib/utils";

import { btnPrimary, focusRing } from "./styles";

export type LeadTopicOption = { value: string; label: string };

const inputClass =
  "h-11.5 w-full rounded-lg border border-line bg-paper px-3.5 text-[0.9375rem] text-ink placeholder:text-subtle transition-colors duration-150 focus-visible:border-orange-500 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

const labelClass = "mb-1.5 block text-[0.8125rem] font-semibold text-ink";

type Errors = Record<string, string>;

function validate(data: {
  name: string;
  email: string;
  topic: string;
}): Errors {
  const errors: Errors = {};
  if (data.name.trim().length < 2) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim()))
    errors.email = "Enter a valid email address.";
  if (!data.topic) errors.topic = "Pick a topic.";
  return errors;
}

/**
 * The one lead capture on the site. Three required fields, a topic radio
 * group rendered as chips, an optional target date and a message.
 *
 * Anti-spam: a visually hidden, `aria-hidden` `website` honeypot and a mount
 * timestamp. A filled honeypot is accepted in the UI and never submitted, so
 * a bot learns nothing.
 */
export function LeadForm({
  topics,
  initialTopic,
  eyebrow = "Book a consultation",
  className,
}: {
  topics: LeadTopicOption[];
  initialTopic?: string;
  eyebrow?: string;
  className?: string;
}) {
  const formId = useId();
  const [topic, setTopic] = useState(initialTopic ?? "");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [formError, setFormError] = useState<string | null>(null);
  const mountedAt = useRef(0);
  const errorRef = useRef<HTMLParagraphElement | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  // Recorded after mount so the server can reject bot-speed submissions
  // without reading a clock during render.
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const values = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      topic: String(data.get("topic") ?? ""),
    };

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      setFormError("Please check the highlighted fields and try again.");
      return;
    }

    setErrors({});
    setFormError(null);
    setStatus("sending");
    data.set("ts", String(mountedAt.current));

    try {
      const result = await submitLead(data);
      if (result.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setFormError(result.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setFormError(
        `Something went wrong. Please email ${site.nap.email} instead.`,
      );
    }
  }

  useEffect(() => {
    if (status === "error") errorRef.current?.focus();
  }, [status, formError]);

  if (status === "sent") {
    return (
      <div
        role="status"
        className={cn(
          "rounded-lg border border-line bg-surface p-7 lg:px-9 lg:py-9",
          className,
        )}
      >
        <div
          aria-hidden="true"
          className="flex size-11 items-center justify-center rounded-full border border-orange-500"
        >
          <Check size={24} strokeWidth={1.6} className="text-orange-500" />
        </div>
        <h2 className="mt-5 font-display text-[1.375rem] leading-[1.3] font-semibold">
          Enquiry received
        </h2>
        <p className="mt-3 text-[0.9375rem] leading-[1.62]">
          {site.responsePromise}
        </p>
        <p className="mt-4 font-mono text-eyebrow text-subtle">
          Something urgent? {site.nap.phoneDisplay}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-labelledby={`${formId}-heading`}
      className={cn(
        "rounded-lg border border-line bg-surface p-6 lg:px-9 lg:pt-8 lg:pb-9",
        className,
      )}
    >
      <p id={`${formId}-heading`} className="eyebrow">
        {eyebrow}
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className={labelClass}>
            Name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            className={cn(inputClass, errors.name && "border-destructive")}
          />
          {errors.name && (
            <p
              id={`${formId}-name-error`}
              className="mt-1.5 text-[0.8125rem] text-destructive"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className={labelClass}>
            Work email
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            className={cn(inputClass, errors.email && "border-destructive")}
          />
          {errors.email && (
            <p
              id={`${formId}-email-error`}
              className="mt-1.5 text-[0.8125rem] text-destructive"
            >
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <fieldset
        className="mt-6"
        aria-invalid={errors.topic ? true : undefined}
        aria-describedby={errors.topic ? `${formId}-topic-error` : undefined}
      >
        <legend className={labelClass}>What do you need?</legend>
        <div className="flex flex-wrap gap-2.5">
          {topics.map((option) => {
            const id = `${formId}-topic-${option.value}`;
            const selected = topic === option.value;
            return (
              <div key={option.value}>
                <input
                  id={id}
                  type="radio"
                  name="topic"
                  value={option.value}
                  checked={selected}
                  onChange={() => setTopic(option.value)}
                  className="peer sr-only"
                />
                <label
                  htmlFor={id}
                  className={cn(
                    "inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm transition-colors duration-150",
                    selected
                      ? "border-orange-500 bg-orange-100 font-medium text-orange-600"
                      : "border-line text-body hover:border-ink/30",
                    "peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50",
                  )}
                >
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>
        {errors.topic && (
          <p
            id={`${formId}-topic-error`}
            className="mt-2 text-[0.8125rem] text-destructive"
          >
            {errors.topic}
          </p>
        )}
      </fieldset>

      <div className="mt-6">
        <label htmlFor={`${formId}-date`} className={labelClass}>
          Target date{" "}
          <span className="font-normal text-subtle">(optional)</span>
        </label>
        <div className="relative">
          <input
            id={`${formId}-date`}
            name="targetDate"
            type="text"
            placeholder="Opening or audit date"
            className={cn(inputClass, "pr-11")}
          />
          <CalendarDays
            size={19}
            strokeWidth={1.6}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-subtle"
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor={`${formId}-message`} className={labelClass}>
          Anything we should read before the call?{" "}
          <span className="font-normal text-subtle">(optional)</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={4}
          placeholder="Scope, a programme date, the constraint you keep running into…"
          className="w-full rounded-lg border border-line bg-paper px-3.5 py-3 text-[0.9375rem] leading-[1.55] text-ink placeholder:text-subtle transition-colors duration-150 focus-visible:border-orange-500 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      {/* Honeypot. Never shown, never announced, never submitted by a human. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {turnstileSiteKey && (
        <div className="mt-6 min-h-16">
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="lazyOnload"
            async
            defer
          />
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} />
        </div>
      )}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(btnPrimary, "w-full sm:w-auto disabled:opacity-60")}
        >
          {status === "sending" ? "Sending…" : "Request a call"}
        </button>
        <p className="max-w-[34ch] text-[0.8125rem] leading-[1.5] text-subtle">
          {site.responsePromise}
        </p>
      </div>

      <p
        ref={errorRef}
        tabIndex={-1}
        role="alert"
        aria-live="polite"
        className={cn(
          "mt-4 text-[0.8125rem] text-destructive",
          focusRing,
          !formError && "sr-only",
        )}
      >
        {formError ?? ""}
      </p>

      <p className="mt-5 flex items-center gap-2.5 border-t border-line pt-5 font-mono text-eyebrow text-subtle">
        <Lock size={15} strokeWidth={1.6} aria-hidden="true" />
        Not stored or shared. No newsletter.
      </p>
    </form>
  );
}
