import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import type { ImageRef } from "@/content";
import { cn } from "@/lib/utils";

import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { imageSize } from "./image-size";
import { renderText } from "./Placeholder";
import { btnGhost, btnPrimary } from "./styles";

type Action = { label: string; href: string };

/**
 * Home hero: 620px navy, photo at 0.5 opacity under a 96° navy scrim,
 * runway dash pinned to the bottom edge.
 */
export function Hero({
  eyebrow,
  title,
  body,
  image,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  image: ImageRef;
  primary?: Action;
  secondary?: Action;
}) {
  const { width, height } = imageSize(image.src, image);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-band">
      <Image
        src={image.src}
        alt={image.alt}
        width={width}
        height={height}
        priority
        sizes="100vw"
        className="absolute inset-0 size-full object-cover opacity-40 lg:opacity-50"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,32,58,0.72)_0%,var(--navy-900)_82%)] lg:bg-[linear-gradient(96deg,var(--navy-900)_8%,rgba(22,32,58,0.86)_46%,rgba(22,32,58,0.34)_100%)]"
      />
      <div className="container-site relative py-12 lg:flex lg:min-h-[620px] lg:flex-col lg:justify-center lg:py-0">
        <p className="eyebrow-accent">{eyebrow}</p>
        <h1
          id="hero-title"
          className="mt-4 max-w-[17ch] font-display text-[2.125rem] leading-[1.06] font-bold text-white lg:mt-5.5 lg:text-[3.875rem] lg:leading-[1.04]"
        >
          {renderText(title)}
        </h1>
        {body && (
          <p className="mt-4.5 max-w-[54ch] text-base leading-[1.56] text-navy-300 lg:mt-6.5 lg:text-[1.1875rem]">
            {renderText(body)}
          </p>
        )}
        {(primary || secondary) && (
          <div className="mt-7 flex flex-col gap-2.5 lg:mt-10 lg:flex-row lg:gap-3.5">
            {primary && (
              <Link href={primary.href} className={btnPrimary}>
                {primary.label}
              </Link>
            )}
            {secondary && (
              <Link href={secondary.href} className={btnGhost}>
                {secondary.label}
              </Link>
            )}
          </div>
        )}
      </div>
      <div className="runway absolute bottom-0 left-0 right-0" aria-hidden="true" />
    </section>
  );
}

/**
 * Page head: dark band with breadcrumb, h1, lede and an optional aside panel.
 * Used at the top of every non-home page.
 */
export function PageHead({
  crumbs,
  eyebrow,
  title,
  lede,
  aside,
  runway = true,
  className,
}: {
  crumbs?: Crumb[];
  eyebrow?: string;
  title: string;
  lede?: string;
  aside?: ReactNode;
  runway?: boolean;
  className?: string;
}) {
  return (
    <section
      aria-labelledby="page-title"
      className={cn("relative bg-band", className)}
    >
      <div className="container-site py-12 lg:py-20">
        <div
          className={cn(
            "grid gap-10",
            aside && "lg:grid-cols-[1fr_400px] lg:gap-16",
          )}
        >
          <div>
            {crumbs && <Breadcrumb items={crumbs} onBand className="mb-5" />}
            {eyebrow && !crumbs && <p className="eyebrow-accent mb-5">{eyebrow}</p>}
            <h1
              id="page-title"
              className="max-w-[22ch] font-display text-[2.125rem] leading-[1.07] font-bold text-white lg:text-[3.125rem]"
            >
              {renderText(title)}
            </h1>
            {lede && (
              <p className="mt-5 max-w-[58ch] text-[1.0625rem] leading-[1.56] text-band-muted lg:text-xl">
                {renderText(lede)}
              </p>
            )}
          </div>
          {aside && <div>{aside}</div>}
        </div>
      </div>
      {runway && (
        <div className="runway absolute bottom-0 left-0 right-0" aria-hidden="true" />
      )}
    </section>
  );
}
