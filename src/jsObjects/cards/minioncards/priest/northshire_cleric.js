import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class northshire_cleric extends AbstractMinion {
    constructor() {
        super(1, 1, 3);
        this.minionID = MINION_IDS.NORTHSHIRE_CLERIC;
        this.name = "Northshire Cleric";
        this.rarity = RARITY.COMMON;
    }
    
    auraEffect() {
        
    }
}