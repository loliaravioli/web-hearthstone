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
        $('.card').remove();
        this.cardViews = [];

        let currentIndex = 0;
        this.hand.cards.forEach(i => {
            const view = new MinionCardHandView(i, currentIndex);
            this.cardViews.push(view);
            this.getElement().appendChild(view.getElement());
            currentIndex++;
        });

    }
}

// certain events trigger every millisecond (e.g. onmousemove)
// use this method to make them only trigger every x milliseconds to improve performance
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
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