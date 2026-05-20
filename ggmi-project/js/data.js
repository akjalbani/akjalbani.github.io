/**
 * GAIA-HE: GenAI Governance Assessment Index for Higher Education
 * Data module: question bank, tier descriptors, recommendation rules
 *
 * Maturity scale (per item): 0 = Not in place, 1 = Emerging, 2 = Established, 3 = Embedded
 * Coherence scale (per item): 0 = No, 1 = Partial, 2 = Yes
 */

const DOMAINS = [
  {
    id: 'teaching',
    name: 'Teaching & Learning',
    short: 'Teaching',
    description: 'How GenAI is governed in curriculum design, classroom practice, and staff capability for teaching.',
    color: '#1F5E8C',
    questions: [
      {
        id: 'T1',
        text: 'GenAI use in teaching is guided by published institutional principles',
        levels: [
          'No formal institutional position on GenAI in teaching',
          'Informal guidance from individual schools or champions',
          'Institution-wide principles published and accessible to staff',
          'Principles reviewed regularly and embedded in teaching policy'
        ]
      },
      {
        id: 'T2',
        text: 'Academic staff have access to professional development on GenAI in teaching',
        levels: [
          'No structured development opportunities exist',
          'Optional workshops or self-directed resources available',
          'Structured PD program offered to all teaching staff',
          'Ongoing PD with refresh cycles and discipline-specific streams'
        ]
      },
      {
        id: 'T3',
        text: 'Subject-level statements on GenAI are required in subject outlines',
        levels: [
          'No requirement for subject-level GenAI statements',
          'Recommended but not required; uptake is inconsistent',
          'Standard statement required in all subject outlines',
          'Statement integrated into LMS and reviewed each teaching period'
        ]
      },
      {
        id: 'T4',
        text: 'Curriculum design considers GenAI impact on learning outcomes',
        levels: [
          'Curriculum design has not considered GenAI impact',
          'Some course reviews include GenAI considerations',
          'Curriculum review process formally incorporates GenAI',
          'GenAI implications embedded in all curriculum approval criteria'
        ]
      },
      {
        id: 'T5',
        text: 'AI literacy is an explicit graduate attribute or learning outcome',
        levels: [
          'AI literacy is not a stated graduate attribute',
          'Mentioned in some programs but not institution-wide',
          'AI literacy is a recognised graduate attribute',
          'AI literacy mapped to all programs with assessment evidence'
        ]
      },
      {
        id: 'T6',
        text: 'Institutional support exists for experimenting with GenAI pedagogies',
        levels: [
          'No formal support for pedagogical experimentation',
          'Informal community of practice or limited pilots',
          'Funded pilots and sandbox environments available',
          'Systematic experimentation with evaluation and scaling pathway'
        ]
      },
      {
        id: 'T7',
        text: 'The institution distinguishes appropriate from inappropriate GenAI use in teaching',
        levels: [
          'No clear distinction is communicated',
          'High-level statements without practical examples',
          'Tiered or scenario-based guidance available to staff and students',
          'Guidance regularly refreshed with case examples and FAQ'
        ]
      }
    ]
  },
  {
    id: 'assessment',
    name: 'Assessment & Academic Integrity',
    short: 'Assessment',
    description: 'How GenAI is governed in assessment design, academic integrity processes, and student declarations.',
    color: '#8C6B1F',
    questions: [
      {
        id: 'A1',
        text: 'GenAI use in assessment is governed by clear, published rules',
        levels: [
          'No formal position on GenAI in assessment',
          'Ad-hoc guidance from individual academics or schools',
          'Institution-wide rules published and accessible',
          'Rules reviewed annually and integrated into assessment policy'
        ]
      },
      {
        id: 'A2',
        text: 'Students are required to disclose GenAI use in assessments',
        levels: [
          'No disclosure mechanism',
          'Disclosure expected but inconsistent',
          'Standard declaration template used across assessments',
          'Disclosure built into LMS submission workflow'
        ]
      },
      {
        id: 'A3',
        text: 'Assessment design has been reviewed in light of GenAI',
        levels: [
          'No review undertaken',
          'Some units redesigned at individual academic discretion',
          'Faculty-level reviews completed',
          'GenAI considerations embedded in all new assessment design'
        ]
      },
      {
        id: 'A4',
        text: 'Approach to detecting or verifying GenAI use is defined',
        levels: [
          'No defined approach',
          'Reliance on detection tools without policy backing',
          'Combined approach documented (process, oral checks, design)',
          'Approach aligned with academic integrity policy and student appeals'
        ]
      },
      {
        id: 'A5',
        text: 'Academic misconduct procedures address GenAI specifically',
        levels: [
          'Existing rules silent on GenAI',
          'GenAI mentioned but procedures unchanged',
          'Procedures updated to address GenAI cases',
          'Procedures tested, refined, supported by case precedent'
        ]
      },
      {
        id: 'A6',
        text: 'Marker and educator capability to handle GenAI in assessment is supported',
        levels: [
          'No staff development on GenAI in assessment',
          'Optional sessions offered',
          'Mandatory training for assessors',
          'Ongoing PD with refresh cycles and case sharing'
        ]
      },
      {
        id: 'A7',
        text: 'Communication to students about GenAI in assessment is clear and consistent',
        levels: [
          'Students unclear on expectations',
          'Varies by subject or instructor',
          'Standard student-facing statement across all subjects',
          'Embedded in subject outlines, LMS, and orientation'
        ]
      },
      {
        id: 'A8',
        text: 'Rules are applied consistently across schools, faculties, and modes of delivery',
        levels: [
          'Significant inconsistency across the institution',
          'Some alignment within faculties',
          'Institution-wide consistency with documented variations',
          'Cross-institutional committee reviews consistency'
        ]
      }
    ]
  },
  {
    id: 'research',
    name: 'Research Ethics',
    short: 'Research Ethics',
    description: 'How GenAI is governed in research design, data handling, authorship, and integrity training.',
    color: '#6B2A6B',
    questions: [
      {
        id: 'R1',
        text: 'Human research ethics processes address GenAI use in research design',
        levels: [
          'HREC/IRB processes do not consider GenAI',
          'Ad-hoc consideration when researchers raise it',
          'Standard HREC guidance addresses GenAI use',
          'HREC guidance regularly updated with reviewer training'
        ]
      },
      {
        id: 'R2',
        text: 'Guidance exists on GenAI use in literature review, coding, and analysis',
        levels: [
          'No guidance on GenAI in research methods',
          'Informal advice through supervisors or workshops',
          'Published institutional guidance available',
          'Guidance aligned with funder and publisher requirements'
        ]
      },
      {
        id: 'R3',
        text: 'Authorship and attribution rules account for GenAI',
        levels: [
          'Authorship policy silent on GenAI',
          'Statements exist but inconsistently applied',
          'Policy updated to address GenAI authorship and attribution',
          'Policy integrated with publisher and funder requirements'
        ]
      },
      {
        id: 'R4',
        text: 'Data privacy implications of GenAI tools in research are addressed',
        levels: [
          'No guidance on data privacy and GenAI in research',
          'General privacy guidance applied informally',
          'Specific guidance on data handling in GenAI research workflows',
          'Approved tools list with privacy assessments completed'
        ]
      },
      {
        id: 'R5',
        text: 'Guidance addresses GenAI use in grant writing and applications',
        levels: [
          'No guidance on GenAI in grant applications',
          'General awareness but no formal position',
          'Guidance published and shared with research community',
          'Aligned with funder declarations and integrity policy'
        ]
      },
      {
        id: 'R6',
        text: 'Research integrity training includes GenAI considerations',
        levels: [
          'Research integrity training does not address GenAI',
          'Optional content available to researchers',
          'Mandatory training includes GenAI module',
          'Training updated regularly with case examples'
        ]
      },
      {
        id: 'R7',
        text: 'Discipline-specific guidance is available for GenAI in research',
        levels: [
          'Only generic institution-wide guidance exists',
          'Some disciplines have developed their own guidance',
          'Most disciplines have tailored guidance',
          'Discipline guidance coordinated and benchmarked'
        ]
      }
    ]
  },
  {
    id: 'equity',
    name: 'Equity & Access',
    short: 'Equity',
    description: 'How GenAI governance addresses fairness, access, accessibility, and the needs of diverse cohorts.',
    color: '#2E6B47',
    questions: [
      {
        id: 'E1',
        text: 'Equitable access to GenAI tools is considered in institutional decisions',
        levels: [
          'Equity of access not considered in decisions',
          'Acknowledged but not acted upon',
          'Equity assessment informs tool selection and deployment',
          'Equity audit conducted regularly with action plans'
        ]
      },
      {
        id: 'E2',
        text: 'Cost barriers to commercial GenAI tools are addressed for students',
        levels: [
          'Students must access paid tools at own expense',
          'Some discipline-level support but inconsistent',
          'Institution provides access to approved tools for all students',
          'Comprehensive access provision with monitoring of barriers'
        ]
      },
      {
        id: 'E3',
        text: 'Accessibility implications of GenAI are considered in policy',
        levels: [
          'No consideration of disability or accessibility',
          'Acknowledged but no specific guidance',
          'Accessibility considerations included in GenAI guidance',
          'Accessibility audit of approved tools completed'
        ]
      },
      {
        id: 'E4',
        text: 'Differential digital fluency among students is acknowledged in policy',
        levels: [
          'Policy assumes uniform student capability',
          'Differential fluency mentioned but not addressed',
          'Support programs target students with lower fluency',
          'Systematic capability development across all cohorts'
        ]
      },
      {
        id: 'E5',
        text: 'International and EAL students have tailored GenAI guidance',
        levels: [
          'Same guidance for all cohorts without adaptation',
          'Some translated or simplified resources available',
          'Tailored guidance and support for international and EAL students',
          'Co-designed guidance with international student input'
        ]
      },
      {
        id: 'E6',
        text: 'Indigenous knowledge and cultural considerations are addressed',
        levels: [
          'No consideration of Indigenous or cultural perspectives',
          'Generic acknowledgment without specific guidance',
          'Specific guidance developed with Indigenous input',
          'Indigenous data sovereignty principles embedded in policy'
        ]
      },
      {
        id: 'E7',
        text: 'An equity audit of GenAI policies has been conducted',
        levels: [
          'No equity audit conducted',
          'Informal review or consultation only',
          'Formal equity audit completed with findings published',
          'Audit cycle established with action tracking'
        ]
      }
    ]
  },
  {
    id: 'privacy',
    name: 'Data Privacy & Transparency',
    short: 'Privacy',
    description: 'How institutional GenAI use protects data, manages risk, and maintains procurement and security standards.',
    color: '#1F6B6B',
    questions: [
      {
        id: 'P1',
        text: 'Privacy implications of staff and student GenAI use are documented',
        levels: [
          'No privacy guidance specific to GenAI',
          'General privacy notices applied without GenAI specificity',
          'Specific guidance on what data can and cannot be entered',
          'Comprehensive privacy framework with monitoring'
        ]
      },
      {
        id: 'P2',
        text: 'Approved and prohibited GenAI tools list is maintained',
        levels: [
          'No approved tools list exists',
          'Informal recommendations without formal assessment',
          'Approved tools list maintained and accessible',
          'List actively maintained with regular re-assessment'
        ]
      },
      {
        id: 'P3',
        text: 'Data classification covers what may be entered into GenAI tools',
        levels: [
          'Data classification does not address GenAI',
          'General classification applied without GenAI specificity',
          'Classification scheme explicitly covers GenAI inputs',
          'Classification embedded in training and tool selection'
        ]
      },
      {
        id: 'P4',
        text: 'Procurement assessment includes GenAI privacy and ethics review',
        levels: [
          'Procurement does not assess GenAI specifically',
          'Ad-hoc assessment for high-profile tools',
          'Standard procurement template includes GenAI assessment',
          'Procurement aligned with sector frameworks and standards'
        ]
      },
      {
        id: 'P5',
        text: 'Cross-border data flow concerns are addressed',
        levels: [
          'Cross-border data flows not considered',
          'Acknowledged in general terms only',
          'Specific guidance on jurisdictional considerations',
          'Risk assessment integrated into tool approval'
        ]
      },
      {
        id: 'P6',
        text: 'Records management addresses GenAI-generated content',
        levels: [
          'Records policy does not address GenAI outputs',
          'Some consideration of academic records',
          'Records policy explicitly covers GenAI content',
          'Records framework integrated with audit and compliance'
        ]
      },
      {
        id: 'P7',
        text: 'Cybersecurity assessment of GenAI tools is undertaken',
        levels: [
          'No cybersecurity assessment of GenAI tools',
          'Reactive review when issues arise',
          'Standard cybersecurity review for approved tools',
          'Continuous monitoring and threat assessment'
        ]
      }
    ]
  },
  {
    id: 'trust',
    name: 'Public Trust',
    short: 'Public Trust',
    description: 'How the institution demonstrates transparency, accountability, and stakeholder engagement on GenAI.',
    color: '#8C2A4A',
    questions: [
      {
        id: 'PT1',
        text: 'The institution has a public-facing statement on its GenAI position',
        levels: [
          'No public statement on GenAI position',
          'Internal statements only, not publicly available',
          'Public statement available on institutional website',
          'Statement updated regularly with progress reporting'
        ]
      },
      {
        id: 'PT2',
        text: 'Decision-making about GenAI is documented and accountable',
        levels: [
          'Decisions made informally without documentation',
          'Some decisions documented but not consistently',
          'Decision-making documented and accountable',
          'Decisions published with rationale and review pathway'
        ]
      },
      {
        id: 'PT3',
        text: 'Community and industry consultation informs GenAI policy',
        levels: [
          'No external consultation in policy development',
          'Limited consultation with select stakeholders',
          'Structured consultation with diverse stakeholders',
          'Ongoing engagement with feedback integration'
        ]
      },
      {
        id: 'PT4',
        text: 'Annual reporting on GenAI governance is published',
        levels: [
          'No reporting on GenAI governance',
          'Internal reporting only',
          'Annual public reporting on GenAI governance',
          'Reporting linked to strategy with public accountability'
        ]
      },
      {
        id: 'PT5',
        text: 'Student voice is included in GenAI governance',
        levels: [
          'No student representation in GenAI governance',
          'Ad-hoc student consultation',
          'Student representation on governance bodies',
          'Co-design with students at all governance levels'
        ]
      },
      {
        id: 'PT6',
        text: 'Transparency about institutional GenAI use is maintained',
        levels: [
          'Institutional GenAI use is not disclosed',
          'Some disclosure in specific contexts',
          'General transparency about how the institution uses GenAI',
          'Detailed transparency with public-facing register'
        ]
      },
      {
        id: 'PT7',
        text: 'Mechanisms exist for raising concerns about GenAI',
        levels: [
          'No specific mechanism for GenAI concerns',
          'General feedback channels used informally',
          'Specific GenAI concern mechanism with clear process',
          'Concerns process with reporting and response loop'
        ]
      }
    ]
  }
];

const COHERENCE_MODULE = {
  id: 'coherence',
  name: 'Coherence Diagnostic',
  short: 'Coherence',
  description: 'Cross-cutting questions about how well your GenAI policies connect, align, and are governed as a whole.',
  questions: [
    { id: 'C1', text: 'Policies in different domains cross-reference each other where relevant' },
    { id: 'C2', text: 'There is a named senior accountable owner for GenAI governance' },
    { id: 'C3', text: 'A governance committee or working group oversees GenAI institution-wide' },
    { id: 'C4', text: 'Staff-facing and student-facing messaging is consistent and aligned' },
    { id: 'C5', text: 'Terminology used across different GenAI policies is consistent' },
    { id: 'C6', text: 'A review and update cycle for GenAI policies is defined and active' },
    { id: 'C7', text: 'GenAI policies are integrated with broader institutional strategy' },
    { id: 'C8', text: 'Implementation responsibility for GenAI policies is clearly assigned' }
  ],
  options: [
    { value: 0, label: 'No', shortLabel: 'No' },
    { value: 1, label: 'Partial', shortLabel: 'Partial' },
    { value: 2, label: 'Yes', shortLabel: 'Yes' }
  ]
};

const TIERS = [
  {
    id: 1,
    name: 'Reactive',
    range: [0, 20],
    label: 'Tier 1 of 5 · Reactive',
    summary: 'Ad-hoc, crisis-driven responses with little institutional coordination.',
    description: 'Responses to GenAI are ad-hoc and crisis-driven. Few or no formal policies exist. Individual academics and schools make local decisions without institutional coordination. The institution has not yet treated GenAI as a whole-of-institution governance challenge.'
  },
  {
    id: 2,
    name: 'Emerging',
    range: [21, 40],
    label: 'Tier 2 of 5 · Emerging',
    summary: 'Initial policies in place but coverage is limited and uneven.',
    description: 'Some initial policies exist, typically focused on a single domain such as assessment. Awareness is building but implementation is uneven. The institution is beginning to think about GenAI across multiple domains but coordination remains weak.'
  },
  {
    id: 3,
    name: 'Developing',
    range: [41, 60],
    label: 'Tier 3 of 5 · Developing',
    summary: 'Multiple policies across domains with partial coordination.',
    description: 'Policies exist across several domains and some institutional coordination is in place. Implementation is underway in priority areas but coherence between policies remains partial. Integration gaps are visible across domains.'
  },
  {
    id: 4,
    name: 'Coherent',
    range: [61, 80],
    label: 'Tier 4 of 5 · Coherent',
    summary: 'Comprehensive coverage with strong integration and active governance.',
    description: 'Comprehensive coverage across most domains with strong integration between policies. Active governance structures oversee implementation. Regular review and improvement cycles are in place. The institution treats GenAI as a coherent governance challenge.'
  },
  {
    id: 5,
    name: 'Leading',
    range: [81, 100],
    label: 'Tier 5 of 5 · Leading',
    summary: 'Whole-of-institution governance with sector contribution and continuous evolution.',
    description: 'Whole-of-institution governance is established with innovative practice and contributions to the wider sector. Strong public accountability mechanisms operate. The institution continuously evolves its approach and shares learning with peers.'
  }
];

const RECOMMENDATIONS = {
  teaching: {
    high: 'Develop and publish institutional principles for GenAI in teaching, paired with a structured professional development program for academic staff.',
    medium: 'Strengthen subject-level practice by requiring standardised GenAI statements in all subject outlines and embedding AI literacy in curriculum review.',
    low: 'Maintain teaching governance through regular PD refresh cycles and discipline-specific support for innovative pedagogies.'
  },
  assessment: {
    high: 'Establish institution-wide rules for GenAI in assessment, update academic misconduct procedures, and require student disclosure across all assessments.',
    medium: 'Build assessor capability through mandatory training, redesign assessments where GenAI poses validity risks, and align messaging to students.',
    low: 'Sustain assessment integrity by embedding GenAI considerations in all new assessment design and reviewing consistency across faculties.'
  },
  research: {
    high: 'Update HREC processes, authorship policy, and research integrity training to specifically address GenAI use in research design and outputs.',
    medium: 'Develop discipline-specific guidance on GenAI in research methods and align grant application practices with funder expectations.',
    low: 'Maintain research governance through ongoing alignment with publisher and funder requirements and case-based training updates.'
  },
  equity: {
    high: 'Conduct an equity audit of GenAI policies and address access barriers, accessibility needs, and tailored guidance for international and EAL cohorts.',
    medium: 'Establish institution-wide access to approved GenAI tools and develop targeted support for cohorts with differential digital fluency.',
    low: 'Sustain equitable access through ongoing audit cycles and co-design of policies with diverse student communities.'
  },
  privacy: {
    high: 'Establish an approved-tools list, define data classification for GenAI inputs, and integrate GenAI assessment into procurement and security review.',
    medium: 'Strengthen records management for GenAI content and address cross-border data flow considerations in tool selection.',
    low: 'Maintain privacy posture through continuous tool reassessment and alignment with sector frameworks.'
  },
  trust: {
    high: 'Publish a public-facing statement on the institution\'s GenAI position, establish accountable decision-making, and create mechanisms for raising concerns.',
    medium: 'Develop annual public reporting on GenAI governance and include student voice formally in governance bodies.',
    low: 'Sustain public trust through ongoing engagement, detailed transparency registers, and co-design with stakeholders.'
  }
};

const COHERENCE_INTERPRETATION = {
  high: { label: 'Strong coherence', color: '#2D5F4F', description: 'Your policies connect, align, and are governed as an integrated whole.' },
  medium: { label: 'Partial coherence', color: '#B85C2C', description: 'Some integration is in place but policies still operate with notable disconnects.' },
  low: { label: 'Limited coherence', color: '#8B2842', description: 'Policies operate largely in isolation, with weak alignment and unclear accountability.' }
};

function getTier(score) {
  return TIERS.find(t => score >= t.range[0] && score <= t.range[1]) || TIERS[0];
}

function getRecommendation(domainId, score) {
  if (score < 50) return RECOMMENDATIONS[domainId].high;
  if (score < 75) return RECOMMENDATIONS[domainId].medium;
  return RECOMMENDATIONS[domainId].low;
}

function getRecommendationPriority(score) {
  if (score < 50) return 'high';
  if (score < 75) return 'medium';
  return 'low';
}

function getCoherenceInterpretation(score) {
  if (score >= 75) return COHERENCE_INTERPRETATION.high;
  if (score >= 50) return COHERENCE_INTERPRETATION.medium;
  return COHERENCE_INTERPRETATION.low;
}

if (typeof window !== 'undefined') {
  window.GAIA_DATA = {
    DOMAINS, COHERENCE_MODULE, TIERS, RECOMMENDATIONS, COHERENCE_INTERPRETATION,
    getTier, getRecommendation, getRecommendationPriority, getCoherenceInterpretation
  };
}
