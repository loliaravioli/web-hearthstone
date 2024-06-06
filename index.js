import GAME from './game.js';

// TODO: get rid of global variables. move this shit into separate relevant files/classes/objects
let playersTurn = new Boolean(false),
    gameIsWon = new Boolean(false),
    isScreenShake = new Boolean(true),
    jobsdoneSnd = new Audio("src/media/sounds/voiceovers/innkeeper_jobs_done.mp3"),
    heropowerSnd = new Audio("src/media/sounds/heropower.mp3");

const manaElement = document.getElementById('mana');

function startGame() {
    for (let i = 0; i < 5; i++) {
        GAME.playerHandView.addCard(GAME.playerDeckView.drawCard());
    }

    checkForRequiredMana();

    createManaCrystal();

    GAME.playerHandView.setAllCardsPlayable();
}

// certain events trigger every millisecond (e.g. onmousemove)
// use this method to make them only trigger every x milliseconds to improve performance
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function (...args) {
        if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

/* end turn button when clicked plays an audio file and calls the 
opponentTurn function then checks if the audio has been played yet and if not plays it and sets audioIsPlayed to false */
document.getElementById("endturn").addEventListener("click", function () {
    (new Audio("src/media/sounds/endturn.mp3")).play();
    document.querySelector("#endturn").style.zIndex = "50";
    document.getElementById("gifhint").style.backgroundImage = "url('src/media/hints/attack.gif')";
    document.getElementById("texthint").innerText = "Click on an green glowing allied card then click on an enemy to attack.";
    GAME.turnController.startOpponentTurn();
});

/* checks if the player has enough mana to play each card in their hand
and if so makes the border of the card green */
function checkForRequiredMana() {
    // for (let i = 0; i < cardsInHand.length; i++) {
    // cardsInHand[i].setPlayable(mana < cardsInHand[i].children[0].children[2].innerText)
    // TODO: toggle draggable here; also replace with OOP mana cost checks
    // }

    if (mana < 2) {
        document.getElementById("playerHeropower").style.boxShadow = "none";
        document.getElementById("playerHeropower").style.pointerEvents = "none";
    } else {
        document.getElementById("playerHeropower").style.pointerEvents = "all";
    }
}

// creates an element inside the element with id "manacontainer"
function createManaCrystal() {
    const manacrystal = document.createElement('div');
    manacrystal.classList.add("manabox");
    document.getElementById("manacontainer").appendChild(manacrystal);
}

startGame();

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