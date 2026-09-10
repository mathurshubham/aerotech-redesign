import { PlaneTakeoff } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import {
  Breadcrumb,
  LeadForm,
  leadTopics,
  Placeholder,
  resolveImage,
  resolveTopic,
} from "@/components/site";
import { site } from "@/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you are trying to get through — a terminal opening date, an audit scope, an approval that has stalled. Thirty minutes with the person who would run the engagement.",
  alternates: { canonical: "/contact" },
};

const OFFICE_PHOTO = {
  src: "/images/delhi-apron.jpg",
  alt: "Apron at Indira Gandhi International, Delhi",
  width: 1200,
  height: 800,
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { topic } = await searchParams;
  const initialTopic = resolveTopic(topic);
  const photo = resolveImage(OFFICE_PHOTO.src, OFFICE_PHOTO);

  return (
    <div className="py-10 lg:py-18">
      <div className="container-site">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          className="mb-5"
        />
        <h1 className="max-w-[20ch] font-display text-[2.125rem] leading-[1.07] font-bold lg:text-[3.125rem]">
          Tell us what you are trying to get through
        </h1>
        <p className="mt-5 max-w-[56ch] text-[1.0625rem] leading-[1.56] text-ink-soft lg:text-xl">
          A terminal opening date, an audit scope, an approval that has stalled.
          Thirty minutes with the person who would run the engagement — not an
          account manager.
        </p>

        <div
          id="book"
          className="mt-10 grid scroll-mt-24 gap-8 lg:mt-14 lg:grid-cols-[1fr_420px] lg:items-start lg:gap-18"
        >
          <LeadForm
            topics={leadTopics}
            initialTopic={initialTopic}
            eyebrow="Request a call"
          />

          <div className="flex flex-col gap-6">
            <section
              aria-labelledby="skip-the-form"
              className="rounded-lg bg-band px-7 pt-7 pb-8"
            >
              <h2 id="skip-the-form" className="eyebrow-accent">
                Skip the form
              </h2>
              <dl className="mt-5 flex flex-col gap-5">
                <div>
                  <dt className="text-xs text-navy-400">Direct line</dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${site.nap.phoneE164}`}
                      className="inline-flex min-h-11 items-center font-mono text-[1.1875rem] text-white hover:text-orange-500"
                    >
                      {site.nap.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-navy-400">Email</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${site.nap.email}`}
                      className="inline-flex min-h-11 items-center font-mono text-base text-white hover:text-orange-500"
                    >
                      {site.nap.email}
                    </a>
                  </dd>
                </div>
              </dl>
              <div className="mt-5 border-t border-band-line pt-5">
                <p className="font-mono text-eyebrow text-band-muted">
                  Pick a slot — calendar
                </p>
                <p className="mt-2.5">
                  <Placeholder>
                    {`[PLACEHOLDER: Cal.com embed — username ${site.calcom?.username ?? "TBC"}, event "${site.calcom?.event ?? "consultation"}"]`}
                  </Placeholder>
                </p>
              </div>
            </section>

            <section
              aria-labelledby="office"
              className="overflow-hidden rounded-lg border border-line bg-surface"
            >
              <Image
                src={photo.src}
                alt={OFFICE_PHOTO.alt}
                width={photo.width}
                height={photo.height}
                unoptimized={photo.unoptimized}
                loading="lazy"
                sizes="(min-width: 1024px) 420px, 100vw"
                className="h-[170px] w-full object-cover"
              />
              <div className="px-6 pt-6 pb-6.5">
                <h2 id="office" className="eyebrow">
                  Office
                </h2>
                <address className="mt-3 text-base leading-[1.55] text-ink not-italic">
                  {site.nap.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span className="block">{site.nap.locality}</span>
                  <span className="block">
                    {site.nap.postalCode}, {site.nap.country}
                  </span>
                </address>
                <p className="mt-3.5 flex items-center gap-2 border-t border-line pt-3.5 text-[0.8125rem]">
                  <PlaneTakeoff
                    size={19}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="shrink-0 text-orange-500"
                  />
                  Eight minutes from Delhi IGI Terminal 3
                </p>
              </div>
            </section>

            <section
              aria-labelledby="aog"
              className="rounded-lg border border-line bg-surface-2 px-6 py-5.5"
            >
              <h2 id="aog" className="eyebrow">
                Aircraft on the ground?
              </h2>
              <p className="mt-2.5 text-sm leading-[1.6]">
                Recovery work runs on a different clock. Call the direct line
                rather than using this form — day or night.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
