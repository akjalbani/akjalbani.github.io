/* ============================================================================
   NAV: site navigation, menus, drawer, scroll-spy, and hash routing.
   Contains no assessment data or calculations.
   ========================================================================= */
const PAGE_SECTION_MAP={
  p1:['ov-about','ov-framework','ov-guide'],
  p2:['mf-tiers','mf-overview','mf-domains','mf-scoring']
};
const PAGE_TOP_TARGET={p1:'overview-top',p2:'framework-top',p3:'assess-view',p4:'ov-team'};

function getActivePageId(){
  const active=document.querySelector('.page.active');
  return active?active.id:'p1';
}

function closeDesktopSubmenus(exceptId){
  document.querySelectorAll('.has-submenu').forEach(item=>{
    const menu=item.querySelector('.nav-submenu');
    const keep=menu&&menu.id===exceptId;
    item.classList.toggle('submenu-open',keep);
    const btn=item.querySelector('.submenu-toggle');
    if(btn)btn.setAttribute('aria-expanded',keep?'true':'false');
  });
}

function toggleSubmenu(event,menuId){
  event.preventDefault();
  event.stopPropagation();
  const menu=document.getElementById(menuId);
  if(!menu)return;
  const parent=menu.closest('.has-submenu');
  const willOpen=!parent.classList.contains('submenu-open');
  closeDesktopSubmenus(willOpen?menuId:null);
  if(willOpen){
    parent.classList.add('submenu-open');
    const btn=parent.querySelector('.submenu-toggle');
    if(btn)btn.setAttribute('aria-expanded','true');
  }
}

function toggleMobileSubmenu(menuId,button){
  const menu=document.getElementById(menuId);
  if(!menu)return;
  const expanded=button.getAttribute('aria-expanded')==='true';
  button.setAttribute('aria-expanded',expanded?'false':'true');
  menu.hidden=expanded;
}

function toggleDrawer(){
  const ham=document.getElementById('nav-ham');
  const drawer=document.getElementById('nav-drawer');
  const opening=!drawer.classList.contains('open');
  ham.classList.toggle('open',opening);
  drawer.classList.toggle('open',opening);
  ham.setAttribute('aria-expanded',opening?'true':'false');
  ham.setAttribute('aria-label',opening?'Close navigation menu':'Open navigation menu');
  document.body.style.overflow=opening?'hidden':'';
  if(opening){
    const first=drawer.querySelector('a');
    if(first)setTimeout(()=>first.focus(),0);
  }
}

function closeDrawer(){
  const ham=document.getElementById('nav-ham');
  const drawer=document.getElementById('nav-drawer');
  ham.classList.remove('open');
  drawer.classList.remove('open');
  ham.setAttribute('aria-expanded','false');
  ham.setAttribute('aria-label','Open navigation menu');
  document.body.style.overflow='';
}

function updatePageNav(id){
  document.querySelectorAll('.nav-main-link').forEach(a=>{
    const active=a.id==='nav-'+id;
    a.classList.toggle('active',active);
    if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
  });
  document.querySelectorAll('.drawer-main-link').forEach(a=>{
    const active=a.id==='mob-'+id;
    a.classList.toggle('active',active);
    if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
  });
}

function revealOverviewContent(){
  const page=document.getElementById('p1');
  if(page)page.classList.remove('landing-mode');
}

function showLanding(){
  const page=document.getElementById('p1');
  if(page)page.classList.add('landing-mode');
  showPage('p1',{scroll:false});
  window.scrollTo({top:0,behavior:'smooth'});
  if(history.pushState)history.pushState({pageId:'p1',landing:true},'',location.pathname+location.search);
}

function openOverview(){
  revealOverviewContent();
  showPage('p1',{scroll:false});
  const target=document.getElementById('ov-about');
  if(target){
    requestAnimationFrame(()=>{
      target.scrollIntoView({behavior:'smooth',block:'start'});
      if(history.pushState)history.pushState({pageId:'p1',targetId:'ov-about'},'', '#ov-about');
    });
  }
}

function showPage(id,options={}){
  const page=document.getElementById(id);
  if(!page)return;
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  page.classList.add('active');
  updatePageNav(id);
  closeDesktopSubmenus();
  closeDrawer();
  clearSectionHighlights();
  if(options.scroll!==false)window.scrollTo({top:0,behavior:options.smooth?'smooth':'auto'});
  if(id==='p3')renderIntro();
  requestAnimationFrame(updateActiveSection);
}

function toggleTier(n){
  const item=document.querySelector(`.tacc-item[data-tier="${n}"]`);
  if(!item)return;
  item.classList.toggle('tacc-open');
}

function navigateTo(pageId,targetId){
  if(pageId==='p1'&&targetId!=='overview-top')revealOverviewContent();
  showPage(pageId,{scroll:false});
  const target=document.getElementById(targetId);
  if(target){
    requestAnimationFrame(()=>{
      target.scrollIntoView({behavior:'smooth',block:'start'});
      if(history.pushState)history.pushState({pageId,targetId},'',`#${targetId}`);
      else location.hash=targetId;
    });
  }
}

function clearSectionHighlights(){
  document.querySelectorAll('[data-section]').forEach(a=>{
    a.classList.remove('active');
    a.removeAttribute('aria-current');
  });
}

function updateActiveSection(){
  const pageId=getActivePageId();
  const landingPage=document.getElementById('p1');
  if(pageId==='p1'&&landingPage?.classList.contains('landing-mode')){
    clearSectionHighlights();
    const back=document.getElementById('back-to-top');
    if(back)back.classList.remove('visible');
    return;
  }
  const sections=PAGE_SECTION_MAP[pageId]||[];
  const offset=(document.getElementById('site-nav')?.offsetHeight||58)+24;
  let active=null;
  for(const id of sections){
    const section=document.getElementById(id);
    if(section&&section.getBoundingClientRect().top<=offset)active=id;
  }
  clearSectionHighlights();
  if(active){
    document.querySelectorAll(`[data-section="${active}"]`).forEach(a=>{
      a.classList.add('active');
      a.setAttribute('aria-current','location');
    });
  }
  const back=document.getElementById('back-to-top');
  if(back)back.classList.toggle('visible',window.scrollY>320);
}

function scrollPageTop(){
  const pageId=getActivePageId();
  const targetId=PAGE_TOP_TARGET[pageId];
  const target=document.getElementById(targetId);
  if(target)target.scrollIntoView({behavior:'smooth',block:'start'});
  else window.scrollTo({top:0,behavior:'smooth'});
}

function pageForTarget(targetId){
  if(['overview-top','ov-about','ov-framework','ov-guide'].includes(targetId))return'p1';
  if(targetId==='ov-team')return'p4';
  if(['framework-top','mf-tiers','mf-overview','mf-domains','mf-scoring','coherence-detail'].includes(targetId))return'p2';
  if(['assess-view','p3'].includes(targetId))return'p3';
  return null;
}

function handleHashNavigation(){
  const targetId=decodeURIComponent(location.hash.replace(/^#/,''));
  if(!targetId)return;
  const pageId=pageForTarget(targetId);
  if(!pageId)return;
  if(pageId==='p1'&&targetId!=='overview-top')revealOverviewContent();
  if(pageId==='p1'&&targetId==='overview-top')document.getElementById('p1')?.classList.add('landing-mode');
  showPage(pageId,{scroll:false});
  const target=document.getElementById(targetId);
  if(target)setTimeout(()=>target.scrollIntoView({behavior:'auto',block:'start'}),0);
}

let navScrollTick=false;
window.addEventListener('scroll',()=>{
  if(navScrollTick)return;
  navScrollTick=true;
  requestAnimationFrame(()=>{updateActiveSection();navScrollTick=false;});
},{passive:true});
window.addEventListener('resize',updateActiveSection,{passive:true});
window.addEventListener('hashchange',handleHashNavigation);
document.addEventListener('click',event=>{
  if(!event.target.closest('.has-submenu'))closeDesktopSubmenus();
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'){
    closeDesktopSubmenus();
    const drawer=document.getElementById('nav-drawer');
    if(drawer&&drawer.classList.contains('open')){
      closeDrawer();
      document.getElementById('nav-ham')?.focus();
    }
  }
});
window.addEventListener('load',()=>{
  if(!location.hash)document.getElementById('p1')?.classList.add('landing-mode');
  handleHashNavigation();
  updateActiveSection();
});
