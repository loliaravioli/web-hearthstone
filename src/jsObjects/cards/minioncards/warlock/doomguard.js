import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class doomguard extends AbstractMinion {
    constructor() {
        super(5, 5, 7);
        this.minionID = MINION_IDS.DOOMGUARD;
        this.name = "Doomguard";
        this.rarity = RARITY.RARE;

        this.tribe = TRIBE.DEMON;

        this.hasCharge = true;
    }

    battlecry() {

    }
}