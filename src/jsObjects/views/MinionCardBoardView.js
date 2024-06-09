export class MinionCardBoardView {
    constructor(card, boardIndex, isPlayer) {
        this.card = card;
        this.boardIndex = boardIndex;
        this.isPlayer = isPlayer;
        this.element = this.generateElement();
        this.update();
    }

    getElement() {
        return this.element;
    }

    applyDamage(dmg) {
        const isDead = this.card.applyDamage(dmg);
        this.update();
        return isDead;
    }

    getAttack() {
        return this.card.attack;
    }

    triggerDeath() {
        this.card.triggerDeath();
    }

    generateElement() {
        const cardDiv = document.createElement('div'),
            attackValueBackground = document.createElement('div'),
            healthValueBackground = document.createElement('div'),
            attackValue = document.createElement('div'),
            healthValue = document.createElement('div');

        cardDiv.id = this.isPlayer ? `playerCardInPlay${this.boardIndex}` : `opponentCardInPlay${this.boardIndex}`;
        cardDiv.dataset.boardIndex = this.boardIndex;

        cardDiv.classList.add("cardinplay");
        cardDiv.classList.add(this.isPlayer ? "cardInPlay--player" : "cardInPlay--opponent");
        // cardDiv.classList.add('placeCardAnim');

        attackValue.classList.add("attackValue");
        attackValueBackground.classList.add("attackValueBackground");
        cardDiv.appendChild(attackValueBackground);
        attackValueBackground.appendChild(attackValue);

        healthValue.classList.add("healthValue");
        healthValueBackground.classList.add("healthValueBackground");
        cardDiv.appendChild(healthValueBackground);
        healthValueBackground.appendChild(healthValue);

        cardDiv.style.backgroundImage = "url('src/media/images/cardimages/" + this.card.constructor.name + ".jpg')";

        return cardDiv;
    }

    update() {
        this.getElement().querySelector('.attackValue').innerText = this.card.attack;
        this.getElement().querySelector('.healthValue').innerText = this.card.health;

        // also update mana
        // this.element.querySelector('.attackValue').innerText = this.attack;
    }
}
