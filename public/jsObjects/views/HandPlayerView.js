import GAME from '../../../game.js';
import { MinionHandView } from "./MinionHandView.js";

export class HandPlayerView {
    constructor() {
        this.hand = [];
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

        this.hand.forEach((i) => {
            const view = new MinionHandView(i);
            view.setPlayable(true); // FOR DEBUGGING
            this.cardViews.push(view);
            this.getElement().appendChild(view.getElement());
        });

        GAME.cardPlayController.refresh();
    }
}