import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class aldor_peacekeeper extends AbstractMinion {
    constructor() {
        super(3, 3, 3);
        this.minionID = MINION_IDS.ALDOR_PEACEKEEPER;
        this.name = "Aldor Peacekeeper";
        this.rarity = RARITY.RARE;
    }

    battlecry() {
        
    }
}