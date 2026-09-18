import Link from "next/link";

import { site } from "@/content";

import { renderText } from "./Placeholder";
import { focusRing } from "./styles";
import { Wordmark } from "./Wordmark";

const linkClass = `text-sm text-ink-soft transition-colors duration-150 hover:text-ink ${focusRing}`;

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { nap, legal } = site;

  return (
    <footer className="bg-band-deep" data-whatsapp-avoid>
      <div className="container-site pt-12 lg:pt-14">
        <div className="grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12 lg:pb-11">
          <div>
            <Wordmark href="/" height={48} />
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-ink-soft">
              {site.description}
            </p>
            <address className="mt-6 flex flex-col gap-2.5 text-sm not-italic text-ink-soft">
              <span>
                {nap.addressLines.join(", ")}
                <br />
                {nap.locality} {nap.postalCode}, {nap.country}
              </span>
              <a
                href={`tel:${nap.phoneE164}`}
                className={`inline-flex min-h-11 items-center font-mono lg:min-h-0 ${linkClass}`}
              >
                {nap.phoneDisplay}
              </a>
              <a
                href={`mailto:${nap.email}`}
                className={`inline-flex min-h-11 items-center font-mono lg:min-h-0 ${linkClass}`}
              >
                {nap.email}
              </a>
            </address>
          </div>

          {site.footerNav.map((group) => (
            <div key={group.title}>
              <p className="eyebrow-accent">
                {group.title}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`inline-flex min-h-11 items-center lg:min-h-0 ${linkClass}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="border-t border-band-line py-6">
          {/* The middots are pseudo-elements on each item rather than their own
              spans: as separate flex children they could wrap to a line of
              their own, which left a dangling "·" at the end of a row. */}
          <p className="flex flex-col gap-2 text-eyebrow leading-relaxed text-ink-soft sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-0 sm:[&>span:not(:first-child)]:before:mx-3 sm:[&>span:not(:first-child)]:before:content-['\00b7']">
            <span>
              &copy; {year} {site.legalName}
            </span>
            <span>CIN {renderText(legal.cin)}</span>
            <span>GSTIN {renderText(legal.gstin)}</span>
            <span>Grievance contact: {renderText(legal.grievanceContact)}</span>
          </p>
          <p className="mt-3 flex items-center gap-3 text-eyebrow text-ink-soft">
            <Link
              href="/privacy"
              className={`inline-flex min-h-11 items-center lg:min-h-0 ${focusRing} hover:text-ink`}
            >
              Privacy
            </Link>
            <span aria-hidden="true">&middot;</span>
            <Link
              href="/compliance"
              className={`inline-flex min-h-11 items-center lg:min-h-0 ${focusRing} hover:text-ink`}
            >
              Compliance
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
