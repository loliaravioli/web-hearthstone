import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class voidwalker extends AbstractMinion {
    constructor() {
        super(1, 1, 3);
        this.minionID = MINION_IDS.VOIDWALKER;
        this.name = "Voidwalker";
        this.rarity = RARITY.FREE;

        this.tribe = TRIBE.DEMON;

        this.hasTaunt = true;
    }
}