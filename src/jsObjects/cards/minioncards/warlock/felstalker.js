import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class felstalker extends AbstractMinion {
    constructor() {
        super(2, 4, 3);
        this.minionID = MINION_IDS.FELSTALKER;
        this.name = "Felstalker";
        this.rarity = RARITY.FREE;

        this.tribe = TRIBE.DEMON;
    }

    battlecry() {

    }
}