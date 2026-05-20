/**
 * GAIA-HE Results Dashboard
 * Computes scores from saved responses and renders the report with Chart.js.
 */

(function () {
  const STORAGE_KEY = 'gaia-he-responses';
  const NAME_KEY = 'gaia-he-institution';

  const { DOMAINS, COHERENCE_MODULE, getTier, getRecommendation, getRecommendationPriority, getCoherenceInterpretation } = window.GAIA_DATA;

  function loadState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
  }

  function computeDomainScore(domain, state) {
    const max = domain.questions.length * 3;
    let total = 0, answered = 0;
    domain.questions.forEach(q => {
      if (state[q.id] !== undefined && state[q.id] !== null) {
        total += state[q.id];
        answered++;
      }
    });
    if (answered === 0) return { score: 0, answered: 0, total: domain.questions.length };
    const proportionalMax = answered * 3;
    return {
      score: Math.round((total / proportionalMax) * 100),
      answered,
      total: domain.questions.length
    };
  }

  function computeCoherenceScore(state) {
    const max = COHERENCE_MODULE.questions.length * 2;
    let total = 0, answered = 0;
    COHERENCE_MODULE.questions.forEach(q => {
      if (state[q.id] !== undefined && state[q.id] !== null) {
        total += state[q.id];
        answered++;
      }
    });
    if (answered === 0) return { score: 0, answered: 0, total: COHERENCE_MODULE.questions.length };
    const proportionalMax = answered * 2;
    return {
      score: Math.round((total / proportionalMax) * 100),
      answered,
      total: COHERENCE_MODULE.questions.length
    };
  }

  function getCoherenceItemValueLabel(value) {
    if (value === 2) return { label: 'Yes', class: 'yes' };
    if (value === 1) return { label: 'Partial', class: 'partial' };
    if (value === 0) return { label: 'No', class: 'no' };
    return { label: '—', class: '' };
  }

  function renderNoData() {
    document.getElementById('results-root').innerHTML = `
      <div class="no-data">
        <h2>No assessment data found</h2>
        <p>Start the assessment to generate your institution's GenAI governance report.</p>
        <a href="assessment.html" class="btn btn-gold btn-arrow">Begin assessment</a>
      </div>
    `;
  }

  function render() {
    const state = loadState();
    if (Object.keys(state).length === 0) { renderNoData(); return; }

    const institutionName = localStorage.getItem(NAME_KEY) || 'Your Institution';
    const today = new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });

    // Domain scores
    const domainResults = DOMAINS.map(d => ({ domain: d, ...computeDomainScore(d, state) }));
    const overallScore = Math.round(
      domainResults.reduce((s, r) => s + r.score, 0) / domainResults.length
    );
    const coherence = computeCoherenceScore(state);
    const tier = getTier(overallScore);

    const itemsAnswered = domainResults.reduce((s, r) => s + r.answered, 0) + coherence.answered;
    const totalItems = domainResults.reduce((s, r) => s + r.total, 0) + coherence.total;

    // Strongest and weakest
    const sortedByScore = [...domainResults].sort((a, b) => b.score - a.score);
    const strongest = sortedByScore[0];
    const priorityCount = domainResults.filter(r => r.score < 50).length;

    // Recommendations (top 3 by score asc)
    const prioritised = [...domainResults].sort((a, b) => a.score - b.score).slice(0, 3);

    // Coherence interp
    const coherenceInterp = getCoherenceInterpretation(coherence.score);

    const root = document.getElementById('results-root');
    root.innerHTML = `
      <div class="results-header">
        <div class="results-header-left">
          <span class="eyebrow">GenAI Governance Maturity Report</span>
          <h1>${escapeHtml(institutionName)}</h1>
          <div class="results-header-meta">
            Assessment completed ${today} · ${itemsAnswered} of ${totalItems} items reviewed
          </div>
        </div>
        <div class="tier-badge">
          <div class="tier-badge-label">${tier.label.split(' · ')[0]}</div>
          <div class="tier-badge-name">${tier.name}</div>
          <div class="tier-badge-summary">${tier.summary}</div>
        </div>
      </div>

      <div class="metric-grid">
        <div class="metric">
          <div class="metric-label">Overall maturity</div>
          <div class="metric-value">${overallScore}<span class="metric-value-suffix">/ 100</span></div>
          <div class="metric-sub">Average across six domains</div>
        </div>
        <div class="metric">
          <div class="metric-label">Coherence</div>
          <div class="metric-value ${coherence.score < 50 ? 'critical' : coherence.score < 75 ? 'warning' : ''}">${coherence.score}<span class="metric-value-suffix">%</span></div>
          <div class="metric-sub" style="color: ${coherenceInterp.color};">${coherenceInterp.label}</div>
        </div>
        <div class="metric">
          <div class="metric-label">Strongest domain</div>
          <div class="metric-value" style="font-size: 22px; line-height: 1.2;">${escapeHtml(strongest.domain.short)}</div>
          <div class="metric-sub">${strongest.score} / 100</div>
        </div>
        <div class="metric">
          <div class="metric-label">Priority gaps</div>
          <div class="metric-value ${priorityCount > 0 ? 'critical' : ''}">${priorityCount}<span class="metric-value-suffix"> ${priorityCount === 1 ? 'domain' : 'domains'}</span></div>
          <div class="metric-sub">Scoring below 50</div>
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-card-title">Domain maturity profile</div>
        <div class="chart-card-sub">Score per governance domain — 0 (not in place) to 100 (embedded)</div>
        <div class="chart-canvas-wrap tall">
          <canvas id="radarChart" role="img" aria-label="Radar chart of domain maturity scores"></canvas>
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-card-title">Gap analysis</div>
        <div class="chart-card-sub">Distance from leading practice, sorted by priority</div>
        <div class="chart-canvas-wrap medium">
          <canvas id="gapChart" role="img" aria-label="Horizontal bar chart of gap to leading practice"></canvas>
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-card-title">Priority recommendations</div>
        <div class="chart-card-sub">Actions sorted by the size of the gap to leading practice</div>
        <div class="rec-list">
          ${prioritised.map(r => {
            const priority = getRecommendationPriority(r.score);
            return `
              <div class="rec-item ${priority}">
                <div class="rec-pill">${priority.toUpperCase()}</div>
                <div class="rec-body">
                  <div class="rec-title">${escapeHtml(r.domain.name)} · ${r.score}/100</div>
                  <div class="rec-text">${escapeHtml(getRecommendation(r.domain.id, r.score))}</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-card-title">Coherence diagnostic</div>
        <div class="chart-card-sub">How well your policies connect to each other</div>
        <div class="coherence-grid">
          ${COHERENCE_MODULE.questions.map(q => {
            const v = state[q.id];
            const meta = getCoherenceItemValueLabel(v);
            return `
              <div class="coherence-item">
                <span class="coherence-item-label">${escapeHtml(shortenCoherenceLabel(q.text))}</span>
                <span class="coherence-item-value ${meta.class}">${meta.label}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-card-title">Tier interpretation</div>
        <div class="chart-card-sub">${tier.label}</div>
        <p style="font-size: 15px; line-height: 1.65; color: var(--ink-soft);">${tier.description}</p>
      </div>

      <div class="action-bar">
        <button class="btn btn-gold" id="download-pdf-btn">Download PDF report</button>
        <a class="btn btn-outline" href="assessment.html">Review responses</a>
        <button class="btn btn-ghost" id="reset-btn">Reset assessment</button>
      </div>
    `;

    drawRadar(domainResults);
    drawGapChart(domainResults);

    document.getElementById('download-pdf-btn').addEventListener('click', () => {
      if (window.GAIA_PDF) window.GAIA_PDF.export({ state, domainResults, overallScore, coherence, tier, institutionName, today });
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
      if (confirm('Clear all assessment responses? This cannot be undone.')) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(NAME_KEY);
        window.location.href = 'index.html';
      }
    });
  }

  function shortenCoherenceLabel(text) {
    const map = {
      'Policies in different domains cross-reference each other where relevant': 'Cross-referenced policies',
      'There is a named senior accountable owner for GenAI governance': 'Named accountable owner',
      'A governance committee or working group oversees GenAI institution-wide': 'Governance committee',
      'Staff-facing and student-facing messaging is consistent and aligned': 'Staff & student alignment',
      'Terminology used across different GenAI policies is consistent': 'Consistent terminology',
      'A review and update cycle for GenAI policies is defined and active': 'Review cycle defined',
      'GenAI policies are integrated with broader institutional strategy': 'Strategy integration',
      'Implementation responsibility for GenAI policies is clearly assigned': 'Implementation owners'
    };
    return map[text] || text;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  // -------------------- Charts --------------------
  function drawRadar(domainResults) {
    const labels = domainResults.map(r => r.domain.short);
    const scores = domainResults.map(r => r.score);
    const target = scores.map(() => 85);

    new Chart(document.getElementById('radarChart'), {
      type: 'radar',
      data: {
        labels,
        datasets: [
          {
            label: 'Your institution',
            data: scores,
            backgroundColor: 'rgba(184, 137, 59, 0.2)',
            borderColor: '#B8893B',
            borderWidth: 2,
            pointBackgroundColor: '#B8893B',
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'Leading-practice benchmark',
            data: target,
            backgroundColor: 'rgba(45, 95, 79, 0.05)',
            borderColor: '#2D5F4F',
            borderWidth: 1.5,
            borderDash: [4, 4],
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: { stepSize: 25, display: false },
            pointLabels: { font: { size: 13, family: "'Inter Tight', sans-serif" }, color: '#1A2332' },
            grid: { color: 'rgba(26,35,50,0.08)' },
            angleLines: { color: 'rgba(26,35,50,0.08)' }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 14, font: { size: 12, family: "'Inter Tight', sans-serif" }, color: '#3B4759', padding: 16 }
          }
        }
      }
    });
  }

  function drawGapChart(domainResults) {
    const pairs = domainResults
      .map(r => ({ label: r.domain.short, gap: 100 - r.score, score: r.score }))
      .sort((a, b) => b.gap - a.gap);

    new Chart(document.getElementById('gapChart'), {
      type: 'bar',
      data: {
        labels: pairs.map(p => p.label),
        datasets: [{
          label: 'Gap to leading practice',
          data: pairs.map(p => p.gap),
          backgroundColor: pairs.map(p => p.gap >= 50 ? '#8B2842' : p.gap >= 30 ? '#B85C2C' : '#2D5F4F'),
          borderWidth: 0,
          barThickness: 22,
          borderRadius: 2
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            min: 0,
            max: 100,
            ticks: {
              callback: v => v + ' pts',
              font: { size: 11, family: "'Inter Tight', sans-serif" },
              color: '#6B7585'
            },
            grid: { color: 'rgba(26,35,50,0.06)' }
          },
          y: {
            ticks: { font: { size: 13, family: "'Inter Tight', sans-serif" }, color: '#1A2332' },
            grid: { display: false }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: c => `${c.parsed.x} point gap (score: ${100 - c.parsed.x}/100)`
            }
          }
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', render);
})();
