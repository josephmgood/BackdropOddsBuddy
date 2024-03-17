const OddsModel = require('../models/oddsModel');

/**
 * Compares odds from different sources and finds discrepancies.
 * @param {OddsModel[]} oddsList - An array of OddsModel instances from different sources.
 * @returns {String[]} - An array of strings describing significant discrepancies.
 */
function findDiscrepancies(oddsList) {
    let discrepancies = [];
    // Group odds by matchups
    let matchups = groupByMatchup(oddsList);

    // For each matchup, compare odds between different sources
    for (const [matchup, odds] of Object.entries(matchups)) {
        if (odds.length > 1) {
            for (let i = 0; i < odds.length; i++) {
                for (let j = i + 1; j < odds.length; j++) {
                    let discrepancy = OddsModel.compareOdds(odds[i], odds[j]);
                    if (discrepancy !== null && discrepancy > 0) {
                        discrepancies.push(`Discrepancy found in ${matchup} between ${odds[i].source} and ${odds[j].source}: ${discrepancy}`);
                    }
                }
            }
        }
    }

    return discrepancies;
}

/**
 * Groups odds by their matchups.
 * @param {OddsModel[]} oddsList - An array of OddsModel instances.
 * @returns {Object} - An object with matchups as keys and arrays of OddsModel instances as values.
 */
function groupByMatchup(oddsList) {
    let matchups = {};
    oddsList.forEach(odds => {
        let matchup = `${odds.teamA} vs ${odds.teamB}`;
        if (!matchups[matchup]) {
            matchups[matchup] = [];
        }
        matchups[matchup].push(odds);
    });
    return matchups;
}

module.exports = {
    findDiscrepancies,
};
