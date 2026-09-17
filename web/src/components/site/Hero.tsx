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
 * Home hero: 620px pastel band at `lg`. At `lg`, the photo runs at 0.8 opacity
 * under a left-weighted horizontal scrim — opaque behind the text column
 * (~50% of a 1440px viewport, matching `container-site`'s 1200px cap + the
 * lede's 54ch measure), fading to near-transparent on the right so the photo
 * reads clearly there. Below `lg` the photo is dimmer under a
 * top-to-bottom scrim; runway dash pinned to the bottom edge.
 *
 * The scrim is a wash of `--band`, not a dark one: the headline is ink on
 * pastel, so the photo has to be lifted toward the ground colour rather than
 * pushed away from it. Keep the first 50% fully opaque — that is the only
 * thing guaranteeing contrast for the h1 and lede.
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
        className="absolute inset-0 size-full object-cover opacity-35 lg:opacity-80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(221,231,246,0.76)_0%,var(--band)_82%)] lg:bg-[linear-gradient(90deg,var(--band)_0%,var(--band)_50%,rgba(221,231,246,0.6)_66%,rgba(221,231,246,0.24)_82%,rgba(221,231,246,0.12)_100%)]"
      />
      <div className="container-site relative py-12 lg:flex lg:min-h-[620px] lg:flex-col lg:justify-center lg:py-0">
        <p className="eyebrow-accent">{eyebrow}</p>
        <h1
          id="hero-title"
          className="h1-hero mt-4 max-w-[17ch] font-display font-bold text-band-ink lg:mt-5.5"
        >
          {renderText(title)}
        </h1>
        {body && (
          <p className="mt-4.5 max-w-[54ch] text-base leading-[1.56] text-band-muted lg:mt-6.5 lg:text-[1.1875rem]">
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
 * Page head: pastel band with breadcrumb, h1, lede and an optional aside panel.
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
              className="h1-hero max-w-[22ch] font-display font-bold text-band-ink"
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
