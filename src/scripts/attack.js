import GAME from '../../game.js';

/* gives all current cards on the board the ability to attack by giving the card
class 'canAttack', when attacking the card is checked to see if the card has
this class.*/
function attack() {
    document.getElementById("playerHeropower").classList.add("canAttack");
    let numOfChild = GAME.playerBoard.count();
    for (let i = 0; i < numOfChild; i++) {
        document.getElementsByClassName("player-cardinplay")[i].style.boxShadow = "0px 2px 15px 12px #0FCC00";
        document.getElementsByClassName("player-cardinplay")[i].classList.add("canAttack");
    }

    // attacking algorithm
    document.querySelectorAll('.cardinplay').forEach(function (e) {
        e.addEventListener('mousedown', function (e) {
            /* checks if currentAttacker is not defined and if the element contains 
            the player-cardinplay and the canAttack class or is the player's hero power */
            if (currentAttacker == null) {

            } else if ((this.classList.contains('computer-cardinplay') || (this.id == 'opponentHero'))) {
                GAME.playerBoardView.getElement().style.zIndex = "2"
                GAME.opponentBoardView.getElement().style.zIndex = "1"
                let target = this.id,
                    currentAttackerElement = document.getElementById(currentAttacker),
                    targetElement = document.getElementById(target),
                    currentAttackerAttack = currentAttackerElement.children[0].children[0].innerHTML,
                    currentAttackerHealth = currentAttackerElement.children[1].children[0].innerHTML,
                    targetAttack = targetElement.children[0].children[0].innerHTML,
                    targetHealth = targetElement.children[1].children[0].innerHTML;
                if (currentAttacker == "playerHeropower") {
                    mana -= 2;
                    manaElement.innerHTML = mana + "/" + manaCapacity;
                    checkForRequiredMana();
                    updateManaGUI();
                    setTimeout(function () {
                        currentAttackerHealth -= targetAttack;
                        targetHealth -= currentAttackerAttack;
                        currentAttackerElement.children[1].children[0].innerHTML = currentAttackerHealth;
                        targetElement.children[1].children[0].innerHTML = targetHealth;
                        if (targetElement.id != "opponentHero") {
                            currentAttackerElement.children[1].children[0].style.color = "#f20301";
                        }
                        targetElement.children[1].children[0].style.color = "#f20301";
                        if (targetHealth <= 0) {
                            setTimeout(function () {
                                if (targetElement.id == "opponentHero") {
                                    gameWon();
                                }
                                targetElement.remove();
                            }, 0.2 * 1000);
                        }
                    }, 1 * 1000);
                } else {
                    if (currentAttackerElement.classList.contains("hasDivineShield")) {
                        currentAttackerElement.classList.remove("hasDivineShield");
                        currentAttackerElement.children[2].classList.add("divineShieldBreak");
                        setTimeout(function () {
                            currentAttackerElement.children[2].style.visibility = "hidden";
                        }, 0.4 * 1000);
                    } else {
                        currentAttackerHealth -= targetAttack;
                        if (targetElement.id != "opponentHero") {
                            currentAttackerElement.children[1].children[0].style.color = "#f20301";
                        }
                    }

                    if (targetElement.classList.contains("hasDivineShield")) {
                        targetElement.classList.remove("hasDivineShield");
                        GAME.opponentBoard.htmlElement.lastChild.children[2].style.visibility = "hidden";
                    } else {
                        targetHealth -= currentAttackerAttack;
                        targetElement.children[1].children[0].style.color = "#f20301";
                    }

                    currentAttackerElement.children[1].children[0].innerHTML = currentAttackerHealth;
                    targetElement.children[1].children[0].innerHTML = targetHealth;
                }

                if ((currentAttackerAttack >= 5) && (isScreenShake == true)) {
                    document.getElementById("game").classList.add("bigHitAnim");
                    setTimeout(function () {
                        document.getElementById("game").classList.remove("bigHitAnim");
                    }, 0.2 * 1000);
                }

                if (targetElement.id == 'opponentHero') {
                    document.querySelector("#computerdamagevalue").innerText = "-" + currentAttackerAttack;
                    $('#computerdamagecontainer').css({
                        'visibility': 'visible',
                        'opacity': 1,
                        'transition': 'none'
                    });
                    document.querySelector("#computerdamagelabel").classList.add("openMenuAnim");
                    document.querySelector("#computerdamagevalue").classList.add("openMenuAnim");
                    document.querySelector("#computerdamagelabel").classList.remove("fadeOutAnim");
                    document.querySelector("#computerdamagevalue").classList.remove("fadeOutAnim");
                    setTimeout(function () {
                        document.querySelector("#computerdamagelabel").classList.add("fadeOutAnim");
                        document.querySelector("#computerdamagevalue").classList.add("fadeOutAnim");
                        document.querySelector("#computerdamagelabel").classList.remove("openMenuAnim");
                        document.querySelector("#computerdamagevalue").classList.remove("openMenuAnim");
                        setTimeout(function () {
                            $('#computerdamagecontainer').css({
                                'visibility': 'hidden',
                                'opacity': 0
                            });
                        }, 1 * 1000);
                    }, 2 * 1000);
                }

                currentAttackerElement.style.boxShadow = "none";

                if (currentAttacker == "playerHeropower") {
                    document.getElementById("playerHeropower").classList.remove("canAttack");
                }

                setTimeout(function () {
                    if (currentAttackerHealth <= 0) {
                        if (document.getElementById('playerHeroHealth').innerText <= 0) {
                            alert("You've Lost!")
                            location.reload();
                        }
                        if (currentAttackerElement.classList.contains("hasTaunt")) {
                            tauntExists = false;
                        }
                        currentAttackerElement.remove();
                    }

                    if (targetHealth <= 0) {
                        if (document.getElementById('opponentHeroHealth').innerText <= 0) {
                            gameIsWon = true;
                            document.querySelector("#endturn").style.zIndex = "1";
                            let hasPlayedTutorial_serialized = JSON.stringify("true");
                            localStorage.setItem("hasPlayedTutorial", hasPlayedTutorial_serialized);
                            $('#block').css({
                                'opacity': 0,
                                'visibility': 'visible'
                            });
                            setTimeout(function () {
                                document.getElementById('fireworkCanvas').style.display = "block";
                                document.getElementById('fireworkCanvas').classList.add("fadeInAnim");
                            }, 3 * 1000);
                            gameWon();
                        } else {
                            targetElement.remove();
                            // adjust position of player board to fix GUI
                            if (GAME.opponentBoard.count() == 0) {
                                GAME.opponentBoard.htmlElement.style.transform = "translateY(57.5%)";
                            }
                        }
                    }
                }, 0.25 * 1000);

                let currentAttackersElement = document.getElementById(currentAttacker);
                currentAttacker = null;
                canAttack = false;
                svg.style.display = "none";
                document.getElementById("innercursor").style.visibility = "hidden";
                document.getElementById("outercursor").style.visibility = "hidden";
                document.getElementById("arrowcursor").style.visibility = "hidden";
                body.style.cursor = "url(src/media/images/cursor/cursor.png) 10 2, auto";
                currentAttackerElement.classList.remove("canAttack");

                if (hand.cardCount() == 0 || mana == 0) {
                    for (let i = 0; i < GAME.playerBoard.count(); i++) {
                        if (GAME.playerBoard.htmlElement.children[i].classList.contains("canAttack")) {
                            break;
                        }

                        if ((i == oldNumOfChild - 1) && (gameIsWon == false)) {
                            jobsdoneSnd.play();
                        }
                    }
                }

                if (currentAttackersElement.classList.contains('player-cardinplay')) {
                    if (currentAttackerAttack >= 5) {
                        (new Audio("src/media/sounds/bigattack.mp3")).play();
                    } else {
                        (new Audio("src/media/sounds/attack.mp3")).play();
                    }
                } else {
                    heropowerSnd.play();
                }
                currentAttacker = null;
            }
        });
    });

    return true
}

function gameWon() {
    (new Audio("src/media/sounds/victorytutorial.mp3")).play();
    song.pause();

    /* when not in tutorial
    lichkingOST.pause();
    let myGold = Number(localStorage.getItem('myGold'));
    (new Audio("src/media/sounds/victory.mp3")).play();
    myGold += 10; // number of gold earned per win
    localStorage.setItem('myGold', myGold.toString());
    // 20% or 1/5 chance of getting a pack on win
    let chanceGetPack = Math.random();
    if (chanceGetPack < 0.2) {
        let myPacks = Number(localStorage.getItem('myPacks'));
        myPacks++;
        localStorage.setItem('myPacks', myPacks.toString());
    }

    setTimeout(function () {
        document.querySelector("#opponentBubble").innerText = "I see... only\ndarkness\nbefore me...";
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
    */

    // adjust position of player board to fix GUI
    GAME.opponentBoardView.getElement().style.transform = "translateY(17.5%)";
    setTimeout(function () {
        document.getElementById('opponentHeroContainer').style.display = "none";
        if (isScreenShake) {
            document.getElementById("game").classList.remove("shakeScreenAnim");
            document.getElementById("game").classList.add("shakeScreenAnim");
        }
    }, 750);

    setTimeout(function () {
        document.getElementById("game").style.filter = "blur(5px)";
        document.getElementById('block').style.visibility = "hidden";
        document.getElementById("victory").style.display = "block";
        document.getElementById("victoryImg1").classList.add("openMenuAnim");
        document.getElementById("victoryImg2").classList.add("openMenuAnim");
        document.getElementById("victorylabel").classList.add("openMenuAnim");
        setTimeout(function () {
            document.getElementById('fireworkCanvas').classList.add("fadeOutAnim");
            setTimeout(function () {
                document.getElementById('fireworkCanvas').style.display = "none";
                setTimeout(function () {
                    location.reload();
                }, 9 * 1000);
                document.getElementById('victoryhint').style.display = "block";
                document.getElementById('victoryhint').classList.add("openMenuAnim");

                // when not in tutorial
                // setTimeout(function () {
                //     document.getElementById('victoryImg1').style.visibility = "hidden";
                //     document.getElementById('victoryImg1').style.opacity = "0";
                //     document.getElementById('victoryImg1').style.transition = "visibility 0s 2s, opacity 2s linear";
                // }, 4 * 1000);
            }, 1 * 1000);
        }, 5 * 1000);
    }, 5 * 1000);
}