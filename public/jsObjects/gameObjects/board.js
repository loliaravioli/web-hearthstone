// handles the board state for ONE user

export class Board {
    constructor() {
        this.cards = [];
    }

    count() {
        return this.cards.length;
    }

    isFull() {
        return this.cards.length == 7;
    }

    isEmpty() {
        return this.cards.length == 0;
    }

    addCard(card, position) {
        this.cards.splice(position, 0, card);
    }

    removeCard(position) {
        this.cards.splice(position, 1);
    }
}