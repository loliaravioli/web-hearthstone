import GAME from './game.js';

// TODO: get rid of global variables. move this shit into separate relevant files/classes/objects
let playersTurn = new Boolean(false),
    gameIsWon = new Boolean(false),
    isScreenShake = new Boolean(true),
    jobsdoneSnd = new Audio("src/media/sounds/voiceovers/innkeeper_jobs_done.mp3"),
    heropowerSnd = new Audio("src/media/sounds/heropower.mp3");

function startGame() {
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

// TODO: from OG code. maybe use it in effects when certain cards are played
function fadeOutInMusic() {
    lichkingOST.volume = 0.7;
    setTimeout(function () {
        lichkingOST.volume = 0.4;
        setTimeout(function () {
            lichkingOST.volume = 0.1;
            setTimeout(function () {
                lichkingOST.volume = 0.4;
                setTimeout(function () {
                    lichkingOST.volume = 1;
                }, 0.3 * 1000);
            }, 4.5 * 1000);
        }, 0.25 * 1000);
    }, 0.25 * 1000);
}

startGame();