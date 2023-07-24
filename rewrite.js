const puppeteer = require("puppeteer");
require("dotenv").config()

let url = "https://quillbot.com/";
const delay = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds*1000));

const rewrite = async (res,textToSpin,headless) => {
  const browser = await puppeteer.launch({
    args:[
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote"
    ],
    headless:headless, 
    executablePath: process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()});
  
  try {
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://developer.chrome.com/');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Type into search box
  await page.type('.search-box__input', 'automate beyond recorder');

  // Wait and click on first result
  const searchResultSelector = '.search-box__link';
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    'text/Customize and automate'
  );
  const fullTitle = await textSelector?.evaluate(el => el.textContent);

  console.log('The title of this blog post is "%s".', fullTitle);

//await browser.close()
  res.send(fullTitle);
  }
  catch (e) {
      res.send(`Something got fucked up: ${e.stack}`);
  }
  finally {
    await browser.close()
  }
};

module.exports = rewrite;