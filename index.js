import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.twitch.tv/directory/all/tags/france");
  // Wait for the results page to load and display the results.
  const resultsSelector = '[data-a-target="preview-card-channel-link"]';
  await page.waitForSelector(resultsSelector);

  // Extract the results from the page.
  const cards = await page.evaluate((resultsSelector) => {
    return [...document.querySelectorAll(resultsSelector)]
      .map((anchor) => {
        return {
          titre: anchor.querySelector("h3")?.textContent,
          stream: anchor.querySelector("p")?.textContent,
        };
      })
      .filter((c) => c.titre);
  }, resultsSelector);
  console.log(cards);
  await browser.close();
})();
