async page => {
  const results = [];
  for (const width of [1440,768,375]) {
    await page.setViewportSize({width,height:1000});
    for (const route of ['basica','premium','']) {
      await page.goto('http://127.0.0.1:5173/'+route);
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => { for (const image of document.images) { image.loading='eager'; } await Promise.all(Array.from(document.images).map(i => i.decode().catch(()=>{}))); });
      await page.emulateMedia({reducedMotion:'reduce'});
      const issues = await page.evaluate(() => ({overflow:document.documentElement.scrollWidth>innerWidth, broken:Array.from(document.images).filter(i=>!i.naturalWidth).map(i=>i.src),headings:Array.from(document.querySelectorAll('h1,h2,h3')).filter(e=>e.getBoundingClientRect().width>2).filter(e=>e.getBoundingClientRect().height/parseFloat(getComputedStyle(e).lineHeight)>2.2).map(e=>e.textContent)}));
      await page.screenshot({path:`artifacts/screenshots/${route||'showcase'}-${width}.png`,fullPage:true});
      if(width===1440 && route) await page.screenshot({path:`artifacts/screenshots/preview-${route}.png`});
      results.push({route:route||'/',width,...issues});
    }
  }
  return results;
}
