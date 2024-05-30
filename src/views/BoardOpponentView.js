import { MinionCardOpponentBoardView } from './MinionCardOpponentBoardView.js'

export class BoardOpponentView {
    constructor(board) {
        this.board = board;
        this.cardViews = [];
        this.update();
    }

    getElement() {
        return document.getElementById('board--opponent');
    }

    addMinion(minion, position) {
        this.cardViews.splice(position, 0, new MinionCardOpponentBoardView(minion, position));
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
