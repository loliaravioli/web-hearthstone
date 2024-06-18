const { ATTRIBUTES, MINION_IDS, MINION_DATA } = require('./baseMinionData.js');

class Minion {
    constructor(minion) {
        this.baseMinionID = minion[0];
        this.minionFileName = minion[1];

        this.minionID = '';
        this.playedIndex = -1;

        const baseData = MINION_DATA[minion[0]];
        this.name = baseData.name;
        this.description = baseData.description;
        this.rarity = baseData.rarity;
        this.tribe = baseData.tribe;
        this.overload = baseData.overload;

        this.baseMana = baseData.stats[0];
        this.baseAttack = baseData.stats[1];
        this.baseHealth = baseData.stats[2];
        
        this.mana = baseData.stats[0];
        this.attack = baseData.stats[1];
        this.health = baseData.stats[2];
        this.isDamaged = false;

        this.hasCharge = baseData.attributes[ATTRIBUTES.CHARGE];
        this.hasTaunt = baseData.attributes[ATTRIBUTES.TAUNT];
        this.hasDivineShield = baseData.attributes[ATTRIBUTES.DIVINE_SHIELD];
        this.hasStealth = baseData.attributes[ATTRIBUTES.STEALTH];
        this.hasWindfury = baseData.attributes[ATTRIBUTES.WINDFURY];
        this.hasElusive = baseData.attributes[ATTRIBUTES.ELUSIVE];
        this.hasPoison = baseData.attributes[ATTRIBUTES.POISON];
    }

    battlecry(gameState) { return null; }
    chooseOne(gameState) { return null; }
    combo(gameState) { return null; }
    startOfTurn(gameState) { return null; }
    aura(gameState) { return null; }
    endOfTurn(gameState) { return null; }
    deathrattle(gameState) { return null; }

    onMinionPlayed(gameState, minion) { return null; }
    onMinionSummoned(gameState, minion) { return null; }
    onMinionDied(gameState, minion) { return null; }
    onMinionDamaged(gameState, minion) { return null; }
    onSpellPlayed(gameState, spell) { return null; }
    onAfterSpellPlayed(gameState, minion) { return null; }
    onCharacterHealed(gameState, minion) { return null; }
}

module.exports = Minion;