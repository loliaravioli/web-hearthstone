export class Mana {
    constructor() {
        this.currentMana = 0;
        this.manaCap = 0;
        this.currentOverload = 0;
        this.nextTurnOverload = 0;
    }

    depleteMana(value) {
        if (this.currentMana - value >= 0) {
            this.currentMana -= value;
        }
    }

    addMana(value) {
        if (this.currentMana + value <= 10) {
            this.currentMana += value;
        }
    }

    newTurn() {
        if (this.manaCap < 10) {
            this.manaCap++;
        }

        this.refreshMana();
    }

    doOverload(value) {
        this.nextTurnOverload = value;
    }

    refreshMana() {
        this.currentOverload = this.nextTurnOverload;
        this.currentMana = this.manaCap - this.nextTurnOverload;
        this.nextTurnOverload = 0;
    }
}