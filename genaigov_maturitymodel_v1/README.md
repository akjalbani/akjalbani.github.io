# GenAI Governance Maturity Model

**How well is your institution governing generative AI? Find out in 20 minutes.**

An open, free, self-assessment tool for universities and higher education
institutions, developed through **ASEF INNOLAB7**. Answer 56 evidence-based
indicator questions across six policy domains and receive an instant,
board-ready picture of your institution's GenAI governance maturity — where
you are strong, where you are exposed, and what to do next.

**Try it live:** `https://<username>.github.io/<repo>/` *(replace with your
deployed URL)*

---

## Why this tool

Generative AI arrived faster than institutional policy. Most universities now
have *something* — an integrity rule here, a staff guideline there — but few
can answer the harder questions: Are our policies consistent with each other?
Who owns them? Would they survive an audit, a media inquiry, or a funder's
scrutiny?

This tool turns that uncertainty into a structured, evidence-based diagnosis.
It is built on a five-tier maturity model developed with international higher
education experts, and it is designed to be completed by the people who
actually hold the evidence: governance leads, AI working groups, academic
committees, and quality assurance teams.

## What you get

- **An overall maturity score (0–100)** and a classification on a five-tier
  scale, from **Tier 1 · Reactive** (improvised, incident-driven responses)
  to **Tier 5 · Leading** (whole-of-institution, self-renewing governance).
- **A domain-by-domain profile** across the six areas where GenAI governance
  succeeds or fails:
  1. **Teaching & Learning** — principles, AI literacy, staff capability
  2. **Assessment & Academic Integrity** — disclosure, safeguards, consistency
  3. **Research Ethics** — approval processes, authorship, funder compliance
  4. **Equity & Access** — the digital divide, fairness, inclusive design
  5. **Data Privacy** — GDPR, procurement, approved-tools registers, security
  6. **Public Trust** — transparency, accountability, stakeholder voice
- **A Coherence diagnostic** — the differentiator most frameworks miss. It
  measures whether your policies work *together*: shared ownership, consistent
  terminology, coordinated review cycles. Institutions routinely score well in
  individual domains and fail here; coherence is the binding constraint on
  reaching the top tiers.
- **Visual results** — a radar chart of your governance profile and a
  domain-score breakdown you can drop straight into a committee paper.
- **Three prioritised recommendations**, targeted at your weakest domains,
  each with concrete institutional actions.
- **One-click Excel export** — full results, every indicator response, and a
  pilot data sheet formatted for multi-institution comparison studies.

## The AI Auditor: let the evidence score itself

Scoring 56 indicators honestly requires reading your own policy documents.
The built-in **AI Auditor** does the reading for you:

- **Point it at your institution** and it searches the public web for your
  AI-related policies — you verify every source it finds before anything
  is analysed.
- **Or upload your documents** (PDF, DOCX, TXT) directly.
- Claude (Anthropic's AI) then assesses every indicator against the actual
  evidence, citing the document behind each score.
- **You stay in control**: every AI-suggested score is presented for human
  review and can be adjusted before results are generated.

You supply your own Anthropic API key, entered in the browser for the session
only — it is never stored or sent anywhere except to Anthropic.

## Who is it for?

| Audience | Use it to… |
|---|---|
| Governance leads & AI committees | Baseline your institution and build the case for investment |
| Quality assurance teams | Evidence GenAI readiness for review and audit cycles |
| Senior leadership | Get a one-page, defensible answer to "where are we on AI?" |
| Researchers & networks | Run comparable assessments across many institutions (the Excel export is pilot-study ready) |
| Policy bodies & consortia | Adapt the model — every domain, indicator, and threshold is configurable |

## No installation, no accounts, no cost

The entire tool is a static website: open it and start. Nothing you enter
leaves your browser (except the documents you explicitly send to the AI
Auditor). It runs on GitHub Pages for free, or from a local file with a
double-click. Fork it, rebrand the model for your sector, translate the
indicators — it is yours to adapt.

---

## For adopters: how the site is built

The tool is pure HTML, CSS, and JavaScript — exactly what GitHub Pages
serves natively. No build step, no server, no frameworks.

### Structure

```
index.html            Page shell: all markup, loads every component
css/
  styles.css          All styling (branding, colors, layout)
assets/
  team-1..6.jpg       Team photos
  maturity-model-infographic.png
js/                   Components, loaded in order by index.html:
  config.js           ★ THE ONLY FILE TO EDIT to change the model
  calc.js             Scoring engine (domain %, overall %, tier lookup)
  nav.js              Navigation, menus, scroll-spy
  assessment.js       Sidebar, intro page, questions, progress
  results.js          Results page, charts, Excel export
  auditor.js          AI Auditor (Anthropic API)
  hero-radar.js       Animated landing-page radar
  main.js             Initialisation
```

Updating any one component updates the page: `index.html` just loads them.

### Changing the model: edit `js/config.js` only

Everything about the assessment lives in the `CONFIG` object:

- **Add / remove / reorder domains** in `CONFIG.domains`. The sidebar,
  section pills, intro statistics, progress totals, charts, radar axes,
  results bars, Excel export, and the AI Auditor all follow automatically.
- **Add / remove / reword indicator questions** in each domain's `qs`
  array. Domain maximums, percentages, and the overall score recalculate —
  a domain with 5 questions is scored out of 15 just as one with 8 is
  scored out of 24.
- **`crossCutting: true`** marks a domain (like Coherence) that is asked
  and charted but excluded from the overall maturity score. Remove the
  flag to include it; delete the domain and the diagnostic panel hides
  itself.
- **`recs`** — the three recommendation lines shown when the domain ranks
  among the weakest. Domains without `recs` get sensible generated ones.
- **Rating scale, tier names, descriptions, and thresholds** are all in
  `CONFIG.scale`, `CONFIG.tiers`, and `CONFIG.tierThresholds`. The default
  thresholds `[0,20,40,60,80]` reproduce the original mapping
  (>80 → Tier 5, >60 → 4, >40 → 3, >20 → 2, else 1).

Nothing in the other files hard-codes "six domains", "56 indicators", or
"0–3": they read whatever `config.js` defines.

### Deploying to GitHub Pages

1. Create a repository and put these files at its root (so `index.html`
   is top-level).
2. Commit and push.
3. In the repository: **Settings → Pages → Source: Deploy from a branch**,
   choose `main` and `/ (root)`, save.
4. Your site appears at `https://<username>.github.io/<repo>/` within a
   minute or two.

To update the tool later, edit the relevant file (usually just
`js/config.js`), commit, and push — Pages redeploys automatically.

### Notes

- Chart.js, SheetJS (Excel export), and mammoth (DOCX reading for the AI
  Auditor) load from the cdnjs CDN.
- The AI Auditor calls the Anthropic API directly from the browser with a
  key the user pastes in. The key is never stored; it stays in the input
  field for the session only.
- The site also works opened directly from disk (double-click
  `index.html`) — no local server required.

---

*Developed through ASEF INNOLAB7. Free to use, adapt, and share.*
