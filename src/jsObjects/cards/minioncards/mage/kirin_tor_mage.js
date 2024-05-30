import { RARITY } from '../../rarity.js';
import { TRIBE } from '../../tribe.js'
import { AbstractMinion, MINION_IDS } from '../abstractminioncard.js';

export class kirin_tor_mage extends AbstractMinion {
    constructor() {
        super(3, 4, 3);
        this.minionID = MINION_IDS.KIRIN_TOR_MAGE;
        this.name = "Kirin Tor Mage";
        this.rarity = RARITY.RARE;
    }

    battlecry() {

    }
}