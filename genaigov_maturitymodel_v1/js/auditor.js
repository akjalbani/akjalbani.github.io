/* ============================================================================
   AI AUDITOR: document upload / URL discovery and Claude-based scoring.
   Domain loops, indicator counts, scoring rubric, and review buttons all
   derive from CONFIG, so config changes flow through automatically.
   ========================================================================= */

let audFiles=[];          // {name, kind:'pdf'|'text', data(base64)|text}
let audScores=null;       // {di-qi: {score, evidence}}

function audAddFiles(fileList){
  const jobs=[...fileList].map(f=>new Promise((res)=>{
    const ext=f.name.split('.').pop().toLowerCase();
    const r=new FileReader();
    if(ext==='pdf'){
      r.onload=()=>res({name:f.name,kind:'pdf',data:r.result.split(',')[1],size:f.size});
      r.readAsDataURL(f);
    }else if(ext==='docx'){
      r.onload=()=>{
        mammoth.extractRawText({arrayBuffer:r.result})
          .then(o=>res({name:f.name,kind:'text',text:o.value,size:f.size}))
          .catch(()=>res({name:f.name,kind:'error'}));
      };
      r.readAsArrayBuffer(f);
    }else{
      r.onload=()=>res({name:f.name,kind:'text',text:r.result,size:f.size});
      r.readAsText(f);
    }
  }));
  Promise.all(jobs).then(items=>{
    items.forEach(it=>{
      if(it.kind==='error'){audShowError(`Could not read ${it.name}. Try PDF or TXT.`);return;}
      audFiles.push(it);
    });
    audRenderFiles();
  });
  document.getElementById('aud-files').value='';
}

function audRenderFiles(){
  const el=document.getElementById('aud-file-list');
  el.innerHTML=audFiles.map((f,i)=>`<div class="aud-file"><span>${f.name}</span><span style="color:var(--ink-faint)">${(f.size/1024).toFixed(0)} KB</span><button onclick="audFiles.splice(${i},1);audRenderFiles()">Remove</button></div>`).join('');
  const total=audFiles.reduce((s,f)=>s+(f.size||0),0);
  document.getElementById('aud-run').disabled=(audFiles.length===0&&audVerifiedUrls.length===0);
  if(total>15*1024*1024)audShowError('Total upload exceeds 15 MB; analysis may fail. Consider removing a document.');
  else audHideError();
}

function audShowError(msg){const e=document.getElementById('aud-error');e.textContent=msg;e.classList.remove('hidden');}
function audHideError(){document.getElementById('aud-error').classList.add('hidden');}

let audUrls=[];          // discovered {title,url,why,checked}
let audVerifiedUrls=[];  // confirmed by the human

async function audDiscover(){
  const key=document.getElementById('aud-key').value.trim();
  const uni=document.getElementById('aud-uni').value.trim();
  const country=document.getElementById('aud-country').value.trim();
  const site=document.getElementById('aud-site').value.trim();
  if(!key){audShowError('Please enter your Anthropic API key (Step 1) before discovery.');return;}
  if(!uni||!site){audShowError('Please provide at least the university name and official website.');return;}
  audHideError();
  const st=document.getElementById('aud-url-status');
  st.classList.remove('hidden');
  st.textContent='Searching the web for publicly available policy documents…';
  document.getElementById('aud-discover-btn').disabled=true;
  try{
    const prompt=`Find publicly available documents about generative AI and AI governance at ${uni}${country?', '+country:''}. The official website is ${site}. Prioritise pages on the official domain covering: AI or GenAI policy, academic integrity and assessment rules on AI use, research ethics guidance on AI, data privacy or security guidance on AI, and staff or student AI guidelines. Use web search to verify each URL exists. Respond ONLY with a JSON array, no markdown, of at most 8 items in this exact form: [{"title":"short document title","url":"https://…","why":"one short line on why it is relevant"}]. Only include URLs you actually found in search results.`;
    const res=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
      body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:1000,
        tools:[{type:'web_search_20250305',name:'web_search'}],
        messages:[{role:'user',content:prompt}]})
    });
    if(!res.ok){const e=await res.json().catch(()=>({}));throw new Error(e.error&&e.error.message?e.error.message:`API error ${res.status}`);}
    const data=await res.json();
    const txt=data.content.filter(b=>b.type==='text').map(b=>b.text).join('\n');
    const clean=txt.replace(/```json|```/g,'').trim();
    const arr=JSON.parse(clean.slice(clean.indexOf('['),clean.lastIndexOf(']')+1));
    audUrls=arr.filter(o=>o&&o.url).map(o=>({title:String(o.title||o.url).slice(0,120),url:String(o.url),why:String(o.why||'').slice(0,160),checked:true}));
    audVerifiedUrls=[];
    document.getElementById('aud-url-confirmed').classList.add('hidden');
    if(audUrls.length===0){st.textContent='No public policy documents were found. Try adjusting the university name or use Option B to upload documents.';}
    else{st.textContent=`Found ${audUrls.length} candidate document(s). Open each link to verify it, untick any that are not genuine or not publicly accessible, then confirm.`;}
    audRenderUrls();
  }catch(e){
    audShowError('Discovery failed: '+e.message);
    st.classList.add('hidden');
  }
  document.getElementById('aud-discover-btn').disabled=false;
}

function audRenderUrls(){
  const el=document.getElementById('aud-url-list');
  el.innerHTML=audUrls.map((u,i)=>`<div class="aud-file" style="align-items:flex-start">
    <input type="checkbox" ${u.checked?'checked':''} onchange="audUrls[${i}].checked=this.checked" style="margin-top:3px">
    <div style="min-width:0">
      <a href="${u.url}" target="_blank" rel="noopener" style="font-weight:600;color:var(--navy);word-break:break-all">${u.title}</a>
      <div style="font-size:11px;color:var(--ink-faint);word-break:break-all">${u.url}</div>
      ${u.why?`<div style="font-size:11px;color:var(--ink-light);font-style:italic">${u.why}</div>`:''}
    </div></div>`).join('');
  document.getElementById('aud-url-confirm').classList.toggle('hidden',audUrls.length===0);
}

function audConfirmUrls(){
  audVerifiedUrls=audUrls.filter(u=>u.checked).map(u=>({title:u.title,url:u.url}));
  const c=document.getElementById('aud-url-confirmed');
  c.classList.remove('hidden');
  c.textContent=audVerifiedUrls.length===0
    ?'No sources selected. Select at least one link or use Option B.'
    :`${audVerifiedUrls.length} source(s) confirmed for analysis.`;
  document.getElementById('aud-run').disabled=(audFiles.length===0&&audVerifiedUrls.length===0);
}

function audDocBlocks(){
  const blocks=[];
  audFiles.forEach(f=>{
    if(f.kind==='pdf'){
      blocks.push({type:'document',source:{type:'base64',media_type:'application/pdf',data:f.data}});
    }else{
      blocks.push({type:'text',text:`[Document: ${f.name}]\n${f.text.slice(0,60000)}`});
    }
  });
  return blocks;
}

/* Scoring rubric lines are generated from CONFIG.scale */
function audRubric(){
  return CONFIG.scale.map(s=>`${s.value} = ${s.label} ${s.auditNote||''}`.trim()).join('\n');
}

async function audCallDomain(key,di){
  const d=DOMAINS[di];
  const indicators=d.qs.map((q,qi)=>`${qi}: ${q.t}`).join('\n');
  const prompt=`You are auditing higher education institutional policy documents for GenAI governance maturity.

Assess the attached documents against the ${d.qs.length} indicators below for the domain "${d.name}".

For each indicator assign a score based ONLY on evidence found in the documents:
${audRubric()}

If the documents contain no relevant evidence for an indicator, score 0.

Indicators:
${indicators}

${audVerifiedUrls.length>0?`Verified source documents to retrieve and read before scoring (use web search to access each):
${audVerifiedUrls.map(u=>`- ${u.title}: ${u.url}`).join('\n')}
Base scores only on the attached documents and these verified sources. In each evidence note, name the document or URL.
`:''}
Respond ONLY with a JSON array, no markdown, no preamble, in this exact form:
[{"i":0,"score":0,"evidence":"very short quote or note, max 20 words"}, ...]
Include every indicator index 0 to ${d.qs.length-1}.`;

  const res=await fetch('https://api.anthropic.com/v1/messages',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'x-api-key':key,
      'anthropic-version':'2023-06-01',
      'anthropic-dangerous-direct-browser-access':'true'
    },
    body:JSON.stringify({
      model:'claude-sonnet-4-6',
      max_tokens:1000,
      ...(audVerifiedUrls.length>0?{tools:[{type:'web_search_20250305',name:'web_search'}]}:{}),
      messages:[{role:'user',content:[...audDocBlocks(),{type:'text',text:prompt}]}]
    })
  });
  if(!res.ok){
    const err=await res.json().catch(()=>({}));
    throw new Error(err.error&&err.error.message?err.error.message:`API error ${res.status}`);
  }
  const data=await res.json();
  const txt=data.content.filter(b=>b.type==='text').map(b=>b.text).join('\n');
  const clean=txt.replace(/```json|```/g,'').trim();
  const arr=JSON.parse(clean.slice(clean.indexOf('['),clean.lastIndexOf(']')+1));
  const out={};
  arr.forEach(o=>{
    const s=Math.max(0,Math.min(MAXV,Math.round(Number(o.score)||0)));
    out[o.i]={score:s,evidence:String(o.evidence||'').slice(0,200)};
  });
  return out;
}

async function audRun(){
  const key=document.getElementById('aud-key').value.trim();
  if(!key){audShowError('Please enter your Anthropic API key (Step 1).');return;}
  if(audFiles.length===0&&audVerifiedUrls.length===0){audShowError('Please provide documents first: confirm discovered sources (Option A) or upload files (Option B).');return;}
  audHideError();
  document.getElementById('aud-run').disabled=true;
  const prog=document.getElementById('aud-progress');
  prog.classList.remove('hidden');
  audScores={};
  try{
    for(let di=0;di<DOMAINS.length;di++){
      document.getElementById('aud-progress-text').textContent=`Analysing domain ${di+1} of ${DOMAINS.length}: ${DOMAINS[di].name}…`;
      document.getElementById('aud-progress-fill').style.width=`${Math.round(di/DOMAINS.length*100)}%`;
      let result;
      try{ result=await audCallDomain(key,di); }
      catch(e1){ result=await audCallDomain(key,di); }  // one retry
      DOMAINS[di].qs.forEach((_,qi)=>{
        audScores[`${di}-${qi}`]=result[qi]||{score:0,evidence:'No response for this indicator; defaulted to 0.'};
      });
    }
    document.getElementById('aud-progress-fill').style.width='100%';
    document.getElementById('aud-progress-text').textContent='Analysis complete.';
    audRenderReview();
  }catch(e){
    audShowError('Analysis failed: '+e.message+' Check your API key, credit balance, and document sizes, then try again.');
    document.getElementById('aud-run').disabled=false;
    prog.classList.add('hidden');
  }
}

function audRenderReview(){
  const wrap=document.getElementById('aud-review-list');
  let h='';
  DOMAINS.forEach((d,di)=>{
    h+=`<div class="aud-dom">${di+1}. ${d.name}</div>`;
    d.qs.forEach((q,qi)=>{
      const a=audScores[`${di}-${qi}`];
      h+=`<div class="aud-q">
        <div class="aud-q-t">${q.t}</div>
        <div class="aud-ev">AI evidence: ${a.evidence||'None cited.'}</div>
        <div class="aud-rb" id="aud-rb-${di}-${qi}">`+
        CONFIG.scale.map((s,v)=>`<button class="${a.score===v?'sel':''}" onclick="audSet(${di},${qi},${v},this)">${v} · ${s.label}</button>`).join('')+
      `</div></div>`;
    });
  });
  wrap.innerHTML=h;
  document.getElementById('aud-review').classList.remove('hidden');
  document.getElementById('aud-review').scrollIntoView({behavior:'smooth',block:'start'});
}

function audSet(di,qi,v,btn){
  audScores[`${di}-${qi}`].score=v;
  btn.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('sel'));
  btn.classList.add('sel');
}

let auditEvidence=null;   // evidence per indicator when results come from the AI Auditor

function audFinalize(){
  auditEvidence={};
  DOMAINS.forEach((d,di)=>d.qs.forEach((_,qi)=>{
    const a=audScores[`${di}-${qi}`];
    ans[`${di}-${qi}`]=a.score;
    auditEvidence[`${di}-${qi}`]=a.evidence||'';
  }));
  showPage('p3');
  showResults();
}

function audReset(){
  audFiles=[];audScores=null;auditEvidence=null;
  audUrls=[];audVerifiedUrls=[];
  document.getElementById('aud-url-list').innerHTML='';
  document.getElementById('aud-url-status').classList.add('hidden');
  document.getElementById('aud-url-confirm').classList.add('hidden');
  document.getElementById('aud-url-confirmed').classList.add('hidden');
  audRenderFiles();
  document.getElementById('aud-review').classList.add('hidden');
  document.getElementById('aud-review-list').innerHTML='';
  document.getElementById('aud-progress').classList.add('hidden');
  document.getElementById('aud-progress-fill').style.width='0%';
  document.getElementById('aud-run').disabled=true;
  audHideError();
}
