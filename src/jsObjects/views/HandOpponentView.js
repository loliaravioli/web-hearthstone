export class HandOpponentView {
    constructor() {
        this.cardCount = 0;
        this.update();
    }

    getElement() {
        return document.getElementById('enemycards');
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
        $('.enemycard').remove();
        this.cardViews = [];

        for (let i = 0; i < this.cardCount; i++) {
            const c = document.createElement('div');
            c.classList.add('enemycard');
            this.getElement().appendChild(c);
        }
    }
}