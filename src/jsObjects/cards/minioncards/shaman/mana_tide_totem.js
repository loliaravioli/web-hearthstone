import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class mana_tide_totem extends AbstractMinion {
    constructor() {
        super(3, 0, 3);
        this.minionID = MINION_IDS.MANA_TIDE_TOTEM;
        this.name = "Mana Tide Totem";
        this.rarity = RARITY.RARE;

        this.tribe = TRIBE.TOTEM;
    }

    endTurnEffect() {

    }
}