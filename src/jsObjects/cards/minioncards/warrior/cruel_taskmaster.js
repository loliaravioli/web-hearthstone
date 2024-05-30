import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class cruel_taskmaster extends AbstractMinion {
    constructor() {
        super(2, 2, 2);
        this.minionID = MINION_IDS.CRUEL_TASKMASTER;
        this.name = "Cruel Taskmaster";
        this.rarity = RARITY.COMMON;
    }

    battlecry() {
        
    }
}