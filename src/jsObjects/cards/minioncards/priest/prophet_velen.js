import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class prophet_velen extends AbstractMinion {
    constructor() {
        super(7, 7, 7);
        this.minionID = MINION_IDS.PROPHET_VELEN;
        this.name = "Prophet Velen";
        this.rarity = RARITY.LEGENDARY;
    }
    
    auraEffect() {
        
    }
}