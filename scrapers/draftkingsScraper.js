const { httpGetRequest } = require('../utils/httpRequest');
const OddsModel = require('../models/oddsModel');
const config = require('../config.json');

/**
 * Scrapes DraftKings for moneyline odds.
 * @returns {Promise<OddsModel[]>} - A promise that resolves to an array of OddsModel instances.
 */
async function scrapeDraftKings() {
    const url = config.websites.draftkings;
    let oddsData = [];
    try {
        const data = await httpGetRequest(url);
        // Assuming the structure of the data received from DraftKings is JSON and has a specific format.
        // This is a placeholder for the actual logic to parse the received data.
        // You would need to replace this with the actual data parsing logic based on the structure of the DraftKings response.
        const events = data.events; // Placeholder: Adjust according to the actual data structure.
        for (const event of events) {
            const sport = event.sport; // Placeholder: Adjust according to the actual data structure.
            const teamA = event.teams[0].name; // Placeholder: Adjust according to the actual data structure.
            const teamB = event.teams[1].name; // Placeholder: Adjust according to the actual data structure.
            const oddsA = event.teams[0].odds; // Placeholder: Adjust according to the actual data structure.
            const oddsB = event.teams[1].odds; // Placeholder: Adjust according to the actual data structure.
            const oddsModel = new OddsModel(sport, teamA, teamB, oddsA, oddsB, 'DraftKings');
            oddsData.push(oddsModel);
        }
    } catch (error) {
        console.error('Failed to scrape DraftKings:', error.message);
    }
    return oddsData;
}

module.exports = {
    scrapeDraftKings,
};
