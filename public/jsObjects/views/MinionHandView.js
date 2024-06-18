export class MinionHandView {
    constructor(minion) {
        this.minion = minion;
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

        cardDiv.dataset.minionID = this.minion.minionID;

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

        // only in tutorial
        tutorialHintValueInHand.innerText = 'Mana Cost\nAttack' + '                     ' + 'Health';

        playerInfoValueInHand.innerText = this.minion.description;
        playerNameValueInHand.innerText = this.minion.name;
        playerCardFaceInHandDiv.style.backgroundImage = "url(../media/images/cardimages/" + this.minion.minionFileName + ".jpg)";

        return cardDiv;
    }

    update() {
        this.getElement().querySelector('.cardManaValue').innerText = this.minion.mana;
        this.getElement().querySelector('.cardAttackValue').innerText = this.minion.attack;
        this.getElement().querySelector('.cardHealthValue').innerText = this.minion.health;

        this.getElement().style.pointerEvents = this.playable ? 'all' : 'none';
        this.getElement().children[0].children[4].style.border = `solid 4px ${this.playable ? '#0FCC00' : '#383838'}`;
    }

    setPlayable(isPlayable) {
        this.playable = isPlayable;
        this.update();
    }
}