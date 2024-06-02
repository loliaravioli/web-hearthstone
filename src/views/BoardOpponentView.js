import { AbstractBoardView } from './AbstractBoardView.js';
import { MinionCardOpponentBoardView } from './MinionCardOpponentBoardView.js'

// DEBUG
import { king_krush } from '../jsObjects/cards/minioncards/hunter/king_krush.js';

export class BoardOpponentView extends AbstractBoardView {
    constructor(board) {
        super(board);
        this.divID = 'board--opponent';
        this.update();
        
        // DEBUG
        this.addCard(new king_krush(), 0);
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
