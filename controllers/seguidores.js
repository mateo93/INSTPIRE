const puppeteer = require('puppeteer');
const CRED = require('./creds');
const fs = require("fs");
const cookies = require("./cookies");

const sleep = async(ms)=>{return new Promise((res, rej)=>{setTimeout(()=>{res();},ms)});}
const ID = {login:'#id_username',pass:'#id_password'};
const url='https://www.instagram.com/';
(async()=>{
   const browser = await puppeteer.launch({
    headless: false,
    devtools: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1200,700'],
  })
 // const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 700 })

  if(Object.keys(cookies).length)
   {
    await page.setCookie(...cookies);
    await page.goto('https://www.instagram.com/graphql/query/?query_hash=56066f031e6239f35a904ac20c9f37d9&variables={"id":"1233907888","first":50,"after":""}', { waitUntil: 'networkidle2'});
    const json0 = await page.content();
    var json1 = json0.replace('<html><head></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">','');
    var json = json1.replace('</pre></body></html>','');
    //console.log(json);
    //await browser.close();
   } 
   else 
   {
      let login = async()=>{
        await page.goto('https://www.instagram.com/accounts/login/?force_classic_login',{ waitUntil:'networkidle2'});
        await page.waitForSelector(ID.login);
        await page.type(ID.login, CRED.user);
        await page.type(ID.pass, CRED.pass);
        await sleep(500);
        await page.click(".button-green");
        await page.waitForNavigation();
        //await page.goto(url,{ waitUntil:'networkidle2'});
        let currentCookies = await page.cookies();
        fs.writeFileSync('./cookies.json', JSON.stringify(currentCookies));
        await browser.close();
      }
      await login();
   }
})();
