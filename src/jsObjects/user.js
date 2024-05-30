// handles high-level functions on ONE side of the game (player or opponent)
// that require the cooperation of several other objects:
// drawing cards, playing cards, etc.

// this class may not be necessary anymore

export class User {
    constructor() {
        this.deck = new Deck();
        this.board = new Board();
        this.hand = new Hand();
    }

    refresh() {

    }

    drawCard() {
        // remove top card from deck
        // add card to hand
        // handle exceptions later
    }

    playCard(boardPosition) {
        // add card to board
        // remove card from hand
    }
}