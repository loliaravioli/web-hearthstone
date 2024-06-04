import { AbstractBoardView } from './AbstractBoardView.js';
import { MinionCardOpponentBoardView } from './MinionCardOpponentBoardView.js'

export class BoardOpponentView extends AbstractBoardView {
    constructor(board) {
        super(board);
        this.divID = 'board--opponent';
        this.update();
    }

    update() {
        this.getElement().replaceChildren();
        this.cardViews = [];

        for (let i = 0; i < this.board.cards.length; i++) {
            const view = new MinionCardOpponentBoardView(this.board.cards[i], i);
            this.cardViews.push(view);
            this.getElement().appendChild(view.getElement());
        }
    }
}
