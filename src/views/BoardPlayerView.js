import { MinionCardPlayerBoardView } from './MinionCardPlayerBoardView.js'

export class BoardPlayerView {
    constructor(board) {
        this.board = board;
        this.cardViews = [];
        this.placeholderIndex = -1;
        this.attackingCardView = null;

        document.body.onmouseup = (e) => {
            e.preventDefault();
            // if (this.defendCardView) {
            //     this.doAttack();
            // } else {
            this.resetAttack();
            // }
        };

        this.update();
    }

    getElement() {
        return document.getElementById('board--player');
    }

    addCard(card) {
        if (this.placeholderIndex == -1) {
            this.board.addCard(card, 0);
        } else {
            this.board.addCard(card, this.placeholderIndex);
            this.placeholderIndex = -1;
        }
        this.update();
    }

    removeCard(index) {
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
                placeholderCard.classList.add('cardinplay', 'card--placeholder', 'player-cardinplay');
                this.getElement().insertBefore(placeholderCard, childElement);
                return;
            }
        }

        if (cardsCount == this.placeholderIndex) { return; }

        this.placeholderIndex = cardsCount;

        $('.card--placeholder').remove();

        const childElement = this.getElement().children[this.placeholderIndex],
            placeholderCard = document.createElement('div');
        placeholderCard.classList.add('cardinplay', 'card--placeholder', 'player-cardinplay');
        this.getElement().insertBefore(placeholderCard, childElement);
    }

    removePlaceholder() {
        this.placeholderIndex = -1;
        this.update();
    }

    resetAttack() {
        this.attackingCardView = null;
        // this.defendingCardView = null;
        document.getElementById('svg').style.display = 'none';
        document.getElementById('innercursor').style.visibility = 'hidden';
        document.getElementById('outercursor').style.visibility = 'hidden';
        document.getElementById('arrowcursor').style.visibility = 'hidden';
        document.body.style.cursor = 'url(src/cursor/cursor.png) 10 2, auto';
    }

    update() { // TODO: add another "soft update" method that gets called for the placeholder slot
        $('.player-cardinplay').remove();
        this.cardViews = [];

        for (let i = 0; i < this.board.cards.length; i++) {
            const view = new MinionCardPlayerBoardView(this.board.cards[i], i);
            this.cardViews.push(view);
            this.getElement().appendChild(view.getElement());

            view.getElement().onmousedown = (e) => {
                e.preventDefault();
                this.attackingCardView = view;
                const rect = view.getElement().getBoundingClientRect();
                const x = rect.left + (rect.width / 2),
                    y = rect.top + (rect.height / 2);
                document.getElementById('svg').style.display = 'block';
                document.getElementById('innercursor').style.visibility = 'visible';
                document.getElementById('outercursor').style.visibility = 'visible';
                document.getElementById('arrowcursor').style.visibility = 'visible';
                document.body.style.cursor = 'none';

                document.body.addEventListener('mousemove', (e) => {
                    const destX = e.clientX, destY = e.clientY;
                    const angleDeg = (Math.atan2(destY - y, destX - x) * 180 / Math.PI) + 90;
                    // TODO: fix bug where this arrow briefly appears on the previous card it was on
                    $('#arrowcursor').css('transform', `rotate(${angleDeg}deg) translate(-50%,-110%)`);
                    $('#svgpath').attr('d', `M${destX},${destY} ${x},${y}`);
                });
            };
        }
    }
}
