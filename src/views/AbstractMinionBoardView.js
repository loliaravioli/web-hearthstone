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
        this.card.applyDamage(dmg);
        this.update();
    }

    getAttack() {
        return this.card.attack;
    }
}