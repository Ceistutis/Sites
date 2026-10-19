async page => {
 const errors=[]; page.on('pageerror',e=>errors.push(e.message)); page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 const routes=[];
 for(const route of ['/','/basica','/premium']){const response=await page.goto('http://127.0.0.1:4173'+route);await page.locator('h1').waitFor();routes.push({route,status:response.status(),title:await page.title()})}
 await page.goto('http://127.0.0.1:5173/');
 return {routes,errors};
}
