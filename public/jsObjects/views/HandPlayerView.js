import GAME from '../../../game.js';
import { MinionCardHandView } from "./MinionCardHandView.js";

export class HandPlayerView {
    constructor(hand) {
        this.hand = hand;
        this.cardViews = [];
        this.update();
    }

    getElement() {
        return document.getElementById('playerCards');
    }

    // count() {
    //     return this.hand.count();
    // }

    getCard(index) {
        return this.hand[index];
    }

    addCard(card, animation) {
        this.hand.push(card);
        this.update();

        // trying to do a card draw animation

        // const view = new MinionCardHandView(card, this.count());
        // view.setPlayable(true); // FOR DEBUGGING
        // this.cardViews.push(view);
        // this.getElement().appendChild(view.getElement());
        // view.getElement().offsetHeight;
        // view.getElement().classList.add(animation);
        // view.getElement().offsetHeight;
    }

    removeCard(index) {
        this.hand.removeCard(index);
        this.update();
    }

    setAllCardsUnplayable() {
        this.cardViews.forEach(i => {
            i.setPlayable(false);
        });

        this.update();
    }

    update() {
        $('.card').remove();
        this.cardViews = [];

        // old code
        // for (let i = 0; i < this.hand.count(); i++) {
        //     const view = new MinionCardHandView(this.hand.cards[i], i);
        //     view.setPlayable(true); // FOR DEBUGGING
        //     this.cardViews.push(view);
        //     this.getElement().appendChild(view.getElement());
        // }

        for (let i = 0; i < this.hand.length; i++) {
            const view = new MinionCardHandView(this.hand[i], i);
            view.setPlayable(true); // FOR DEBUGGING
            this.cardViews.push(view);
            this.getElement().appendChild(view.getElement());
        }

        // if (this.card.isPlayable) {
        $('.card').draggable({
            containment: 'window',
            revert: function (valid) {
                GAME.playerBoardView.removePlaceholder();
                return !valid;
            },
            drag: this.throttle((event, ui) => { // TODO: fix glitch where placeholder slot will remain even after dropping card
                if (!ui.helper.data('hovering-board')) { return; }
                GAME.playerBoardView.generatePlaceholder(ui.helper.offset().left + (ui.helper.width() / 2));
            }, 50)
        });
        // }
    }

    // certain events trigger every millisecond (e.g. onmousemove)
    // use this method to make them only trigger every x milliseconds to improve performance
    throttle(func, limit) {
        let lastFunc, lastRan;
        return function (...args) {
            if (!lastRan) {
                func.apply(this, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function () {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(this, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    }
}