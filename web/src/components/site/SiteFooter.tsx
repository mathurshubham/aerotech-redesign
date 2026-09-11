import Link from "next/link";

import { site } from "@/content";

import { renderText } from "./Placeholder";
import { focusRing } from "./styles";
import { Wordmark } from "./Wordmark";

const linkClass = `text-sm text-navy-400 transition-colors duration-150 hover:text-white ${focusRing}`;

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { nap, legal } = site;

  return (
    <footer className="bg-band-deep">
      <div className="container-site pt-12 lg:pt-14">
        <div className="grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12 lg:pb-11">
          <div>
            <Wordmark href="/" variant="light" height={48} />
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-navy-400">
              {site.description}
            </p>
            <address className="mt-6 flex flex-col gap-2.5 text-sm not-italic text-navy-400">
              <span>
                {nap.addressLines.join(", ")}
                <br />
                {nap.locality} {nap.postalCode}, {nap.country}
              </span>
              <a
                href={`tel:${nap.phoneE164}`}
                className={`inline-flex min-h-11 items-center font-mono sm:min-h-0 ${linkClass}`}
              >
                {nap.phoneDisplay}
              </a>
              <a
                href={`mailto:${nap.email}`}
                className={`inline-flex min-h-11 items-center font-mono sm:min-h-0 ${linkClass}`}
              >
                {nap.email}
              </a>
            </address>
          </div>

          {site.footerNav.map((group) => (
            <div key={group.title}>
              <p className="font-mono text-[0.625rem] font-medium tracking-[0.11em] text-orange-500 uppercase">
                {group.title}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`inline-flex min-h-11 items-center sm:min-h-0 ${linkClass}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="border-t border-navy-800 py-6">
          <p className="flex flex-col gap-2 font-mono text-eyebrow leading-relaxed tracking-[0.06em] text-navy-300 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
            <span>
              &copy; {year} {site.legalName}
            </span>
            <span className="hidden sm:inline" aria-hidden="true">
              &middot;
            </span>
            <span>CIN {renderText(legal.cin)}</span>
            <span className="hidden sm:inline" aria-hidden="true">
              &middot;
            </span>
            <span>GSTIN {renderText(legal.gstin)}</span>
            <span className="hidden sm:inline" aria-hidden="true">
              &middot;
            </span>
            <span>Grievance contact: {renderText(legal.grievanceContact)}</span>
          </p>
          <p className="mt-3 flex gap-3 font-mono text-eyebrow tracking-[0.06em] text-navy-300">
            <Link href="/privacy" className={`${focusRing} hover:text-white`}>
              Privacy
            </Link>
            <span aria-hidden="true">&middot;</span>
            <Link href="/compliance" className={`${focusRing} hover:text-white`}>
              Compliance
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
