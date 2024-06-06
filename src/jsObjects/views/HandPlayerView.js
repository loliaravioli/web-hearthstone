import { MinionCardHandView } from "./MinionCardHandView.js";

export class HandPlayerView {
    constructor(hand) {
        this.hand = hand;
        this.cardViews = [];
        this.update();
    }

    getElement() {
        return document.querySelector('.cards');
    }

    getCard(index) {
        return this.hand.getCard(index);
    }

    addCard(card) {
        this.hand.addCard(card);
        this.update();
    }

    removeCard(index) {
        this.hand.removeCard(index);
        this.update();
    }

    setAllCardsPlayable() { // debug method
        this.cardViews.forEach(i => {
            i.setPlayable(true);
        });

        this.update();
    }

    setAllCardsUnplayable() {
        this.cardViews.forEach(i => {
            i.setPlayable(false);
        });

        this.update();
    }

    update() {
        this.getElement().replaceChildren();
        this.cardViews = [];

        let currentIndex = 0;
        this.hand.cards.forEach(i => {
            const view = new MinionCardHandView(i, currentIndex);
            this.cardViews.push(view);
            this.getElement().appendChild(view.getElement());
            currentIndex++;
        });

        $('.card').draggable({
            containment: 'window',
            revert: function (valid) {
                GAME.playerBoardView.removePlaceholder();
                return !valid;
            }, drag: throttle(function (event, ui) { // TODO: fix glitch where placeholder slot will remain even after dropping card
                if (!ui.helper.data('hovering-board')) { return; }
                GAME.playerBoardView.generatePlaceholder(ui.helper.offset().left + (ui.helper.width() / 2));
            }, 50)
        });
    }
}
