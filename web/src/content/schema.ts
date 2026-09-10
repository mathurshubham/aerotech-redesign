import { z } from "zod";

export const SeoSchema = z.object({
  title: z.string(),
  description: z.string(),
  ogImage: z.string().optional(),
});
export type Seo = z.infer<typeof SeoSchema>;

export const ImageRefSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
  width: z.number(),
  height: z.number(),
});
export type ImageRef = z.infer<typeof ImageRefSchema>;

export const CredentialSchema = z.object({
  value: z.string(),
  label: z.string(),
  note: z.string().optional(),
});
export type Credential = z.infer<typeof CredentialSchema>;

export const StatSchema = z.object({
  value: z.string(),
  label: z.string(),
});
export type Stat = z.infer<typeof StatSchema>;

export const FaqSchema = z.object({
  q: z.string(),
  a: z.string(),
});
export type Faq = z.infer<typeof FaqSchema>;

export const PhaseSchema = z.object({
  window: z.string(),
  title: z.string(),
  body: z.string(),
});
export type Phase = z.infer<typeof PhaseSchema>;

export const DeliverableSchema = z.object({
  n: z.string(),
  title: z.string(),
  body: z.string(),
});
export type Deliverable = z.infer<typeof DeliverableSchema>;

export const CtaSchema = z.object({
  title: z.string(),
  body: z.string(),
  topic: z.string(),
});
export type Cta = z.infer<typeof CtaSchema>;

export const ServiceSchema = z.object({
  slug: z.string(),
  title: z.string(),
  shortTitle: z.string(),
  eyebrow: z.string(),
  oneLiner: z.string(),
  summary: z.string(),
  heroImage: ImageRefSchema.optional(),
  isTool: z.boolean().optional(),
  forWhom: z.array(z.object({ title: z.string(), body: z.string() })),
  deliverables: z.array(DeliverableSchema),
  phases: z.array(PhaseSchema),
  whyUs: z.string(),
  credentialsForThis: z.array(z.string()),
  relatedWork: z.array(z.string()),
  relatedServices: z.array(z.string()),
  faqs: z.array(FaqSchema),
  cta: CtaSchema,
  seo: SeoSchema,
});
export type Service = z.infer<typeof ServiceSchema>;

export const CaseStudySchema = z.object({
  slug: z.string(),
  client: z.string(),
  title: z.string(),
  eyebrow: z.string(),
  summary: z.string(),
  sector: z.string(),
  airports: z.array(z.string()),
  years: z.string(),
  role: z.string(),
  heroImage: ImageRefSchema,
  gallery: z.array(ImageRefSchema),
  challenge: z.array(z.string()),
  approach: z.array(z.object({ title: z.string(), body: z.string() })),
  outcome: z.object({
    quote: z.string(),
    body: z.string(),
    stats: z.array(StatSchema),
  }),
  placeholders: z.array(z.string()),
  relatedService: z.string(),
  seo: SeoSchema,
});
export type CaseStudy = z.infer<typeof CaseStudySchema>;

export const PersonSchema = z.object({
  slug: z.string(),
  name: z.string(),
  role: z.string(),
  photo: ImageRefSchema,
  shortBio: z.string(),
  longBio: z.array(z.string()),
  credentials: z.array(z.object({ group: z.string(), items: z.array(z.string()) })),
  career: z.array(z.object({ role: z.string(), org: z.string() })),
  honours: z.array(z.string()),
  affiliations: z.array(z.string()),
  keyProjects: z.array(z.object({ client: z.string(), body: z.string() })),
  linkedin: z.string().optional(),
  seo: SeoSchema,
});
export type Person = z.infer<typeof PersonSchema>;

export const InsightMetaSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  author: z.string(),
  tags: z.array(z.string()),
  readingMinutes: z.number(),
  draft: z.boolean().optional(),
  seo: SeoSchema,
});
export type InsightMeta = z.infer<typeof InsightMetaSchema>;

const BlockBase = z.object({});

export const HeroBlockSchema = z.object({
  type: z.literal("hero"),
  eyebrow: z.string().optional(),
  title: z.string(),
  body: z.string().optional(),
  image: ImageRefSchema.optional(),
  cta: z.object({ label: z.string(), href: z.string() }).optional(),
});

export const RichTextBlockSchema = z.object({
  type: z.literal("richText"),
  title: z.string().optional(),
  paragraphs: z.array(z.string()),
});

export const StatBandBlockSchema = z.object({
  type: z.literal("statBand"),
  title: z.string().optional(),
  stats: z.array(StatSchema),
});

export const CardGridBlockSchema = z.object({
  type: z.literal("cardGrid"),
  title: z.string().optional(),
  cards: z.array(z.object({ title: z.string(), body: z.string(), href: z.string().optional() })),
});

export const CaseFeatureBlockSchema = z.object({
  type: z.literal("caseFeature"),
  case: z.string(),
});

export const PersonCardBlockSchema = z.object({
  type: z.literal("personCard"),
  person: z.string(),
});

export const PhaseTimelineBlockSchema = z.object({
  type: z.literal("phaseTimeline"),
  title: z.string().optional(),
  phases: z.array(PhaseSchema),
});

export const DeliverablesGridBlockSchema = z.object({
  type: z.literal("deliverablesGrid"),
  title: z.string().optional(),
  deliverables: z.array(DeliverableSchema),
});

export const FaqBlockSchema = z.object({
  type: z.literal("faq"),
  title: z.string().optional(),
  faqs: z.array(FaqSchema),
});

export const CtaBlockSchema = z.object({
  type: z.literal("cta"),
  title: z.string(),
  body: z.string().optional(),
  topic: z.string().optional(),
});

export const ImageGalleryBlockSchema = z.object({
  type: z.literal("imageGallery"),
  title: z.string().optional(),
  images: z.array(ImageRefSchema),
});

export const LogoRowBlockSchema = z.object({
  type: z.literal("logoRow"),
  title: z.string().optional(),
  logos: z.array(ImageRefSchema),
});

export const DownloadsBlockSchema = z.object({
  type: z.literal("downloads"),
  title: z.string().optional(),
  items: z.array(
    z.object({
      title: z.string(),
      file: z.string(),
      size: z.string(),
      placeholder: z.boolean().optional(),
    }),
  ),
});

export const BlockSchema = z.discriminatedUnion("type", [
  HeroBlockSchema,
  RichTextBlockSchema,
  StatBandBlockSchema,
  CardGridBlockSchema,
  CaseFeatureBlockSchema,
  PersonCardBlockSchema,
  PhaseTimelineBlockSchema,
  DeliverablesGridBlockSchema,
  FaqBlockSchema,
  CtaBlockSchema,
  ImageGalleryBlockSchema,
  LogoRowBlockSchema,
  DownloadsBlockSchema,
]);
export type Block = z.infer<typeof BlockSchema>;
void BlockBase;

export const PageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  blocks: z.array(BlockSchema),
  seo: SeoSchema,
});
export type Page = z.infer<typeof PageSchema>;

export const NavItemSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const SiteSchema = z.object({
  name: z.string(),
  legalName: z.string(),
  url: z.string(),
  description: z.string(),
  tagline: z.string(),
  nav: z.array(NavItemSchema),
  footerNav: z.array(
    z.object({
      title: z.string(),
      items: z.array(NavItemSchema),
    }),
  ),
  nap: z.object({
    addressLines: z.array(z.string()),
    locality: z.string(),
    postalCode: z.string(),
    country: z.string(),
    phoneDisplay: z.string(),
    phoneE164: z.string(),
    email: z.string(),
    mapsUrl: z.string().optional(),
  }),
  whatsapp: z.object({
    e164: z.string(),
    prefill: z.string(),
  }),
  social: z.object({
    linkedin: z.string().optional(),
  }),
  legal: z.object({
    cin: z.string(),
    gstin: z.string(),
    grievanceContact: z.string(),
  }),
  credentials: z.array(CredentialSchema),
  clients: z.array(
    z.object({
      name: z.string(),
      logo: ImageRefSchema,
      alt: z.string(),
    }),
  ),
  responsePromise: z.string(),
  calcom: z
    .object({
      username: z.string(),
      event: z.string(),
    })
    .optional(),
});
export type Site = z.infer<typeof SiteSchema>;
