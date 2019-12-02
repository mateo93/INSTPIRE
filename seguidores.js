const puppeteer = require('puppeteer');
const cookies = require("./cookies");
const { Client } = require("@elastic/elasticsearch");
const elastic = new Client({ node: "https://search-instpire-3twznku4jbjid3ib4r6mzp25ci.us-east-2.es.amazonaws.com:443" });

(async()=>{
  
  let url = 'https://www.instagram.com/graphql/query/?query_hash=56066f031e6239f35a904ac20c9f37d9&variables={"id":"1233907888","first":50,"after":""}';
  
  const browser = await puppeteer.launch({headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
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
  const paginador = json.data.user.edge_followed_by.page_info.has_next_page;
  const token = json.data.user.edge_followed_by.page_info.end_cursor;
  //const { body } = await elastic.bulk({ refresh: true, body: seguidores });
  //console.log(body.items.length);
   
})();
