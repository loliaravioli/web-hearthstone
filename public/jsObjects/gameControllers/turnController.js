import GAME from '../../../game.js';
import { AI } from '../../scripts/AI.js';

// TODO: create separate functionality specifically for AI

export class TurnController {
    constructor() {
        this.playersTurn = false;
        this.playerTurnSound = new Audio("../media/sounds/playerturn.mp3");
    }

    startPlayerTurn() {
        this.playersTurn = true;

        this.playerTurnSound.play();

        GAME.playerManaView.newTurn();

        document.body.style.cursor = "url(../media/images/cursor/cursor.png) 10 2, auto";

        $('#playerHeropower')
            .css({ 'box-shadow': '0px 2px 15px 12px #0FCC00' })
            .addClass('canAttack');

        $('#computerTurn').hide();

        $('#endturn')
            .css({ 'background-color': '#4ce322' })
            .html('END TURN');

        GAME.cardDrawController.playerDrawCard();
    }

    startOpponentTurn() {
        this.playersTurn = false;

        GAME.playerHandView.setAllCardsUnplayable();

        document.body.style.cursor = "url(../media/images/cursor/spectate.png) 10 2, auto";

        $('#computerTurn').show();

        $('#endturn')
            .css({ 'background-color': 'grey' })
            .html('ENEMY TURN');

        setTimeout(function() {
            AI();
            this.startPlayerTurn();
        }, 1.25 * 1000);
    }
}