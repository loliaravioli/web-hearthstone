import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class lightspawn extends AbstractMinion {
    constructor() {
        super(4, 0, 5);
        this.minionID = MINION_IDS.LIGHTSPAWN;
        this.name = "Lightspawn";
        this.rarity = RARITY.COMMON;
    }
    
    auraEffect() {
        
    }
}