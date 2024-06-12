export class Hero {
    constructor() {
        this.health = 30;

        this.deathSound = '';
        this.attackSound = '';
    }

    triggerDeath() {
        if (this.deathSound != '') {
            (new Audio(this.deathSound)).play();
        }
    }

    triggerAttack() {
        if (this.attackSound != '') {
            (new Audio(this.attackSound)).play();
        }
    }

    applyDamage(dmg) {
        this.health -= dmg;
        return this.health < 1;
    }
}