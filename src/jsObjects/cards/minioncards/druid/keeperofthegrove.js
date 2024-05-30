import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class keeper_of_the_grove extends AbstractMinion {
    constructor() {
        super(4, 2, 4);
        this.minionID = MINION_IDS.KEEPER_OF_THE_GROVE;
        this.name = "Keeper of the Grove";
        this.rarity = RARITY.RARE;
    }

    chooseOne() {

    }
}