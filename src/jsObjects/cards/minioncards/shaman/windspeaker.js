import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class windspeaker extends AbstractMinion {
    constructor() {
        super(4, 3, 3);
        this.minionID = MINION_IDS.WINDSPEAKER;
        this.name = "Windspeaker";
        this.rarity = RARITY.FREE;
    }

    battlecry() {

    }
}