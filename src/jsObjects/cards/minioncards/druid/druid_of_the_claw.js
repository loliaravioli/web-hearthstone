import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class druid_of_the_claw extends AbstractMinion {
    constructor() {
        super(5, 4, 4);
        this.minionID = MINION_IDS.DRUID_OF_THE_CLAW;
        this.name = "Druid of the Claw";
        this.rarity = RARITY.COMMON;
    }

    chooseOne() {
        
    }
}