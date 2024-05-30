import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class dust_devil extends AbstractMinion {
    constructor() {
        super(1, 3, 1);
        this.minionID = MINION_IDS.DUST_DEVIL;
        this.name = "Dust Devil";
        this.rarity = RARITY.COMMON;

        this.overload = 2;
        
        this.hasWindfury = true;
    }
}