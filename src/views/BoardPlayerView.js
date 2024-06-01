import { MinionCardPlayerBoardView } from './MinionCardPlayerBoardView.js'

export class BoardPlayerView {
    constructor(board) {
        this.board = board;
        this.cardViews = [];
        this.placeholderIndex = -1;
        this.update();
    }

    getElement() {
        return document.getElementById('board--player');
    }

    addCard(card) {
        this.board.addCard(card, this.placeholderIndex);
        this.placeholderIndex = -1;
        this.update();
    }

    removeCard(index) {
        this.board.removeCard(index);
        this.update();
    }

    generatePlaceholder(cardX) {
        let cardsCount = this.cardViews.length;
        for (let i = 0; i < cardsCount; i++) {
            const element = this.cardViews[i].getElement();
            const center = element.offsetLeft + (element.offsetWidth / 2);
            if (cardX < center) {
                if (i == this.placeholderIndex) {
                    return;
                }
                this.placeholderIndex = i;
                console.log('placeholderIndex=', this.placeholderIndex);
                this.update();
                return;
            }
        }

        if (cardsCount == this.placeholderIndex) {
            return;
        }
        this.placeholderIndex = cardsCount;
        console.log('placeholderIndex=', this.placeholderIndex);
        this.update();
    }

    update() {
        this.getElement().replaceChildren();
        this.cardViews = [];

        if (this.placeholderIndex == 0) {
            const placeholderCard = document.createElement('div');
            placeholderCard.classList.add('cardinplay', 'card--placeholder', 'computer-cardinplay');
            this.getElement().appendChild(placeholderCard);
        }

        for (let i = 0; i < this.board.cards.length; i++) {
            const view = new MinionCardPlayerBoardView(this.board.cards[i], i);
            this.cardViews.push(view);
            this.getElement().appendChild(view.getElement());

            if (i + 1 == this.placeholderIndex) {
                const placeholderCard = document.createElement('div');
                placeholderCard.classList.add('cardinplay', 'card--placeholder', 'computer-cardinplay');
                this.getElement().appendChild(placeholderCard);
            }
        }
    }
}
