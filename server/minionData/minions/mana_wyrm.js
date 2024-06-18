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
            event: 'plus_attack', data: {
                minionID: this.minionID,
                attack: this.attack
            }
        };
    }
}

module.exports = mana_wyrm;