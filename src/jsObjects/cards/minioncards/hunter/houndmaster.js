import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class houndmaster extends AbstractMinion {
    constructor() {
        super(4, 4, 3);
        this.minionID = MINION_IDS.HOUNDMASTER;
        this.name = "Houndmaster";
        this.rarity = RARITY.FREE;
    }

    battlecry() {
        
    }
}