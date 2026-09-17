import { ArrowRight, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Breadcrumb,
  CaseFeature,
  CTABand,
  DeliverablesGrid,
  FAQ,
  isPlaceholder,
  linkArrow,
  PersonCard,
  PhaseTimeline,
  PhotoCaption,
  Placeholder,
  Prose,
  renderText,
  resolveImage,
  SectionHeading,
  StatBand,
  type Crumb,
} from "@/components/site";
import { getCaseStudy, getPerson, site, type Block } from "@/content";
import { cn } from "@/lib/utils";

function slugify(value: string, fallback: string): string {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || fallback;
}

function Band({
  children,
  title,
  eyebrow,
  index,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  eyebrow?: string;
  index: number;
  className?: string;
}) {
  const id = title ? slugify(title, `block-${index}`) : undefined;

  return (
    <section
      aria-labelledby={id}
      aria-label={title ? undefined : `Section ${index + 1}`}
      className={cn("py-12 lg:py-18", className)}
    >
      <div className="container-site">
        {title && (
          <SectionHeading eyebrow={eyebrow ?? "Detail"} title={title} id={id} />
        )}
        {children}
      </div>
    </section>
  );
}

/** Renders one `Page.blocks` entry. Every Block variant is handled. */
function BlockView({
  block,
  index,
  crumbs,
}: {
  block: Block;
  index: number;
  crumbs?: Crumb[];
}) {
  switch (block.type) {
    case "hero": {
      const image = block.image ? resolveImage(block.image.src, block.image) : null;
      return (
        <section aria-labelledby="page-title" className="relative bg-band">
          <div className="container-site py-12 lg:py-20">
            {crumbs && (
              <Breadcrumb items={crumbs} onBand className="mb-5" />
            )}
            {block.eyebrow && <p className="eyebrow-accent mb-5">{block.eyebrow}</p>}
            <h1
              id="page-title"
              className="max-w-[22ch] font-display text-[2.125rem] leading-[1.07] font-bold text-band-ink lg:text-[3.125rem]"
            >
              {renderText(block.title)}
            </h1>
            {block.body && (
              <p className="mt-5 max-w-[58ch] text-[1.0625rem] leading-[1.56] text-band-muted lg:text-xl">
                {renderText(block.body)}
              </p>
            )}
            {block.cta && (
              <Link
                href={block.cta.href}
                className="mt-8 inline-flex h-13 items-center gap-2.5 rounded-lg bg-aqua-600 px-6 text-base font-semibold text-white transition-colors duration-150 hover:bg-aqua-700"
              >
                {block.cta.label}
                <ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" />
              </Link>
            )}
            {image && block.image && (
              <figure className="mt-9">
                <Image
                  src={image.src}
                  alt={block.image.alt}
                  width={image.width}
                  height={image.height}
                  unoptimized={image.unoptimized}
                  priority
                  sizes="(min-width: 1024px) 1152px, 100vw"
                  className="h-auto w-full rounded-lg object-cover"
                />
                {block.image.caption && (
                  <PhotoCaption onBand>{block.image.caption}</PhotoCaption>
                )}
              </figure>
            )}
          </div>
          <div className="runway absolute bottom-0 left-0 right-0" aria-hidden="true" />
        </section>
      );
    }

    case "richText":
      return (
        <Band index={index} title={block.title} eyebrow="Detail">
          <Prose>
            {block.paragraphs.map((paragraph, i) => (
              <p key={i}>{renderText(paragraph)}</p>
            ))}
          </Prose>
        </Band>
      );

    case "statBand":
      return (
        <StatBand
          stats={block.stats}
          eyebrow={block.title}
          label={block.title ?? "Key figures"}
        />
      );

    case "cardGrid":
      return (
        <Band index={index} title={block.title} eyebrow="What we do">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {block.cards.map((card) => (
              <li
                key={card.title}
                className="flex flex-col gap-3.5 rounded-lg border border-line bg-surface p-5 lg:px-7 lg:py-7"
              >
                <h3 className="font-display text-lg leading-[1.3] font-semibold">
                  {renderText(card.title)}
                </h3>
                <p className="text-sm leading-[1.58]">{renderText(card.body)}</p>
                {card.href && (
                  <div className="mt-1">
                    <Link href={card.href} className={linkArrow}>
                      Read more
                      <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Band>
      );

    case "caseFeature": {
      const study = getCaseStudy(block.case);
      if (!study) return null;
      return <CaseFeature study={study} />;
    }

    case "personCard": {
      const person = getPerson(block.person);
      if (!person) return null;
      return <PersonCard person={person} />;
    }

    case "phaseTimeline":
      return (
        <Band
          index={index}
          title={block.title ?? "How it runs"}
          eyebrow="How it runs"
        >
          <PhaseTimeline phases={block.phases} />
        </Band>
      );

    case "deliverablesGrid":
      return (
        <Band
          index={index}
          title={block.title ?? "What you get"}
          eyebrow="What you get"
          className="bg-surface"
        >
          <DeliverablesGrid deliverables={block.deliverables} />
        </Band>
      );

    case "faq":
      return (
        <Band
          index={index}
          title={block.title ?? "Questions we get asked"}
          eyebrow="Questions"
        >
          <FAQ faqs={block.faqs} idPrefix={`faq-${index}`} />
        </Band>
      );

    case "cta":
      return (
        <CTABand
          title={block.title}
          body={block.body}
          topic={block.topic}
          id={`cta-${index}`}
        />
      );

    case "imageGallery":
      return (
        <Band
          index={index}
          title={block.title}
          eyebrow="On the ground"
          className="bg-surface"
        >
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {block.images.map((image) => {
              const img = resolveImage(image.src, image);
              return (
                <li key={image.src + image.alt}>
                  <figure>
                    <Image
                      src={img.src}
                      alt={image.alt}
                      width={img.width}
                      height={img.height}
                      unoptimized={img.unoptimized}
                      loading="lazy"
                      sizes="(min-width: 1024px) 384px, 100vw"
                      className="h-auto w-full rounded-lg object-cover"
                    />
                    {image.caption && <PhotoCaption>{image.caption}</PhotoCaption>}
                  </figure>
                </li>
              );
            })}
          </ul>
        </Band>
      );

    case "logoRow":
      return (
        <section
          aria-label={block.title ?? "Selected clients"}
          className="border-y border-line bg-surface py-7 lg:py-11"
        >
          <div className="container-site lg:flex lg:items-center lg:gap-14">
            <p className="eyebrow whitespace-nowrap">
              {block.title ?? "Selected clients"}
            </p>
            <ul className="mt-4.5 grid grid-cols-3 items-center gap-x-3 gap-y-5 opacity-[0.62] grayscale lg:mt-0 lg:flex lg:flex-1 lg:justify-between">
              {block.logos.map((logo) => {
                const img = resolveImage(logo.src, logo);
                return (
                  <li key={logo.src + logo.alt} className="flex justify-center">
                    <Image
                      src={img.src}
                      alt={logo.alt}
                      width={img.width}
                      height={img.height}
                      unoptimized={img.unoptimized}
                      loading="lazy"
                      sizes="(min-width: 1024px) 170px, 33vw"
                      className="h-auto w-full max-w-[96px] lg:max-w-[130px]"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      );

    case "downloads":
      return (
        <Band
          index={index}
          title={block.title ?? "Downloads"}
          eyebrow="Downloads"
          className="bg-surface"
        >
          <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {block.items.map((item) => {
              const pending = item.placeholder || isPlaceholder(item.size);
              return (
                <li
                  key={item.title}
                  className="flex items-start gap-3.5 bg-surface px-6 py-5"
                >
                  <FileText
                    size={24}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-aqua-500"
                  />
                  <div>
                    <p className="text-[0.9375rem] font-medium text-ink">
                      {renderText(item.title)}
                    </p>
                    <p className="eyebrow mt-1.5 font-normal">
                      {pending ? (
                        <Placeholder>[PLACEHOLDER: file not yet supplied]</Placeholder>
                      ) : (
                        <a
                          href={item.file}
                          className="text-aqua-700 hover:text-aqua-600"
                        >
                          PDF · {item.size}
                        </a>
                      )}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="eyebrow mt-6 font-normal">
            Registered office: {site.nap.addressLines.join(", ")},{" "}
            {site.nap.locality} {site.nap.postalCode}.
          </p>
        </Band>
      );

    default:
      return null;
  }
}

/** Renders a whole `Page.blocks` array. `crumbs`, if given, renders a visible
 * `Breadcrumb` inside the page's `hero` block, above the h1. */
export function BlockRenderer({
  blocks,
  crumbs,
}: {
  blocks: Block[];
  crumbs?: Crumb[];
}) {
  return (
    <>
      {blocks.map((block, index) => (
        <BlockView
          key={`${block.type}-${index}`}
          block={block}
          index={index}
          crumbs={block.type === "hero" ? crumbs : undefined}
        />
      ))}
    </>
  );
}
