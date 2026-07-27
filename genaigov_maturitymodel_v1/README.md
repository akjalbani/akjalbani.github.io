# GenAI Governance Maturity Model — GitHub Pages site

The ASEF INNOLAB7 GenAI Governance Maturity assessment tool, split into
small components that assemble into one page. Pure HTML, CSS, and
JavaScript — exactly what GitHub Pages serves natively. No build step, no
server, no frameworks.

## Structure

```
index.html            Page shell: all markup, loads every component
css/
  styles.css          All styling (branding, colors, layout) — unchanged
assets/
  team-1..6.jpg       Team photos (extracted from the original file)
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

## Changing the model: edit `js/config.js` only

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

Nothing in the other files hard-codes “six domains”, “56 indicators”, or
“0–3”: they read whatever `config.js` defines.

## Deploying to GitHub Pages

1. Create a repository and put these files at its root (so `index.html`
   is top-level).
2. Commit and push.
3. In the repository: **Settings → Pages → Source: Deploy from a branch**,
   choose `main` and `/ (root)`, save.
4. Your site appears at `https://<username>.github.io/<repo>/` within a
   minute or two.

To update the tool later, edit the relevant file (usually just
`js/config.js`), commit, and push — Pages redeploys automatically.

## Notes

- Chart.js, SheetJS (Excel export), and mammoth (DOCX reading for the AI
  Auditor) load from the cdnjs CDN, as in the original file.
- The AI Auditor calls the Anthropic API directly from the browser with a
  key the user pastes in. The key is never stored; it stays in the input
  field for the session only. This mirrors the original tool's behaviour.
- The site also works opened directly from disk (double-click
  `index.html`) — no local server required.
