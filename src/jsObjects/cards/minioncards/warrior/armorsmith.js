import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class armorsmith extends AbstractMinion {
    constructor() {
        super(2, 1, 4);
        this.minionID = MINION_IDS.ARMORSMITH;
        this.name = "Armorsmith";
        this.rarity = RARITY.RARE;
    }

    auraEffect() {
        
    }
}