import { SiteSchema, type Site } from "./schema";

const siteData: Site = {
  name: "Aerotech Support Services",
  legalName: "Aerotech Support Services",
  url: "https://aerotech.shubhammathur.in",
  description:
    "Aviation and airport consulting from Aerocity, New Delhi. Operational readiness and transfer, audits and compliance, sustainable aviation and India market entry, led by lead auditor Ashwani Khanna.",
  tagline: "From regulatory approval to day-one operations.",
  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  footerNav: [
    {
      title: "Services",
      items: [
        { label: "ORAT", href: "/services/orat" },
        { label: "Audits & compliance", href: "/services/audits-compliance" },
        { label: "Sustainable aviation", href: "/services/sustainable-aviation" },
        { label: "Aircraft recovery", href: "/services/aircraft-recovery" },
        { label: "India market entry", href: "/services/india-market-entry" },
        { label: "Aero Opt", href: "/tools/aero-opt" },
      ],
    },
    {
      title: "Work",
      items: [
        { label: "TaxiBot India", href: "/work/taxibot-india" },
        { label: "Delhi T3 ORAT", href: "/work/delhi-t3-orat" },
        { label: "Stelia Aerospace", href: "/work/stelia-aerospace" },
        { label: "Aerowash", href: "/work/aerowash" },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "About", href: "/about" },
        { label: "Ashwani Khanna", href: "/about/ashwani-khanna" },
        { label: "Insights", href: "/insights" },
        { label: "Compliance & downloads", href: "/compliance" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy", href: "/privacy" },
      ],
    },
  ],
  nap: {
    addressLines: ["Ground & First Floor, Coworks, WorldMark-I"],
    locality: "Aerocity, New Delhi",
    postalCode: "110037",
    country: "India",
    phoneDisplay: "+91 99102 94423",
    phoneE164: "+919910294423",
    email: "info@aerotechss.com",
    mapsUrl: "[PLACEHOLDER: confirm Google Maps link for WorldMark-I, Aerocity office]",
  },
  whatsapp: {
    e164: "+919910294423",
    prefill: "Hi Aerotech, I'd like to talk about",
  },
  social: {
    linkedin: "[PLACEHOLDER: Aerotech Support Services LinkedIn company page URL]",
  },
  legal: {
    cin: "[PLACEHOLDER: company CIN from incorporation certificate]",
    gstin: "[PLACEHOLDER: GSTIN]",
    grievanceContact: "[PLACEHOLDER: named grievance officer and contact details]",
  },
  credentials: [
    { value: "30 yrs", label: "Indian aviation operations" },
    { value: "World 1st", label: "TaxiBot ops — A321 family & B737-NG" },
    { value: "3 × ISO", label: "Lead auditor — 9001, 45001, 14064" },
    { value: "AS9100D", label: "Certified aerospace auditor" },
    { value: "CORSIA", label: "ICAO-certified verification" },
    {
      value: "T3 & 119→1",
      label: "Delhi Terminal 3 ORAT; Terminal 1D's ACI-ASQ ranking taken from 119th to No. 1, twice in a row",
      note: "Delivered for GMR Group / Delhi International Airport",
    },
  ],
  clients: [
    {
      name: "TaxiBot India, KSU Aviation",
      logo: { src: "/images/logo-taxibot.png", alt: "TaxiBot India, KSU Aviation", width: 200, height: 82 },
      alt: "TaxiBot India, KSU Aviation",
    },
    {
      name: "Stelia Aerospace",
      logo: { src: "/images/logo-stelia.png", alt: "Stelia Aerospace", width: 170, height: 52 },
      alt: "Stelia Aerospace",
    },
    {
      name: "SpiceJet",
      logo: { src: "/images/logo-spicejet.png", alt: "SpiceJet", width: 130, height: 65 },
      alt: "SpiceJet",
    },
    {
      name: "UPES",
      logo: { src: "/images/logo-upes.png", alt: "UPES", width: 130, height: 54 },
      alt: "UPES",
    },
    {
      name: "Aerowash",
      logo: { src: "/images/logo-aerowash.png", alt: "Aerowash", width: 170, height: 28 },
      alt: "Aerowash",
    },
    {
      name: "Global Vectra Helicorp",
      logo: { src: "/images/logo-global.png", alt: "Global Vectra Helicorp", width: 170, height: 52 },
      alt: "Global Vectra Helicorp",
    },
  ],
  responsePromise: "Goes straight to Ashwani. Typical reply within one working day.",
  calcom: {
    username: "[PLACEHOLDER: Cal.com username]",
    event: "consultation",
  },
};

export const site: Site = SiteSchema.parse(siteData);
