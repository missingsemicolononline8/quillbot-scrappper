const puppeteer = require("puppeteer");
require("dotenv").config()

let url = "https://quillbot.com/";
const delay = (seconds) => new Promise(function(resolve,reject) { 
  setTimeout(() => {
    resolve(1)
  }, seconds*1000);
  
});

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
    await delay(2);
    const page = await browser.newPage();
    await delay(2);
    // Navigate the page to a URL
    await page.goto('https://developer.chrome.com/', {
      waitUntil: "networkidle2"
    });


  
  res.send("browser opened");
  }
  catch (e) {
      res.send(`Something got fucked up: ${e.stack}`);
  }
  finally {
    await browser.close()
  }
};

module.exports = rewrite;