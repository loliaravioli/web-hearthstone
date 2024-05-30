import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class savannah_highmane extends AbstractMinion {
    constructor() {
        super(6, 6, 5);
        this.minionID = MINION_IDS.SAVANNAH_HIGHMANE;
        this.name = "Savannah Highmane";
        this.rarity = RARITY.RARE;

        this.tribe = TRIBE.BEAST;
    }

    deathrattle() {
        
    }
}