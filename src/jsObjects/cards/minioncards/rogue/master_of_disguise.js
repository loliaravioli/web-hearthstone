import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class master_of_disguise extends AbstractMinion {
    constructor() {
        super(4, 4, 4);
        this.minionID = MINION_IDS.MASTER_OF_DISGUISE;
        this.name = "Master of Disguise";
        this.rarity = RARITY.RARE;
    }
    
    battlecry() {
        
    }
}