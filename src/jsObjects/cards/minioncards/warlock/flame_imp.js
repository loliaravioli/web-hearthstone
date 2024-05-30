import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class flame_imp extends AbstractMinion {
    constructor() {
        super(1, 3, 2);
        this.minionID = MINION_IDS.FLAME_IMP;
        this.name = "Flame Imp";
        this.rarity = RARITY.COMMON;

        this.tribe = TRIBE.DEMON;
    }

    battlecry() {

    }
}