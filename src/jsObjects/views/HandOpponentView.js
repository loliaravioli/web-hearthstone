export class HandOpponentView {
    constructor() {
        this.cardCount = 0;
        this.update();
    }

    getElement() {
        // return document.querySelector('.cards');
    }

    count() {
        return this.cardCount;
    }

    addCard() {
        this.cardCount++;
        this.update();
    }

    removeCard() {
        this.cardCount--;
        this.update();
    }

    update() {
        // $('.card').remove();
        this.cardViews = [];

        for (let i = 0; i < this.cardCount; i++) {
            this.getElement().appendChild();
        }
    }
}