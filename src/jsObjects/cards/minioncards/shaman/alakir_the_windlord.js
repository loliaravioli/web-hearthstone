import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class alakir_the_windlord extends AbstractMinion {
    constructor() {
        super(8, 3, 5);
        this.minionID = MINION_IDS.ALAKIR_THE_WINDLORD;
        this.name = "Al'Akir the Windlord";
        this.rarity = RARITY.LEGENDARY;

        this.hasCharge = true;
        this.hasDivineShield = true;
        this.hasTaunt = true;
        this.hasWindfury = true;
    }
}