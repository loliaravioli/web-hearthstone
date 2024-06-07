import GAME from '../../../game.js';

// TODO: create separate functionality specifically for AI

export class TurnController {
    constructor() {
        this.playersTurn = false;
        this.playerTurnSound = new Audio("src/media/sounds/playerturn.mp3");
    }

    startPlayerTurn() {
        this.playersTurn = true;

        this.playerTurnSound.play();

        GAME.playerHandView.setAllCardsPlayable();

        GAME.playerManaView.newTurn();

        document.body.style.cursor = "url(src/media/images/cursor/cursor.png) 10 2, auto";

        $('#playerHeropower')
            .css({ 'box-shadow': '0px 2px 15px 12px #0FCC00' })
            .addClass('canAttack');

        $('#computerTurn').hide();

        $('#endturn')
            .css({ 'background-color': '#4ce322' })
            .html('END TURN');

        GAME.playerHandView.addCard(GAME.playerDeckView.drawCard());

        // attack();
    }

    startOpponentTurn() {
        this.playersTurn = false;

        GAME.playerHandView.setAllCardsUnplayable();

        document.body.style.cursor = "url(src/media/images/cursor/spectate.png) 10 2, auto";

        document.getElementById("playerHeropower").style.boxShadow = "none";

        $('#computerTurn').show();

        $('#endturn')
            .css({ 'background-color': 'grey' })
            .html('ENEMY TURN');

        if (GAME.opponentBoard.isEmpty()) {
            // places card if number of cards on board has not reached the max amount (10)
            setTimeout(() => {
                if (GAME.opponentBoard.count() <= 7) {
                    GAME.opponentBoardView.addCard(GAME.opponentDeck.drawCard());
                }

                // then calls the player turn function allowing the player to play his turn
                setTimeout(() => {
                    this.startPlayerTurn()
                }, 1 * 1000);
            }, 1.25 * 1000);
        } else {
            setTimeout(AI(), 1.25 * 1000);

            // stops the AI from having more than 7 cards on the board at a time
            setTimeout(() => {
                if (GAME.opponentBoard.count() <= 7) {
                    GAME.opponentBoardView.addCard(GAME.opponentDeck.drawCard());
                }

                setTimeout(() => {
                    this.startPlayerTurn()
                }, 1 * 1000);
            }, 2.5 * 1000);
        }
    }
}