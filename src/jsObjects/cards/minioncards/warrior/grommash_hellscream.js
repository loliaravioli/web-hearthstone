import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class grommash_hellscream extends AbstractMinion {
    constructor() {
        super(8, 4, 9);
        this.minionID = MINION_IDS.GROMMASH_HELLSCREAM;
        this.name = "Grommash Hellscream";
        this.rarity = RARITY.LEGENDARY;

        this.hasCharge = true;
    }

    enrage() {
        this.attack = this.attack + 6;
    }
}