import GAME from '../../../game.js';
import { MinionBoardView } from './MinionBoardView.js'

export class BoardView {
    constructor(isPlayer) {
        this.board = [];
        this.placeholderIndex = -1;
        this.isPlayer = isPlayer;
        this.divID = this.isPlayer ? 'board--player' : 'board--opponent';
        this.update();
    }

    getElement() {
        return document.getElementById(this.divID);
    }

    card(index) {
        return this.cardViews[index];
    }

    // addCard(card) {
    //     if (this.placeholderIndex == -1) {
    //         this.board.addCard(card, 0);
    //     } else {
    //         this.board.addCard(card, this.placeholderIndex);
    //         this.placeholderIndex = -1;
    //     }
    //     card.triggerPlay();
    //     this.update();
    // }

    killCard(index) {
        console.log(`Killing minion at index ${index} on ${this.isPlayer ? "player's" : "opponent's"} board`);
        // this.cardViews[index].triggerDeath();
        // this.board.removeCard(index);
        // this.update();
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
                placeholderCard.classList.add('cardinplay', 'card--placeholder', 'cardInPlay--player');
                this.getElement().insertBefore(placeholderCard, childElement);
                return;
            }
        }

        if (cardsCount == this.placeholderIndex) { return; }

        this.placeholderIndex = cardsCount;

        $('.card--placeholder').remove();

        const childElement = this.getElement().children[this.placeholderIndex],
            placeholderCard = document.createElement('div');
        placeholderCard.classList.add('cardinplay', 'card--placeholder', 'cardInPlay--player');
        this.getElement().insertBefore(placeholderCard, childElement);
    }

    removePlaceholder() {
        this.placeholderIndex = -1;
        this.update();
    }

    update() {
        this.getElement().replaceChildren();
        this.cardViews = [];

        for (let i = 0; i < this.board.length; i++) {
            const view = new MinionBoardView(this.board[i], i, this.isPlayer);
            this.cardViews.push(view);
            this.getElement().appendChild(view.getElement());
        }

        GAME.cardDragController.refresh();
    }
}
