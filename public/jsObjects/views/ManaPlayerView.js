import GAME from '../../../game.js';

export class ManaPlayerView {
    constructor(mana) {
        this.mana = mana;
        this.update();
    }

    getElement() {
        return document.getElementById('manacontainer');
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

    currentMana() {
        return this.mana.currentMana;
    }

    update() {
        $('.manabox').remove();
        for (let i = 0; i < this.mana.currentMana; i++) {
            const manacrystal = document.createElement('div');
            manacrystal.classList.add('manabox');
            manacrystal.style.backgroundColor = 'black';
            this.getElement().appendChild(manacrystal);
        }
        
        for (let i = this.mana.currentMana; i < this.mana.manaCap; i++) {
            const manacrystal = document.createElement('div');
            manacrystal.classList.add('manabox');
            manacrystal.style.backgroundColor = '#3669c9';
            this.getElement().appendChild(manacrystal);
        }

        $('#mana').html(`${this.currentMana()}/${this.mana.manaCap}`);
        
        // update the "playable" status of cards and hero power when mana changes
        // GAME.playerHandView.update();
        // GAME.playerHeroPowerView.update();
    }
}
