import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class mana_wyrm extends AbstractMinion {
    constructor() {
        super(1, 1, 3);
        this.minionID = MINION_IDS.MANA_WYRM;
        this.name = "Mana Wyrm";
        this.rarity = RARITY.COMMON;
    }

    auraEffect() {

    }
}