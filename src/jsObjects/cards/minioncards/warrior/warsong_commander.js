import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class warsong_commander extends AbstractMinion {
    constructor() {
        super(3, 2, 3);
        this.minionID = MINION_IDS.WARSONG_COMMANDER;
        this.name = "Warsong Commander";
        this.rarity = RARITY.FREE;
    }

    auraEffect() {
        
    }
}