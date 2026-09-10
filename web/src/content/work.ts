import { CaseStudySchema, type CaseStudy } from "./schema";

const workData: CaseStudy[] = [
  {
    slug: "taxibot-india",
    client: "KSU Aviation Pvt. Ltd.",
    title: "Bringing the world's first TaxiBot operation into service",
    eyebrow: "KSU Aviation Pvt. Ltd. · 2019–2024 · DEL, BLR, HYD",
    summary:
      "Semi-robotic aircraft dispatch towing, certified with two airframers and cleared by the regulator — in a market where neither had happened before.",
    sector: "Ground operations / alternate taxiing",
    airports: ["Delhi", "Bangalore", "Hyderabad"],
    years: "2019–2024",
    role: "Market entry, approvals, evaluation",
    heroImage: {
      src: "/images/taxibot-indigo.jpg",
      alt: "TaxiBot coupled to an IndiGo A320 at Delhi",
      caption: "IndiGo A320 · Indira Gandhi International, Delhi · 2023",
      width: 877,
      height: 480,
    },
    gallery: [
      {
        src: "/images/taxibot-airindia.jpg",
        alt: "TaxiBot with an Air India A321 at Delhi",
        caption: "Air India A321 · Indira Gandhi International, Delhi · 2022",
        width: 620,
        height: 348,
      },
      {
        src: "/images/taxibot-goair.jpg",
        alt: "Night TaxiBot operation with a GoAir A320",
        caption: "GoAir A320 · night dispatch trial · 2021",
        width: 620,
        height: 280,
      },
    ],
    challenge: [
      "TaxiBot moves an aircraft from stand to runway on the nose gear, under the pilot's control, with the main engines off. The fuel and emissions case is obvious. The approval case was not: dispatch towing at taxi speed puts loads through a nose landing gear that no airframer had cleared for it, and no civil aviation authority had a rule to apply.",
      "So the work was never really about selling equipment. It was about getting two airframers and one regulator to agree on something none of them had a precedent for — and then proving it on a live apron without disrupting a single departure.",
    ],
    approach: [
      {
        title: "Build the market case first",
        body: "Fuel burn, emissions and stand-occupancy modelling per carrier and per airport, so the commercial argument existed before the certification argument was asked for.",
      },
      {
        title: "Take the regulator through it, not around it",
        body: "Documented the operation as a procedure rather than a product: crew responsibilities, speed and turn limits, coupling and decoupling, abnormal handling. Compliance evidence assembled to the standard an auditor would ask for, because that is the discipline the practice is built on.",
      },
      {
        title: "Two airframers, in parallel",
        body: "Ran the Airbus and Boeing approval tracks at the same time rather than sequentially, on the argument that a single-type clearance would not change any airline's ground fleet decision.",
      },
      {
        title: "Prove it in revenue service",
        body: "Operational evaluation on live departures across three airports, including night operations, with fallback to conventional pushback available at every stage.",
      },
    ],
    outcome: {
      quote: "World's first TaxiBot operations with Airbus (A321 family) and Boeing (B737-NG).",
      body: "Both airframer clearances obtained, regulatory compliance established, and the system delivered into scheduled service at three Indian airports. India became the reference market other operators cite when they ask their own regulator the same question.",
      stats: [
        { value: "2", label: "OEM approvals — Airbus and Boeing" },
        { value: "3", label: "Airports in scheduled operation" },
        { value: "4", label: "Carriers in revenue service" },
        { value: "1st", label: "Operation of its kind, worldwide" },
      ],
    },
    placeholders: [
      "[PLACEHOLDER: fuel-burn and emissions savings per turn]",
      "[PLACEHOLDER: client quote from KSU Aviation]",
    ],
    relatedService: "india-market-entry",
    seo: {
      title: "TaxiBot India — the world's first TaxiBot operation",
      description:
        "How Aerotech took TaxiBot from no regulatory precedent to the world's first TaxiBot operations with Airbus and Boeing aircraft, across three Indian airports.",
    },
  },
  {
    slug: "delhi-t3-orat",
    client: "GMR Group, Delhi International Airport Ltd (DIAL)",
    title: "Terminal 3 ORAT, and Terminal 1D's climb from 119th to No. 1",
    eyebrow: "GMR Group · Delhi International Airport",
    summary:
      "ORAT and commissioning of Terminal 3, and separately, procedure development that took Terminal 1D's ACI-ASQ ranking from 119th to No. 1 — twice in a row.",
    sector: "Airport operations / ORAT",
    airports: ["Delhi"],
    years: "[PLACEHOLDER: engagement years for the Terminal 3 ORAT and Terminal 1D ASQ work]",
    role: "ORAT delivery; ASQ procedure development",
    heroImage: {
      src: "/images/delhi-apron.jpg",
      alt: "Apron at Indira Gandhi International, Delhi",
      width: 900,
      height: 600,
    },
    gallery: [],
    challenge: [
      "Delhi International Airport's Terminal 3 needed to be operationally ready and commissioned ahead of opening, across systems, procedures and thousands of staff from the airport operator, airlines and ground handlers.",
      "Separately, Terminal 1D was ranked 119th in the ACI-ASQ passenger-experience survey, with bridge-mounted equipment (GPU, PCA) and fuel-hydrant (ITP) services identified as needing monitoring procedures against passenger service delivery.",
    ],
    approach: [
      {
        title: "Deliver ORAT for Terminal 3",
        body: "Operational readiness and transfer work ahead of commissioning, covering terminal, airline and ground-handling procedures.",
      },
      {
        title: "Build monitoring procedures for BME and ITP services",
        body: "Developed procedures for monitoring bridge-mounted equipment (GPU, PCA) and fuel-hydrant (ITP) services at Delhi Airport.",
      },
    ],
    outcome: {
      quote: "Terminal 1D's ACI-ASQ ranking went from 119th to No. 1 — twice in a row.",
      body: "Terminal 3 was commissioned and brought into service, and Terminal 1D moved from a bottom-tier ACI-ASQ score to No. 1 in the survey, holding that position for a second consecutive period.",
      stats: [
        { value: "T3", label: "ORAT & commissioning delivered" },
        { value: "119 → 1", label: "Terminal 1D ACI-ASQ ranking" },
        { value: "2×", label: "Consecutive No. 1 ACI-ASQ rankings" },
      ],
    },
    placeholders: [
      "[PLACEHOLDER: engagement start and end dates]",
      "[PLACEHOLDER: specific ACI-ASQ survey years for the 119th and No. 1 rankings]",
      "[PLACEHOLDER: client quote from GMR Group / DIAL]",
    ],
    relatedService: "orat",
    seo: {
      title: "Delhi Terminal 3 ORAT and Terminal 1D ASQ turnaround",
      description:
        "ORAT and commissioning of Delhi's Terminal 3, and the procedure work that took Terminal 1D's ACI-ASQ ranking from 119th to No. 1, twice in a row.",
    },
  },
  {
    slug: "stelia-aerospace",
    client: "Stelia Aerospace",
    title: "Field representation in India for a business-class seat manufacturer",
    eyebrow: "Stelia Aerospace · New Delhi",
    summary:
      "Selected to serve as field representative to Stelia Aerospace's Indian clientele, covering airline programmes across the region.",
    sector: "Aerospace manufacturing / field representation",
    airports: ["New Delhi"],
    years: "[PLACEHOLDER: engagement years for the Stelia Aerospace field representation]",
    role: "Field representative",
    heroImage: {
      src: "/images/delhi-apron.jpg",
      alt: "Apron at Indira Gandhi International, Delhi",
      width: 900,
      height: 600,
    },
    gallery: [],
    challenge: [
      "Stelia Aerospace, a manufacturer of business-class seats for major airlines worldwide, needed an on-the-ground presence to serve its Indian clientele without opening a local office.",
    ],
    approach: [
      {
        title: "Field representative in India",
        body: "Aerotech was selected to serve as Stelia Aerospace's field representative to its clientele in India, acting as the local point of contact for airline programmes.",
      },
    ],
    outcome: {
      quote: "[PLACEHOLDER: outcome quote or metric for the Stelia Aerospace engagement]",
      body: "Ongoing field representation to Stelia Aerospace's Indian airline clientele.",
      stats: [],
    },
    placeholders: [
      "[PLACEHOLDER: engagement years]",
      "[PLACEHOLDER: outcome quote or metric]",
      "[PLACEHOLDER: specific airline programmes covered]",
    ],
    relatedService: "india-market-entry",
    seo: {
      title: "Stelia Aerospace — field representation in India",
      description:
        "Aerotech's field representation for Stelia Aerospace, a manufacturer of business-class aircraft seats, serving its Indian airline clientele.",
    },
  },
  {
    slug: "aerowash",
    client: "AeroWash, Sweden",
    title: "Automated exterior aircraft wash, brought into Indian service",
    eyebrow: "Aerowash · Multi-airport",
    summary:
      "Market development and operational evaluation for robotic aircraft washing, including water-use and turnaround assessment.",
    sector: "Sustainable ground services",
    airports: ["New Delhi", "Dubai", "Kuala Lumpur"],
    years: "[PLACEHOLDER: engagement start year]",
    role: "Market development, operational evaluation, regional rights holder",
    heroImage: {
      src: "/images/taxibot-goair.jpg",
      alt: "[PLACEHOLDER: real Aerowash project photograph — placeholder image reused from the TaxiBot night-ops case]",
      width: 620,
      height: 280,
    },
    gallery: [],
    challenge: [
      "Aircraft exterior cleaning in India ran on a water-based, non-measurable practice, with no scientific way to track ATF consumption, emissions or water use.",
      "AeroWash, a Swedish manufacturer, needed a partner to bring its robotic dry-wash technology into Indian carriers' operations, and into the wider Middle East, South East Asia and SAARC region.",
    ],
    approach: [
      {
        title: "Partner with AeroWash",
        body: "Aerotech partnered with AeroWash, a Swedish manufacturer, to provide aircraft detailing services to Indian carriers using its robotic exterior dry-wash technology.",
      },
      {
        title: "Hold regional implementation rights",
        body: "Aerotech holds special rights for implementing the AeroWash solution across the Middle East, South East Asia, India and the SAARC region.",
      },
    ],
    outcome: {
      quote: "Measurable reduction in ATF consumption, reduced emissions and zero water wastage.",
      body: "The robotic dry-wash service moved airlines from a water-based, non-measurable cleaning practice to a scientific one, with the service made available for airlines at the parking stand, across operations in India, Malaysia and Dubai.",
      stats: [
        { value: "4+ yrs", label: "Team experience implementing Aerowash services" },
        { value: "3", label: "Countries in operation — India, Malaysia, Dubai" },
      ],
    },
    placeholders: [
      "[PLACEHOLDER: quantified fuel/ATF and water savings per wash]",
      "[PLACEHOLDER: real Aerowash project photography for the hero image]",
      "[PLACEHOLDER: client quote]",
    ],
    relatedService: "sustainable-aviation",
    seo: {
      title: "Aerowash — robotic aircraft wash in Indian service",
      description:
        "Market development and operational evaluation for AeroWash's robotic aircraft exterior dry-wash service, reducing fuel use, emissions and water waste.",
    },
  },
];

export const work: CaseStudy[] = workData.map((c) => CaseStudySchema.parse(c));

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return work.find((c) => c.slug === slug);
}

export const workSlugs: string[] = work.map((c) => c.slug);
