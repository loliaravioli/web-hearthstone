import GAME from './game.js';

// TODO: get rid of global variables. move this shit into separate relevant files/classes/objects
let playersTurn = new Boolean(false),
    gameIsWon = new Boolean(false),
    isScreenShake = new Boolean(true),
    heropowerSnd = new Audio("src/media/sounds/heropower.mp3");

function startGame() {
    GAME.resetValues();

    for (let i = 0; i < 5; i++) {
        GAME.playerHandView.addCard(GAME.playerDeckView.drawCard());
    }

    GAME.turnController.startPlayerTurn();
}

// disable and enable screen shakes (options menu)
document.getElementById('togglescreenshake').onclick = function () {
    isScreenShake = !isScreenShake;
    console.log("Screen Shaking has been set to " + isScreenShake);
};

startGame();