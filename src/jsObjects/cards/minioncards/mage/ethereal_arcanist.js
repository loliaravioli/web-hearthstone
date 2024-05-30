import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class ethereal_arcanist extends AbstractMinion {
    constructor() {
        super(4, 3, 3);
        this.minionID = MINION_IDS.ETHEREAL_ARCANIST;
        this.name = "Ethereal Arcanist";
        this.rarity = RARITY.RARE;
    }

    endTurnEffect() {

    }
}