/* ============================================================================
   MAIN: initialisation. Runs after all other components are loaded.
   ========================================================================= */

buildSidebar();
renderIntro();

hrInitGrid();
hrRender(0);
setInterval(()=>{
  hrIdx=(hrIdx+1)%HR_TIERS.length;
  hrRender(hrIdx);
},2800);
