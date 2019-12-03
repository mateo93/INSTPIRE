const puppeteer = require('puppeteer');
const cookies = require("../cookies");
async function seguidores()
{
  try{
      let login = async()=>{
        const browser = await puppeteer.launch({headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        await page.setCookie(...cookies);
        await page.goto('https://www.instagram.com/losmontaneros1/',{ waitUntil:'networkidle2'});
        await page.waitForSelector(".k9GMp > li > a.-nal3");
        await page.click(".k9GMp > li > a.-nal3");
        await page.waitForSelector(".sqdOP.L3NKy.y3zKF");
        await page.$$eval('button.sqdOP.L3NKy.y3zKF', e=>e.map((button)=>button.click()));  
        await browser.close();
        console.log('OK');
    }
    await login();
    }catch(error){ console.error(error); await browser.close(); }    
}
module.exports = {seguidores}