import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class water_elemental extends AbstractMinion {
    constructor() {
        super(4, 3, 6);
        this.minionID = MINION_IDS.WATER_ELEMENTAL;
        this.name = "Water Elemental";
        this.rarity = RARITY.FREE;
        this.info = "Freeze any character damaged by this minion.";
    }
}