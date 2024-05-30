import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class starving_buzzard extends AbstractMinion {
    constructor() {
        super(2, 2, 1);
        this.minionID = MINION_IDS.STARVING_BUZZARD;
        this.name = "Starving Buzzard";
        this.rarity = RARITY.FREE;
        
        this.tribe = TRIBE.BEAST;
    }

    auraEffect() {
        
    }
}