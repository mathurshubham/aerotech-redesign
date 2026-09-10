import { site } from "@/content/site";
import { services } from "@/content/services";
import { people } from "@/content/people";
import type { Person, Service } from "@/content/schema";
import { absoluteUrl } from "@/lib/utils";

/** Stable `@id`s other builders reference so the graph resolves without repeating full nodes. */
export const ids = {
  organization: `${absoluteUrl("/")}#organization`,
  website: `${absoluteUrl("/")}#website`,
  person: (slug: string) => `${absoluteUrl(`/about/${slug}`)}#person`,
  service: (slug: string) => `${absoluteUrl(servicePath(slug))}#service`,
};

function servicePath(slug: string): string {
  const service = services.find((s) => s.slug === slug);
  return service?.isTool ? "/tools/aero-opt" : `/services/${slug}`;
}

function isPlaceholder(value: unknown): boolean {
  return typeof value === "string" && /^\[PLACEHOLDER/i.test(value.trim());
}

/**
 * Deep-clean a plain object/array for JSON-LD output: drops `null`/`undefined`,
 * drops `"[PLACEHOLDER...]"` strings (and array entries holding one), and
 * drops keys whose cleaned value is an empty object or empty array.
 */
function clean<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.filter((v) => v != null && !isPlaceholder(v)).map((v) => clean(v)) as unknown as T;
  }
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
      if (raw == null || isPlaceholder(raw)) continue;
      const cleaned = clean(raw);
      if (Array.isArray(cleaned) && cleaned.length === 0) continue;
      if (typeof cleaned === "object" && cleaned !== null && !Array.isArray(cleaned) && Object.keys(cleaned).length === 0) {
        continue;
      }
      out[key] = cleaned;
    }
    return out as T;
  }
  return value;
}

/** Organization + WebSite in one `@graph`, anchored at the homepage. Used site-wide (root layout). */
export function organizationGraph(): object {
  const realServices = services.filter((s) => !s.isTool);

  const organization = {
    "@type": "Organization",
    "@id": ids.organization,
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl("/"),
    description: site.description,
    email: site.nap.email,
    telephone: site.nap.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.nap.addressLines.join(", "),
      addressLocality: site.nap.locality,
      postalCode: site.nap.postalCode,
      addressCountry: site.nap.country,
    },
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: [
      "Operational Readiness and Transfer (ORAT)",
      "ISO 9001, 45001 and 14064 lead audits",
      "AS9100D aerospace audits",
      "CORSIA verification and validation",
      "Aircraft recovery planning",
      "India market entry and DGCA regulatory approval",
    ],
    sameAs: [site.social.linkedin].filter((v): v is string => Boolean(v) && !isPlaceholder(v)),
    employee: people.map((p) => ({ "@id": ids.person(p.slug) })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: realServices.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@id": ids.service(s.slug) },
      })),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": ids.website,
    url: absoluteUrl("/"),
    name: site.name,
    description: site.description,
    publisher: { "@id": ids.organization },
    inLanguage: "en-IN",
  };

  return clean({ "@context": "https://schema.org", "@graph": [organization, website] });
}

/** Person node for an `/about/[slug]` page, with per-group EducationalOccupationalCredential entries. */
export function personGraph(person: Person): object {
  const hasCredential = person.credentials.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: group.group,
      name: item,
    })),
  );

  const knowsAbout = [...person.credentials.flatMap((g) => g.items), ...person.affiliations];

  const node = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": ids.person(person.slug),
    name: person.name,
    jobTitle: person.role,
    description: person.shortBio,
    image: absoluteUrl(person.photo.src),
    url: absoluteUrl(`/about/${person.slug}`),
    worksFor: { "@id": ids.organization },
    hasCredential,
    knowsAbout,
    sameAs: [person.linkedin].filter((v): v is string => Boolean(v) && !isPlaceholder(v)),
  };

  return clean(node);
}

/** Service node for a `/services/[slug]` (or `/tools/aero-opt`) page. */
export function serviceGraph(service: Service): object {
  const path = service.isTool ? "/tools/aero-opt" : `/services/${service.slug}`;

  const node = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": ids.service(service.slug),
    name: service.title,
    serviceType: service.shortTitle,
    description: service.summary,
    url: absoluteUrl(path),
    provider: { "@id": ids.organization },
    areaServed: { "@type": "Country", name: "India" },
    audience: service.forWhom.map((f) => ({
      "@type": "Audience",
      audienceType: f.title,
      description: f.body,
    })),
  };

  return clean(node);
}

export interface ArticleGraphInput {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/insights/what-is-orat" or "/work/taxibot-india". */
  path: string;
  datePublished: string;
  dateModified?: string;
  authorSlug: string;
  image?: string;
  about?: string[];
}

/** Article node — used for both `/insights/[slug]` and `/work/[slug]` (case studies), per BUILD-PLAN §3 (no `CaseStudy` type exists). */
export function articleGraph({
  title,
  description,
  path,
  datePublished,
  dateModified,
  authorSlug,
  image,
  about,
}: ArticleGraphInput): object {
  const node = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@id": ids.person(authorSlug) },
    publisher: { "@id": ids.organization },
    image: absoluteUrl(image ?? "/opengraph-image"),
    about: about?.map((name) => ({ "@type": "Thing", name })),
  };

  return clean(node);
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/** BreadcrumbList for a page's position in the site hierarchy. */
export function breadcrumbGraph(items: BreadcrumbItem[]): object {
  const node = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };

  return clean(node);
}

export interface WebPageGraphInput {
  title: string;
  description: string;
  path: string;
}

/** Generic WebPage node for routes without a more specific type (e.g. `/contact`, `/compliance`). */
export function webPageGraph({ title, description, path }: WebPageGraphInput): object {
  const node = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.organization },
  };

  return clean(node);
}
