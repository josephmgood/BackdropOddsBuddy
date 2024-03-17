const { httpGetRequest } = require('../utils/httpRequest');
const { parse } = require('node-html-parser');
const config = require('../config.json');

/**
 * Scrapes the FanDuel website for moneyline odds.
 * @returns {Promise<Array>} - A promise that resolves to an array of odds objects.
 */
async function scrapeFanDuelOdds() {
  try {
    const url = config.websites.fanduel;
    const html = await httpGetRequest(url);
    const root = parse(html);
    const oddsList = [];

    // Assuming the structure of the page and the specific elements containing the odds might look something like this.
    // This is a simplified example and would need to be adjusted according to the actual page structure.
    const events = root.querySelectorAll('.event'); // This selector would need to be updated based on the actual page structure

    events.forEach(event => {
      const teams = event.querySelectorAll('.team-name').map(element => element.text.trim()); // Again, adjust selector as needed
      const odds = event.querySelectorAll('.moneyline-odds').map(element => element.text.trim()); // Adjust selector as needed

      if (teams.length === 2 && odds.length === 2) {
        oddsList.push({
          event: `${teams[0]} vs ${teams[1]}`,
          odds: {
            [teams[0]]: odds[0],
            [teams[1]]: odds[1],
          },
          source: 'FanDuel',
        });
      }
    });

    return oddsList;
  } catch (error) {
    console.error('Error scraping FanDuel odds:', error.message);
    throw error;
  }
}

module.exports = {
  scrapeFanDuelOdds,
};
