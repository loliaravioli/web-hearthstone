import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class cenarius extends AbstractMinion {
    constructor() {
        super(9, 5, 8);
        this.minionID = MINION_IDS.CENARIUS;
        this.name = "Cenarius";
        this.rarity = RARITY.LEGENDARY;
    }

    chooseOne() {

    }
}