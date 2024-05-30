import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class ancient_of_lore extends AbstractMinion {
    constructor() {
        super(7, 5, 5);
        this.minionID = MINION_IDS.ANCIENT_OF_LORE;
        this.name = "Ancient of Lore";
        this.rarity = RARITY.EPIC;
    }

    chooseOne() {
        
    }
}