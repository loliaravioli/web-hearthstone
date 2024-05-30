import { RARITY } from "./rarity.js";

// all cards, minions and spells, should have these properties
export class AbstractCard {
    constructor() {
        this.mana = 0;
        this.baseMana = 0;

        this.info = '';
        this.image = '';
        this.name = '???';
        this.rarity = RARITY.COMMON;

        this.isMinion = false;

        this.overload = 0;

        this.playSound = new Audio("src/sounds/cardplace.mp3");
        this.musicSound = new Audio();
    }
}