import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class lightwell extends AbstractMinion {
    constructor() {
        super(2, 0, 5);
        this.minionID = MINION_IDS.LIGHTWELL;
        this.name = "Lightwell";
        this.rarity = RARITY.RARE;
    }
    
    startTurnEffect() {
        
    }
}