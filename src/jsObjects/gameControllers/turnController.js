// TODO: create separate functionality specifically for AI
// TODO: create separate object for mana

export class TurnController {
    constructor() {
        this.playersTurn = false;
    }

    startPlayerTurn() {
        this.playersTurn = true;

        GAME.playerHandView.setAllCardsPlayable();

        if (manaCapacity != 10) {
            manaCapacity++;
            createManaCrystal();
        }

        mana = manaCapacity;
        manaElement.innerHTML = `${mana}/${manaCapacity}`;

        let manaCrystals = document.getElementsByClassName("manabox");
        for (let i = 0; i < manaCrystals.length; i++) {
            manaCrystals[i].style.backgroundColor = "#3669c9";
        }

        playerturnSnd.play();
        document.body.style.cursor = "url(src/media/images/cursor/cursor.png) 10 2, auto";
        document.getElementById("playerHeropower").style.boxShadow = "0px 2px 15px 12px #0FCC00";
        document.getElementById("playerHeropower").classList.add("canAttack");
        document.getElementById("computerTurn").style.display = "none";
        document.getElementById("endturn").style.backgroundColor = "#4ce322";
        document.getElementById("endturn").innerText = "END TURN";

        GAME.playerHandView.addCard(GAME.playerDeckView.drawCard());

        checkForRequiredMana();
        attack();
    }

    startOpponentTurn() {
        this.playersTurn = false;

        GAME.playerHandView.setAllCardsUnplayable();

        document.getElementById("playerHeropower").style.boxShadow = "none";
        document.body.style.cursor = "url(src/media/images/cursor/spectate.png) 10 2, auto";
        document.getElementById("computerTurn").style.display = "block";
        document.getElementById("endturn").style.backgroundColor = "grey";
        document.getElementById("endturn").innerText = "ENEMY TURN";

        if (!GAME.opponentBoard.isEmpty()) {
            setTimeout(AI(), 1.25 * 1000);

            // stops the AI from having more than 7 cards on the board at a time
            setTimeout(function () {
                if (GAME.opponentBoard.count() <= 7) {
                    GAME.opponentBoardView.addCard(GAME.opponentDeck.drawCard());
                }

                setTimeout(function () {
                    this.startPlayerTurn();
                }, 1 * 1000);

            }, 2.5 * 1000);
        } else {
            // places card if number of cards on board has not reached the max amount (10)
            setTimeout(function () {
                if (GAME.opponentBoard.count() <= 7) {
                    GAME.opponentBoardView.addCard(GAME.opponentDeck.drawCard());
                }

                // then calls the player turn function allowing the player to play his turn
                setTimeout(function () {
                    this.startPlayerTurn();
                }, 1 * 1000);

            }, 1.25 * 1000);
        }
    }
}





/*
// mock's the user (dialogue) if it has been their turn for 30secs+
setTimeout(function () {
    if (!this.playersTurn || alreadyMocked || gameIsWon) {
        return;
    }

    alreadyMocked = true;
    mockSnd.play();

    setTimeout(function () {
        document.querySelector("#opponentBubble").innerText = "Go ahead. End\nyour turn, so that\nI can end you!";
        document.querySelector("#opponentBubble").style.visibility = "visible";
        document.querySelector('#opponentBubble').classList.add("openMenuAnim");

        setTimeout(function () {
            document.querySelector('#opponentBubble').classList.add("easeOutAnim");
            document.querySelector('#opponentBubble').classList.remove("openMenuAnim");

            setTimeout(function () {
                document.querySelector("#opponentBubble").style.visibility = "hidden";
                document.querySelector('#opponentBubble').classList.remove("easeOutAnim");
            }, 0.25 * 1000);
            
        }, 5 * 1000);
    }, 0.25 * 1000);
}, 30 * 1000);
*/