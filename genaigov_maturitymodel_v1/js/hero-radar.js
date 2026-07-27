/* ============================================================================
   HERO RADAR: the animated tier radar on the landing page.
   Axes and labels derive from the scoring (non-cross-cutting) domains in
   CONFIG, so adding or removing a domain reshapes the radar automatically.
   The illustrative per-tier value patterns below are cycled to fit however
   many axes exist.
   ========================================================================= */

const HR_TIER_PATTERNS=[
  {name:'Reactive',  color:'#9898c0', values:[8,5,10,6,4,7]},
  {name:'Emerging',  color:'#5a88d0', values:[55,20,15,12,18,15]},
  {name:'Developing',color:'#3a9a68', values:[60,55,40,35,45,38]},
  {name:'Coherent',  color:'#c09030', values:[80,75,70,65,72,68]},
  {name:'Leading',   color:'#b03050', values:[95,92,90,88,93,90]}
];

const HR_N=Math.max(3,SCORING.length);
const HR_LABELS=SCORING.map(d=>d.short);
const HR_TIERS=CONFIG.tiers.map((t,ti)=>{
  const pat=HR_TIER_PATTERNS[ti]||HR_TIER_PATTERNS[HR_TIER_PATTERNS.length-1];
  return{name:t.name,color:t.color,values:Array.from({length:HR_N},(_,i)=>pat.values[i%pat.values.length])};
});
const HR_CX=160,HR_CY=150,HR_R=95;

function hrPoint(i,pct){
  const angle=(Math.PI*2*i)/HR_N - Math.PI/2;
  const r=(pct/100)*HR_R;
  return[HR_CX+r*Math.cos(angle),HR_CY+r*Math.sin(angle)];
}

function hrInitGrid(){
  const grid=document.getElementById('hr-grid');
  if(!grid)return;
  let svg='';
  [0.25,0.5,0.75,1].forEach(f=>{
    const pts=[];
    for(let i=0;i<HR_N;i++){
      const[x,y]=hrPoint(i,f*100);
      pts.push(x+','+y);
    }
    svg+=`<polygon points="${pts.join(' ')}" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="1"/>`;
  });
  for(let i=0;i<HR_N;i++){
    const[x,y]=hrPoint(i,100);
    svg+=`<line x1="${HR_CX}" y1="${HR_CY}" x2="${x}" y2="${y}" stroke="rgba(255,255,255,.12)" stroke-width="1"/>`;
  }
  grid.innerHTML=svg;

  const labels=document.getElementById('hr-labels');
  let lsvg='';
  for(let i=0;i<HR_N;i++){
    const[x,y]=hrPoint(i,118);
    lsvg+=`<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-family="Inter, sans-serif" font-size="10" fill="rgba(255,255,255,.55)">${HR_LABELS[i]||''}</text>`;
  }
  labels.innerHTML=lsvg;
}

function hrRender(idx){
  const tier=HR_TIERS[idx];
  const poly=document.getElementById('hr-poly');
  const dots=document.getElementById('hr-dots');
  const label=document.getElementById('hr-tier-label');
  if(!poly)return;
  const pts=tier.values.map((v,i)=>hrPoint(i,v).join(',')).join(' ');
  poly.setAttribute('points',pts);
  poly.setAttribute('fill',tier.color+'2e');
  poly.setAttribute('stroke',tier.color);
  let dsvg='';
  tier.values.forEach((v,i)=>{
    const[x,y]=hrPoint(i,v);
    dsvg+=`<circle cx="${x}" cy="${y}" r="3" fill="${tier.color}"/>`;
  });
  dots.innerHTML=dsvg;
  if(label){
    label.style.opacity=0;
    setTimeout(()=>{
      label.textContent=`Tier ${idx+1} · ${tier.name}`;
      label.style.opacity=1;
    },300);
  }
}

let hrIdx=0;
