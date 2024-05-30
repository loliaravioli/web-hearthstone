import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class lord_jaraxxus extends AbstractMinion {
    constructor() {
        super(9, 3, 15);
        this.minionID = MINION_IDS.LORD_JARAXXUS;
        this.name = "Lord Jaraxxus";
        this.rarity = RARITY.LEGENDARY;

        this.tribe = TRIBE.DEMON;
    }

    battlecry() {

    }
}