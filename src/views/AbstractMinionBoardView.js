export class AbstractMinionBoardView {
    constructor(card, boardIndex) {
        this.card = card;
        this.boardIndex = boardIndex;
        this.element = null;
    }

    generateElement() { /* stub */ }
    update() { /* stub */ }

    getElement() {
        return this.element;
    }
    
    applyDamage(dmg) {
        const isDead = this.card.applyDamage(dmg);
        this.update();
        return isDead;
    }

    getAttack() {
        return this.card.attack;
    }

    triggerDeath() {
        this.card.triggerDeath();
    }
}