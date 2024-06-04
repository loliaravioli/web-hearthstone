import { AbstractBoardView } from './AbstractBoardView.js';
import { MinionCardPlayerBoardView } from './MinionCardPlayerBoardView.js'

export class BoardPlayerView extends AbstractBoardView {
    constructor(board) {
        super(board);
        this.placeholderIndex = -1;
        this.divID = 'board--player';
        this.update();
    }

    generatePlaceholder(cardX) {
        if (this.cardViews.length == 0) { return; }
        let cardsCount = this.cardViews.length;
        for (let i = 0; i < cardsCount; i++) {
            const rect = this.cardViews[i].getElement().getBoundingClientRect();
            const elementCenterX = rect.left + rect.width / 2;
            if (cardX < elementCenterX) {
                if (i == this.placeholderIndex) { return; }

                this.placeholderIndex = i;

                $('.card--placeholder').remove();

                const childElement = this.getElement().children[this.placeholderIndex],
                    placeholderCard = document.createElement('div');
                placeholderCard.classList.add('cardinplay', 'card--placeholder', 'player-cardinplay');
                this.getElement().insertBefore(placeholderCard, childElement);
                return;
            }
        }

        if (cardsCount == this.placeholderIndex) { return; }

        this.placeholderIndex = cardsCount;

        $('.card--placeholder').remove();

        const childElement = this.getElement().children[this.placeholderIndex],
            placeholderCard = document.createElement('div');
        placeholderCard.classList.add('cardinplay', 'card--placeholder', 'player-cardinplay');
        this.getElement().insertBefore(placeholderCard, childElement);
    }

    removePlaceholder() {
        this.placeholderIndex = -1;
        this.update();
    }

    update() {
        this.getElement().replaceChildren();
        this.cardViews = [];

        for (let i = 0; i < this.board.cards.length; i++) {
            const view = new MinionCardPlayerBoardView(this.board.cards[i], i);
            this.cardViews.push(view);
            this.getElement().appendChild(view.getElement());
        }
    }
}
