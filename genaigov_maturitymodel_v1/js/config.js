/* ============================================================================
   CONFIG: the single source of truth for the assessment.
   ---------------------------------------------------------------------------
   Edit ONLY this file to change the model:
     - Add / remove / reorder domains in CONFIG.domains
     - Add / remove / reword indicator questions in each domain's "qs" array
     - Set crossCutting: true on any domain that should be scored and charted
       but EXCLUDED from the overall maturity score (e.g. Coherence)
     - Adjust "recs" (three recommendation lines shown when the domain is weak)
     - Adjust the rating scale, tier names/descriptions, and tier thresholds
   Every calculation, chart, sidebar entry, progress total, export, and the
   AI Auditor adapt automatically to whatever is defined here.
   ========================================================================= */
const CONFIG = {
  "scale": [
    {
      "value": 0,
      "label": "Not in place",
      "desc": "No policy, guidance, or practice exists in this area",
      "color": "#9898c0",
      "auditNote": "(no evidence)"
    },
    {
      "value": 1,
      "label": "Partial",
      "desc": "Informal, draft, or limited coverage, not consistently applied",
      "color": "#5a88d0",
      "auditNote": "(mentioned, informal, or draft)"
    },
    {
      "value": 2,
      "label": "Substantially in place",
      "desc": "Documented policy exists and is broadly implemented, but not fully embedded",
      "color": "#3a9a68",
      "auditNote": "(documented and adopted)"
    },
    {
      "value": 3,
      "label": "Fully embedded",
      "desc": "Comprehensive, evidenced, actively monitored, and consistently applied institution-wide",
      "color": "#1e2d6b",
      "auditNote": "(documented, implemented, and monitored)"
    }
  ],
  "tiers": [
    {
      "level": 1,
      "name": "Reactive",
      "heading": "Tier 1: Reactive",
      "description": "The institution has no settled position on generative AI. Responses are improvised by individual academics, schools, or committees as problems surface, typically an integrity incident or a tool that suddenly appears in classrooms. Guidance, where it exists, is informal, contradictory, and invisible to most staff and students. There is no named owner and no shared language; coherence is effectively absent. The institution is being acted upon by GenAI rather than governing it.",
      "color": "#9898c0",
      "bg": "#e0e0f0"
    },
    {
      "level": 2,
      "name": "Emerging",
      "heading": "Tier 2: Emerging",
      "description": "The institution has begun to respond deliberately, but in a concentrated and uneven way. Almost always the first movement is in Assessment and Academic Integrity, such as a disclosure rule or an updated misconduct procedure, while teaching, research, equity, privacy, and public trust remain largely untouched. Policies that exist tend to be statements of intent rather than embedded practice, and uptake varies widely by faculty. Ownership is partial or contested.",
      "color": "#5a88d0",
      "bg": "#d0e0f8"
    },
    {
      "level": 3,
      "name": "Developing",
      "heading": "Tier 3: Developing",
      "description": "GenAI governance now reaches across multiple domains rather than sitting in one. Good work exists in several places but is not yet pulled together. Terminology drifts between documents, messaging to staff and students is not fully aligned, and a governance body may exist without clear authority. Coherence becomes the binding constraint on further progress, as the challenge shifts from writing policies to connecting them.",
      "color": "#3a9a68",
      "bg": "#d0ead8"
    },
    {
      "level": 4,
      "name": "Coherent",
      "heading": "Tier 4: Coherent",
      "description": "Coverage is comprehensive across all six domains, and the policies are integrated. There is a named senior accountable owner, an active governance committee with real remit, consistent terminology, aligned staff- and student-facing messaging, and a defined review cycle. GenAI governance is connected to broader institutional strategy. The institution is governing coherently, not merely complying.",
      "color": "#c09030",
      "bg": "#f0e4c0"
    },
    {
      "level": 5,
      "name": "Leading",
      "heading": "Tier 5: Leading",
      "description": "Governance is whole-of-institution and self-renewing. Practices are embedded, reviewed on a defined cadence, audited, evidenced, and refreshed as tools and risks evolve. The institution co-designs with students, conducts equity and accessibility audits, reports publicly, and contributes to the wider sector. GenAI governance is treated as a living institutional capability rather than a finished document set.",
      "color": "#b03050",
      "bg": "#f8d0d8"
    }
  ],
  "tierThresholds": [
    0,
    20,
    40,
    60,
    80
  ],
  "domains": [
    {
      "id": "tl",
      "name": "Teaching & Learning",
      "short": "T&L",
      "desc": "How GenAI is governed in curriculum design, classroom practice, and staff capability for teaching.",
      "crossCutting": false,
      "evidence": {
        "tip": "Consider your institution's published AI policies, staff professional development programmes, curriculum documents, and subject outline templates.",
        "note": "Teaching & Learning is often where GenAI governance begins, but AI literacy as a formal graduate attribute and risk classification in course outlines are markers of more advanced governance."
      },
      "recs": [
        "Publish an institutional position statement on GenAI use in teaching as a foundational governance document",
        "Mandate GenAI disclosure statements in all subject outlines across all faculties and modes of delivery",
        "Commission a professional development programme on GenAI pedagogy for academic staff, aligned to recognised frameworks"
      ],
      "qs": [
        {
          "t": "GenAI use in teaching is guided by published institutional principles"
        },
        {
          "t": "Institutional guidance encourages critical evaluation and verification of AI-generated outputs rather than passive acceptance"
        },
        {
          "t": "Students are explicitly trained to distinguish between AI fluency and evidence validity"
        },
        {
          "t": "Risk classification scales or levels are provided in course outlines to regulate the scope of permissible AI use"
        },
        {
          "t": "The extent to which instructors may automate class interactions or coaching using GenAI is defined in policy"
        },
        {
          "t": "Academic staff have access to professional development on GenAI in teaching; subject outlines include GenAI statements"
        },
        {
          "t": "Curriculum design considers GenAI impact on learning outcomes; AI literacy is an explicit graduate attribute"
        },
        {
          "t": "Institutional support exists for experimenting with GenAI pedagogies; the institution distinguishes appropriate from inappropriate use"
        }
      ]
    },
    {
      "id": "as",
      "name": "Assessment & Academic Integrity",
      "short": "Assessment",
      "desc": "How GenAI is governed in assessment design, academic integrity processes, and student declarations.",
      "crossCutting": false,
      "evidence": {
        "tip": "Look for published assessment policies, student declaration requirements, academic misconduct procedures, and any faculty-level assessment review documentation.",
        "note": "Most institutions have begun here. Consistency across faculties and an explicit detection/verification approach are the key differentiators between Tier 2 and Tier 3."
      },
      "recs": [
        "Establish clear, faculty-consistent published rules governing GenAI in all forms of assessed work",
        "Introduce mandatory student declaration requirements for all submissions, with a defined and standardised disclosure format",
        "Commission a systematic review of assessment design across all programmes to embed GenAI-resilient approaches"
      ],
      "qs": [
        {
          "t": "GenAI use in assessment is governed by clear, published rules"
        },
        {
          "t": "Students are required to disclose the use of generative AI in assignments, dissertations, or assessed work"
        },
        {
          "t": "Assessment design includes safeguards against inappropriate reliance on AI-generated outputs"
        },
        {
          "t": "Policies distinguish between acceptable AI-assisted learning and AI-generated replacement of student work"
        },
        {
          "t": "Students are informed of specific transparency requirements for disclosing AI use to satisfy institutional standards"
        },
        {
          "t": "Staff must undertake defined review actions before finalising test or assignment questions"
        },
        {
          "t": "Academic misconduct procedures address GenAI specifically; a detection or verification approach is defined"
        },
        {
          "t": "Rules are applied consistently across schools, faculties, and modes of delivery"
        }
      ]
    },
    {
      "id": "re",
      "name": "Research Ethics",
      "short": "Research",
      "desc": "How GenAI is governed in research design, data handling, authorship, and integrity training.",
      "crossCutting": false,
      "evidence": {
        "tip": "Review your institution's human ethics approval forms, researcher guidance documents, author contribution policies, and any discipline-specific AI guidance for research staff.",
        "note": "Research ethics governance for GenAI is frequently overlooked. Integration with external funder requirements is a clear Tier 4–5 indicator."
      },
      "recs": [
        "Integrate GenAI-specific provisions into all human research ethics review and approval processes",
        "Publish authoritative institutional guidance on AI disclosure, authorship, and attribution for all research outputs",
        "Embed GenAI governance modules into all research integrity training, induction, and continuing professional development programmes"
      ],
      "qs": [
        {
          "t": "Human research ethics processes address GenAI use in research design"
        },
        {
          "t": "Researchers are required to disclose AI-assisted drafting, literature review, data analysis, or content generation"
        },
        {
          "t": "Institutional guidance addresses accountability, bias, transparency and limitations when AI is used in research workflows"
        },
        {
          "t": "AI governance connects research integrity with broader responsible AI principles across teaching, assessment and institutional governance"
        },
        {
          "t": "Complete legal and ethical liability is allocated to human authors regarding verification of AI-generated research outputs"
        },
        {
          "t": "Compliance with varying AI policies of external research funding bodies is explicitly addressed in guidance"
        },
        {
          "t": "Authorship and attribution rules account for GenAI contributions; guidance addresses AI use in grant writing"
        },
        {
          "t": "Research integrity training includes GenAI considerations; discipline-specific guidance is available"
        }
      ]
    },
    {
      "id": "eq",
      "name": "Equity & Access",
      "short": "Equity",
      "desc": "How GenAI governance addresses fairness, access, accessibility, and the needs of diverse cohorts.",
      "crossCutting": false,
      "evidence": {
        "tip": "Examine your student equity and access policies, digital inclusion strategies, assessment accessibility frameworks, and any audit or review of AI tool access disparities.",
        "note": "Equity indicators often reveal hidden governance gaps. An institution may score well on Teaching & Learning while ignoring cost-access disparities or EAL student needs."
      },
      "recs": [
        "Commission a formal equity audit of all current and proposed GenAI policies across the institution",
        "Develop tailored guidance for EAL, international, and digitally disadvantaged student cohorts",
        "Publish a clear institutional position on cost barriers to commercial AI tools and the institutional response to the digital divide"
      ],
      "qs": [
        {
          "t": "Equitable access to GenAI tools is considered in institutional decision-making"
        },
        {
          "t": "AI literacy is recognised as part of student support and educational inclusion policy"
        },
        {
          "t": "Students are provided guidance to use AI tools responsibly regardless of prior digital competence"
        },
        {
          "t": "Institutional guidance addresses potential inequalities in access to AI tools and digital resources"
        },
        {
          "t": "Teachers are instructed on ensuring fairness in grading where AI access differs across student cohorts"
        },
        {
          "t": "Alternatives are provided to ensure students who do not wish to use AI tools are not disadvantaged"
        },
        {
          "t": "The digital divide arising from paid vs. free AI tool tiers is explicitly addressed in governance documents"
        },
        {
          "t": "An equity audit of GenAI policies has been conducted; indigenous knowledge and cultural considerations are addressed"
        }
      ]
    },
    {
      "id": "dp",
      "name": "Data Privacy",
      "short": "Privacy",
      "desc": "How institutional GenAI use protects data, manages risk, and maintains procurement and security standards.",
      "crossCutting": false,
      "evidence": {
        "tip": "Review your data classification policy, IT procurement guidelines, privacy impact assessments, approved/prohibited software registers, and any AI-specific cybersecurity review documentation.",
        "note": "Data Privacy is a technical and legal domain. Evidence should include documented guidance to staff and students, not just general privacy policies that predate GenAI."
      },
      "recs": [
        "Publish and maintain a regularly updated approved and prohibited GenAI tools register, accessible to all staff and students",
        "Implement a data classification framework specifying which data categories may and may not be entered into AI systems",
        "Commission an independent cybersecurity and privacy review of all AI tools in active institutional use"
      ],
      "qs": [
        {
          "t": "Privacy implications of staff and student GenAI use are documented in institutional guidance"
        },
        {
          "t": "Staff and students are advised not to upload confidential, personal, or sensitive data into public GenAI systems"
        },
        {
          "t": "Institutional guidance addresses GDPR or equivalent data protection compliance requirements for GenAI tool use"
        },
        {
          "t": "Users are informed about risks related to data retention, third-party processing, and external AI service providers"
        },
        {
          "t": "Institutional procurement leverages local sandboxes or contracted vendors with data protection contracts over public accounts"
        },
        {
          "t": "Account-level security configurations are mandated for individuals accessing corporate university AI accounts"
        },
        {
          "t": "An approved and prohibited GenAI tools register is maintained; data classification covers what may be entered into AI tools"
        },
        {
          "t": "Records management addresses GenAI-generated content; a cybersecurity assessment of AI tools is undertaken"
        }
      ]
    },
    {
      "id": "pt",
      "name": "Public Trust",
      "short": "Trust",
      "desc": "How the institution demonstrates transparency, accountability, and stakeholder engagement on GenAI.",
      "crossCutting": false,
      "evidence": {
        "tip": "Look for public-facing statements, governance committee records, annual reports, student consultation documentation, and any accountability frameworks referencing GenAI.",
        "note": "Public Trust requires outward-facing evidence. If governance decisions are internal only, with no published position or stakeholder engagement, this domain will score low regardless of internal progress."
      },
      "recs": [
        "Publish a substantive, publicly accessible institutional statement on GenAI governance, going substantively beyond a brief disclaimer",
        "Formalise student participation in GenAI governance through representation on the institutional AI committee or working group",
        "Commit to and publish an annual GenAI governance report covering policy changes, implementation progress, and future institutional priorities"
      ],
      "qs": [
        {
          "t": "The institution has a substantive, public-facing statement on its GenAI governance position"
        },
        {
          "t": "Institutional GenAI governance information is publicly accessible to all stakeholders"
        },
        {
          "t": "Transparency and disclosure principles are promoted when GenAI contributes to academic or institutional work"
        },
        {
          "t": "Human responsibility and accountability for decisions supported by GenAI is explicitly identified in institutional guidance"
        },
        {
          "t": "A formal institutional recourse process exists for disagreements on AI use between students and faculty"
        },
        {
          "t": "Ultimate administrative and legal accountability for pedagogical or content errors arising from AI is clearly defined"
        },
        {
          "t": "Decision-making about GenAI is documented; community and industry consultation informs GenAI policy; student voice is included"
        },
        {
          "t": "Annual reporting on GenAI governance is published; mechanisms exist for stakeholders to raise concerns about AI decisions"
        }
      ]
    },
    {
      "id": "co",
      "name": "Coherence",
      "short": "Coherence",
      "desc": "Cross-cutting questions about how well your GenAI policies connect, align, and are governed as a whole.",
      "crossCutting": true,
      "evidence": {
        "tip": "This section assesses integration across all six domains. Review whether your domain policies reference each other, whether a single named body coordinates governance, and whether a defined review cycle exists.",
        "note": "Coherence is the binding constraint at Tier 3 and above. High domain scores do not guarantee coherence; a portfolio of strong but isolated policies is a Tier 2 to 3 profile."
      },
      "recs": null,
      "qs": [
        {
          "t": "Policies in different domains cross-reference each other where relevant"
        },
        {
          "t": "Teaching, assessment, research, privacy and integrity policies present a consistent institutional position on GenAI"
        },
        {
          "t": "Evidence that GenAI governance is coordinated across multiple institutional functions rather than managed through isolated policies"
        },
        {
          "t": "Institutional AI policies are aligned with national regulatory frameworks and HE quality assurance requirements"
        },
        {
          "t": "AI governance documents demonstrate coherence between policy statements and operational educational practices"
        },
        {
          "t": "AI governance committees are structured with multi-disciplinary clusters to oversee holistic policy alignment"
        },
        {
          "t": "There is a named senior accountable owner for GenAI governance; a committee oversees GenAI institution-wide; messaging is aligned"
        },
        {
          "t": "A review and update cycle for GenAI policies is defined and active; policies are integrated with broader institutional strategy"
        }
      ]
    }
  ]
};

/* Derived views used across all components (do not edit) */
const SCALE = CONFIG.scale.map(s => s.label);
const MAXV = CONFIG.scale.length - 1;
const DOMAINS = CONFIG.domains;
const SCORING = CONFIG.domains.map((d, i) => ({ ...d, index: i })).filter(d => !d.crossCutting);
const CROSS = CONFIG.domains.map((d, i) => ({ ...d, index: i })).filter(d => d.crossCutting);
const TNAMES = ['', ...CONFIG.tiers.map(t => t.name)];
const TCOLS  = ['', ...CONFIG.tiers.map(t => t.color)];
const TBG    = ['', ...CONFIG.tiers.map(t => t.bg)];
const TDEFS  = Object.fromEntries(CONFIG.tiers.map(t => [t.level, { h: t.heading, b: t.description }]));
const TDESC2 = ['', ...CONFIG.tiers.map(t => t.description)];
const TOTAL_QS = DOMAINS.reduce((s, d) => s + d.qs.length, 0);
