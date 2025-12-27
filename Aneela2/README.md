# Teaching Portfolio - Dr. Aneela Yasmin

A professional, responsive teaching portfolio website designed for the Australian education job market. This portfolio serves as evidence of professional capability for VIT (Victorian Institute of Teaching) registration and academic teaching positions.

## 🎯 Purpose

This portfolio demonstrates:
- Teaching effectiveness and curriculum innovation
- Scholarship of Teaching and Learning (SoTL) engagement
- Evidence-based pedagogy and student-centered approach
- Professional development and academic service

## 🚀 Quick Start

### Deploying to GitHub Pages

1. **Create a new repository** on GitHub named `[username].github.io` or any repository name
2. **Upload all files** from this folder to the repository
3. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Select the branch (usually `main`)
   - Select root folder (`/`)
   - Click Save
4. **Access your site** at `https://[username].github.io` or `https://[username].github.io/[repo-name]`

## 📁 File Structure

```
portfolio-website/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript for interactivity
├── README.md           # This file
└── images/             # Portfolio evidence images
    ├── asef-certificate.jpeg
    ├── asef-presentation.jpeg
    ├── asm-membership.png
    ├── coursera-certificate.png
    ├── ai-creativity-page.png
    ├── lln-safety-page.png
    ├── role-cards-page.png
    ├── role-cards-page2.png
    ├── sotl-summary-page.png
    ├── sotl-udl-page.png
    ├── udl-chart.png
    └── udl-cycle.png
```

## ✨ Features

### Interactive Elements
- **Responsive Navigation:** Sticky navigation with mobile hamburger menu
- **Back to Top Button:** Quick navigation to page top
- **Evidence Lightbox:** Click on evidence buttons to view images with descriptions
- **Smooth Scrolling:** Seamless navigation between sections
- **Section Animations:** Fade-in effects as you scroll

### Sections Included
1. **Portfolio Overview** - Introduction and role alignment
2. **Teaching Philosophy** - Three pillars: Burning, Illuminating, Well-being
3. **Curriculum Design** - Sample unit outline with learning outcomes
4. **Student Feedback** - Themes and reflective responses
5. **SoTL Projects** - Educational research and innovation
6. **Professional Development** - Certifications and memberships
7. **Academic Service** - Committee roles and collaboration
8. **Contact Information**

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --color-primary: #1a365d;
    --color-accent: #c7923e;
    /* ... other colors */
}
```

### Adding New Sections
1. Add HTML section in `index.html`
2. Add navigation link in the nav menu
3. Style as needed in `styles.css`

### Adding New Evidence
1. Add images to the `images/` folder
2. Update `evidenceData` object in `script.js`
3. Add evidence button with `onclick="openLightbox('evidence-id')"`

## 📱 Responsive Design

The portfolio is fully responsive and tested on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Reduced motion support for users who prefer it
- High contrast text and proper focus indicators

## 🖨️ Print Styles

The portfolio includes print-optimized styles for creating physical copies. Use your browser's print function (Ctrl/Cmd + P).

## 📄 License

This portfolio template is provided for personal use. Please customize with your own content and credentials.

## 📧 Contact

Dr. Aneela Yasmin
- Email: aneelayasmin@yahoo.com
- Phone: 0433 881 927

---

*Burning & Illuminating with Well-being*
