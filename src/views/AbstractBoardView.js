export class AbstractBoardView {
    constructor(board) {
        this.board = board;
        this.cardViews = [];
        this.divID = 'board--player';
    }

    getElement() {
        return document.getElementById(this.divID);
    }

    card(index) {
        return this.cardViews[index];
    }

    addCard(card) {
        if (this.placeholderIndex == -1) {
            this.board.addCard(card, 0);
        } else {
            this.board.addCard(card, this.placeholderIndex);
            this.placeholderIndex = -1;
        }
        card.triggerPlay();
        this.update();
    }

    killCard(index) {
        this.cardViews[index].triggerDeath();
        this.board.removeCard(index);
        this.update();
    }

    update() { /* stub */ }
}
