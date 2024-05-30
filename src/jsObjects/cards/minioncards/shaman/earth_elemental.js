import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class earth_elemental extends AbstractMinion {
    constructor() {
        super(5, 7, 8);
        this.minionID = MINION_IDS.EARTH_ELEMENTAL;
        this.name = "Earth Elemental";
        this.rarity = RARITY.EPIC;

        this.overloard = 3;
    }
}