export class HandOpponentView {
    constructor() {
        this.cardCount = 0;
        this.update();
    }

    getElement() {
        return document.getElementById('enemyCards');
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
        $('.enemyCard').remove();
        this.cardViews = [];

        for (let i = 0; i < this.cardCount; i++) {
            const c = document.createElement('div');
            c.classList.add('enemyCard');
            this.getElement().appendChild(c);
        }
    }
}