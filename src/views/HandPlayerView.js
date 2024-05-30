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
        this.cardViews.push(new MinionCardHandView(card));
        this.hand.addCard(card);
        this.update();
    }

    removeCard(index) {
        this.cardViews.splice(index, 1);
        this.hand.removeCard(index);
        this.update();
    }

    update() {
        this.getElement().replaceChildren();
        this.cardViews.forEach(i => {
            this.getElement().append(i.getElement());
        });
    }
}
