export class Hand {
    constructor() {
        this.cards = [];
    }

    count() {
        return this.cards.length;
    }

    getCard(index) {
        return this.cards[index];
    }

    addCard(card) {
        this.cards.push(card);
    }

    removeCard(index) {
        this.cards.splice(index, 1);
    }

    discardRandomCard() {
        removeCard(Math.floor(Math.random() * this.count()));
        // TODO: apply discard effect either here or on the card itself
    }

    discardHand() {
        this.cards = [];
        // TODO: apply discard effect either here or on the cards themselves
    }
}