export class HeroPowerPlayerView {
    constructor(heroPower) {
        this.heroPower = heroPower;
        this.update();
    }

    getElement() {
        return document.getElementById("playerheropower");
    }

    update() {
        this.getElement().style.boxShadow = "0px 2px 15px 12px #0FCC00";
        this.getElement().classList.add("canAttack");
    }
}
