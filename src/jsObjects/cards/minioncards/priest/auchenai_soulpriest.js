import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class auchenai_soulpriest extends AbstractMinion {
    constructor() {
        super(4, 3, 5);
        this.minionID = MINION_IDS.AUCHENAI_SOULPRIEST;
        this.name = "Auchenai Soulpriest";
        this.rarity = RARITY.RARE;
    }
    
    auraEffect() {
        
    }
}