import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class tundra_rhino extends AbstractMinion {
    constructor() {
        super(5, 2, 5);
        this.minionID = MINION_IDS.TUNDRA_RHINO;
        this.name = "Tundra Rhino";
        this.rarity = RARITY.FREE;
        
        this.tribe = TRIBE.BEAST;
    }

    auraEffect() {
        
    }
}