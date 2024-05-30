import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class summoning_portal extends AbstractMinion {
    constructor() {
        super(4, 0, 4);
        this.minionID = MINION_IDS.SUMMONING_PORTAL;
        this.name = "Summoning Portal";
        this.rarity = RARITY.COMMON;
    }

    auraEffect() {

    }
}