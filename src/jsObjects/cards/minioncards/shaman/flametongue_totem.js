import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class flametongue_totem extends AbstractMinion {
    constructor() {
        super(2, 0, 3);
        this.minionID = MINION_IDS.FLAMETONGUE_TOTEM;
        this.name = "Flametongue Totem";
        this.rarity = RARITY.FREE;

        this.tribe = TRIBE.TOTEM;
    }

    auraEffect() {

    }
}