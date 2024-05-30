import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class dread_infernal extends AbstractMinion {
    constructor() {
        super(6, 6, 6);
        this.minionID = MINION_IDS.DREAD_INFERNAL;
        this.name = "Dread Infernal";
        this.rarity = RARITY.FREE;

        this.tribe = TRIBE.DEMON;
    }

    battlecry() {

    }
}