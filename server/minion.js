const { ATTRIBUTES, MINION_IDS, MINION_DATA } = require('./baseMinionData.js');

class Minion {
    constructor(minion) {
        this.minionID = minion[0];
        this.minionFileName = minion[1];
        
        const baseData = MINION_DATA[this.minionID];
        this.name = baseData.name;
        this.description = baseData.description;
        this.mana = baseData.stats[0];
        this.attack = baseData.stats[1];
        this.health = baseData.stats[2];
        this.rarity = baseData.rarity;
        this.tribe = baseData.tribe;
        this.overload = baseData.overload;
        
        this.hasCharge = baseData.attributes[ATTRIBUTES.CHARGE];
        this.hasTaunt = baseData.attributes[ATTRIBUTES.TAUNT];
        this.hasDivineShield = baseData.attributes[ATTRIBUTES.DIVINE_SHIELD];
        this.hasStealth = baseData.attributes[ATTRIBUTES.STEALTH];
        this.hasWindfury = baseData.attributes[ATTRIBUTES.WINDFURY];
        this.hasElusive = baseData.attributes[ATTRIBUTES.ELUSIVE];
        this.hasPoison = baseData.attributes[ATTRIBUTES.POISON];
    }
}

module.exports = Minion;