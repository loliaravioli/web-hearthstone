import { Deck } from './src/jsObjects/deck.js';
import { Hand } from './src/jsObjects/hand.js';
import { Board } from './src/jsObjects/board.js';
import { BoardOpponentView } from './src/views/BoardOpponentView.js';
import { BoardPlayerView } from './src/views/BoardPlayerView.js';
import { DeckOpponentView } from './src/views/DeckOpponentView.js';
import { DeckPlayerView } from './src/views/DeckPlayerView.js';
import { HandPlayerView } from './src/views/HandPlayerView.js';
import { MINION_IDS } from './src/jsObjects/cards/minioncards/abstractminioncard.js';

// defines global variables
// TODO: get rid of global variables. move this shit into separate relevant files/classes/objects
let iElements = null,
    currentAttacker = null,
    manaCost = null,
    collision = new Boolean(false),
    canAttack = new Boolean(false),
    playersTurn = new Boolean(false),
    alreadyMocked = new Boolean(false),
    gameIsWon = new Boolean(false),
    isTutorial = new Boolean(false),
    tauntExists = new Boolean(false),
    isScreenShake = new Boolean(true),
    manaCapacity = 1,
    mana = manaCapacity,
    maxOpponentCardsInPlay = 7,
    mockSnd = new Audio("src/sounds/mock.mp3"),
    jobsdoneSnd = new Audio("src/voiceovers/innkeeper_jobs_done.mp3"),
    playerturnSnd = new Audio("src/sounds/playerturn.mp3"),
    heropowerSnd = new Audio("src/sounds/heropower.mp3"),
    amount = 0,
    oldNumOfChild = 0,
    playerHandArray = [],
    getNameOfElement = "",
    originalDeck,
    playerDeck,
    computerDeck,
    playerDeckView,
    computerDeckView,
    playerBoardView,
    opponentBoardView,
    playerHand,
    opponentHand,
    playerHandView,
    opponentHandView,
    hand = new Hand(),
    inRound;

const opponentBoard = new Board(),
    playerBoard = new Board(),
    svg = document.getElementById('svg'),
    svgpath = document.getElementById('svgpath'),
    body = document.getElementById('body'),
    playerHero = document.getElementById('playerhero'),
    cpuHero = document.getElementById('opposinghero'),
    cardinplay = document.getElementsByClassName('cardinplay'),
    collisionbox = document.getElementById("collisionbox"),
    cardsInHand = document.getElementsByClassName("card"),
    manaElement = document.getElementById('mana'),
    screenshakebtn = document.getElementById('togglescreenshake');

function startGame(tutorial) {
    playerDeck = new Deck();
    playerDeckView = new DeckPlayerView(playerDeck);

    computerDeck = new Deck();
    computerDeckView = new DeckOpponentView(computerDeck);

    playerHand = new Hand();
    playerHandView = new HandPlayerView(playerHand);

    playerBoardView = new BoardPlayerView(playerBoard);
    opponentBoardView = new BoardOpponentView(opponentBoard);

    inRound = false;

    for (let i = 0; i < 5; i++) {
        playerHandView.addCard(playerDeckView.drawCard());
    }

    checkForRequiredMana();

    createManaCrystal();

    isTutorial = tutorial;

    refreshElements();
}

function refreshElements() {
    $('.card').draggable({
        containment: 'window',
        revert: function (valid) {
            playerBoardView.removePlaceholder();
            return !valid;
        }, drag: throttle(function (event, ui) {
            if (ui.helper.data('hovering-board')) {
                playerBoardView.generatePlaceholder(ui.helper.offset().left + (ui.helper.width() / 2));
            }
        }, 50)
    });

    $('#board--player').droppable({
        accept: '.card',
        drop: function (event, ui) {
            const droppedCard = ui.draggable;
            playerBoardView.addCard(playerHandView.getCard(droppedCard.data('handIndex')));
            playerHandView.removeCard(droppedCard.data('handIndex'));
            document.getElementById("gifhint").style.display = "none";
            document.getElementById("texthint").style.display = "none";
            refreshElements();
        }, over: function (event, ui) {
            ui.helper.data('hovering-board', true);
        }, out: function (event, ui) {
            ui.helper.data('hovering-board', false);
        },
    });
}

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

/* updates the mana GUI at the bottom left of the screen
whenever mana is spent or the player's turn has just started */
function updateManaGUI() {
    let manaCrystals = document.getElementsByClassName("manabox");
    for (let i = 0; i < manaCrystals.length; i++) {
        if (i > 0 && i < 7) {
            manaCrystals[manaCrystals.length - i].style.backgroundColor = "black";
        }

        // once the amount of iterations is equal to the mana cost stop the loop
        if (i == manaCost) {
            break;
        }
    }
}

/* end turn button when clicked plays an audio file and calls the 
opponentTurn function then checks if the audio has been played yet and if not plays it and sets audioIsPlayed to false */
document.getElementById("endturn").addEventListener("click", function () {
    (new Audio("src/sounds/endturn.mp3")).play();
    document.querySelector("#endturn").style.zIndex = "50";
    document.getElementById("gifhint").style.backgroundImage = "url('src/hints/attack.gif')";
    document.getElementById("texthint").innerText = "Click on an green glowing allied card then click on an enemy to attack.";
    opponentTurn();
});

function opponentTurn() {
    playersTurn = false;

    for (let i = 0; i < hand.count(); i++) {
        hand.children[i].children[0].children[4].style.border = "solid 4px rgb(56, 56, 56)";
    }

    document.getElementById("playerheropower").style.boxShadow = "none";
    document.body.style.cursor = "url(src/cursor/spectate.png) 10 2, auto";
    document.getElementById("computerTurn").style.display = "block";
    document.getElementById("endturn").style.backgroundColor = "grey";
    document.getElementById("endturn").innerText = "ENEMY TURN";

    if (!opponentBoard.isEmpty()) {
        /* calls function defined in AI.js (determines what the computer 
        attacks and with what minions) */
        setTimeout(function () {
            AI();
        }, 1.25 * 1000)

        // stops the AI from having more than 7 cards on the board at a time
        setTimeout(function () {
            let opponentCardsInPlay = opponentBoard.count();

            if (opponentCardsInPlay != maxOpponentCardsInPlay) {
                computerCardPlace();
            }

            setTimeout(function () {
                playerTurn();
            }, 1 * 1000)
        }, 2.5 * 1000)
    } else {
        // places card if number of cards on board has not reached the max amount (10)
        setTimeout(function () {
            if (opponentBoard.count() != maxOpponentCardsInPlay) {
                computerCardPlace();
            }

            // then calls the player turn function allowing the player to play his turn
            setTimeout(function () {
                playerTurn();
            }, 1 * 1000)
        }, 1.25 * 1000)
    }
}

/* places a card onto the computers board whose mana is equal 
to the player's mana capacity */
function computerCardPlace() {
    for (let i = 0; i < computerDeck.cards.length; i++) {
        if (computerDeck.cards[i]['mana'] == manaCapacity) {
            opponentBoard.insertCard(computerDeck.cards[i]);
            // let index = computerDeck.cards.indexOf(i);
            // cardplaceSnd.play();
            break;
            /* if the player's mana capacity is at the maxiumum (10) then 
            plays the card at the top of the computer's deck */
        } else if (manaCapacity == 10) {
            opponentBoard.insertCard(computerDeck.topCard());
            break;
        }
    }
    // removes the card that was placed from the deck
    computerDeck.cards.splice(index, 1);
}

/* the player turn function allows the player to place cards and attack 
computer minions increments the mana capcity if manacapcity is not at 
the maximum (10) and displays the mana and manaCapacity in an element's
innerHTML and checks what cards can played and if the player has the
required mana to play the card for every card in the player's hand and
if so makes the boxShadow css property green*/
function playerTurn() {
    playersTurn = true;

    if (manaCapacity != 10) {
        manaCapacity++;
        createManaCrystal();
    }

    mana = manaCapacity;
    manaElement.innerHTML = mana + "/" + manaCapacity;

    let manaCrystals = document.getElementsByClassName("manabox");
    for (let i = 0; i < manaCrystals.length; i++) {
        manaCrystals[i].style.backgroundColor = "#3669c9";
    }

    oldNumOfChild = playerBoard.count();
    playerturnSnd.play();
    document.body.style.cursor = "url(src/cursor/cursor.png) 10 2, auto";
    document.getElementById("playerheropower").style.boxShadow = "0px 2px 15px 12px #0FCC00";
    document.getElementById("playerheropower").classList.add("canAttack");
    document.getElementById("computerTurn").style.display = "none";
    document.getElementById("endturn").style.backgroundColor = "#4ce322";
    document.getElementById("endturn").innerText = "END TURN";

    // mock's the user (dialogue) if it has been their turn for 30secs+
    setTimeout(function () {
        if (!playersTurn || alreadyMocked || gameIsWon || isTutorial) {
            return;
        }

        alreadyMocked = true;
        mockSnd.play();

        setTimeout(function () {
            document.querySelector("#computerbubble").innerText = "Go ahead. End\nyour turn, so that\nI can end you!";
            document.querySelector("#computerbubble").style.visibility = "visible";
            document.querySelector('#computerbubble').classList.add("openMenuAnim");

            setTimeout(function () {
                document.querySelector('#computerbubble').classList.add("easeOutAnim");
                document.querySelector('#computerbubble').classList.remove("openMenuAnim");

                setTimeout(function () {
                    document.querySelector("#computerbubble").style.visibility = "hidden";
                    document.querySelector('#computerbubble').classList.remove("easeOutAnim");
                }, 0.25 * 1000);
            }, 5 * 1000);
        }, 0.25 * 1000);
    }, 30 * 1000);

    // the player draws a card if their hand is not full (max cards in hand 10 cards)
    if (hand.count() != 10) { // TODO: define a drawCard function
        hand.addCardToHand(playerDeck.topCard());
    }

    checkForRequiredMana();
    attack();
}

/* checks if the player has enough mana to play each card in their hand 
and if so makes the border of the card green */
function checkForRequiredMana() {
    for (let i = 0; i < cardsInHand.length; i++) {
        // cardsInHand[i].setPlayable(mana < cardsInHand[i].children[0].children[2].innerText)
        // TODO: toggle draggable here; also replace with OOP mana cost checks
    }

    if (mana < 2) {
        document.getElementById("playerheropower").style.boxShadow = "none";
        document.getElementById("playerheropower").style.pointerEvents = "none";
    } else {
        document.getElementById("playerheropower").style.pointerEvents = "all";
    }
}

// creates an element inside the element with id "manacontainer"
function createManaCrystal() {
    const manacrystal = document.createElement('div');
    manacrystal.classList.add("manabox");
    document.getElementById("manacontainer").appendChild(manacrystal);
}

startGame(true);

// disable and enable screen shakes (options menu)
screenshakebtn.onclick = function () {
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