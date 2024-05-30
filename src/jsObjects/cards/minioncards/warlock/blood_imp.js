import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class blood_imp extends AbstractMinion {
    constructor() {
        super(1, 0, 1);
        this.minionID = MINION_IDS.BLOOD_IMP;
        this.name = "Blood Imp";
        this.rarity = RARITY.COMMON;

        this.tribe = TRIBE.DEMON;

        this.hasStealth = true;
    }

    startTurnEffect() {

    }
}