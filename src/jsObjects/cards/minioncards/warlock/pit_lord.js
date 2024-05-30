import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class pit_lord extends AbstractMinion {
    constructor() {
        super(4, 5, 6);
        this.minionID = MINION_IDS.PIT_LORD;
        this.name = "Pit Lord";
        this.rarity = RARITY.EPIC;

        this.tribe = TRIBE.DEMON;
    }

    battlecry() {

    }
}