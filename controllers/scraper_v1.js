const puppeteer = require('puppeteer');
const CRED = require('./creds');

async function perfil(req, res)
{
  let url = req.body.url;
  const ID = {login:'#id_username',pass:'#id_password'};
  const browser = await puppeteer.launch({headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  try{
    let login = async()=>{
      await page.goto(url,{ waitUntil:'networkidle2'});
      const html = await page.content();
      const rem = html.replace('<html><head></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">','');
      const json = rem.replace('</pre></body></html>','');
      return res.status(200).send(json);
      await browser.close();
    }
    await login();
  }catch(error){ console.error(error); }    
}
async function query(req, res)
{
  let url = req.body.url;
  const ID = {login:'#id_username',pass:'#id_password'};
  const browser = await puppeteer.launch({headless: false,args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  try{
    let login = async()=>{
      await page.goto('https://www.instagram.com/accounts/login/?force_classic_login',{ waitUntil:'networkidle2'});
      await page.waitForSelector(ID.login);
      await page.type(ID.login, CRED.user);
      await page.type(ID.pass, CRED.pass);
      
      await page.click(".button-green");
      await page.waitForNavigation();
      await page.goto(url,{ waitUntil:'networkidle2'});
      const html = await page.content();
      const rem = html.replace('<html><head></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">','');
      const json = rem.replace('</pre></body></html>','');
      return res.status(200).send(json);
      await browser.close();
    }
    await login();
  }catch(error){ console.error(error); }    
}
module.exports = {perfil,query}