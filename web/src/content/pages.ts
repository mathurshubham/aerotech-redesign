import { PageSchema, type Page } from "./schema";
import { site } from "./site";

const pagesData: Page[] = [
  {
    slug: "compliance",
    title: "Compliance & downloads",
    blocks: [
      {
        type: "hero",
        eyebrow: "Compliance",
        title: "Compliance & downloads",
        body: "Certification scans, a capability statement and the statutory disclosures a tender or a prequalification review will ask for.",
      },
      {
        type: "downloads",
        title: "Downloads",
        items: [
          {
            title: "Capability statement",
            file: "/downloads/capability-statement.pdf",
            size: "1.2 MB",
            placeholder: false,
          },
          {
            title: "ISO 9001 certificate",
            file: "/downloads/iso-9001-certificate.pdf",
            size: "0.8 MB",
            placeholder: false,
          },
          {
            title: "ISO 45001 certificate",
            file: "/downloads/iso-45001-certificate.pdf",
            size: "0.8 MB",
            placeholder: false,
          },
          {
            title: "ISO 14064 certificate",
            file: "/downloads/iso-14064-certificate.pdf",
            size: "0.7 MB",
            placeholder: false,
          },
          {
            title: "AS9100D certificate",
            file: "/downloads/as9100d-certificate.pdf",
            size: "0.9 MB",
            placeholder: false,
          },
          {
            title: "Certificate of incorporation",
            file: "/downloads/certificate-of-incorporation.pdf",
            size: "0.4 MB",
            placeholder: false,
          },
          {
            title: "GST registration certificate",
            file: "/downloads/gst-certificate.pdf",
            size: "0.3 MB",
            placeholder: false,
          },
        ],
      },
      {
        type: "richText",
        title: "Statutory disclosures",
        paragraphs: [
          `Under section 12 of the Companies Act, 2013, every company must disclose its name, registered office address, Corporate Identity Number (CIN), telephone number, email address and, where applicable, a named grievance contact, on its website.`,
          `${site.legalName}. Registered office: ${site.nap.addressLines.join(", ")}, ${site.nap.locality} ${site.nap.postalCode}, ${site.nap.country}. CIN: ${site.legal.cin}. GSTIN: ${site.legal.gstin}. Telephone: ${site.nap.phoneDisplay}. Email: ${site.nap.email}.`,
          `Grievance contact: ${site.legal.grievanceContact}.`,
        ],
      },
    ],
    seo: {
      title: "Compliance & downloads",
      description:
        "Certification scans, capability statement and statutory disclosures for Aerotech Support Services, for tender and prequalification review.",
    },
  },
  {
    slug: "privacy",
    title: "Privacy",
    blocks: [
      {
        type: "hero",
        eyebrow: "Privacy",
        title: "Privacy",
        body: "What this site collects, and what it does not.",
      },
      {
        type: "richText",
        paragraphs: [
          `This site uses Cloudflare Web Analytics to measure traffic and Core Web Vitals. It is cookieless and does not track individual visitors across sites, which is why there is no cookie consent banner.`,
          `If you submit the contact form, the details you provide (name, organisation, email, phone if given, and your message) are sent by email to ${site.nap.email} and stored in a database (Cloudflare D1) so we can respond to your enquiry and keep a record of it. That data is not sold, shared with third parties for marketing, or used to send you a newsletter.`,
          `If you use the WhatsApp or phone links on this site, that conversation happens directly between you and Aerotech, outside of this website.`,
          `To ask what data is held about you, or to have it deleted, email ${site.nap.email}.`,
        ],
      },
    ],
    seo: {
      title: "Privacy",
      description:
        "What Aerotech Support Services collects through this website — cookieless analytics and contact-form data only, never sold or used for marketing.",
    },
  },
];

export const pages: Page[] = pagesData.map((p) => PageSchema.parse(p));

export function getPage(slug: string): Page | undefined {
  return pages.find((p) => p.slug === slug);
}

export const pageSlugs: string[] = pages.map((p) => p.slug);
