import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class scavenging_hyena extends AbstractMinion {
    constructor() {
        super(2, 2, 2);
        this.minionID = MINION_IDS.SCAVENGING_HYENA;
        this.name = "Scavenging Hyena";
        this.rarity = RARITY.COMMON;
        
        this.tribe = TRIBE.BEAST;
    }

    auraEffect() {
        
    }
}