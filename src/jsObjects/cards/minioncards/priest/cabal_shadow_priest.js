import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class cabal_shadow_priest extends AbstractMinion {
    constructor() {
        super(6, 4, 5);
        this.minionID = MINION_IDS.CABAL_SHADOW_PRIEST;
        this.name = "Cabal Shadow Priest";
        this.rarity = RARITY.EPIC;
    }
    
    battlecry() {
        
    }
}