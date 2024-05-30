import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class arathi_weaponsmith extends AbstractMinion {
    constructor() {
        super(4, 3, 3);
        this.minionID = MINION_IDS.ARATHI_WEAPONSMITH;
        this.name = "Arathi Weaponsmith";
        this.rarity = RARITY.COMMON;
    }

    battlecry() {
        
    }
}