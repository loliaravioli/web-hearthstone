export class DeckPlayerView {
    constructor(deck) {
        this.deck = deck;
        this.update();
    }

    getElement() {
        return document.querySelector('.player-deck');
    }

    drawCard() {
        let card = this.deck.drawCard();
        this.update();
        return card;
    }

    update() {
        this.getElement().innerText = this.deck.count();
        this.getElement().style.display = (this.deck.isEmpty()) ? "none" : "block";
    }
}
