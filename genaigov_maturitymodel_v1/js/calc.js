/* ============================================================================
   CALC: the scoring engine. Entirely driven by CONFIG (js/config.js).
   ---------------------------------------------------------------------------
   - Domain score  = sum of answers / (questions × max scale value)
   - Overall score = total raw / total max across NON-cross-cutting domains
   - Maturity tier = looked up against CONFIG.tierThresholds
   Add, remove, reorder, or resize domains/questions in config.js and every
   number produced here updates automatically. No counts are hard-coded.
   ========================================================================= */

/* Score every domain from the current answers object. */
function computeDomainScores(answers){
  return DOMAINS.map((d,di)=>{
    const raw=d.qs.reduce((s,_,qi)=>s+(answers[`${di}-${qi}`]??0),0);
    const mx=d.qs.length*MAXV;
    return{index:di,id:d.id,name:d.short,fullName:d.name,crossCutting:!!d.crossCutting,
      score:raw,max:mx,pct:mx?Math.round(raw/mx*100):0};
  });
}

/* Overall percentage across scoring (non-cross-cutting) domains only. */
function computeOverall(ds){
  const main=ds.filter(d=>!d.crossCutting);
  const rT=main.reduce((s,d)=>s+d.score,0);
  const rM=main.reduce((s,d)=>s+d.max,0);
  return{main,op:rM?Math.round(rT/rM*100):0};
}

/* Map an overall percentage to a maturity tier via configured thresholds.
   Default thresholds [0,20,40,60,80] reproduce the original mapping:
   >80 → 5, >60 → 4, >40 → 3, >20 → 2, otherwise 1. */
function tierFor(op){
  const t=CONFIG.tierThresholds.filter(th=>op>th).length;
  return Math.max(1,Math.min(CONFIG.tiers.length,t));
}

/* Weakest N scoring domains (for prioritised recommendations). */
function weakestDomains(main,n){
  return main.map(d=>({...d,i:d.index})).sort((a,b)=>a.pct-b.pct).slice(0,n);
}
