/**
 * GAIA-HE PDF Export
 * Generates a clean text-based PDF report using jsPDF (no html2canvas dependency).
 */

(function () {
  const { TIERS, getRecommendation, getRecommendationPriority, getCoherenceInterpretation, COHERENCE_MODULE, DOMAINS } = window.GAIA_DATA;

  function exportPdf({ state, domainResults, overallScore, coherence, tier, institutionName, today }) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginX = 56;
    const contentWidth = pageWidth - marginX * 2;
    let y = 64;

    // Colours
    const ink = [26, 35, 50];
    const inkSoft = [59, 71, 89];
    const inkMuted = [107, 117, 133];
    const gold = [184, 137, 59];
    const paper = [250, 247, 242];
    const forest = [45, 95, 79];
    const rust = [184, 92, 44];
    const crimson = [139, 40, 66];

    function setColor(rgb) { doc.setTextColor(rgb[0], rgb[1], rgb[2]); }
    function setFill(rgb)  { doc.setFillColor(rgb[0], rgb[1], rgb[2]); }
    function setDraw(rgb)  { doc.setDrawColor(rgb[0], rgb[1], rgb[2]); }

    function newPageIfNeeded(spaceNeeded) {
      if (y + spaceNeeded > pageHeight - 64) {
        doc.addPage();
        y = 64;
      }
    }

    function drawHeader() {
      // Eyebrow
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      setColor(gold);
      doc.text('GENAI GOVERNANCE MATURITY REPORT', marginX, y);
      y += 22;

      // Institution name
      doc.setFontSize(26);
      doc.setFont('helvetica', 'normal');
      setColor(ink);
      doc.text(institutionName, marginX, y);
      y += 18;

      doc.setFontSize(10);
      setColor(inkMuted);
      doc.text(`Assessment completed ${today}`, marginX, y);
      y += 28;

      // Tier badge box
      setFill(ink);
      doc.rect(marginX, y, contentWidth, 60, 'F');

      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      setColor(gold);
      doc.text(tier.label.split(' · ')[0].toUpperCase(), marginX + 18, y + 20);

      doc.setFontSize(18);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(250, 247, 242);
      doc.text(tier.name, marginX + 18, y + 40);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      setColor(gold);
      const summary = doc.splitTextToSize(tier.summary, contentWidth - 36);
      doc.text(summary, marginX + 18, y + 54);

      y += 80;
    }

    function drawMetricRow() {
      const metrics = [
        { label: 'Overall maturity', value: overallScore + '/100' },
        { label: 'Coherence', value: coherence.score + '%' },
        { label: 'Priority gaps', value: domainResults.filter(r => r.score < 50).length + ' domains' },
        { label: 'Strongest', value: [...domainResults].sort((a,b)=>b.score-a.score)[0].domain.short }
      ];
      const colWidth = contentWidth / metrics.length;
      metrics.forEach((m, i) => {
        const x = marginX + colWidth * i;
        setFill([244, 239, 229]);
        doc.rect(x + 4, y, colWidth - 8, 56, 'F');
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        setColor(inkMuted);
        doc.text(m.label.toUpperCase(), x + 14, y + 16);
        doc.setFontSize(15);
        doc.setFont('helvetica', 'normal');
        setColor(ink);
        doc.text(m.value, x + 14, y + 38);
      });
      y += 76;
    }

    function drawSectionHeader(title) {
      newPageIfNeeded(40);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      setColor(ink);
      doc.text(title, marginX, y);
      y += 6;
      setDraw(gold);
      doc.setLineWidth(0.8);
      doc.line(marginX, y, marginX + 36, y);
      setDraw(inkMuted);
      doc.setLineWidth(0.4);
      y += 18;
    }

    function drawDomainScores() {
      drawSectionHeader('Domain scores');
      domainResults.forEach(r => {
        newPageIfNeeded(36);
        // Bar background
        setFill([244, 239, 229]);
        doc.rect(marginX, y, contentWidth, 28, 'F');
        // Score bar
        const barWidth = (r.score / 100) * contentWidth;
        const color = r.score >= 75 ? forest : r.score >= 50 ? gold : r.score >= 25 ? rust : crimson;
        setFill(color);
        doc.rect(marginX, y, barWidth, 28, 'F');
        // Label
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        setColor(ink);
        doc.text(r.domain.name, marginX + 10, y + 18);
        // Score on right
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text(r.score + '/100', marginX + contentWidth - 50, y + 18);
        y += 34;
      });
      y += 8;
    }

    function drawRecommendations() {
      drawSectionHeader('Priority recommendations');
      const prioritised = [...domainResults].sort((a, b) => a.score - b.score).slice(0, 3);
      prioritised.forEach(r => {
        const priority = getRecommendationPriority(r.score);
        const rec = getRecommendation(r.domain.id, r.score);
        const colour = priority === 'high' ? crimson : priority === 'medium' ? rust : forest;

        const lines = doc.splitTextToSize(rec, contentWidth - 24);
        const blockHeight = 24 + lines.length * 13 + 16;
        newPageIfNeeded(blockHeight);

        // Left border accent
        setFill(colour);
        doc.rect(marginX, y, 3, blockHeight - 8, 'F');

        // Priority pill
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        setColor(colour);
        doc.text(priority.toUpperCase() + ' · ' + r.domain.name + ' · ' + r.score + '/100', marginX + 12, y + 12);

        // Body
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        setColor(inkSoft);
        doc.text(lines, marginX + 12, y + 28);
        y += blockHeight;
      });
      y += 6;
    }

    function drawCoherence() {
      drawSectionHeader('Coherence diagnostic');
      const interp = getCoherenceInterpretation(coherence.score);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      setColor(inkSoft);
      const interpLines = doc.splitTextToSize(`${interp.label}: ${interp.description}`, contentWidth);
      doc.text(interpLines, marginX, y);
      y += interpLines.length * 13 + 12;

      COHERENCE_MODULE.questions.forEach(q => {
        newPageIfNeeded(20);
        const v = state[q.id];
        const labelText = v === 2 ? 'Yes' : v === 1 ? 'Partial' : v === 0 ? 'No' : '—';
        const colour = v === 2 ? forest : v === 1 ? rust : crimson;

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        setColor(inkSoft);
        const qLines = doc.splitTextToSize(q.text, contentWidth - 80);
        doc.text(qLines, marginX, y);

        doc.setFont('helvetica', 'bold');
        setColor(colour);
        doc.text(labelText, marginX + contentWidth - 50, y);
        y += qLines.length * 12 + 6;
      });
      y += 6;
    }

    function drawTierInterpretation() {
      drawSectionHeader('Tier interpretation · ' + tier.label);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      setColor(inkSoft);
      const lines = doc.splitTextToSize(tier.description, contentWidth);
      newPageIfNeeded(lines.length * 13 + 12);
      doc.text(lines, marginX, y);
      y += lines.length * 13 + 12;
    }

    function drawDomainDetails() {
      doc.addPage();
      y = 64;
      drawSectionHeader('Item-by-item responses');

      DOMAINS.forEach(domain => {
        const result = domainResults.find(r => r.domain.id === domain.id);
        newPageIfNeeded(50);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        setColor(ink);
        doc.text(domain.name + ' — ' + result.score + '/100', marginX, y);
        y += 16;

        domain.questions.forEach(q => {
          newPageIfNeeded(34);
          const v = state[q.id];
          const levels = ['Not in place', 'Emerging', 'Established', 'Embedded'];
          const levelLabel = v !== undefined ? levels[v] : '— not answered';

          doc.setFontSize(8);
          doc.setFont('helvetica', 'bold');
          setColor(gold);
          doc.text(q.id, marginX, y);

          doc.setFontSize(9);
          doc.setFont('helvetica', 'normal');
          setColor(ink);
          const qLines = doc.splitTextToSize(q.text, contentWidth - 28);
          doc.text(qLines, marginX + 24, y);
          y += qLines.length * 11 + 2;

          doc.setFontSize(8);
          doc.setFont('helvetica', 'italic');
          setColor(inkMuted);
          doc.text('→ ' + levelLabel, marginX + 24, y);
          y += 14;
        });
        y += 10;
      });
    }

    function drawFooter() {
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        setColor(inkMuted);
        doc.text('GAIA-HE · GenAI Governance Assessment Index for Higher Education', marginX, pageHeight - 32);
        doc.text(`Page ${i} of ${totalPages}`, pageWidth - marginX - 50, pageHeight - 32);
      }
    }

    // Build the document
    drawHeader();
    drawMetricRow();
    drawDomainScores();
    drawRecommendations();
    drawCoherence();
    drawTierInterpretation();
    drawDomainDetails();
    drawFooter();

    const safeName = institutionName.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    doc.save(`gaia-he-report-${safeName}-${new Date().toISOString().split('T')[0]}.pdf`);
  }

  window.GAIA_PDF = { export: exportPdf };
})();
