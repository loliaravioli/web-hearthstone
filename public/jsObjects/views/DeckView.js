export class DeckView {
    constructor(isPlayer) {
        this.cardCount = 0;
        this.isPlayer = isPlayer;
        this.divID = this.isPlayer ? 'playerDeck' : 'opponentDeck';
        this.update();
    }

    getElement() {
        return document.getElementById(this.divID);
    }

    // drawCard() {
    //     let card = this.deck.drawCard();
    //     this.update();
    //     return card;
    // }
    
    update() {
        this.getElement().innerText = this.cardCount;
        this.getElement().style.display = (this.cardCount == 0) ? 'none' : 'block';
    }
}
