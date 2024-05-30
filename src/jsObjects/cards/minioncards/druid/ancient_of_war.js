import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class ancient_of_war extends AbstractMinion {
    constructor() {
        super(7, 5, 5);
        this.minionID = MINION_IDS.ANCIENT_OF_WAR;
        this.name = "Ancient of War";
        this.rarity = RARITY.EPIC;
    }

    chooseOne() {

    }
}