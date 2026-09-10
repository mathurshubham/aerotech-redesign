# Sample content swap-out checklist

Every `[PLACEHOLDER…]` string in `web/src/content/**` has been replaced with plausible, rounded, non-attributed sample content so the MVP shows no placeholder chips and no "Draft" badges. **None of this is real.** Before real launch, every row below must be verified or replaced with the actual fact, and the three insight citation URLs must be checked.

Legend for "Who can supply":
- **Ashwani** — director, has the underlying facts/certificates/history
- **KSU** — KSU Aviation Pvt. Ltd. (TaxiBot programme)
- **Accountant** — company secretary / CA who holds CIN, GSTIN, incorporation docs
- **Designer** — whoever shoots/sources real project photography
- **Ashwani/GMR** — needs confirmation from GMR Group / DIAL as the client

## Company legal identifiers (`web/src/content/site.ts`)

| File | Field | Sample value | Must be replaced with | Who supplies |
|---|---|---|---|---|
| site.ts | `nap.mapsUrl` | `https://www.google.com/maps/search/?api=1&query=WorldMark+1%2C+Aerocity%2C+New+Delhi` | Confirmed pinned Google Maps link for the actual Coworks/WorldMark-I suite | Ashwani |
| site.ts | `social.linkedin` | `https://www.linkedin.com/company/aerotech-support-services` | Real Aerotech Support Services LinkedIn company page URL | Ashwani |
| site.ts | `legal.cin` | `U62099DL2018PTC000000` (sample-formatted, not a real CIN) | Actual CIN from the certificate of incorporation | Accountant |
| site.ts | `legal.gstin` | `07AAAAA0000A1Z5` (sample-formatted, not a real GSTIN) | Actual GSTIN from the GST registration certificate | Accountant |
| site.ts | `legal.grievanceContact` | `Grievance officer: Ashwani Khanna, grievance@aerotechss.com` | Confirm this is the officer/mailbox to publish under Companies Act s.12, and that `grievance@aerotechss.com` is a live, monitored inbox | Ashwani |
| site.ts | `calcom.username` / `calcom.event` | `aerotech` / `30min` | Confirm this Cal.com username and event slug actually exist and are the ones meant to be public | Ashwani |
| people.ts | `linkedin` (Ashwani Khanna) | `https://www.linkedin.com/in/ashwani-khanna` | Confirm this is Ashwani's real, current LinkedIn profile URL | Ashwani |

## Compliance downloads (`web/src/content/pages.ts`)

All seven items were switched from `placeholder: true` / `size: "[PLACEHOLDER: file size]"` to `placeholder: false` with sample sizes. **The PDFs themselves do not exist yet** — this only makes the data layer look real; another step must generate/upload the actual files to `web/public/downloads/`.

| Title | File path | Sample size | Must be replaced with | Who supplies |
|---|---|---|---|---|
| Capability statement | `/downloads/capability-statement.pdf` | 1.2 MB | Real PDF + its actual file size | Ashwani |
| ISO 9001 certificate | `/downloads/iso-9001-certificate.pdf` | 0.8 MB | Scanned certificate + real size | Ashwani |
| ISO 45001 certificate | `/downloads/iso-45001-certificate.pdf` | 0.8 MB | Scanned certificate + real size | Ashwani |
| ISO 14064 certificate | `/downloads/iso-14064-certificate.pdf` | 0.7 MB | Scanned certificate + real size | Ashwani |
| AS9100D certificate | `/downloads/as9100d-certificate.pdf` | 0.9 MB | Scanned certificate + real size | Ashwani |
| Certificate of incorporation | `/downloads/certificate-of-incorporation.pdf` | 0.4 MB | Scanned certificate + real size | Accountant |
| GST registration certificate | `/downloads/gst-certificate.pdf` | 0.3 MB | Scanned certificate + real size | Accountant |

## Work / case studies (`web/src/content/work.ts`)

| Case | Field | Sample value | Must be replaced with | Who supplies |
|---|---|---|---|---|
| taxibot-india | `outcome.stats` (new stat) | `≈ 150–200 kg` fuel saved per dispatch tow | Actual measured/estimated fuel-burn saving per tow, from KSU's own data | KSU |
| delhi-t3-orat | `years` | `2017–2023` | Actual engagement start/end dates for T3 ORAT and the T1D ASQ work | Ashwani/GMR |
| delhi-t3-orat | ACI-ASQ survey years (119th → No. 1, twice) | Not dated in copy | Specific survey years for the 119th ranking and each No. 1 ranking | Ashwani/GMR |
| stelia-aerospace | `years` | `2020–present` | Actual field-representation start date | Ashwani |
| stelia-aerospace | `outcome.quote` | "A single, on-the-ground point of contact for Stelia Aerospace's Indian airline clientele, in place continuously since 2020." | Confirm wording and dates with Stelia, or replace with a real attributable outcome statement | Ashwani |
| stelia-aerospace | `outcome.stats` | `2` airline seat programmes; `5 yrs+` | Actual number and names of airline programmes covered (not published, to protect client confidentiality unless cleared) | Ashwani |
| stelia-aerospace | `heroImage` / `gallery` | `/images/stelia-seat-1.jpg`, `stelia-seat-2.jpg`, `stelia-seat-3.jpg` (stock/manifest images, not real project photos) | Real Stelia Aerospace seat installation photography, with clearance from Stelia | Designer |
| aerowash | `years` | `2021–present` | Actual engagement start year | Ashwani |
| aerowash | `heroImage` | `/images/aerowash-1.jpg` | Real Aerowash project photograph (site had reused an unrelated TaxiBot photo before this pass) | Designer |
| aerowash | `gallery` | `/images/aerowash-2.jpg`, `aerowash-3.jpg` | Real Aerowash project photography | Designer |
| aerowash | `outcome.body` / `outcome.stats` | "under 5 litres... roughly 1,000–1,500 litres... ≈ 2 hours less"; stat `≈ 1,000+ L` water saved | Actual measured fuel/ATF and water savings per wash, from AeroWash/Aerotech's own trial data | Ashwani |
| delhi-t3-orat | `gallery` (new) | `/images/apron-indigo-spicejet.jpg`, `/images/aircraft-approach.jpg` | Confirm these stock images are appropriate to publish for this case, or swap for real T3/GMR project photography | Designer |

## Services FAQs (`web/src/content/services.ts`)

| Service | Question | Sample answer content | Must be replaced with | Who supplies |
|---|---|---|---|---|
| audits-compliance | "How long does a typical audit engagement take?" | 4–6 weeks (9001/45001), 6–8 weeks (14064), 8–10 weeks (AS9100D), +2 weeks for pre-assessment | Actual typical durations from Aerotech's own engagement history | Ashwani |
| sustainable-aviation | "What is CORSIA and does my airline need to report under it?" | Generic threshold/EMP description, no specific numeric thresholds or years | Current CORSIA applicability thresholds and reporting years for Indian operators, sourced from ICAO's current implementation documents | Ashwani (verify against ICAO/DGCA) |
| india-market-entry | "Which DGCA Civil Aviation Requirements (CARs) usually apply?" | Removed the fabricated "100+ CARs revised in six months" claim; now says DGCA revises CARs "on a rolling basis" | If a specific, current revision count/date is wanted, confirm it against DGCA's current CAR register before publishing | Ashwani |
| india-market-entry | "Is there an FAA-DGCA bilateral route we should know about?" | Generic description of the FAA-DGCA IPA arrangement, no specific product-scope claim | Current scope and product coverage of the FAA-DGCA Implementation Procedures for Airworthiness | Ashwani (verify against DGCA/FAA) |

## Insights (`web/src/content/insights/*.mdx`)

All three insights had `draft: true` set to `draft: false` so the Draft badge no longer shows. Their unverified factual claims were softened to non-specific, defensible statements rather than fabricated numbers/dates — but they still need a source check before being treated as authoritative:

| Insight | Claim softened | What still needs verification |
|---|---|---|
| corsia-2027-india-operators.mdx | CORSIA 2027 phase widening participation; DGCA domestic reporting | Confirm exact 2027 phase scope/threshold changes against ICAO's current CORSIA documents; confirm whether/which DGCA circular governs domestic CORSIA reporting |
| what-is-orat.mdx | References to ICAO Doc 9184, IATA ADRM, ACI readiness guidance | Confirm these are still the current document names/editions at time of publishing |
| dgca-car-map-foreign-oems.mdx | "DGCA revises CARs on a rolling basis" (previously a fabricated "100+ CARs in six months" claim); indicative approval timelines (4–6 weeks eGCA + mapping, 3–6 months CAR-145/M, 6–12 months CAR-21) | Confirm current CAR revision cadence and realistic DGCA processing times against Aerotech's actual engagement experience before publishing as guidance |

### Insight citation URLs to verify (real canonical pages, used per the brief's approved list — confirm they still resolve and are still the right anchor before launch)
- https://www.icao.int/environmental-protection/CORSIA
- https://www.iata.org/en/programs/sustainability/corsia/
- https://www.dgca.gov.in
- https://www.faa.gov

## Things deliberately NOT fabricated

- **No quote was ever attributed to a named real person.** Where a quote reads like a testimonial (e.g. Stelia Aerospace outcome quote), it was written as a factual outcome statement rather than "he/she said," per the no-fabricated-attribution rule. If a real testimonial is later obtained, it should replace this text and can then be attributed by name with the speaker's consent.
- **Stelia Aerospace's specific airline programmes** were not named — only a count ("2 airline seat programmes") was given, since naming specific airlines without Stelia's clearance risked disclosing confidential client relationships.
- **CIN and GSTIN are visibly sample-formatted** (`U62099DL2018PTC000000`, `07AAAAA0000A1Z5`) rather than resembling a plausible-but-wrong real identifier, so they cannot be mistaken for genuine registration numbers if this ships unreviewed.
- **The compliance PDFs themselves were not created** — only the data entries (`placeholder: false`, file path, size) were made to look real, per the brief's instruction that PDF generation is a separate step.
- **No specific ACI-ASQ survey years** were invented for the Terminal 1D 119th → No. 1 ranking claim, since a wrong year here is a checkable, falsifiable claim about a real, named third party (GMR/DIAL) and an external survey (ACI-ASQ) — this is flagged in the table above for GMR/Ashwani to confirm rather than guessed.
