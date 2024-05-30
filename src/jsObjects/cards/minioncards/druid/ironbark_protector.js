import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class ironbark_protector extends AbstractMinion {
    constructor() {
        super(8, 8, 8);
        this.minionID = MINION_IDS.IRONBARK_PROTECTOR;
        this.name = "Ironbark Protector";
        this.rarity = RARITY.FREE;

        this.hasTaunt = true;
    }
}