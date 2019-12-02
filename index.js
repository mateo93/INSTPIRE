const puppeteer = require('puppeteer');
const cookies = require("./cookies_dc");
const sleep = async (ms) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, ms)
  });
}
(async()=>{
  try{
      let instagram = async()=>
      {
        const browser = await puppeteer.launch({headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        await page.setCookie(...cookies);
        await page.goto('https://www.instagram.com/losmontaneros1/',{ waitUntil:'networkidle2'});
        // await page.waitForSelector(ID.login);
        // await page.type(ID.login, CRED.user);
        // await page.type(ID.pass, CRED.pass);
        //await sleep(500);
        await page.waitForSelector(".k9GMp > li > a.-nal3");
        await page.click(".k9GMp > li > a.-nal3");
        await page.waitForSelector(".sqdOP.L3NKy.y3zKF");
        await page.$$eval('button.sqdOP.L3NKy.y3zKF', e=>e.map((button)=>button.click()));  
        //await page.waitForNavigation();
        await browser.close();
        console.log('OK');
      }
      await instagram();
    }catch(error){ console.error(error); await browser.close(); }    
})();

