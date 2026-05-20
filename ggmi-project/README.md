# GAIA-HE
**GenAI Governance Assessment Index for Higher Education**

A self-assessment instrument that helps universities measure their maturity on Generative AI governance — and identify the path from fragmented policies to coherent, whole-of-institution architecture.

Built as a static site. No backend. No database. No tracking. All responses live in the user's own browser.

---

## What's in this project

```
ggmi-project/
├── index.html              ← Landing page
├── assessment.html         ← The wizard (51 items across 6 domains + coherence module)
├── results.html            ← Dashboard with radar chart, gap analysis, recommendations
├── about.html              ← Methodology, citations, limitations
├── css/
│   └── styles.css          ← Editorial / academic styling
├── js/
│   ├── data.js             ← Question bank, tier descriptors, recommendation rules
│   ├── assessment.js       ← Wizard logic, localStorage persistence
│   ├── results.js          ← Score computation, Chart.js dashboard rendering
│   └── pdf-export.js       ← Multi-page PDF report generation (jsPDF)
├── .nojekyll               ← Tells GitHub Pages not to run Jekyll
└── README.md               ← You are here
```

External dependencies (loaded from CDN at runtime, nothing to install):
- **Chart.js 4.4.1** — radar and bar charts
- **jsPDF 2.5.1** — downloadable PDF report
- **Google Fonts** — Fraunces (display serif) and Inter Tight (body)

---

## Running locally before you deploy

You can open `index.html` directly in a browser, but a few features (the way some browsers resolve relative paths) work better through a local server.

### Option A — Python (already installed on Mac and most Linux systems)
```bash
cd ggmi-project
python3 -m http.server 8080
```
Then open <http://localhost:8080> in your browser.

### Option B — Node.js (if you have it installed)
```bash
cd ggmi-project
npx serve
```

### Option C — Just open it
Double-click `index.html`. The site will load, but on some browsers the navigation between pages or localStorage may behave slightly differently than when served properly. The CDN scripts and fonts will still load.

---

## Deploying to GitHub Pages

GitHub Pages hosts static sites for free from a GitHub repository. There are two common patterns. Pick whichever suits you.

### Pattern 1 — User/organisation site (`username.github.io`)

This gives you a clean URL like `https://yourusername.github.io`. You can only have one of these per GitHub account.

1. **Create the repository.** Sign in at <https://github.com> and create a new repository named exactly `yourusername.github.io` (replace `yourusername` with your actual GitHub username). Make it **Public**. Do *not* initialise it with a README — you already have one.

2. **Upload the project.** From the new empty repository page, click **uploading an existing file** in the prompt. Drag in *everything inside* the `ggmi-project` folder (the four `.html` files, the `css/` folder, the `js/` folder, the `.nojekyll` file, and this `README.md`). Make sure the files sit at the *root* of the repository — not inside a `ggmi-project` subfolder.

3. **Commit the upload.** Scroll down, add a commit message such as `Initial GAIA-HE release`, click **Commit changes**.

4. **Enable Pages.** Go to **Settings → Pages** (left sidebar). Under **Source**, select `Deploy from a branch`. Under **Branch**, select `main` and folder `/ (root)`. Click **Save**.

5. **Wait a minute.** GitHub will build and publish the site. The Settings → Pages page will display the live URL once ready. You're done.

### Pattern 2 — Project site (`username.github.io/repository-name`)

This is the easier option if you already have a `username.github.io` site, or want the project under a named URL.

1. **Create the repository.** Create a new repository named whatever you like — e.g., `gaia-he`. Make it **Public**. Do *not* initialise it with a README.

2. **Upload the project.** Same as above — drag everything inside `ggmi-project` into the empty repository. Files must sit at the root.

3. **Commit.** Add a commit message and click **Commit changes**.

4. **Enable Pages.** Go to **Settings → Pages**. Under **Source**, select `Deploy from a branch`. Under **Branch**, select `main` and folder `/ (root)`. Click **Save**.

5. **Wait a minute.** Your site goes live at `https://yourusername.github.io/gaia-he/` (substituting your username and repo name).

### Pattern 3 — Using Git from the command line (for people comfortable with the terminal)

```bash
cd ggmi-project
git init
git add .
git commit -m "Initial GAIA-HE release"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

Then follow step 4 above to enable Pages in the repository settings.

---

## After deployment — common things you might want to do

### Change the institution name shown by default
On `results.html`, when no institution name has been entered, the report defaults to "Your Institution". You can change this default in `js/results.js` (search for `'Your Institution'`).

### Edit the question bank
All questions, maturity descriptors, tier definitions, and recommendation text live in `js/data.js`. The file is heavily commented. You can:
- Edit the wording of any question or maturity descriptor.
- Add or remove questions from any domain.
- Adjust tier band thresholds (currently 0–20 Reactive, 21–40 Emerging, 41–60 Developing, 61–80 Coherent, 81–100 Leading).
- Rewrite the recommendation text generated for high/medium/low priority gaps.

After editing, commit and push the changes — GitHub Pages republishes automatically within a minute.

### Change colours, fonts, or layout
All styling is in `css/styles.css`. The CSS custom properties at the top of the file (`--ink`, `--paper`, `--gold`, the domain accent colours, the typography variables) drive the visual identity of the whole site.

### Add a custom domain
On the **Settings → Pages** screen, scroll to **Custom domain**, enter your domain, and follow GitHub's DNS instructions. The `.nojekyll` file ensures GitHub doesn't process the site through its Jekyll pipeline.

---

## Browser support

Works in all modern browsers (Chrome, Firefox, Safari, Edge — last two major versions). Uses standard `localStorage`, ES6, and modern CSS (custom properties, `:has()`). No transpilation step required.

---

## Licence and citation

This instrument is provided for educational and research use. If you use GAIA-HE in research outputs or institutional reporting, please cite the underlying research framework (see `about.html` for source references) and credit the authoring institution.

---

## Credits

Built as a companion deliverable to the white paper *Cross-Regional Generative AI Governance in Higher Education: From Reactive Policies to Coherent Institutional Frameworks* (ASEF InnoLab7 submission).
