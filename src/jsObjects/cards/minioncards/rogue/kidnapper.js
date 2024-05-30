import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class kidnapper extends AbstractMinion {
    constructor() {
        super(6, 5, 3);
        this.minionID = MINION_IDS.KIDNAPPER;
        this.name = "Kidnapper";
        this.rarity = RARITY.EPIC;
    }
    
    combo() {
        
    }
}