import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class void_terror extends AbstractMinion {
    constructor() {
        super(3, 3, 3);
        this.minionID = MINION_IDS.VOID_TERROR;
        this.name = "Void Terror";
        this.rarity = RARITY.RARE;

        this.tribe = TRIBE.DEMON;
    }

    battlecry() {

    }
}