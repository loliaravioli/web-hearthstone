import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class tirion_fordring extends AbstractMinion {
    constructor() {
        super(8, 6, 6);
        this.minionID = MINION_IDS.TIRION_FORDRING;
        this.name = "Tirion Fordring";
        this.rarity = RARITY.LEGENDARY;

        this.hasDivineShield = true;
        this.hasTaunt = true;
    }
    
    deathrattle() {
        
    }
}