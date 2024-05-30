import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class guardian_of_kings extends AbstractMinion {
    constructor() {
        super(7, 5, 6);
        this.minionID = MINION_IDS.GUARDIAN_OF_KINGS;
        this.name = "Guardian of Kings";
        this.rarity = RARITY.FREE;
    }
    
    battlecry() {
        
    }
}