const puppeteer = require('puppeteer');
const fs = require("fs");
const CRED = require('./creds');
const ID = {login:'#id_username',pass:'#id_password'};
(async()=>{
  const browser = await puppeteer.launch({headless: false,args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  let login = async()=>{
    await page.goto('https://www.instagram.com/accounts/login/?force_classic_login',{ waitUntil:'networkidle2'});
    await page.waitForSelector(ID.login);
    await page.type(ID.login, CRED.user);
    await page.type(ID.pass, CRED.pass);
    await page.click(".button-green");
    await page.waitForNavigation();
    let currentCookies = await page.cookies();
    fs.writeFileSync('./cookies_jm.json', JSON.stringify(currentCookies));
    await browser.close(); 
  }
  await login();  
})();
