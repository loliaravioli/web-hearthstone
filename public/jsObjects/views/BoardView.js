import GAME from '../../../game.js';
import { MinionBoardView } from './MinionBoardView.js'

export class BoardView {
    constructor(isPlayer) {
        this.board = [];
        this.placeholderIndex = -1;
        this.isPlayer = isPlayer;
        this.divID = this.isPlayer ? 'board--player' : 'board--opponent';
        this.update();
    }

    getElement() {
        return document.getElementById(this.divID);
    }

    card(index) {
        return this.cardViews[index];
    }

    playMinion(minion, index) {
        this.board.splice(index, 0, minion);

        const view = new MinionBoardView(this.board[index], index, this.isPlayer);
        this.cardViews.splice(index, 0, view);

        this.getElement().insertBefore(view.getElement(), this.getElement().children[index]);
    }

    killCard(index) {
        console.log(`Killing minion at index ${index} on ${this.isPlayer ? "player's" : "opponent's"} board`);
        // this.cardViews[index].triggerDeath();
        // this.board.removeCard(index);
        // this.update();
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
        $('.card--placeholder').remove();
    }

    changeStats(minionID, stats) {
        const index = this.board.findIndex(c => c.minionID == minionID);
        if (index == -1) { return; }
        
        this.board[index].mana = stats[0];
        this.board[index].attack = stats[1];
        this.board[index].health = stats[2];
        this.cardViews[index].update();
    }

    update() {
        this.getElement().replaceChildren();
        this.cardViews = [];

        for (let i = 0; i < this.board.length; i++) {
            const view = new MinionBoardView(this.board[i], i, this.isPlayer);
            this.cardViews.push(view);
            this.getElement().appendChild(view.getElement());
        }

        GAME.cardPlayController.refresh();
    }
}
