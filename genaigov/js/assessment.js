/**
 * GAIA-HE Assessment Wizard
 * Renders domains and coherence module, handles answers, persists to localStorage.
 */

(function () {
  const STORAGE_KEY = 'gaia-he-responses';
  const NAME_KEY = 'gaia-he-institution';

  const { DOMAINS, COHERENCE_MODULE } = window.GAIA_DATA;
  const ALL_SECTIONS = [...DOMAINS, COHERENCE_MODULE];
  const TOTAL_ITEMS = DOMAINS.reduce((s, d) => s + d.questions.length, 0) + COHERENCE_MODULE.questions.length;

  let state = loadState();
  let currentStep = 0;

  // -------------------- State --------------------
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      flashSaved();
    } catch (e) { /* localStorage unavailable */ }
  }

  function flashSaved() {
    const el = document.getElementById('save-status');
    if (!el) return;
    el.textContent = 'Saved';
    el.classList.add('visible');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('visible'), 1200);
  }

  // -------------------- Institution name --------------------
  function bindInstitutionName() {
    const input = document.getElementById('institution-name');
    if (!input) return;
    input.value = localStorage.getItem(NAME_KEY) || '';
    input.addEventListener('input', () => {
      localStorage.setItem(NAME_KEY, input.value);
      flashSaved();
    });
  }

  // -------------------- Tabs --------------------
  function renderTabs() {
    const container = document.getElementById('domain-tabs');
    container.innerHTML = '';
    ALL_SECTIONS.forEach((section, i) => {
      const btn = document.createElement('button');
      btn.className = 'domain-tab';
      if (i === currentStep) btn.classList.add('active');
      if (isSectionComplete(section)) btn.classList.add('complete');
      btn.textContent = section.short;
      btn.addEventListener('click', () => { currentStep = i; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
      container.appendChild(btn);
    });
  }

  function isSectionComplete(section) {
    return section.questions.every(q => state[q.id] !== undefined && state[q.id] !== null);
  }

  // -------------------- Domain rendering --------------------
  function render() {
    const section = ALL_SECTIONS[currentStep];
    const isCoherence = section.id === 'coherence';
    const content = document.getElementById('domain-content');

    const accentColour = section.color || 'var(--gold)';

    content.innerHTML = `
      <div class="domain-intro" style="--accent: ${accentColour};">
        <h2>${section.name}</h2>
        <p>${section.description}</p>
      </div>
    `;

    section.questions.forEach(q => {
      const card = document.createElement('div');
      card.className = 'question-card';
      if (state[q.id] !== undefined) card.classList.add('answered');

      const optionsHtml = isCoherence
        ? renderCoherenceOptions(q)
        : renderMaturityOptions(q);

      card.innerHTML = `
        <div class="question-header">
          <div class="question-id">${q.id}</div>
          <div class="question-text">${q.text}</div>
        </div>
        ${optionsHtml}
      `;
      content.appendChild(card);
    });

    // Wire up radio handlers
    content.querySelectorAll('input[type="radio"]').forEach(input => {
      input.addEventListener('change', e => {
        const qid = e.target.name;
        const val = parseInt(e.target.value, 10);
        state[qid] = val;
        saveState();
        e.target.closest('.question-card').classList.add('answered');
        updateProgress();
        renderTabs();
      });
    });

    renderTabs();
    updateProgress();
    updateNavButtons();
  }

  function renderMaturityOptions(q) {
    const labels = ['Not in place', 'Emerging', 'Established', 'Embedded'];
    const current = state[q.id];
    return `<div class="options">
      ${q.levels.map((desc, i) => `
        <label class="option">
          <input type="radio" name="${q.id}" value="${i}" ${current === i ? 'checked' : ''}>
          <span class="option-level">${labels[i]}</span>
          <span class="option-description">${desc}</span>
        </label>
      `).join('')}
    </div>`;
  }

  function renderCoherenceOptions(q) {
    const current = state[q.id];
    return `<div class="coherence-options">
      ${COHERENCE_MODULE.options.map(opt => `
        <label class="option">
          <input type="radio" name="${q.id}" value="${opt.value}" ${current === opt.value ? 'checked' : ''}>
          <span class="option-level">${opt.label}</span>
        </label>
      `).join('')}
    </div>`;
  }

  // -------------------- Progress --------------------
  function updateProgress() {
    const answered = countAnswered();
    document.getElementById('progress-label').textContent =
      `${answered} of ${TOTAL_ITEMS} items answered`;
    const pct = Math.round((answered / TOTAL_ITEMS) * 100);
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('step-indicator').textContent =
      `Step ${currentStep + 1} of ${ALL_SECTIONS.length}`;
  }

  function countAnswered() {
    let count = 0;
    ALL_SECTIONS.forEach(s => s.questions.forEach(q => {
      if (state[q.id] !== undefined && state[q.id] !== null) count++;
    }));
    return count;
  }

  // -------------------- Navigation --------------------
  function updateNavButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    prevBtn.disabled = currentStep === 0;
    prevBtn.style.opacity = currentStep === 0 ? '0.4' : '1';
    prevBtn.style.pointerEvents = currentStep === 0 ? 'none' : 'auto';

    if (currentStep === ALL_SECTIONS.length - 1) {
      const allDone = ALL_SECTIONS.every(isSectionComplete);
      nextBtn.textContent = allDone ? 'View results →' : 'View partial results →';
      nextBtn.className = allDone ? 'btn btn-gold' : 'btn';
      nextBtn.onclick = () => { window.location.href = 'results.html'; };
    } else {
      nextBtn.textContent = 'Next domain →';
      nextBtn.className = 'btn btn-arrow';
      nextBtn.onclick = () => { currentStep++; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    }
  }

  // -------------------- Init --------------------
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('assessment-title').textContent = 'GenAI Governance Assessment';

    bindInstitutionName();

    document.getElementById('prev-btn').addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    render();
  });
})();
