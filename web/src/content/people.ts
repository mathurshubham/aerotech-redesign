import { PersonSchema, type Person } from "./schema";

const peopleData: Person[] = [
  {
    slug: "ashwani-khanna",
    name: "Ashwani Khanna",
    role: "Director",
    photo: {
      src: "/images/ashwani-khanna.jpg",
      alt: "Ashwani Khanna, Director",
      width: 440,
      height: 440,
    },
    shortBio:
      "A subject-matter expert with almost thirty years across aircraft manufacturing, maintenance and airport service delivery. Engagements are led personally, with no handover to a delivery team.",
    longBio: [
      "A subject-matter expert with almost thirty years of experience across aviation, from aircraft manufacturing and maintenance to passenger service delivery. Certified as a lead auditor for Quality Management Systems (ISO 9001), Safety Management Systems (ISO 45001) and Green House Gas Emissions (ISO 14064), and a certified aerospace auditor (AS9100D). Also certified by ICAO on CORSIA verification and validation.",
      "Holds a Ph.D. in Aviation Management and has published articles and case studies in national and international journals, including papers on sustainable energy and environment sensing presented at the University of Cambridge.",
      "Currently Managing Director at KSU Aviation Pvt. Ltd., where he introduced TaxiBot services as an alternate taxiing solution to Indian aviation — earning recognition for the world's first Boeing and Airbus passenger aircraft performing TaxiBot operations in India. In earlier roles with airlines and an airport operator, he introduced systems and procedures aimed at enhancing service delivery and reducing cost.",
      "A former steering committee member of IATA's Aircraft Recovery Task Force (ARTF), which oversees aircraft recoveries and the safe handling of accidents and incidents, and was awarded an IATA certificate for Promoting Aircraft Recovery in India. Has completed Aerodrome Operations training from the Civil Aviation Authority of the United Kingdom.",
    ],
    credentials: [
      {
        group: "Lead auditor",
        items: ["ISO 9001 — quality management", "ISO 45001 — safety management", "ISO 14064 — greenhouse gas"],
      },
      { group: "Aerospace", items: ["AS9100D certified auditor"] },
      { group: "ICAO", items: ["CORSIA verification & validation"] },
    ],
    career: [
      { role: "Vice President", org: "Delhi Airport" },
      { role: "Head, Airports", org: "Kingfisher Airlines" },
      { role: "Station Head", org: "Jet Airways" },
      { role: "Regional Head", org: "Skyline NEPC" },
      { role: "Station Head", org: "Damania Airways" },
      { role: "Ground Technical Instructor, CPL", org: "UDAN Flying Club" },
      { role: "Management Trainee", org: "HAL Bangalore" },
      { role: "Trainee Engineer", org: "Air Works India" },
    ],
    honours: [
      "ACI award, Most Improved Airport",
      "Excellence in Performance — Jet Airways Chairman",
      "IATA certificate, Promoting Aircraft Recovery in India",
    ],
    affiliations: [
      "Member, Aeronautical Society of India",
      "Chairman, Expert Group on Sustainable Aviation — Aeronautical Society of India",
      "Core member, ATFI India",
      "Ex-steering committee, IATA Aircraft Recovery Task Force, Montreal",
      "Research partner, UPES School of Business",
    ],
    keyProjects: [
      {
        client: "GMR Group · Delhi International Airport",
        body: "ORAT and commissioning of Terminal 3. Then Terminal 1D, from 119th in the ACI-ASQ survey to No. 1 — twice consecutively. Procedure development for bridge-mounted equipment and fuel-hydrant services.",
      },
      {
        client: "KSU Aviation Pvt. Ltd.",
        body: "Implementation of TaxiBot operations — the world's first alternate taxiing solution in service.",
      },
      {
        client: "Kingfisher Airlines",
        body: "Planning, development and set-up of passenger services and ground handling across every Indian airport served.",
      },
      {
        client: "SpiceJet · Air Charter Services",
        body: "Operations, quality assurance and compliance services, pan-India.",
      },
      {
        client: "Jet Airways",
        body: "Automation programmes — baggage reconciliation, load control and check-in systems. Led the Business Class to Jet Club Premier transformation.",
      },
      {
        client: "UPES Dehradun · HAL Bangalore",
        body: "Design and implementation of Aero Opt, the resource-optimisation tool. Earlier, air-intake design on PTAE engines at HAL.",
      },
    ],
    linkedin: "https://www.linkedin.com/in/ashwani-khanna",
    seo: {
      title: "Ashwani Khanna — Director, Aerotech Support Services",
      description:
        "Ashwani Khanna: thirty years in Indian aviation operations, lead auditor for ISO 9001, 45001 and 14064, AS9100D aerospace auditor, and ICAO-certified on CORSIA — the person who delivered the world's first TaxiBot operations.",
    },
  },
];

export const people: Person[] = peopleData.map((p) => PersonSchema.parse(p));

export function getPerson(slug: string): Person | undefined {
  return people.find((p) => p.slug === slug);
}

export const peopleSlugs: string[] = people.map((p) => p.slug);
