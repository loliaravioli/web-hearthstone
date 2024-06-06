import GAME from '../../../game.js';

export class ManaPlayerView {
    constructor(mana) {
        this.mana = mana;
        this.update();
    }

    getElement() {
        // return document.querySelector('.player-deck');
    }

    newTurn() {
        this.mana.newTurn();
        this.update();
    }

    depleteMana(value) {
        this.mana.depleteMana(value);
        this.update();
    }

    addMana(value) {
        this.mana.addMana(value);
        this.update();
    }

    getCurrentMana() {
        return this.mana.currentMana;
    }

    update() {
        // let manaCrystals = document.getElementsByClassName("manabox");
        // for (let i = 0; i < this.mana.currentMana; i++) {
        //     manaCrystals[manaCrystals.length - i].style.backgroundColor = "black";
        // }

        GAME.playerHandView.update(); // update the "playable" status of cards in hand when mana changes
    }
}
