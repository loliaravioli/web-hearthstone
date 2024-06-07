import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class king_krush extends AbstractMinion {
    constructor() {
        super(9, 8, 8);
        this.minionID = MINION_IDS.KING_KRUSH;
        this.name = 'King Krush';
        this.rarity = RARITY.LEGENDARY;
        this.info = 'Charge';
        this.tribe = TRIBE.BEAST;

        this.hasCharge = true;
    }
}