const { httpGetRequest } = require('../utils/httpRequest');
const { parse } = require('node-html-parser');
const config = require('../config.json');

/**
 * Scrapes the BetMGM website for moneyline odds.
 * @returns {Promise<Array>} - A promise that resolves to an array of odds objects.
 */
async function scrapeBetMGM() {
  const url = config.websites.betmgm;
  try {
    const data = await httpGetRequest(url);
    const root = parse(data);
    const oddsList = [];
    // Assuming the structure of the page and the specific elements containing the odds
    // This will need to be adjusted based on the actual structure of the BetMGM website
    const events = root.querySelectorAll('.event-row'); // This selector is hypothetical and needs to be adjusted
    events.forEach(event => {
      const teams = event.querySelectorAll('.team-name').map(element => element.text.trim()); // Hypothetical selector
      const odds = event.querySelectorAll('.moneyline-odds').map(element => element.text.trim()); // Hypothetical selector
      if (teams.length === 2 && odds.length === 2) {
        oddsList.push({
          team1: teams[0],
          team2: teams[1],
          odds1: odds[0],
          odds2: odds[1],
          source: 'BetMGM'
        });
      }
    });
    return oddsList;
  } catch (error) {
    console.error('Error scraping BetMGM:', error.message);
    throw error;
  }
}

module.exports = {
  scrapeBetMGM,
};
