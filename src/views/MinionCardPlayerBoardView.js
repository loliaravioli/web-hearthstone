import { AttackEvent } from "../jsObjects/attackEvent.js";

export class MinionCardPlayerBoardView {
    constructor(card, boardIndex, container) {
        this.card = card;
        this.boardIndex = boardIndex;
        this.container = container;
        this.elementCenterX = 0;
        this.elementCenterY = 0;
        this.element = this.generateElement();
        this.attackEvent = null;
        this.update();
    }

    getElement() {
        return this.element;
    }

    getElementCenter() {
        return { x: this.elementCenterX, y: this.elementCenterY };
    }

    render() {
        this.container.appendChild(this.getElement());
        const rect = this.getElement().getBoundingClientRect();
        this.elementCenterX = rect.left + rect.width / 2;
        this.elementCenterY = rect.top + rect.height / 2;
    }

    generateElement() {
        const cardDiv = document.createElement('div'),
            attackValueBackground = document.createElement('div'),
            healthValueBackground = document.createElement('div'),
            attackValue = document.createElement('div'),
            healthValue = document.createElement('div');

        cardDiv.id = `playerCardInPlay${this.boardIndex}`;
        cardDiv.dataset.boardIndex = this.boardIndex;

        cardDiv.classList.add("cardinplay");
        cardDiv.classList.add("player-cardinplay");
        // cardDiv.classList.add('placeCardAnim');

        attackValue.classList.add("attackValue");
        attackValueBackground.classList.add("attackValueBackground");
        cardDiv.appendChild(attackValueBackground);
        attackValueBackground.appendChild(attackValue);

        healthValue.classList.add("healthValue");
        healthValueBackground.classList.add("healthValueBackground");
        cardDiv.appendChild(healthValueBackground);
        healthValueBackground.appendChild(healthValue);

        cardDiv.style.backgroundImage = "url('src/cardimages/" + this.card.image + "')";

        cardDiv.onmousedown = (e) => {
            e.preventDefault();
            this.attackEvent = new AttackEvent();
            this.attackEvent.setAttacker(this);
        };

        return cardDiv;
    }

    update() {
        this.getElement().querySelector('.attackValue').innerText = this.card.attack;
        this.getElement().querySelector('.healthValue').innerText = this.card.health;

        // also update mana
        // this.element.querySelector('.attackValue').innerText = this.attack;
    }
}