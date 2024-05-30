import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class timber_wolf extends AbstractMinion {
    constructor() {
        super(1, 1, 1);
        this.minionID = MINION_IDS.TIMBER_WOLF;
        this.name = "Timber Wolf";
        this.rarity = RARITY.FREE;

        this.tribe = TRIBE.BEAST;
    }

    auraEffect() {
        
    }
}