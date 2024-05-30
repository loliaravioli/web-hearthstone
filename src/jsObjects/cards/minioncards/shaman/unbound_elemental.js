import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class unbound_elemental extends AbstractMinion {
    constructor() {
        super(3, 2, 4);
        this.minionID = MINION_IDS.UNBOUND_ELEMENTAL;
        this.name = "Unbound Elemental";
        this.rarity = RARITY.COMMON;
    }

    auraEffect() {

    }
}