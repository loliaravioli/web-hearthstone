export class MinionCardPlayerBoardView {
    constructor(card, boardIndex, container) {
        this.card = card;
        this.boardIndex = boardIndex;
        this.container = container;
        this.element = this.generateElement();
        this.update();
    }

    getElement() {
        return this.element;
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

        return cardDiv;
    }

    update() {
        this.getElement().querySelector('.attackValue').innerText = this.card.attack;
        this.getElement().querySelector('.healthValue').innerText = this.card.health;

        // also update mana
        // this.element.querySelector('.attackValue').innerText = this.attack;
    }
}