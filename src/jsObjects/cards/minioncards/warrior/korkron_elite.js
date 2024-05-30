import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class korkron_elite extends AbstractMinion {
    constructor() {
        super(4, 4, 3);
        this.minionID = MINION_IDS.KORKRON_ELITE;
        this.name = "Kor'kron Elite";
        this.rarity = RARITY.FREE;

        this.hasCharge = true;
    }
}