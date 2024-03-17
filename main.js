const fanduelScraper = require('./scrapers/fanduelScraper');
const caesarsScraper = require('./scrapers/caesarsScraper');
const draftkingsScraper = require('./scrapers/draftkingsScraper');
const betmgmScraper = require('./scrapers/betmgmScraper');
const oddsComparator = require('./comparator/oddsComparator');

async function main() {
  try {
    console.log('Scraping odds from websites...');

    // Scrape odds from each website
    const fanduelOdds = await fanduelScraper.scrapeFanDuelOdds();
    const caesarsOdds = await caesarsScraper.scrapeCaesarsOdds();
    const draftkingsOdds = await draftkingsScraper.scrapeDraftKings();
    const betmgmOdds = await betmgmScraper.scrapeBetMGM();

    // Combine all odds into a single array
    const allOdds = [...fanduelOdds, ...caesarsOdds, ...draftkingsOdds, ...betmgmOdds];

    console.log('Comparing odds to find discrepancies...');
    // Compare odds and find discrepancies
    const discrepancies = oddsComparator.compareOdds(allOdds);

    if (discrepancies.length > 0) {
      console.log('Discrepancies found:');
      discrepancies.forEach(discrepancy => {
        console.log(`${discrepancy.event}:`);
        discrepancy.odds.forEach(odds => {
          console.log(`- ${odds.source}: ${odds.team} @ ${odds.value}`);
        });
      });
    } else {
      console.log('No significant discrepancies found.');
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

main();
