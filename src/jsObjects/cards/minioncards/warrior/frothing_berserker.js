import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class frothing_berserker extends AbstractMinion {
    constructor() {
        super(3, 2, 4);
        this.minionID = MINION_IDS.FROTHING_BERSERKER;
        this.name = "Frothing Berserker";
        this.rarity = RARITY.RARE;
    }

    auraEffect() {
        
    }
}