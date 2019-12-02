const puppeteer = require('puppeteer');
const cookies = require("./cookies");
const { Client } = require("@elastic/elasticsearch");
const elastic = new Client({ node: "https://search-instpire-3twznku4jbjid3ib4r6mzp25ci.us-east-2.es.amazonaws.com:443" });

async function perfil(req, res)
{
  let url = req.body.url;
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
      return res.status(200).send(json);
      await browser.close();
    }
    await login();
    }catch(error){ console.error(error); await browser.close(); }    
}
async function seguidores(req, res)
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
        const json_texto = rem.replace('</pre></body></html>','');
        const json = JSON.parse(json_texto);
        await browser.close();
        const seguidores = [];
        for (var i = 0; i < json.data.user.edge_followed_by.edges.length; i++) 
        {
          seguidores.push({ index: { _index: "token_seguidores", _type: "token_instagram" } });
          seguidores.push({ username: json.data.user.edge_followed_by.edges[i].node.username });
        }
        const { body } = await elastic.bulk({ refresh: true, body: seguidores });
        const siguiente = json.data.user.edge_followed_by.page_info.has_next_page;
        const token = json.data.user.edge_followed_by.page_info.end_cursor;
        const cantidad = body.items.length;
        const result = JSON.stringify({cantidad:cantidad,siguiente:siguiente,token:token});
        res.contentType('application/json');
        return res.status(200).send(result);
    }
    await login();
    }catch(error){ console.error(error); await browser.close(); }    
}
module.exports = {perfil,query,seguidores}