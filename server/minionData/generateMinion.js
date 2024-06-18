const { MINION_IDS} = require('./baseMinionData.js');
const Minion = require('./minion.js');
const mana_wyrm = require('./minions/mana_wyrm.js');

function generateMinion(baseMinionID) {
    switch (baseMinionID) {
        case MINION_IDS.MANA_WYRM:
            return new mana_wyrm();
        default:
            return new Minion(baseMinionID);
    }
}

module.exports = { generateMinion }