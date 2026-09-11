import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { CaseStudy, ImageRef } from "@/content";

import { resolveImage } from "./image-size";
import { PhotoCaption } from "./PhotoCaption";
import { renderText } from "./Placeholder";
import { linkArrowBand } from "./styles";

function BandPhoto({
  image,
  sizes,
  className,
}: {
  image: ImageRef;
  sizes: string;
  className?: string;
}) {
  const img = resolveImage(image.src, image);
  return (
    <figure>
      <Image
        src={img.src}
        alt={image.alt}
        width={img.width}
        height={img.height}
        unoptimized={img.unoptimized}
        loading="lazy"
        sizes={sizes}
        className={className ?? "h-auto w-full rounded-lg object-cover"}
      />
      {image.caption && <PhotoCaption onBand>{image.caption}</PhotoCaption>}
    </figure>
  );
}

/**
 * Full-bleed navy band: copy, pull quote and a 3-up fact grid on the left,
 * a captioned image stack on the right.
 */
export function CaseFeature({ study }: { study: CaseStudy }) {
  const headingId = `case-feature-${study.slug}`;
  const stats = study.outcome.stats.slice(0, 3);

  return (
    <section aria-labelledby={headingId} className="bg-band py-12 lg:py-22">
      <div className="container-site grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="eyebrow-accent">Case study &middot; {renderText(study.eyebrow)}</p>
          <h2
            id={headingId}
            className="mt-4 max-w-[20ch] font-display text-[1.75rem] leading-[1.13] font-semibold text-white lg:text-[2.5rem]"
          >
            {renderText(study.title)}
          </h2>
          <p className="mt-5 text-[0.9375rem] leading-[1.6] text-band-muted lg:text-[1.0625rem]">
            {renderText(study.summary)}
          </p>

          <blockquote className="mt-6 border-l-[3px] border-orange-500 pl-4 lg:mt-7.5 lg:pl-5">
            <p className="font-display text-lg leading-[1.42] font-medium text-white lg:text-xl">
              {renderText(study.outcome.quote)}
            </p>
          </blockquote>

          {stats.length > 0 && (
            <dl className="mt-6 grid grid-cols-3 gap-px border border-band-line bg-band-line lg:mt-8.5">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-band px-3 py-4 lg:px-4 lg:py-4.5">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-mono text-[1.0625rem] text-white lg:text-xl">
                      {renderText(stat.value)}
                    </span>
                    <span className="mt-1.5 block text-[0.6875rem] leading-[1.35] text-band-muted lg:text-xs">
                      {renderText(stat.label)}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-6 lg:mt-7.5">
            <Link href={`/work/${study.slug}`} className={linkArrowBand}>
              Read the full case
              <ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <BandPhoto
            image={study.heroImage}
            sizes="(min-width: 1024px) 568px, 100vw"
          />
          {study.gallery.length > 0 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {study.gallery.slice(0, 2).map((image) => (
                <BandPhoto
                  key={image.src + image.alt}
                  image={image}
                  sizes="(min-width: 1024px) 278px, (min-width: 640px) 50vw, 100vw"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
