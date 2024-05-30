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

    addMinion(minion, position) {
        this.cardViews.splice(position, 0, MinionCardPlayerBoardView(minion));
        this.board.addMinion(card, position);
        this.update();
    }

    removeMinion(index) {
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
