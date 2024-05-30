import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class temple_enforcer extends AbstractMinion {
    constructor() {
        super(6, 6, 6);
        this.minionID = MINION_IDS.TEMPLE_ENFORCER;
        this.name = "Temple Enforcer";
        this.rarity = RARITY.COMMON;
    }
    
    battlecry() {
        
    }
}