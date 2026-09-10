import { ServiceSchema, type Service } from "./schema";

const servicesData: Service[] = [
  {
    slug: "orat",
    title: "Operational Readiness & Transfer",
    shortTitle: "ORAT",
    eyebrow: "Services / ORAT",
    oneLiner:
      "Trials, orientation and familiarisation that get a new terminal to day one without a first-week incident.",
    summary:
      "A new terminal has one opening day and no rehearsal. ORAT is how you make the first flight look like the thousandth: preparing staff, procedures and systems, and planning a smooth transfer from the old installation to the new one. The work starts with operational and technical management — writing new operational concepts and procedures, or updating existing ones, for ground handling, control-centre operation and every class of emergency response. Training and familiarisation follow, then scripted operational trials that verify system functionality and surface gaps before a paying passenger ever sees them.",
    forWhom: [
      {
        title: "Airport operators",
        body: "Opening a new terminal, a new runway, or a satellite concourse, with a fixed public opening date.",
      },
      {
        title: "Airlines relocating",
        body: "Moving a base or a hub operation between terminals without dropping an on-time performance target.",
      },
      {
        title: "Ground handlers & fuellers",
        body: "Standing up new equipment, new stands or new procedures alongside an operator's transfer programme.",
      },
    ],
    deliverables: [
      {
        n: "01",
        title: "ORAT master programme",
        body: "Milestone plan from T-18 to T+3, dependency-mapped against construction and systems handover.",
      },
      {
        n: "02",
        title: "Trials & familiarisation plan",
        body: "Scripted trials by system and by stakeholder, with volunteer numbers, scenarios and pass criteria.",
      },
      {
        n: "03",
        title: "Standard operating procedures",
        body: "Terminal, apron and landside procedures written for the new facility, not adapted from the old one.",
      },
      {
        n: "04",
        title: "Passenger flow & LOS model",
        body: "Demand forecast against IATA Level of Service targets, sized with Aero Opt. Drives staffing and counter allocation.",
      },
      {
        n: "05",
        title: "Transfer & cutover runbook",
        body: "Hour-by-hour move plan, including the fallback position at every point where you can still turn back.",
      },
      {
        n: "06",
        title: "Day-one command structure",
        body: "Who decides what during the stabilisation window, and the escalation path that keeps it off the CEO's desk.",
      },
    ],
    phases: [
      {
        window: "T-18 → T-12",
        title: "Readiness assessment",
        body: "Baseline the facility, the org and the systems. Name every gap that has a long lead time, while it is still cheap.",
      },
      {
        window: "T-12 → T-6",
        title: "Procedures & training",
        body: "Write the SOPs, build the training, model the flows. Staff learn the new building before they work in it.",
      },
      {
        window: "T-6 → T-1",
        title: "Trials",
        body: "Progressive trials from single-system to full-scale with volunteer passengers. Every failure here is a free one.",
      },
      {
        window: "T-1 → T+3",
        title: "Transfer & stabilise",
        body: "Run the cutover, hold the command structure through the stabilisation window, then hand it to your team.",
      },
    ],
    whyUs:
      "Thirty years across aircraft manufacturing, maintenance and airport service delivery. Lead auditor for ISO 9001, 45001 and 14064, AS9100D aerospace auditor, ICAO-certified on CORSIA. On a transfer programme that combination matters: the readiness gaps that hurt on day one are usually compliance gaps first.",
    credentialsForThis: ["30 yrs", "3 × ISO", "T3 & 119→1"],
    relatedWork: ["delhi-t3-orat", "taxibot-india"],
    relatedServices: ["aero-opt", "audits-compliance"],
    faqs: [
      {
        q: "How far ahead of opening should ORAT start?",
        a: "Around eighteen months (T-18) for a full programme. If your opening date is inside twelve months, the scope changes — there is no longer room for a full trials programme, and the work becomes risk triage. Say so on the call and it will be scoped that way.",
      },
      {
        q: "What does the ORAT team actually deliver?",
        a: "Six documents or exercises your team owns at handover: the master programme, the trials and familiarisation plan, new standard operating procedures, a passenger flow and Level of Service model, a transfer and cutover runbook, and the day-one command structure.",
      },
      {
        q: "Do you run the operational trials yourselves?",
        a: "The ORAT team plans the trials script down to the last detail — staff involved, flight schedule, dummy bags, test passengers, access control, fire and life-safety systems, temporary catering and fuelling — and runs them alongside your operational teams and stakeholders such as customs, immigration and security agencies.",
      },
      {
        q: "Does ORAT cover airlines and ground handlers, or only the airport operator?",
        a: "All three. A transfer touches the airport operator, the airlines relocating into the facility, and the ground handlers and fuellers standing up new equipment and procedures alongside them.",
      },
      {
        q: "What has this team delivered before?",
        a: "ORAT and commissioning of Terminal 3 for the GMR Group at Delhi International Airport, and separately, procedure development at Terminal 1D that took its ACI-ASQ ranking from 119th to No. 1, twice in a row.",
      },
    ],
    cta: {
      title: "Talk to us about your transfer programme",
      body: "Bring a terminal opening date, even a provisional one.",
      topic: "ORAT for a new terminal",
    },
    seo: {
      title: "ORAT consulting for airports and airlines",
      description:
        "Operational Readiness and Transfer methodology for new terminals and relocations: master programme, trials, SOPs and day-one command structure, led by the auditor who delivered Delhi's Terminal 3.",
    },
  },
  {
    slug: "audits-compliance",
    title: "Audits & compliance",
    shortTitle: "Audits & compliance",
    eyebrow: "Services / Audits & compliance",
    oneLiner:
      "ISO 9001, 45001 and 14064 lead-auditor work plus AS9100D aerospace audits, run by the auditor himself.",
    summary:
      "A broad range of specialised aerospace and aviation advisory services to continually improve process and practice and help clients run their business safely, on time and on budget. Work has included setting up operational procedures and an emission monitoring plan for India's largest air charter operator, developing operational procedures, technical guidance and quality and compliance assessment for India's largest private-sector helicopter operator, and process enhancement, internal assessment, on-site operational audits and service-quality checks for SpiceJet across its pan-India network.",
    forWhom: [
      {
        title: "Airlines & MROs",
        body: "Preparing for a certification body audit against ISO 9001, ISO 45001 or AS9100D, or closing findings from one already held.",
      },
      {
        title: "Charter & helicopter operators",
        body: "Building the operational procedures, technical guidance and compliance assessment a regulator or client audit expects.",
      },
      {
        title: "Airports & ground handlers",
        body: "Running internal quality and safety audits ahead of a scheduled service-quality check.",
      },
    ],
    deliverables: [
      {
        n: "01",
        title: "Gap analysis",
        body: "Current procedures assessed against the relevant ISO 9001, 45001, 14064 or AS9100D clauses, with findings ranked by lead time to close.",
      },
      {
        n: "02",
        title: "Internal audit programme",
        body: "A scheduled internal audit run against your own procedures, with a findings register your team can act on before the external one.",
      },
      {
        n: "03",
        title: "Pre-assessment audit",
        body: "A dry run of the certification body's audit, surfacing non-conformities while they are still yours to fix quietly.",
      },
      {
        n: "04",
        title: "Certification body support",
        body: "Support through the CB's stage 1 and stage 2 audit, including document review and on-site accompaniment.",
      },
      {
        n: "05",
        title: "CAPA tracking to closure",
        body: "Corrective and preventive actions tracked against a register until the certification body signs them off, not just until they are logged.",
      },
    ],
    phases: [
      {
        window: "Stage 1",
        title: "Gap analysis",
        body: "Baseline current practice against the target standard and rank the gaps by risk and lead time.",
      },
      {
        window: "Stage 2",
        title: "Internal audit",
        body: "Run the internal audit, log findings and agree the remediation owners and dates.",
      },
      {
        window: "Stage 3",
        title: "Pre-assessment",
        body: "Rehearse the certification body's audit and close what it would have found.",
      },
      {
        window: "Stage 4",
        title: "CB support & CAPA closure",
        body: "Support the certification body's audit itself, then track every corrective and preventive action to sign-off.",
      },
    ],
    whyUs:
      "Ashwani Khanna is a certified lead auditor for ISO 9001, ISO 45001 and ISO 14064, a certified AS9100D aerospace auditor, and ICAO-certified on CORSIA verification and validation. The audits are run by the auditor, not handed to a junior on his certification.",
    credentialsForThis: ["3 × ISO", "AS9100D", "CORSIA"],
    relatedWork: ["delhi-t3-orat"],
    relatedServices: ["orat", "sustainable-aviation"],
    faqs: [
      {
        q: "Which standards do you audit against?",
        a: "ISO 9001 (quality), ISO 45001 (safety) and ISO 14064 (greenhouse gas), plus AS9100D for aerospace, all as a certified lead auditor.",
      },
      {
        q: "Do you work with charter and helicopter operators, or only scheduled airlines?",
        a: "Both. Past work has included India's largest air charter operator and India's largest private-sector helicopter operator, alongside pan-India audit work for SpiceJet.",
      },
      {
        q: "What is a pre-assessment audit and do I need one?",
        a: "It is a rehearsal of the certification body's actual audit, run against the same clauses, so non-conformities surface while you still control the timeline to fix them. Worth doing before any first-time certification or a renewal you cannot afford to fail.",
      },
      {
        q: "What happens after the audit finds non-conformities?",
        a: "Every finding goes into a CAPA register with an owner and a date, and stays open on our side until the certification body accepts the closure evidence — not until it is merely logged.",
      },
      {
        q: "How long does a typical audit engagement take?",
        a: "[PLACEHOLDER: typical audit engagement duration by standard]",
      },
    ],
    cta: {
      title: "Scope an audit or a certification renewal",
      body: "Tell us the standard, the certification body, and the date you are working against.",
      topic: "Audit or compliance",
    },
    seo: {
      title: "ISO 9001, 45001, 14064 and AS9100D audits",
      description:
        "Lead-auditor audits and compliance work for airlines, charter operators and MROs across ISO 9001, ISO 45001, ISO 14064 and AS9100D — gap analysis through CAPA closure.",
    },
  },
  {
    slug: "sustainable-aviation",
    title: "Sustainable aviation",
    shortTitle: "Sustainable aviation",
    eyebrow: "Services / Sustainable aviation",
    oneLiner:
      "CORSIA verification, ISO 14064 greenhouse-gas accounting and emission monitoring plans for airlines and airports.",
    summary:
      "Helping organisations put efficient, manageable processes in place that meet stakeholder requirements for quality, health and safety, environmental management and other areas of sustainable development — and to show what changed, not just what was intended. Work has included partnering with AeroWash, a Swedish manufacturer, to bring robotic aircraft exterior dry-wash services to Indian carriers, replacing a water-based, non-measurable cleaning practice with a scientific one that measurably reduces ATF consumption, cuts emissions and eliminates water use at the parking stand. Separately, developing the Indian market for TaxiBot — an alternate taxiing solution that reduces fuel burn and emissions during aircraft dispatch — and introducing India's first robotic UV-C disinfectant device for aircraft sanitisation.",
    forWhom: [
      {
        title: "Airlines",
        body: "Building an emission monitoring plan (EMP) for CORSIA reporting, or an ISO 14064 greenhouse-gas inventory.",
      },
      {
        title: "Airports & ground handlers",
        body: "Evaluating sustainable ground-service technology — such as robotic aircraft washing or alternate taxiing — against a measurable reduction target.",
      },
      {
        title: "Aerospace suppliers",
        body: "Bringing a sustainability-focused product or service into the Indian market with the compliance case already built.",
      },
    ],
    deliverables: [
      {
        n: "01",
        title: "Emission monitoring plan",
        body: "An EMP drafted for CORSIA reporting, structured to the ICAO scheme rather than a generic template.",
      },
      {
        n: "02",
        title: "ISO 14064 GHG inventory",
        body: "A greenhouse-gas inventory built and verified against ISO 14064, by a certified lead auditor for the standard.",
      },
      {
        n: "03",
        title: "CORSIA verification & validation",
        body: "Verification and validation work carried out under ICAO's CORSIA certification.",
      },
      {
        n: "04",
        title: "Ground-technology evaluation",
        body: "Operational evaluation of a sustainable ground-service technology — modelled on the AeroWash and TaxiBot rollouts — with a measurable fuel, emissions or water outcome.",
      },
    ],
    phases: [
      {
        window: "Stage 1",
        title: "Baseline & data collection",
        body: "Establish the current fuel, emissions or water baseline the plan will be measured against.",
      },
      {
        window: "Stage 2",
        title: "Plan drafting",
        body: "Draft the emission monitoring plan or ISO 14064 inventory against the relevant scheme.",
      },
      {
        window: "Stage 3",
        title: "Verification",
        body: "Carry the plan through CORSIA or ISO 14064 verification with the certification body.",
      },
      {
        window: "Stage 4",
        title: "Monitoring & reporting",
        body: "Ongoing monitoring and the annual reporting cycle the scheme requires.",
      },
    ],
    whyUs:
      "Ashwani Khanna is ICAO-certified on CORSIA verification and validation and a certified lead auditor for ISO 14064, and chairs the Expert Group on Sustainable Aviation at the Aeronautical Society of India. The AeroWash and TaxiBot engagements are evidence of measurable outcomes, not intentions.",
    credentialsForThis: ["CORSIA", "3 × ISO"],
    relatedWork: ["aerowash", "taxibot-india"],
    relatedServices: ["audits-compliance"],
    faqs: [
      {
        q: "What is CORSIA and does my airline need to report under it?",
        a: "CORSIA is ICAO's Carbon Offsetting and Reduction Scheme for International Aviation. [PLACEHOLDER: confirm current CORSIA applicability thresholds and reporting years for Indian operators]",
      },
      {
        q: "Do you prepare the emission monitoring plan, or also carry out the verification?",
        a: "Both — the plan is drafted in-house, and verification and validation is carried out under ICAO's CORSIA certification.",
      },
      {
        q: "What measurable outcome has this delivered before?",
        a: "The AeroWash rollout replaced water-based aircraft cleaning with a robotic dry-wash process, producing a measurable reduction in ATF consumption, reduced emissions and zero water wastage at the stand.",
      },
      {
        q: "Can you evaluate a new ground-service sustainability technology before we commit to it?",
        a: "Yes — the same operational evaluation process used for AeroWash and TaxiBot in India (market fit, regulatory path, measurable outcome) applies to other sustainable ground-service products.",
      },
    ],
    cta: {
      title: "Talk to us about CORSIA or an emissions programme",
      body: "Tell us the scheme, the reporting year, and where your data currently lives.",
      topic: "CORSIA / emissions",
    },
    seo: {
      title: "CORSIA verification and sustainable aviation consulting",
      description:
        "CORSIA verification and validation, ISO 14064 greenhouse-gas accounting and emission monitoring plans for airlines and airports, backed by measurable ground-technology outcomes.",
    },
  },
  {
    slug: "aircraft-recovery",
    title: "Aircraft recovery",
    shortTitle: "Aircraft recovery",
    eyebrow: "Services / Aircraft recovery",
    oneLiner: "Recovery plans, internal team preparation and drills, so a disabled aircraft is off the runway on a clock you set.",
    summary:
      "Helping clients prepare internal teams to identify and respond to the removal of immobilised or disabled aircraft in a timely manner, meeting the requirements ICAO sets for disabled-aircraft operations. Emergency and disaster-management services for airline operators, airport operators, fuelling companies, maintenance hangars and other critical utility infrastructure.",
    forWhom: [
      {
        title: "Airport operators",
        body: "Needing an ICAO-aligned disabled-aircraft removal plan and an incident command structure to run it.",
      },
      {
        title: "Airlines",
        body: "Preparing internal recovery teams and drills ahead of an incident, not after one.",
      },
      {
        title: "Fuellers & maintenance hangars",
        body: "Building business-continuity and risk-liability plans for critical utility infrastructure.",
      },
    ],
    deliverables: [
      {
        n: "01",
        title: "Training & planning",
        body: "Delivering training and planning functions for aviation emergency or disaster events.",
      },
      {
        n: "02",
        title: "Safety & infrastructure inspection",
        body: "Safety inspections and critical-infrastructure failure analyses.",
      },
      {
        n: "03",
        title: "Impact monitoring",
        body: "Predictive and post-incident impact monitoring and data collection.",
      },
      {
        n: "04",
        title: "Stakeholder management",
        body: "Stakeholder engagement and management services following an event.",
      },
      {
        n: "05",
        title: "Business contingency & ICS",
        body: "Business contingency planning and incident command system (ICS) management.",
      },
      {
        n: "06",
        title: "Risk & action planning",
        body: "Risk assessment and risk-liability management, with short-term and long-term action-plan development for risk mitigation.",
      },
    ],
    phases: [
      {
        window: "Stage 1",
        title: "Prepare",
        body: "Build the recovery plan, the incident command structure and the training programme, before an incident.",
      },
      {
        window: "Stage 2",
        title: "Respond",
        body: "Execute the recovery under the plan, with predictive impact monitoring running throughout.",
      },
      {
        window: "Stage 3",
        title: "Stabilise",
        body: "Manage stakeholders and business continuity through the disruption.",
      },
      {
        window: "Stage 4",
        title: "Review",
        body: "Post-incident data collection and analysis feeds a short and long-term risk-mitigation action plan.",
      },
    ],
    whyUs:
      "Ashwani Khanna was a steering committee member of IATA's Aircraft Recovery Task Force (ARTF), the task force overseeing aircraft recoveries and the safe handling of accidents and incidents, and was awarded an IATA certificate for Promoting Aircraft Recovery in India. He has also completed Aerodrome Operations training from the Civil Aviation Authority of the United Kingdom.",
    credentialsForThis: ["30 yrs"],
    relatedWork: [],
    relatedServices: ["orat", "audits-compliance"],
    faqs: [
      {
        q: "What does an aircraft recovery engagement actually cover?",
        a: "Training and planning for emergency or disaster events, safety inspections and infrastructure failure analysis, impact monitoring and data collection, stakeholder management, business contingency planning, incident command system management, and risk assessment with a mitigation action plan.",
      },
      {
        q: "Is this only for airport operators?",
        a: "No — the same recovery and business-continuity planning applies to airline operators, fuelling companies, maintenance hangars and other critical aviation utility infrastructure.",
      },
      {
        q: "Who leads this work and what is their standing in the field?",
        a: "Ashwani Khanna, a former steering committee member of IATA's Aircraft Recovery Task Force and IATA-recognised for promoting aircraft recovery in India.",
      },
      {
        q: "If we already have an aircraft on the ground, is this the right page?",
        a: "No — call the direct line rather than using the contact form. Recovery work runs on a different clock, day or night.",
      },
    ],
    cta: {
      title: "Prepare your recovery plan before you need it",
      body: "Tell us your airport, aircraft types and current incident command arrangement.",
      topic: "Aircraft recovery",
    },
    seo: {
      title: "Aircraft recovery planning and ICAO-aligned drills",
      description:
        "Disabled-aircraft recovery planning, incident command system management and risk-liability mitigation for airports, airlines, fuellers and maintenance hangars.",
    },
  },
  {
    slug: "india-market-entry",
    title: "India market entry",
    shortTitle: "India market entry",
    eyebrow: "Services / India market entry",
    oneLiner:
      "DGCA approvals, OEM sign-off and field representation for foreign suppliers entering Indian aviation. We have done it for TaxiBot and Stelia.",
    summary:
      "The differentiated wedge: India market entry and regulatory approval for foreign aviation OEMs and suppliers, already delivered twice. TaxiBot required obtaining regulatory compliances, securing approvals from both Airbus and Boeing, and running the operational evaluation through to a delivered product — resulting in the world's first TaxiBot operations with Airbus (A321 family) and Boeing (B737-NG family) aircraft. Stelia Aerospace, a manufacturer of business-class seats for major airlines worldwide, was served through field representation to its Indian clientele. No other adviser in this market can point to that TaxiBot precedent.",
    forWhom: [
      {
        title: "Foreign OEMs",
        body: "Bringing an aircraft-related product or ground-service technology into Indian aviation for the first time.",
      },
      {
        title: "Aerospace suppliers",
        body: "Needing ongoing field representation to an Indian airline or MRO clientele, as delivered for Stelia Aerospace.",
      },
      {
        title: "Regulators & airlines",
        body: "Evaluating a new-to-market product or procedure and needing the DGCA compliance case built alongside it.",
      },
    ],
    deliverables: [
      {
        n: "01",
        title: "eGCA registration support",
        body: "Guidance through registration on DGCA's eGCA platform, the entry point for most regulatory interactions.",
      },
      {
        n: "02",
        title: "DGCA CAR mapping",
        body: "Your product or service mapped against the relevant Civil Aviation Requirements — CAR-145, CAR-M or CAR-21 as applicable.",
      },
      {
        n: "03",
        title: "OEM & regulator approval coordination",
        body: "Running parallel approval tracks with airframers and the regulator, as delivered for Airbus and Boeing on TaxiBot.",
      },
      {
        n: "04",
        title: "Field representation",
        body: "Ongoing representation to your Indian airline or MRO clientele, as delivered for Stelia Aerospace.",
      },
    ],
    phases: [
      {
        window: "Stage 1",
        title: "eGCA registration",
        body: "Register the entity and the product or service on DGCA's eGCA platform.",
      },
      {
        window: "Stage 2",
        title: "DGCA CAR mapping",
        body: "Map the product or procedure against the applicable Civil Aviation Requirements.",
      },
      {
        window: "Stage 3",
        title: "OEM & regulator approvals",
        body: "Coordinate the airframer and regulator approval tracks in parallel, not sequentially.",
      },
      {
        window: "Stage 4",
        title: "Field representation",
        body: "Represent the product to Indian airline, MRO or airport clientele on an ongoing basis.",
      },
    ],
    whyUs:
      "Aerotech has already taken a product from no regulatory precedent to scheduled service in India — twice. TaxiBot: market development, DGCA compliance, and approvals from both Airbus and Boeing. Stelia Aerospace: field representative to its Indian clientele. That path is now a service.",
    credentialsForThis: ["World 1st", "3 × ISO"],
    relatedWork: ["taxibot-india", "stelia-aerospace"],
    relatedServices: ["audits-compliance"],
    faqs: [
      {
        q: "What is eGCA and why does it matter first?",
        a: "eGCA is DGCA's online registration and case-management platform, and is the usual entry point for a foreign entity's regulatory interactions in India — registering on it correctly is the first practical step.",
      },
      {
        q: "Which DGCA Civil Aviation Requirements (CARs) usually apply?",
        a: "It depends on the product: CAR-145 for maintenance organisations, CAR-M for continuing airworthiness, and CAR-21 for design and production. Mapping happens per product, since DGCA has revised more than 100 CARs in the past six months. [PLACEHOLDER: confirm current CAR revision count and applicability at time of engagement]",
      },
      {
        q: "Do you handle OEM approvals as well as the regulator?",
        a: "Yes — TaxiBot required running the Airbus and Boeing approval tracks in parallel alongside the DGCA compliance case, on the basis that a single-type clearance would not change any airline's ground-fleet decision.",
      },
      {
        q: "What does field representation actually involve?",
        a: "Acting as the on-the-ground representative to your Indian airline or MRO clientele, as delivered for Stelia Aerospace, a manufacturer of business-class aircraft seats.",
      },
      {
        q: "Is there an FAA-DGCA bilateral route we should know about?",
        a: "[PLACEHOLDER: confirm current FAA-DGCA Implementation Procedures for Airworthiness (IPA) applicability for the specific product]",
      },
    ],
    cta: {
      title: "Bringing a product into Indian aviation?",
      body: "Tell us the product, the airframe or system it touches, and who you have already approached.",
      topic: "India market entry",
    },
    seo: {
      title: "India market entry for foreign aviation OEMs",
      description:
        "eGCA registration, DGCA CAR mapping, OEM approval coordination and field representation for foreign aviation OEMs and suppliers entering India — delivered for TaxiBot and Stelia Aerospace.",
    },
  },
  {
    slug: "aero-opt",
    title: "Aero Opt",
    shortTitle: "Aero Opt",
    eyebrow: "Tools / Aero Opt",
    oneLiner: "Our resource-optimisation tool. Forecasts passenger flow against a Level of Service target and sizes staffing to it.",
    isTool: true,
    summary:
      "Aero Opt predicts passenger flow demand for planning purposes — monthly, weekly, next day — as well as for real-time terminal operations, based on planned or actual flights, processes and rules. Specially trained algorithms determine the resource requirements needed to hit defined quality targets (Level of Service / Level of Health) for the passenger flow demand, and enable an appropriate deployment of human resources to minimise variable operational cost while still meeting those targets. The tool uses cast modelling to simulate passenger flows through the terminal and predict the impact of peak-hour flows on processing facilities, informing whether additional temporary processors are needed to hold the level of service during peak or extraordinary-peak periods. Being web-based, it can be accessed, edited and shared accurately in real time.",
    forWhom: [
      {
        title: "Airport operators",
        body: "Sizing check-in, security and immigration resourcing against a Level of Service target rather than a rule of thumb.",
      },
      {
        title: "Airlines",
        body: "Planning ground-service staffing for peak and extraordinary-peak periods without over-provisioning for the average day.",
      },
      {
        title: "ORAT programmes",
        body: "Using the flow model to size day-one staffing before a terminal opens, not after.",
      },
    ],
    deliverables: [
      {
        n: "01",
        title: "Passenger flow forecast",
        body: "Demand modelled monthly, weekly and next-day, and in real time against planned or actual flights.",
      },
      {
        n: "02",
        title: "LOS / LOH resource sizing",
        body: "Resource requirements calculated to hit a defined Level of Service or Level of Health target at minimum variable cost.",
      },
      {
        n: "03",
        title: "Scenario simulation",
        body: "Cast modelling of passenger flows through the terminal to test scenarios from top-down allocation down to detailed queuing layout.",
      },
      {
        n: "04",
        title: "Real-time dashboard",
        body: "A web-based tool accessed, edited and shared in real time, with notifications and alerts as conditions change.",
      },
    ],
    phases: [
      {
        window: "Stage 1",
        title: "Data & rules setup",
        body: "Load flight schedules, processes and rules (including social-distancing or other constraints) into the model.",
      },
      {
        window: "Stage 2",
        title: "Model calibration",
        body: "Calibrate the flow model and Level of Service targets against your terminal's actual layout and processes.",
      },
      {
        window: "Stage 3",
        title: "Scenario testing",
        body: "Test peak and extraordinary-peak scenarios and the temporary-resourcing measures each would require.",
      },
      {
        window: "Stage 4",
        title: "Live deployment",
        body: "Move to real-time resource allocation against planned and actual flights.",
      },
    ],
    whyUs:
      "Aero Opt was designed and implemented in partnership with UPES, Dehradun, a premier aviation research institute, and is used inside Aerotech's own ORAT engagements to size day-one staffing against Level of Service targets.",
    credentialsForThis: [],
    relatedWork: ["delhi-t3-orat"],
    relatedServices: ["orat"],
    faqs: [
      {
        q: "What does Aero Opt actually forecast?",
        a: "Passenger flow demand for planning purposes (monthly, weekly, next-day) and for real-time terminal operations, based on planned or actual flights, processes and rules.",
      },
      {
        q: "How does it decide how much staff or equipment I need?",
        a: "Specially trained algorithms determine the resource requirements needed to hit a defined quality target — Level of Service (LOS) or Level of Health (LOH) — for the forecast passenger flow, at minimum variable operational cost.",
      },
      {
        q: "Can it be used to plan for a one-off peak, not just steady-state operations?",
        a: "Yes — it simulates the potential impact of peak or extraordinary-peak hourly flows on processing facilities and flags whether temporary processors are needed to hold the level of service.",
      },
      {
        q: "Is it a hosted product or a bespoke model per airport?",
        a: "It is a web-based tool that can be accessed, edited and shared in real time; the underlying model and rules are calibrated to each terminal's layout and processes.",
      },
    ],
    cta: {
      title: "See Aero Opt against your own terminal data",
      body: "Bring a flight schedule and your current Level of Service target.",
      topic: "Aero Opt",
    },
    seo: {
      title: "Aero Opt — airport resource optimisation tool",
      description:
        "Aero Opt forecasts passenger flow and sizes airport and airline ground-service resourcing against Level of Service and Level of Health targets, developed with UPES, Dehradun.",
    },
  },
];

export const services: Service[] = servicesData.map((s) => ServiceSchema.parse(s));

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs: string[] = services.map((s) => s.slug);
