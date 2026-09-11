import type { Metadata } from "next";
import Link from "next/link";

import { btnPrimary, Wordmark } from "@/components/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page could not be found.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Page not found",
    description: "This page could not be found.",
  },
};

/**
 * Root 404 — deliberately bare.
 *
 * Next.js ships the nearest not-found boundary inside the payload of every
 * page, so anything rendered here would also travel with `/gate`. Keeping the
 * site shell out of it is what stops the navigation, the address and the phone
 * number leaking to a visitor who has not entered the preview PIN. The richer
 * 404, with the full shell, lives at `(site)/not-found.tsx` and covers every
 * route inside the site group.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-paper px-6 text-center">
      <Wordmark href={null} />
      <div>
        <p className="eyebrow-accent">Error 404</p>
        <h1 className="mt-3 font-display text-[1.75rem] leading-[1.15] font-bold text-ink">
          That page is not on the stand
        </h1>
      </div>
      <Link href="/" className={btnPrimary}>
        Back to the home page
      </Link>
    </main>
  );
}
