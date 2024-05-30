import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class felguard extends AbstractMinion {
    constructor() {
        super(3, 3, 5);
        this.minionID = MINION_IDS.FELGUARD;
        this.name = "Felguard";
        this.rarity = RARITY.RARE;

        this.tribe = TRIBE.DEMON;

        this.hasTaunt = true;
    }

    battlecry() {

    }
}