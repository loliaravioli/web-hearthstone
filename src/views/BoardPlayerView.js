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
        this.cardViews.splice(position, 0, new MinionCardPlayerBoardView(card, position));
        this.board.addCard(card, position);
        this.update();
    }

    removeCard(index) {
        this.cardViews.splice(index, 1);
        this.board.removeCard(index);
        this.update();
    }

    update() {
        this.getElement().replaceChildren();
        this.cardViews.forEach(i => {
            this.getElement().append(i.getElement());
        });
    }
}
