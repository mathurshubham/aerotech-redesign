import type { Metadata } from "next";

import { Wordmark } from "@/components/site";

import { GateForm } from "./GateForm";

export const metadata: Metadata = {
  // `absolute` so the site name from the root template never appears either.
  title: { absolute: "Preview access" },
  // Overrides the site-wide description and Open Graph data on purpose: a
  // visitor who has not entered the PIN should learn nothing about the
  // business from the page source either.
  description: "This site is in preview.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Preview access",
    description: "This site is in preview.",
    images: [],
  },
};

function sanitizeNext(raw: string | string[] | undefined): string {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    value.includes("://")
  ) {
    return "/";
  }
  return value;
}

export default async function GatePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { next: nextRaw, error: errorRaw } = await searchParams;
  const next = sanitizeNext(nextRaw);
  const error = Array.isArray(errorRaw) ? errorRaw[0] : errorRaw;

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6 py-16">
      <div className="w-full max-w-[26rem] rounded-lg border border-line bg-surface p-8">
        <Wordmark href={null} />
        <p className="eyebrow-accent mt-7">Preview access</p>
        <h1 className="mt-2 max-w-[20ch] text-[1.75rem] leading-[1.15] font-bold text-ink">
          Enter the access PIN
        </h1>
        <p className="mt-2.5 text-[0.9375rem] text-body">
          This site is in preview. Ask Aerotech for the PIN if you don&apos;t have it.
        </p>
        <GateForm next={next} error={error} />
      </div>
    </main>
  );
}
