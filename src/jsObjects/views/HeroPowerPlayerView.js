import GAME from '../../../game.js';

export class HeroPowerPlayerView {
    constructor(heroPower) {
        this.heroPower = heroPower;
        this.isUsable = false;
        this.update();
    }

    getElement() {
        return document.getElementById("playerHeropower");
    }

    update() {
        this.getElement().style.boxShadow = "0px 2px 15px 12px #0FCC00";
        // this.getElement().classList.add("canAttack");

        if(GAME.playerManaView.currentMana() < 2) {
            this.getElement().style.boxShadow = "none";
            this.getElement().style.pointerEvents = "none";
        } else {
            this.getElement().style.pointerEvents = "all";
        }
    }
}
