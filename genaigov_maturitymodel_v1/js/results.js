/* ============================================================================
   RESULTS: results page, charts, and Excel export.
   Uses the CALC engine, so all outputs update automatically when config.js
   changes. The cross-cutting diagnostic block binds to the first domain in
   CONFIG marked crossCutting (hidden if none exists).
   ========================================================================= */

let rC=null,bC=null;
let lastResults=null;

function showResults(){
  const ds=computeDomainScores(ans);
  const {main,op}=computeOverall(ds);
  const tier=tierFor(op);
  const srt=[...main].sort((a,b)=>b.pct-a.pct);

  lastResults={ds,main,op,tier,tierName:TNAMES[tier]};

  document.getElementById('r-score').textContent=op+'%';
  const tb=document.getElementById('r-tier-badge');
  tb.textContent=`Tier ${tier} · ${TNAMES[tier]}`;tb.style.background=TBG[tier];tb.style.color=TCOLS[tier];
  const strongEl=document.getElementById('r-strong');
  const priorityEl=document.getElementById('r-priority');
  const strongCard=strongEl.closest('.scard');
  const priorityCard=priorityEl.closest('.scard');

  if(op===0){
    strongCard.style.display='none';
    priorityCard.style.display='none';
  }else{
    strongCard.style.display='';
    priorityCard.style.display='';
    strongEl.textContent=srt[0].name;
    priorityEl.textContent=srt[srt.length-1].name;
  }

  for(let t=1;t<=CONFIG.tiers.length;t++){
    const p=document.getElementById('tp-'+t);
    if(p)p.style.background=t<=tier?TCOLS[tier]:'var(--s3)';
  }
  document.getElementById('r-tier-desc').textContent=TDESC2[tier];

  document.getElementById('d-bars').innerHTML=main.map(d=>`
    <div class="dbarrow"><div class="dblbl">${d.name}</div><div class="dbwrap"><div class="db" style="width:${d.pct}%"></div></div><div class="dbval">${d.pct}%</div></div>`).join('');

  // Cross-cutting diagnostic (e.g. Coherence): first CONFIG domain flagged crossCutting
  const cohPctEl=document.getElementById('r-coh-pct');
  const coh=CROSS.length?ds[CROSS[0].index]:null;
  if(coh&&cohPctEl){
    const band=coh.pct<34?['Low coherence','#b03050']:coh.pct<67?['Moderate coherence','#c09030']:['High coherence','#3a9a68'];
    cohPctEl.textContent=coh.pct+'%';
    const be=document.getElementById('r-coh-band');
    be.textContent=band[0];be.style.color=band[1];
    const bar=document.getElementById('r-coh-bar');
    bar.style.width=coh.pct+'%';bar.style.background=band[1];
    document.getElementById('r-coh-note').textContent=
      coh.pct<34?'Policies exist largely in isolation: little shared ownership, terminology drift, and uncoordinated review cycles. Strengthening coherence is typically the binding constraint on reaching Tier 4.':
      coh.pct<67?'Partial integration: some cross-referencing and shared ownership, but terminology and review cycles are not yet consistent across all domains.':
      'Strong integration: named ownership, consistent terminology, cross-referenced policies, and coordinated review cycles across domains.';
  }else if(cohPctEl){
    const card=cohPctEl.closest('.rescard')||cohPctEl.closest('.scard')||cohPctEl.parentElement;
    if(card)card.style.display='none';
  }

  if(op===0){
    document.getElementById('recs').innerHTML=`<div class="reccrd" style="border-left-color:var(--ink-faint)">
      <div class="recpri">No evidence recorded</div>
      <div class="rectit">No GenAI governance policy currently appears to be in place</div>
      <div class="rectxt">Every indicator across all ${SCORING.length===6?'six':SCORING.length} domains was rated "${SCALE[0]}." This suggests the institution has not yet begun to formally govern generative AI use. Consider starting with a single foundational step, such as publishing an institutional position statement on GenAI, before working through the priority areas in detail.</div>
    </div>`;
  }else{
    const weak=weakestDomains(main,3);
    const bc=['#b03050','#c09030','#3a9a68'],pl=['Highest priority','High priority','Moderate priority'];
    document.getElementById('recs').innerHTML=weak.map((d,r)=>{
      const dom=DOMAINS[d.index];
      const recLines=dom.recs&&dom.recs.length?dom.recs:[
        `Establish clear, published institutional policy covering ${dom.name}`,
        `Assign named ownership and a defined review cycle for ${dom.name} governance`,
        `Embed ${dom.name} requirements into staff and student guidance, training, and templates`];
      return`<div class="reccrd" style="border-left-color:${bc[r]}">
        <div class="recpri">${pl[r]} · ${dom.name} (current score: ${d.pct}%)</div>
        <div class="rectit">Strengthen ${dom.name} governance to advance institutional maturity</div>
        <div class="rectxt"><ul style="list-style:none;padding:0">${recLines.map(x=>`<li style="padding:3px 0 3px 16px;position:relative"><span style="position:absolute;left:0;color:var(--navy2)">→</span>${x}</li>`).join('')}</ul></div>
      </div>`;
    }).join('');
  }

  document.getElementById('assess-view').classList.add('hidden');
  document.getElementById('results-view').classList.remove('hidden');
  window.scrollTo({top:0,behavior:'auto'});
  armSurveyReveal();
  setTimeout(()=>{buildR(main);buildB(ds);},120);
}

/* The feedback panel is held back until the reader has worked through the
   score, the charts, and the recommendations. It is revealed when the end of
   the recommendations comes into view, so the results always come first. */
let surveyObs=null;

function revealSurvey(){
  const s=document.getElementById('survey-cta');
  if(!s)return;
  if(surveyObs){surveyObs.disconnect();surveyObs=null;}
  s.classList.remove('is-pending');
}

function armSurveyReveal(){
  const s=document.getElementById('survey-cta');
  const t=document.getElementById('survey-trigger');
  if(!s)return;
  s.classList.add('is-pending');
  if(surveyObs){surveyObs.disconnect();surveyObs=null;}

  if(!t||typeof IntersectionObserver==='undefined'){revealSurvey();return;}

  surveyObs=new IntersectionObserver(entries=>{
    if(entries.some(e=>e.isIntersecting))revealSurvey();
  },{threshold:0});
  surveyObs.observe(t);
}

// A printed or exported report should always carry the survey, whether or not
// the reader scrolled that far on screen.
window.addEventListener('beforeprint',revealSurvey);

function exportExcel(){
  if(!lastResults||typeof XLSX==='undefined'){
    alert('Excel export is unavailable. Please ensure you have generated your results and try again.');
    return;
  }
  const {ds,op,tier,tierName}=lastResults;
  const today=new Date().toISOString().slice(0,10);

  const wb=XLSX.utils.book_new();

  const summaryRows=[
    ['GenAI Governance Maturity Model: Self-Assessment Results'],
    ['ASEF INNOLAB7'],
    ['Date generated',today],
    [],
    ['Overall score (0-100)',op],
    ['Maturity tier','Tier '+tier+': '+tierName],
    [],
    ['Domain','Raw score','Max possible','Score (%)']
  ];
  ds.forEach(d=>{
    summaryRows.push([d.fullName,d.score,d.max,d.pct]);
  });
  const summaryWS=XLSX.utils.aoa_to_sheet(summaryRows);
  summaryWS['!cols']=[{wch:38},{wch:14},{wch:14},{wch:12}];
  XLSX.utils.book_append_sheet(wb,summaryWS,'Summary');

  const detailHeader=['Domain','Question number','Indicator question',`Response (0-${MAXV})`,'Response label'];
  const detailRows=[detailHeader];
  DOMAINS.forEach((d,di)=>{
    d.qs.forEach((q,qi)=>{
      const v=ans[`${di}-${qi}`];
      detailRows.push([
        d.name,
        qi+1,
        q.t,
        v===null||v===undefined?'':v,
        v===null||v===undefined?'Not answered':SCALE[v]
      ]);
    });
  });
  const detailWS=XLSX.utils.aoa_to_sheet(detailRows);
  detailWS['!cols']=[{wch:26},{wch:14},{wch:70},{wch:14},{wch:22}];
  XLSX.utils.book_append_sheet(wb,detailWS,'Indicator Responses');

  // Pilot Sheet: row-for-row aligned with the institution sheets
  // of the Pilot Data Collection workbook, for direct copy-paste.
  const lastDataRow=11+TOTAL_QS;
  const pilotRows=[
    ['Institution __ : Pilot Self-Assessment'],
    [`Copy-paste guide: for AI Auditor results select A12:D${lastDataRow} (evidence included); for manual self-assessments select A12:C${lastDataRow} and complete the Evidence column in the workbook. Copy, then in your institution sheet right-click cell A12 and Paste Special > Values. Complete the Context Record there.`],
    ['Region',''],
    ['Institution type (public/private, teaching/research-intensive)',''],
    ['Approximate student headcount',''],
    ['Assessment date (DD MMM YYYY)',today],
    ['Facilitator (role only, no names)',''],
    ['Participant roles (list)',''],
    ['Evidence sources consulted (list)',''],
    [],
    ['Domain','Indicator',`Score (0-${MAXV})`,'Evidence cited (document, section, year)']
  ];
  DOMAINS.forEach((d,di)=>{
    d.qs.forEach((q,qi)=>{
      const v=ans[`${di}-${qi}`];
      const ev=(auditEvidence&&auditEvidence[`${di}-${qi}`])?auditEvidence[`${di}-${qi}`]:'';
      pilotRows.push([qi===0?d.name:'',q.t,(v===null||v===undefined)?'':v,ev]);
    });
  });
  const pilotWS=XLSX.utils.aoa_to_sheet(pilotRows);
  pilotWS['!cols']=[{wch:30},{wch:78},{wch:12},{wch:46}];
  XLSX.utils.book_append_sheet(wb,pilotWS,'Pilot Sheet');

  XLSX.writeFile(wb,'GenAI-Governance-Self-Assessment-'+today+'.xlsx');
}

const BAR_PALETTE=['#2e3f8a','#1a5a8a','#1a7a5a','#7a5a1a','#5a1a7a','#7a1a3a','#4a4a8a'];

function buildR(m){
  if(rC)rC.destroy();
  const ctx=document.getElementById('radar-c').getContext('2d');
  rC=new Chart(ctx,{type:'radar',data:{labels:m.map(d=>d.name),datasets:[{label:'Your institution',data:m.map(d=>d.pct),backgroundColor:'rgba(30,45,107,0.1)',borderColor:'#1e2d6b',borderWidth:2,pointBackgroundColor:'#1e2d6b',pointRadius:4,pointHoverRadius:6,fill:true}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},
      scales:{r:{min:0,max:100,ticks:{stepSize:25,font:{size:10},color:'#9898b2',backdropColor:'transparent'},grid:{color:'#d6d6e6'},pointLabels:{font:{size:11},color:'#35355a'},angleLines:{color:'#d6d6e6'}}}}});
}
function buildB(ds){
  if(bC)bC.destroy();
  const ctx=document.getElementById('bar-c').getContext('2d');
  bC=new Chart(ctx,{type:'bar',
    data:{labels:ds.map(d=>d.name),datasets:[{label:'Score %',data:ds.map(d=>d.pct),backgroundColor:ds.map((_,i)=>BAR_PALETTE[i%BAR_PALETTE.length]),borderRadius:3,borderSkipped:false}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},
      scales:{y:{min:0,max:100,ticks:{font:{size:11},color:'#9898b2',callback:v=>v+'%'},grid:{color:'#eeeeF4'}},x:{ticks:{font:{size:11},color:'#35355a',autoSkip:false},grid:{display:false}}}}});
}
