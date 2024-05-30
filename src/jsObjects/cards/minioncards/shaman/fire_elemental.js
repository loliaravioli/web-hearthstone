import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class fire_elemental extends AbstractMinion {
    constructor() {
        super(6, 6, 5);
        this.minionID = MINION_IDS.FIRE_ELEMENTAL;
        this.name = "Fire Elemental";
        this.rarity = RARITY.FREE;
    }

    battlecry() {

    }
}