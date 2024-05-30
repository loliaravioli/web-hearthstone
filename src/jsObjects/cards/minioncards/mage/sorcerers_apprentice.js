import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class sorcerers_apprentice extends AbstractMinion {
    constructor() {
        super(2, 3, 2);
        this.minionID = MINION_IDS.SORCERERS_APPRENTICE;
        this.name = "Sorcerer's Apprentice";
        this.rarity = RARITY.COMMON;
    }

    auraEffect() {

    }
}