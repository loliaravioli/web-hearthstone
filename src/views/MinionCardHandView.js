export class MinionCardHandView {
    constructor(card, handIndex) {
        this.card = card;
        this.handIndex = handIndex;
        this.playable = false;
        this.element = this.generateElement();
        this.update();
    }

    getElement() {
        return this.element;
    }

    generateElement() {
        const cardDiv = document.createElement('div'),
            playerCardFaceInHandDiv = document.createElement('div'),
            playerCardBorderInHandDiv = document.createElement('div'),
            playerAttackValueInHand = document.createElement('div'),
            playerHealthValueInHand = document.createElement('div'),
            playerManaValueInHand = document.createElement('div'),
            playerInfoValueInHand = document.createElement('div'),
            playerNameValueInHand = document.createElement('div'),
            tutorialHintValueInHand = document.createElement('div');

        cardDiv.dataset.handIndex = this.handIndex;

        cardDiv.classList.add("card");
        playerCardFaceInHandDiv.classList.add("card-face");
        playerCardBorderInHandDiv.classList.add("card-border");
        playerAttackValueInHand.classList.add("cardAttackValue");
        playerHealthValueInHand.classList.add("cardHealthValue");
        playerManaValueInHand.classList.add("cardManaValue");
        playerInfoValueInHand.classList.add("cardInfoValue");
        playerNameValueInHand.classList.add("cardNameValue");
        tutorialHintValueInHand.classList.add("cardtutorialhint");

        cardDiv.appendChild(playerCardFaceInHandDiv);
        playerCardFaceInHandDiv.appendChild(playerAttackValueInHand);
        playerCardFaceInHandDiv.appendChild(playerHealthValueInHand);
        playerCardFaceInHandDiv.appendChild(playerManaValueInHand);
        playerCardFaceInHandDiv.appendChild(playerInfoValueInHand);
        playerCardFaceInHandDiv.appendChild(playerCardBorderInHandDiv);
        playerCardFaceInHandDiv.appendChild(playerNameValueInHand);
        playerCardFaceInHandDiv.appendChild(tutorialHintValueInHand);

        // if (isTutorial == true) {}
        tutorialHintValueInHand.innerText = 'Mana Cost\nAttack' + '                     ' + 'Health';

        playerInfoValueInHand.innerText = this.card.info;
        playerNameValueInHand.innerText = this.card.name;
        playerCardFaceInHandDiv.style.backgroundImage = "url('src/media/images/cardimages/" + this.card.image + "')";

        return cardDiv;
    }

    update() {
        this.getElement().querySelector('.cardAttackValue').innerText = this.card.attack;
        this.getElement().querySelector('.cardHealthValue').innerText = this.card.health;
        this.getElement().querySelector('.cardManaValue').innerText = this.card.mana;

        this.getElement().style.pointerEvents = this.card.isPlayable ? 'all' : 'none';
        this.getElement().children[0].children[4].style.border = `solid 4px ${this.card.isPlayable ? '#0FCC00' : 'rgb(56, 56, 56)'}`;
    }

    setPlayable(isPlayable) {
        this.card.isPlayable = isPlayable;
        this.update();
    }
}
