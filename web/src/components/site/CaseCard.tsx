import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { CaseStudy } from "@/content";

import { resolveImage } from "./image-size";
import { renderText } from "./Placeholder";
import { linkArrow } from "./styles";

/** White card: 232px cover image, mono client · location, h3, body, link. */
export function CaseCard({ study }: { study: CaseStudy }) {
  const img = resolveImage(study.heroImage.src, study.heroImage);

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface">
      <Image
        src={img.src}
        alt={study.heroImage.alt}
        width={img.width}
        height={img.height}
        unoptimized={img.unoptimized}
        loading="lazy"
        sizes="(min-width: 1024px) 588px, 100vw"
        className="h-[190px] w-full object-cover lg:h-[232px]"
      />
      <div className="flex flex-1 flex-col p-5 lg:px-7 lg:pt-6.5 lg:pb-7">
        <p className="eyebrow">
          {renderText(study.eyebrow)}
        </p>
        <h3 className="mt-3 font-display text-h3 font-semibold">
          {renderText(study.title)}
        </h3>
        <p className="mt-3 text-sm leading-[1.58] lg:text-[0.9375rem]">
          {renderText(study.summary)}
        </p>
        <div className="mt-4.5 self-start">
          <Link href={`/work/${study.slug}`} className={linkArrow}>
            Read the case
            <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
