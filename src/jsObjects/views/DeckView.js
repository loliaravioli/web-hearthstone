export class DeckView {
    constructor(deck, divID) {
        this.deck = deck;
        this.divID = divID;
        this.update();
    }

    getElement() {
        return document.getElementById(this.divID);
    }

    drawCard() {
        let card = this.deck.drawCard();
        this.update();
        return card;
    }
    
    update() {
        this.getElement().innerText = this.deck.count();
        this.getElement().style.display = (this.deck.isEmpty()) ? 'none' : 'block';
    }
}
