import puppeteer from "puppeteer";

let url = "https://quillbot.com/";
const delay = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds*1000));

const rewrite = async (res,textToSpin,headless) => {
  const browser = await puppeteer.launch({headless:headless, userDataDir: "./user_data"});
  
  try {
  const page = await browser.newPage();

  await page.goto(url,{ waitUntil: 'networkidle2' });

  // Set screen size
  await page.setViewport({width: 1020, height: 1080});
  const searchBarSelector = 'div[data-testid="editable-content-within-article"]';
  const searchResultSelector = 'div[aria-label="Paraphrase (Ctrl + Enter)"] button';
 
  // Type into search box

  await page.waitForSelector(searchBarSelector,{
    timeout:0
  });
 await page.type(searchBarSelector, textToSpin)
 await page.waitForSelector(searchResultSelector,{
        timeout:0
      });
await delay(2)     
await page.click(searchResultSelector);
  

  // Wait and click on first result
  
  const copyButtonSelector = "button[aria-label='Copy Full Text']"
  await page.waitForSelector(copyButtonSelector)

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    'div#paraphraser-output-box[contenteditable="true"]'
  );
  const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);
  //await browser.close()
  res.send(fullTitle);
  }
  catch (e) {
      res.send(`Something got fucked up: ${e}`);
  }
  finally {
    await browser.close()
  }
};

export default rewrite;