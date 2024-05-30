import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class si7_agent extends AbstractMinion {
    constructor() {
        super(3, 3, 3);
        this.minionID = MINION_IDS.SI7_AGENT;
        this.name = "SI:7 Agent";
        this.rarity = RARITY.RARE;
    }
    
    combo() {
        
    }
}