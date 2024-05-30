import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class defias_ringleader extends AbstractMinion {
    constructor() {
        super(2, 2, 2);
        this.minionID = MINION_IDS.DEFIAS_RINGLEADER;
        this.name = "Defias Ringleader";
        this.rarity = RARITY.COMMON;
    }
    
    combo() {
        
    }
}