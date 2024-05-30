import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class archmage_antonidas extends AbstractMinion {
    constructor() {
        super(7, 5, 7);
        this.minionID = MINION_IDS.ARCHMAGE_ANTONIDAS;
        this.name = "Archmage Antonidas";
        this.rarity = RARITY.LEGENDARY;
    }

    auraEffect() {

    }
}