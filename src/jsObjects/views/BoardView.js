import GAME from '../../../game.js';
import { MinionCardBoardView } from './MinionCardBoardView.js'

export class BoardView {
    constructor(board, divID, isPlayer) {
        super(board);
        this.placeholderIndex = -1;
        this.divID = divID;
        this.isPlayer = isPlayer;
        this.update();
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

        for (let i = 0; i < this.board.cards.length; i++) {
            const view = new MinionCardBoardView(this.board.cards[i], i, this.isPlayer);
            this.cardViews.push(view);
            this.getElement().appendChild(view.getElement());
        }

        if (this.isPlayer) {
            $(`#${this.divID}`).droppable({
                accept: '.card',
                drop: (event, ui) => {
                    ui.helper.data('hovering-board', false);
                    GAME.playerBoardView.addCard(GAME.playerHandView.getCard(ui.draggable.data('handIndex')));
                    GAME.playerHandView.removeCard(ui.draggable.data('handIndex'));
                    $('#gifhint, #texthint').hide();
                    this.update;
                }, over: function (event, ui) {
                    ui.helper.data('hovering-board', true);
                }, out: function (event, ui) {
                    ui.helper.data('hovering-board', false);
                },
            });
        }
    }
}
