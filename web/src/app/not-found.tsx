import Link from "next/link";

import { btnOutline, btnPrimary } from "@/components/site";

export default function NotFound() {
  return (
    <div className="container-site py-16 lg:py-28">
      <p className="eyebrow-accent">Error 404</p>
      <h1 className="mt-4 max-w-[20ch] font-display text-[2.125rem] leading-[1.07] font-bold lg:text-[3.125rem]">
        That page is not on the stand
      </h1>
      <p className="mt-5 max-w-[54ch] text-[1.0625rem] leading-[1.56] text-ink-soft lg:text-[1.1875rem]">
        The link may be out of date, or the page may have moved. The services,
        the case studies and the contact form are all one click away.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={btnPrimary}>
          Back to the home page
        </Link>
        <Link href="/contact#book" className={btnOutline}>
          Contact us
        </Link>
      </div>
      <nav aria-label="Useful links" className="mt-10 border-t border-line pt-6">
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {[
            { label: "Services", href: "/services" },
            { label: "Work", href: "/work" },
            { label: "About", href: "/about" },
            { label: "Insights", href: "/insights" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex min-h-11 items-center text-[0.9375rem] font-semibold text-orange-600 hover:text-orange-500"
              >
                {item.label} →
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
