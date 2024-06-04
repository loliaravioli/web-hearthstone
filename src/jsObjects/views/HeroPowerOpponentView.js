export class HeroPowerOpponentView {
    constructor(heroPower) {
        this.heroPower = heroPower;
        this.update();
    }

    getElement() {
        // return document.getElementById("playerheropower");
    }

    drawCard() {
        let card = this.deck.drawCard();
        this.update();
        return card;
    }

    update() {
        // this.getElement().style.boxShadow = "0px 2px 15px 12px #0FCC00";
        // this.getElement().classList.add("canAttack");
    }
}
