import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

const browser = await chromium.launch({channel: 'chrome'});
const metrics = [];
await fs.mkdir('artifacts/super-motion', {recursive:true});
for (const [width,height] of [[1440,900],[375,812]]) {
  const context = await browser.newContext({viewport:{width,height},recordVideo:{dir:'artifacts/super-motion',size:{width,height}},reducedMotion:'no-preference'});
  await context.addInitScript(() => {
    window.__lumeMetrics = { lcp: 0, cls: 0, events: [] };
    new PerformanceObserver(list => { for(const e of list.getEntries()) window.__lumeMetrics.lcp=e.startTime; }).observe({type:'largest-contentful-paint',buffered:true});
    new PerformanceObserver(list => { for(const e of list.getEntries()) if(!e.hadRecentInput) window.__lumeMetrics.cls+=e.value; }).observe({type:'layout-shift',buffered:true});
    new PerformanceObserver(list => { for(const e of list.getEntries()) if(e.interactionId)window.__lumeMetrics.events.push({name:e.name,duration:e.duration}); }).observe({type:'event',buffered:true,durationThreshold:16});
  });
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.goto('http://127.0.0.1:4173/super-premium');
  await page.locator('.sp-hero').waitFor();
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(1600);
  await page.screenshot({path:`artifacts/super-motion/${width}-opening.png`});
  await page.evaluate(()=>window.scrollTo({top:420,behavior:'smooth'}));
  await page.waitForTimeout(1100);
  await page.screenshot({path:`artifacts/super-motion/${width}-parallax.png`});
  for (const target of ['.sp-manifesto','.sp-featured','.sp-works']) {
    await page.locator(target).scrollIntoViewIfNeeded();
    await page.waitForTimeout(850);
  }
  await page.getByRole('button',{name:'Próximo projeto',exact:true}).click();
  await page.waitForTimeout(220);
  await page.screenshot({path:`artifacts/super-motion/${width}-carousel-transition.png`});
  await page.waitForTimeout(650);
  await page.getByRole('button',{name:'Próximo projeto',exact:true}).click();
  await page.waitForTimeout(800);
  await page.locator('.sp-study summary').click();
  await page.waitForTimeout(450);
  await page.locator('.sp-materials').scrollIntoViewIfNeeded();
  await page.getByRole('button',{name:'Madeira',exact:true}).click();
  await page.waitForTimeout(650);
  await page.locator('.sp-process').scrollIntoViewIfNeeded();
  await page.waitForTimeout(850);
  await page.locator('.sp-contact').scrollIntoViewIfNeeded();
  await page.getByRole('button',{name:'Experimentar a conversa'}).click();
  await page.waitForTimeout(400);
  metrics.push({viewport:{width,height},...await page.evaluate(()=>window.__lumeMetrics),errors,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),environment:'Chrome local, production Vite preview, no CPU/network throttling; one run; event timings are not field INP'});
  const video=page.video();
  await context.close();
  await video.saveAs(`artifacts/super-motion/lume-${width}.webm`);
}
await browser.close();
await fs.writeFile('artifacts/super-production-metrics.json',JSON.stringify(metrics,null,2));
console.log(JSON.stringify(metrics,null,2));
