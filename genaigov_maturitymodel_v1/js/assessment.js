/* ============================================================================
   ASSESSMENT: sidebar, intro page, question rendering, answers, progress.
   All section lists, counts, rating buttons, and totals are generated from
   CONFIG — changing domains/questions/scale in config.js updates everything.
   ========================================================================= */

let curD=0,ans={};
DOMAINS.forEach((d,di)=>d.qs.forEach((_,qi)=>{ans[`${di}-${qi}`]=null;}));

/* Build the section sidebar and the rating guide from CONFIG. */
function buildSidebar(){
  const list=document.getElementById('aside-items');
  if(list){
    list.innerHTML=DOMAINS.map((d,di)=>
      `<div class="asitem${di===0?' active':''}" onclick="goD(${di})" id="sd-${di}">${d.short==='T&L'?'Teaching &amp; Learning':d.name.replace(/&/g,'&amp;')}<div class="ascheck" id="sc-${di}">${di+1}</div></div>`
    ).join('');
  }
  const guide=document.getElementById('sb-rating-guide');
  if(guide){
    guide.innerHTML=CONFIG.scale.map(s=>`${s.value} = ${s.label}`).join('<br>\n        ');
  }
}

function renderIntro(){
  updMobNav();
  const scoringNames=SCORING.map(d=>d.name);
  const seq=DOMAINS.map(d=>d.short).join(' → ');
  const h=`<div class="assess-intro">
    <div class="intro-hero">
      <div class="intro-hero-ey">ASEF INNOLAB7 · GenAI Governance Maturity Model</div>
      <h2 class="intro-hero-h">Institutional Self-Assessment Tool</h2>
      <p class="intro-hero-sub">This instrument enables your institution to diagnose its current GenAI governance maturity across ${SCORING.length===6?'six':SCORING.length} policy domains. Your responses generate an evidence-based profile, a Tier 1–${CONFIG.tiers.length} classification, and prioritised recommendations for governance advancement.</p>
      <div class="intro-stats">
        <div class="intro-stat"><span class="intro-stat-n">${DOMAINS.length}</span><span class="intro-stat-l">Sections</span></div>
        <div class="intro-stat"><span class="intro-stat-n">${TOTAL_QS}</span><span class="intro-stat-l">Indicators</span></div>
        <div class="intro-stat"><span class="intro-stat-n">15–20</span><span class="intro-stat-l">Minutes</span></div>
        <div class="intro-stat"><span class="intro-stat-n">0–100</span><span class="intro-stat-l">Score range</span></div>
      </div>
    </div>

    <div class="who-box">
      <div class="who-icon"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg></div>
      <div class="who-text"><strong>Who should complete this assessment?</strong>
      This tool is designed for a senior governance lead, AI working group, academic committee, or quality assurance team with access to institutional policy documentation. For best results, complete it collaboratively with representatives from academic, student services, research, IT, and legal functions. Rate based on <em>documented, evidenced practice</em>, not intended or aspirational policy.</div>
    </div>

    <div style="margin-bottom:1.5rem">
      <div style="font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-faint);margin-bottom:1rem">How to use this tool</div>
      <div class="how-to-grid">
        <div class="how-to-card">
          <div class="how-to-num">1</div>
          <div class="how-to-title">Gather evidence first</div>
          <div class="how-to-text">Before scoring, locate your institution's relevant policy documents for each domain. Each section includes a guidance note on what evidence to look for. Scoring from memory rather than documentation will reduce accuracy.</div>
        </div>
        <div class="how-to-card">
          <div class="how-to-num">2</div>
          <div class="how-to-title">Rate honestly, not aspirationally</div>
          <div class="how-to-text">Each indicator is scored 0–${MAXV}. If a policy exists informally or in draft, score 1 (${SCALE[1]||''}). Only score ${MAXV} (${SCALE[MAXV]}) when the practice is documented, implemented, and actively monitored. When in doubt, choose the lower score.</div>
        </div>
        <div class="how-to-card">
          <div class="how-to-num">3</div>
          <div class="how-to-title">Complete all ${['zero','one','two','three','four','five','six','seven','eight','nine','ten'][DOMAINS.length]||DOMAINS.length} sections</div>
          <div class="how-to-text">Work through ${seq} in order.${CROSS.length?` The ${CROSS[0].name} section (${CROSS[0].index+1}) assesses integration across the other ${scoringNames.length===6?'six':scoringNames.length}; complete it last.`:''}</div>
        </div>
        <div class="how-to-card">
          <div class="how-to-num">4</div>
          <div class="how-to-title">Review your governance profile</div>
          <div class="how-to-text">Your results page shows an overall score, maturity tier, radar chart, domain breakdown, and three prioritised recommendations. Use these to inform your institutional AI governance roadmap and strategic planning.</div>
        </div>
      </div>
    </div>

    <div style="margin-bottom:1.75rem">
      <div style="font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-faint);margin-bottom:.9rem">Rating scale: what each score means</div>
      <div class="scale-visual">
        ${CONFIG.scale.map(s=>`<div class="sv-cell">
          <div class="sv-num" style="background:${s.color}">${s.value}</div>
          <div class="sv-label">${s.label}</div>
          <div class="sv-desc">${s.desc}</div>
        </div>`).join('')}
      </div>
    </div>

    ${CROSS.length?`<div style="background:var(--s2);border:1px solid var(--rule);border-radius:var(--rl);padding:1.25rem 1.5rem;margin-bottom:2rem;font-size:13px;color:var(--ink-mid);line-height:1.65">
      <strong style="color:var(--ink);font-size:13.5px;display:block;margin-bottom:.4rem">A note on the ${CROSS[0].name} section</strong>
      Section ${CROSS[0].index+1} (${CROSS[0].name}) is a cross-cutting diagnostic. It does not add to your domain score but is assessed separately. It examines whether your ${scoringNames.length===6?'six':scoringNames.length} domain policies are integrated, consistently worded, and governed as a unified whole. Institutions frequently score well in individual domains while failing on coherence. This is the binding constraint at Tier 3 and above.
    </div>`:''}

    <button class="btnp" style="font-size:14px;padding:.75rem 2rem" onclick="goD(0)">Begin Assessment: Section 1, ${DOMAINS[0].name.replace(/&/g,'&amp;')} →</button>
  </div>`;
  document.getElementById('amain').innerHTML=h;
}

function renderD(di){
  curD=di;
  document.querySelectorAll('.asitem').forEach((el,i)=>el.classList.toggle('active',i===di));
  const d=DOMAINS[di];
  const ctx=d.evidence||{tip:'',note:''};
  let h=`<div class="dhdr">
    <div class="dhdr-ey">Section ${di+1} of ${DOMAINS.length} · GenAI Governance Self-Assessment</div>
    <h2 class="dhdr-h">${d.name}</h2>
    <p class="dhdr-s">${d.desc}</p>
  </div>
  <div class="domain-ctx">
    <div class="domain-ctx-title">Evidence guidance for this section</div>
    <div class="domain-ctx-text">${ctx.tip}</div>
    <div class="domain-ctx-tip">💡 ${ctx.note}</div>
  </div>`;
  d.qs.forEach((q,qi)=>{
    const k=`${di}-${qi}`,cv=ans[k];
    h+=`<div class="qblk">
      <div class="qtxt">${qi+1}. ${q.t}</div>
      <div class="rrow">
        ${CONFIG.scale.map((s,v)=>`<div class="rbtn ${cv===v?'sel':''}" onclick="setA(${di},${qi},${v},this)"><div class="rcirc">${v}</div><div class="rlbl">${s.label}</div></div>${v<MAXV?'<div class="rsep"></div>':''}`).join('')}
      </div>
    </div>`;
  });
  const last=di===DOMAINS.length-1;
  const allAnswered=d.qs.every((_,qi)=>ans[`${di}-${qi}`]!==null);
  const nextLabel=!last?`Next: ${DOMAINS[di+1].name} →`:`Generate Results →`;
  const nextAction=!last?`goD(${di+1})`:`showResults()`;
  h+=`<div class="navbtns">
    ${di>0?`<button class="btns" onclick="goD(${di-1})">← Previous</button>`:''}
    <button class="btnp" id="next-btn" onclick="${nextAction}" ${allAnswered?'':'disabled'}>${nextLabel}</button>
    ${allAnswered?'':'<span class="navbtns-hint">Answer all questions in this section to continue</span>'}
  </div>`;
  document.getElementById('amain').innerHTML=h;
  updProg();
  updMobNav();
}

function goD(di){
  if(di>curD){
    const d=DOMAINS[curD];
    const allAnswered=d.qs.every((_,qi)=>ans[`${curD}-${qi}`]!==null);
    if(!allAnswered)return;
  }
  renderD(di);
  document.getElementById('amain').scrollIntoView({behavior:'smooth',block:'start'});
}

function setA(di,qi,v,btn){
  ans[`${di}-${qi}`]=v;
  btn.closest('.qblk').querySelectorAll('.rbtn').forEach(b=>b.classList.remove('sel'));
  btn.classList.add('sel');
  updProg();updCheck(di);
  updNavState(di);
}

function updNavState(di){
  const d=DOMAINS[di];
  const allAnswered=d.qs.every((_,qi)=>ans[`${di}-${qi}`]!==null);
  const nextBtn=document.getElementById('next-btn');
  const hint=document.querySelector('.navbtns-hint');
  if(nextBtn)nextBtn.disabled=!allAnswered;
  if(allAnswered&&hint)hint.remove();
  if(!allAnswered&&!hint&&nextBtn){
    const span=document.createElement('span');
    span.className='navbtns-hint';
    span.textContent='Answer all questions in this section to continue';
    nextBtn.insertAdjacentElement('afterend',span);
  }
}

function updMobNav(){
  const c=document.getElementById('mob-sec-items');
  if(!c)return;
  c.innerHTML=DOMAINS.map((d,i)=>{
    const done=d.qs.every((_,qi)=>ans[`${i}-${qi}`]!==null);
    const active=i===curD;
    return`<button onclick="goD(${i})" style="padding:.35rem .75rem;border-radius:20px;border:1.5px solid ${active?'var(--navy)':done?'var(--teal)':'var(--rule)'};background:${active?'var(--navy)':done?'var(--tealL)':'var(--surface)'};color:${active?'#fff':done?'var(--teal)':'var(--ink-mid)'};font-size:11.5px;font-weight:${active?'600':'500'};cursor:pointer;white-space:nowrap;font-family:var(--fb)">${i+1}. ${d.short||d.name}</button>`;
  }).join('');
}

function updProg(){
  const tot=Object.keys(ans).length,dn=Object.values(ans).filter(v=>v!==null).length;
  const p=tot?Math.round(dn/tot*100):0;
  const pf=document.getElementById('prog-fill');
  const pp=document.getElementById('prog-pct');
  if(pf)pf.style.width=p+'%';
  if(pp)pp.textContent=p+'%';
  updMobNav();
}

function updCheck(di){
  const ok=DOMAINS[di].qs.every((_,qi)=>ans[`${di}-${qi}`]!==null);
  const el=document.getElementById('sc-'+di);
  if(ok){el.classList.add('ck');el.textContent='✓';document.getElementById('sd-'+di).classList.add('doned');}
}

function resetA(){
  if(!confirm(`This will clear all ${TOTAL_QS} responses and any AI audit evidence, and start a fresh assessment. Continue?`))return;
  auditEvidence=null;
  lastResults=null;
  if(typeof audScores!=='undefined')audScores=null;
  DOMAINS.forEach((d,di)=>d.qs.forEach((_,qi)=>{ans[`${di}-${qi}`]=null;}));
  curD=0;
  document.getElementById('assess-view').classList.remove('hidden');
  document.getElementById('results-view').classList.add('hidden');
  document.querySelectorAll('.asitem').forEach(el=>el.classList.remove('active','doned'));
  document.querySelectorAll('[id^="sc-"]').forEach((el,i)=>{el.classList.remove('ck');el.textContent=i+1;});
  curD=0;
  updMobNav();
  renderIntro();
}
