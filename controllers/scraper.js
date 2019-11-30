const puppeteer = require('puppeteer');
//const cookies = require("./cookies_mv");
const sleep = async(ms)=>{return new Promise((res, rej)=>{setTimeout(()=>{res();},ms)});}

async function perfil(req, res)
{
  let url = req.body.url;
  const browser = await puppeteer.launch({headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox']});
  // const browser = await puppeteer.launch({
  //   args: ['--proxy-server="194.67.37.90:3128','--no-sandbox', '--disable-setuid-sandbox'],
  //   headless: true
  // });
  const page = await browser.newPage();
  try{
      let login = async()=>{
      //await page.setCookie(...cookies);
      await page.goto(url,{ waitUntil:'networkidle2'});
      const html = await page.content();
      const rem = html.replace('<html><head></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">','');
      const json = rem.replace('</pre></body></html>','');
      await browser.close();
      return res.status(200).send(json);
    }
    await login();
    }catch(error){ console.error(error); await browser.close(); }    
}
async function query(req, res)
{
  let url = req.body.url;
  const browser = await puppeteer.launch({headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  try{
      let login = async()=>{
      await page.setCookie(...cookies);
      await page.goto(url,{ waitUntil:'networkidle2'});
      const html = await page.content();
      const rem = html.replace('<html><head></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">','');
      const json = rem.replace('</pre></body></html>','');
      await browser.close();
      return res.status(200).send(json);

    }
    await login();
    }catch(error){ console.error(error); await browser.close(); }    
}
module.exports = {perfil,query}