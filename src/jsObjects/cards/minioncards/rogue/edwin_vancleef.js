import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class edwin_vancleef extends AbstractMinion {
    constructor() {
        super(3, 2, 2);
        this.minionID = MINION_IDS.EDWIN_VANCLEEF;
        this.name = "Edwin VanCleef";
        this.rarity = RARITY.LEGENDARY;
    }
    
    combo() {
        
    }
}