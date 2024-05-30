import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class patient_assassin extends AbstractMinion {
    constructor() {
        super(2, 1, 1);
        this.minionID = MINION_IDS.PATIENT_ASSASSIN;
        this.name = "Patient Assassin";
        this.rarity = RARITY.EPIC;

        this.hasStealth = true;
        this.hasPoison = true;
    }
}