import { MinionCardPlayerBoardView } from './MinionCardPlayerBoardView.js'

export class BoardPlayerView {
    constructor(board) {
        this.board = board;
        this.cardViews = [];
        this.update();
    }

    getElement() {
        return document.getElementById('board--player');
    }

    addCard(card, position) {
        this.board.addCard(card, position);
        this.update();
    }

    removeCard(index) {
        this.board.removeCard(index);
        this.update();
    }

    update() {
        this.getElement().replaceChildren();
        this.cardViews = [];

        let currentIndex = 0;
        this.board.cards.forEach(i => {
            const view = new MinionCardPlayerBoardView(i, currentIndex);
            this.cardViews.push(view);
            this.getElement().append(view.getElement());
            currentIndex++;
        });
    }
}
