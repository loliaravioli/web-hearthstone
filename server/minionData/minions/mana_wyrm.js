const Minion = require('../minion.js');
const { ATTRIBUTES, MINION_IDS, MINION_DATA } = require('../baseMinionData.js');

class mana_wyrm extends Minion {
    constructor() {
        super(MINION_IDS.MANA_WYRM);
    }

    onMinionPlayed(gameState, minion) {
        if (minion.minionID == this.minionID) { return; }
        
        this.attack += 1;
        return {
            event: 'changeStats', data: {
                minionID: this.minionID,
                stats: [this.mana, this.attack, this.health],
                baseStats: [this.baseMana, this.baseAttack, this.baseHealth]
            }
        };
    }
}

module.exports = mana_wyrm;