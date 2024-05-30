import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class argent_protector extends AbstractMinion {
    constructor() {
        super(2, 2, 2);
        this.minionID = MINION_IDS.ARGENT_PROTECTOR;
        this.name = "Argent Protector";
        this.rarity = RARITY.COMMON;
    }
    
    battlecry() {
        
    }
}