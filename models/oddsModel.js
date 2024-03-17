class OddsModel {
    constructor(sport, teamA, teamB, oddsA, oddsB, source) {
        this.sport = sport; // The sport type (e.g., Football, Basketball)
        this.teamA = teamA; // The name of the first team or competitor
        this.teamB = teamB; // The name of the second team or competitor
        this.oddsA = oddsA; // The moneyline odds for the first team or competitor
        this.oddsB = oddsB; // The moneyline odds for the second team or competitor
        this.source = source; // The source website from which the odds were scraped
    }

    // Method to display the odds in a readable format
    displayOdds() {
        return `${this.sport}: ${this.teamA} (${this.oddsA}) vs. ${this.teamB} (${this.oddsB}) - Source: ${this.source}`;
    }

    // Method to compare odds between two OddsModel instances
    static compareOdds(odds1, odds2) {
        if (odds1.teamA === odds2.teamA && odds1.teamB === odds2.teamB) {
            let discrepancy = Math.abs(odds1.oddsA - odds2.oddsA) + Math.abs(odds1.oddsB - odds2.oddsB);
            return discrepancy;
        } else {
            console.error("Cannot compare odds for different matchups.");
            return null;
        }
    }
}

module.exports = OddsModel;
