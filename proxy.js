const puppeteer = require('puppeteer');
const fs = require("fs");
(async()=>{
  
  let url = 'https://www.hidemyass.com/es-ww/proxy';
  
  const browser = await puppeteer.launch({headless: false,args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  // await page.setCookie(...cookies);
   await page.goto(url,{ waitUntil:'networkidle2'});
   await page.click('#form_url_fake');
   await page.keyboard.type('mateo');
   // await page.waitForSelector('#form_url_fake');
   
   //const html = await page.content();
   //fs.writeFileSync('./html.html', html);
   //console.log(html);
   
})();
