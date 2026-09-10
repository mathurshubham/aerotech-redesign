import type { Metadata } from "next";

import { site } from "@/content/site";
import { getService } from "@/content/services";
import { getCaseStudy } from "@/content/work";
import { getPerson } from "@/content/people";
import { getInsight } from "@/content/insights";
import { getPage } from "@/content/pages";
import { absoluteUrl } from "@/lib/utils";

const DEFAULT_OG_IMAGE = { url: absoluteUrl("/opengraph-image"), width: 1200, height: 630 };

/** `<page title> | <site name>` — matches the root layout's title template, for use outside `<title>` (RSS, JSON-LD, previews). */
export function siteTitle(pageTitle: string): string {
  return `${pageTitle} | ${site.name}`;
}

export interface BuildMetadataInput {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/services/orat". */
  path: string;
  /** Site-relative or absolute image path/URL. Defaults to the shared opengraph-image route. */
  ogImage?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
}

/** Build a page's `Metadata`: canonical, Open Graph and Twitter card, from one shared shape. */
export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  type = "website",
  publishedTime,
  noIndex,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const images = ogImage ? [{ url: absoluteUrl(ogImage), width: 1200, height: 630 }] : [DEFAULT_OG_IMAGE];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      images,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((i) => i.url),
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

function notFoundMetadata(path: string): Metadata {
  return buildMetadata({
    title: "Not found",
    description: "This page could not be found.",
    path,
    noIndex: true,
  });
}

/** Pre-built `Metadata` for every static route, for use in each route's `generateMetadata`/`metadata` export. */
export const metaFor = {
  home(): Metadata {
    return buildMetadata({
      title: `${site.name} — Aviation & airport consulting, New Delhi`,
      description: site.description,
      path: "/",
    });
  },

  services(): Metadata {
    return buildMetadata({
      title: "Services",
      description: `Airport lifecycle consulting from ${site.name}: ORAT, audits and compliance, sustainable aviation, aircraft recovery and India market entry.`,
      path: "/services",
    });
  },

  service(slug: string): Metadata {
    const service = getService(slug);
    if (!service) return notFoundMetadata(`/services/${slug}`);
    const path = service.isTool ? "/tools/aero-opt" : `/services/${service.slug}`;
    return buildMetadata({
      title: service.seo.title,
      description: service.seo.description,
      path,
      ogImage: service.seo.ogImage,
    });
  },

  work(): Metadata {
    return buildMetadata({
      title: "Work",
      description: `Aviation and airport engagements delivered by ${site.name}, from TaxiBot's world-first regulatory approval to Delhi's Terminal 3 ORAT.`,
      path: "/work",
    });
  },

  case(slug: string): Metadata {
    const caseStudy = getCaseStudy(slug);
    if (!caseStudy) return notFoundMetadata(`/work/${slug}`);
    return buildMetadata({
      title: caseStudy.seo.title,
      description: caseStudy.seo.description,
      path: `/work/${caseStudy.slug}`,
      ogImage: caseStudy.seo.ogImage ?? caseStudy.heroImage.src,
      type: "article",
    });
  },

  about(): Metadata {
    return buildMetadata({
      title: "About",
      description: site.description,
      path: "/about",
    });
  },

  person(slug: string): Metadata {
    const person = getPerson(slug);
    if (!person) return notFoundMetadata(`/about/${slug}`);
    return buildMetadata({
      title: person.seo.title,
      description: person.seo.description,
      path: `/about/${person.slug}`,
      ogImage: person.seo.ogImage ?? person.photo.src,
    });
  },

  insights(): Metadata {
    return buildMetadata({
      title: "Insights",
      description: `Answer-first briefings on ORAT, DGCA and CORSIA from ${site.name}.`,
      path: "/insights",
    });
  },

  insight(slug: string): Metadata {
    const insight = getInsight(slug);
    if (!insight) return notFoundMetadata(`/insights/${slug}`);
    return buildMetadata({
      title: insight.seo.title,
      description: insight.seo.description,
      path: `/insights/${insight.slug}`,
      ogImage: insight.seo.ogImage,
      type: "article",
      publishedTime: insight.date,
    });
  },

  page(slug: string): Metadata {
    const page = getPage(slug);
    if (!page) return notFoundMetadata(`/${slug}`);
    return buildMetadata({
      title: page.seo.title,
      description: page.seo.description,
      path: `/${page.slug}`,
      ogImage: page.seo.ogImage,
    });
  },

  contact(): Metadata {
    return buildMetadata({
      title: "Contact",
      description: `Talk to ${site.name} about your programme. ${site.responsePromise}`,
      path: "/contact",
    });
  },
};
