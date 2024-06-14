export class HeroView {
    constructor(isPlayer) {
        this.health = 0;
        this.isPlayer = isPlayer;
        this.divID = this.isPlayer ? 'playerHero' : 'opponentHero';
        this.update();
    }

    // returns the portrait part of the hero, not the container or health
    getElement() {
        return document.getElementById(this.divID);
    }

    setHealth(health) { 
        this.health = health;
        this.update();
    }

    update() {
        document.getElementById(this.isPlayer ? 'playerHeroHealth' : 'opponentHeroHealth').innerText = this.health;
    }
}
