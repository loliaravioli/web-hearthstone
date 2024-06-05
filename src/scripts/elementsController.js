import GAME from '../../game.js';

// TODO: wtf are these methods doing

let openmenuSnd = new Audio("src/media/sounds/openmenu.mp3"),
    menubtnsSnd = new Audio("src/media/sounds/menubtnpress.mp3"),
    purchaseSnd = new Audio("src/media/sounds/purchase.mp3"),
    menuhoverSnd = new Audio("src/media/sounds/menuselect.mp3"),
    shophoverSnd = new Audio("src/media/sounds/shophover.mp3"),
    shoponclickSnd = new Audio("src/media/sounds/shoponclick.mp3"),
    startTutorialSnd = new Audio("src/media/sounds/voiceovers/innkeeper_starttutorial.mp3"),
    battlebeginSnd = new Audio("src/media/sounds/voiceovers/innkeeper_tutorialbattle.mp3"),
    hasPlayedBattleBeginSnd = new Boolean(false),
    isInGame = new Boolean(false),
    tutorialIntroRunning = new Boolean(false),
    vol = 0.5,
    interval = 175,
    songs = [
        "src/media/sounds/ost/mulligan.mp3",
        "src/media/sounds/ost/bad_reputation.mp3",
        "src/media/sounds/ost/better_hand.mp3",
        "src/media/sounds/ost/dont_let_your_guard_down.mp3",
        "src/media/sounds/ost/duel.mp3",
        "src/media/sounds/ost/the_forge.mp3"
    ],
    audioIsPlayed = new Boolean(false);

let song = new Audio(songs[Math.floor(Math.random() * songs.length)]);

// plays a random song and sets the volume to 70% from the array defined above
document.getElementById('volume-control').addEventListener("change", function (e) {
    song.volume = e.currentTarget.value / 100;
})

document.addEventListener("keydown", function () {
    let x = event.keyCode || event.which;
    if (x == 27) { // esc key
        if (document.getElementById("gamemenuContent").style.display === "block") {
            // hide options menu
            if (document.getElementById('optionsmenuContent').style.display === "block") {
                document.getElementById('optionsmenu').style.display = "none";
                $('#optionsmenuContent').css({ 'display': 'none' })
                    .removeClass('openMenuAnim');
            } else {
                // show game
                $('#gamemenuContent').removeClass('openMenuAnim')
                    .css({ 'display': 'none' });
                document.getElementById("gamemenu").style.display = "none";
            }
        } else if (document.getElementById("shopmenu").style.display == "block") {
            document.getElementById("shopmenu").style.display = "none";
            $('#shopmenuContent').css({ 'display': 'none' })
                .removeClass('openMenuAnim');
            document.getElementById("mainmenu").style.filter = "none";
        } else {
            // show game menu
            document.getElementById("gamemenu").style.display = "block";
            $('#gamemenuContent').css({ 'display': 'block' })
                .addClass('openMenuAnim');
            concedebtn.disabled = !isInGame;
            openmenuSnd.play();
        }
    }
})

// on button hover play sound
let concedebtn = document.getElementById('concedebutton'),
    optionsbtn = document.getElementById('optionsbutton'),
    quitbtn = document.getElementById('quitbutton'),
    resumebtn = document.getElementById('resumebutton'),
    miscellaneousbtn = document.getElementById('miscellaneousbutton'),
    confirmbtn = document.getElementById('confirm'),
    endturnbtn = document.getElementById('endturn'),
    playbtn = document.getElementById('playbutton'),
    tutorialbtn = document.getElementById('tutorialbutton'),
    howtoplaybtn = document.getElementById('howtoplaybutton'),
    openpacksbtn = document.getElementById('openpacksbutton'),
    shopbtn = document.getElementById('shopbutton'),
    buybtn = document.getElementById('buybutton'),
    starttutorialbtn = document.getElementById('starttutorialbutton'),
    backfrompackbtn = document.getElementById('backfrompackbtn'),
    donepackbtn = document.getElementById('donepackbutton');
// skipcinematicbtn = document.getElementById('skipcinematicbtn');

concedebtn.addEventListener('mouseover', menuhoverSnd.play());
optionsbtn.addEventListener('mouseover', menuhoverSnd.play());
quitbtn.addEventListener('mouseover', menuhoverSnd.play());
resumebtn.addEventListener('mouseover', menuhoverSnd.play());
miscellaneousbtn.addEventListener('mouseover', menuhoverSnd.play());
playbtn.addEventListener('mouseover', menuhoverSnd.play());
tutorialbtn.addEventListener('mouseover', menuhoverSnd.play());
howtoplaybtn.addEventListener('mouseover', menuhoverSnd.play());
openpacksbtn.addEventListener('mouseover', menuhoverSnd.play());
starttutorialbtn.addEventListener('mouseover', menuhoverSnd.play());
backfrompackbtn.addEventListener('mouseover', menuhoverSnd.play());
shopbtn.addEventListener('mouseover', menuhoverSnd.play());
buybtn.addEventListener('mouseover', menuhoverSnd.play());

concedebtn.onclick = function () {
    openmenuSnd.play()
    alert("You've Lost!")
    location.reload();
};

optionsbtn.onclick = function () {
    openmenuSnd.play()
    document.getElementById('optionsmenu').style.display = "block";
    $('#optionsmenuContent').css({ 'display': 'block' })
        .addClass('openMenuAnim');
};

quitbtn.onclick = function () {
    openmenuSnd.play()
    document.getElementById('interactive');
    $('#contents').css({
        'visibility': 'hidden',
        'opacity': 0,
        'transition': 'visibility 0s 0.5s, opacity 0.5s linear'
    });
    // may not work as can only close tabs with scripts that were opened with
    window.close();
};

resumebtn.onclick = function () {
    openmenuSnd.play()
    $('#gamemenuContent').removeClass('openMenuAnim')
        .css({ 'display': 'none' });
    document.getElementById("gamemenu").style.display = "none";
};

confirmbtn.onclick = function () {
    document.getElementById('block').style.zIndex = "9";
    $('#triangle').css({
        'visibility': 'hidden',
        'opacity': 0,
        'transition': 'visibility 0s 0.5s, opacity 0.5s linear'
    });
    $('#hintbackbackground').css({
        'visibility': 'hidden',
        'opacity': 0,
        'transition': 'visibility 0s 0.5s, opacity 0.5s linear'
    });
    $('#hintbackground').css({
        'visibility': 'hidden',
        'opacity': 0,
        'transition': 'visibility 0s 0.5s, opacity 0.5s linear'
    });
    $('#hint').css({
        'visibility': 'hidden',
        'opacity': 0,
        'transition': 'visibility 0s 0.5s, opacity 0.5s linear'
    });
    document.getElementById('opponentHeroContainer').style.zIndex = "5";
    document.getElementById('playerHeroHealth').innerText = "30";
    document.getElementById('opponentHeroHealth').innerText = "10";
    $('#confirm').removeClass('packHoverAnim')
        .addClass('openPackAnim')
    endturnbtn.disabled = true;
    setTimeout(function () {
        startTutorialSnd.play();
        setTimeout(function () {
            $('#playerHeroContainer').css({ 'visibility': 'visible' })
                .addClass('tutorialHeroAnim');
            document.getElementById("game").classList.add("shakeScreenAnim");
            document.getElementById('confirm').style.visibility = "hidden";
        }, 0.25 * 1000);
        setTimeout(function () {
            $('#block').css({
                'opacity': 0,
                'transition': 'opacity 2s linear'
            })
            setTimeout(function () {
                document.getElementById('playerHeroContainer').style.zIndex = "9";
                setTimeout(function () {
                    $('#opponentHeroContainer').css({ 'visibility': 'visible ' })
                        .addClass('tutorialHoggerAnim');
                    setTimeout(function () {
                        setTimeout(function () {
                            GAME.opponentDialogueView.setDialogueAudio('');
                            GAME.opponentDialogueView.setDialogueText('...');
                            GAME.opponentDialogueView.doDialogue();
                        }, 1 * 1000);

                        setTimeout(function () {
                            document.getElementById('tutorialmenu').style.display = "block";
                            $('#tutorialmenuContent').css({ 'display': 'block' })
                                .addClass('openMenuAnim');
                        }, 5 * 1000);

                        $('#playerHeroHealth').css({
                            'visibility': 'visible',
                            'opacity': 1,
                            'transition': 'visibility 0.5s, opacity 0.5s linear'
                        });
                        $('#opponentHeroHealth').css({
                            'visibility': 'visible',
                            'opacity': 1,
                            'transition': 'visibility 0.5s, opacity 0.5s linear'
                        });
                    }, 1 * 1000);
                }, 0.925 * 1000);
            }, 2 * 1000);
        }, 8 * 1000);
    }, 1 * 1000);

    /* when not in tutorial
        document.querySelector('#block').style.visibility = "hidden";
        document.querySelector('#block').style.opacity = "0";
        document.querySelector('#block').style.transition = "visibility 0s 0.5s, opacity 0.5s linear";
        document.querySelector('#confirm').style.visibility = "hidden";
        document.querySelector('#confirm').style.opacity = "0";
        document.querySelector('#confirm').style.transition = "visibility 0s 0.5s, opacity 0.5s linear";
        document.querySelector('.playerHeroHealth').style.visibility = "visible";
        document.querySelector('.playerHeroHealth').style.opacity = "1";
        document.querySelector('.playerHeroHealth').style.transition = "visibility 0.5s, opacity 0.5s linear";
        document.querySelector('.opponentHeroHealth').style.visibility = "visible";
        document.querySelector('.opponentHeroHealth').style.opacity = "1";
        document.querySelector('.opponentHeroHealth').style.transition = "visibility 0.5s, opacity 0.5s linear";
        document.querySelector(".playerHero").style.zIndex = "5";
        document.querySelector(".opponentHeroContainer").style.zIndex = "5";
        if (!audioIsPlayed) {
            lichkingOST.play();
            song.volume = 0.7;
            audioIsPlayed = true;
        }
    */
};

// miscellaneous button (in options (press esc))
miscellaneousbtn.onclick = function () {
    openmenuSnd.play();
    window.open(
        'https://playhearthstone.com/en-gb',
        '_blank' // <- This is what makes it open in a new window.
    );
};

// play button on click
playbtn.onclick = function () {
    isInGame = true;
    document.getElementById("cinematicVideo").style.display = "none";
    // document.getElementById("skipcinematicbtn").style.display = "none";
    document.getElementById("block").style.visibility = "visible";
    // fade out the volume of the mainmenuOST
    let fadeout = setInterval(function () {
        // Reduce volume by 0.05 as long as it is above 0
        // This works as long as you start with a multiple of 0.05!
        if (vol > 0.05) {
            vol -= 0.05;
            mainmenuOST.volume = vol;
        } else {
            // Stop the setInterval when 0 is reached
            clearInterval(fadeout);
        }
    }, interval);
    menubtnsSnd.play();
    setTimeout(function () {
        mainmenuOST.pause();
    }, 1.75 * 1000);
    crowdSnd.pause();
    $('#transitionblock').css({ 'visibility': 'visible' })
        .addClass('fadeInAnim');
    setTimeout(function () {
        document.getElementById('transitionblock').classList.add("fadeOutAnim");
        setTimeout(function () {
            document.getElementById('transitionblock').style.visibility = "hidden";
        }, 1 * 1000);
    }, 1 * 1000);
    document.getElementById('mainmenu').style.visibility = "hidden";
    setTimeout(function () {
        document.getElementById('contents').style.visibility = "visible";
        document.getElementById("playerlabel").style.visibility = "visible";
        document.getElementById("playerclasslabel").style.visibility = "visible";
        document.getElementById("opponentlabel").style.visibility = "visible";
        document.getElementById("vs").style.visibility = "visible";
        (new Audio("src/media/sounds/ongameload.mp3")).play();
        document.getElementById('playerHeroContainer').classList.add("onLoadPlayerAnim");
        document.getElementById('opponentHeroContainer').classList.add("onLoadComputerAnim");
        setTimeout(function () {
            $('#playerlabel').css({
                'visibility': 'hidden',
                'opacity': 0,
                'transition': 'visibility 0s 0.1s, opacity 0.1s linear'
            });
            $('#playerclasslabel').css({
                'visibility': 'hidden',
                'opacity': 0,
                'transition': 'visibility 0s 0.1s, opacity 0.1s linear'
            });
            $('#opponentlabel').css({
                'visibility': 'hidden',
                'opacity': 0,
                'transition': 'visibility 0s 0.1s, opacity 0.1s linear'
            });
        }, 5.25 * 1000);
        setTimeout(function () {
            $('#vs').css({
                'visibility': 'hidden',
                'opacity': 0,
                'transition': 'visibility 0s 0.2s, opacity 0.2s linear'
            });
            setTimeout(function () {
                document.getElementById('opponentHeroContainer').style.zIndex = "9";
                setTimeout(function () {
                    $('#playerBubble').css({ 'visibility': 'visible' })
                        .addClass('openMenuAnim');
                }, 0.25 * 1000);
                setTimeout(function () {
                    $('#playerBubble').addClass('easeOutAnim')
                        .removeClass('openMenuAnim');
                    setTimeout(function () {
                        document.getElementById('playerBubble').style.visibility = "hidden";
                    }, 0.25 * 1000);
                    setTimeout(function () {
                        $('#opponentBubble').css({ 'visibility': 'visible' })
                            .addClass('openMenuAnim');
                    }, 0.25 * 1000);
                    setTimeout(function () {
                        $('#opponentBubble').addClass('easeOutAnim')
                            .removeClass('openMenuAnim');
                        setTimeout(function () {
                            $('#opponentBubble').css({ 'visibility': 'hidden' })
                                .removeClass('easeOutAnim');
                        }, 0.25 * 1000);
                        document.getElementById('opponentHeroContainer').style.zIndex = "9";
                        document.getElementById('confirm').style.display = "block";
                    }, 5.5 * 1000);
                }, 1.5 * 1000);
            }, 2 * 1000);
        }, 6 * 1000);
    }, 1 * 1000);
};

/* function tutorial called on tutorial button on click 
and on page load if local storage hasPlayedTutorial == null */
function tutorial() {
    isInGame = true;
    // fade out the volume of the mainmenuOST
    let fadeout = setInterval(function () {
        // Reduce volume by 0.05 as long as it is above 0
        // This works as long as you start with a multiple of 0.05!
        if (vol > 0.05) {
            vol -= 0.05;
            mainmenuOST.volume = vol;
        } else {
            // Stop the setInterval when 0 is reached
            clearInterval(fadeout);
        }
    }, interval);

    setTimeout(function () {
        mainmenuOST.pause();
    }, 1 * 1750);

    crowdSnd.pause();
    let introcinematic = document.getElementById("cinematicVideo");
    // introcinematic.play();
    introcinematic.style.display = "none";
    document.getElementById('mainmenu').style.visibility = "hidden";
    document.getElementById('contents').style.visibility = "visible";

    $('#confirm').css({
        'display': 'block',
        'background-color': 'transparent',
        'border': 'none',
        'width': '11%',
        'height': '25%',
        'top': '34%',
        'left': '44.7%',
        'transform': 'rotate(-15deg)',
        'background-image': 'url(src/media/images/pack.png)'
    }).addClass('packHoverAnim')
        .html('');
    setTimeout(function () {
        if (!tutorialIntroRunning) {
            tutorialIntroRunning = true;
            // document.getElementById("skipcinematicbtn").style.display = "none";
            introcinematic.style.display = "none";
            $('#opponentHeroContainer').css({
                'visibility': 'hidden',
                'z-index': 20
            });

            $('#opponentHeroContainer').css({
                'visibility': 'hidden',
                'background-image': 'url(src/media/images/hogger.png)',
                'z-index': 5
            });

            document.getElementById('transitionblock').style.visibility = "visible";
            document.getElementById("block").style.visibility = "visible";
            document.getElementById('endturn').style.zIndex = "9";
            setTimeout(function () {
                $('#transitionblock').addClass('fadeInAnim')
                    .addClass('fadeOutAnim');
                setTimeout(function () {
                    document.getElementById('transitionblock').style.visibility = "hidden";

                    $('#triangle').css({ 'visibility': 'visible' })
                        .addClass('triangleOpenMenuAnim');

                    $('#hintbackbackground').css({ 'visibility': 'visible' })
                        .addClass('openMenuAnim');

                    $('#hintbackground').css({ 'visibility': 'visible' })
                        .addClass('openMenuAnim');

                    $('#hint').css({ 'visibility': 'visible' })
                        .addClass('openMenuAnim');
                }, 1 * 1000);
            }, 1 * 1000);
        }
    }, 48 * 1000);
}

// tutorial button on click called the tutorial function
tutorialbtn.onclick = function () {
    menubtnsSnd.play();
    tutorial();
};

howtoplaybtn.onclick = function () {
    menubtnsSnd.play();
    document.getElementById('mainmenu').style.display = "none";
    document.getElementById('howtoplay').style.display = "block";
};

openpacksbtn.onclick = function () {
    openmenuSnd.play();
    // fade out the volume of the mainmenuOST
    let fadeout = setInterval(
        function () {
            // Reduce volume by 0.05 as long as it is above 0
            // This works as long as you start with a multiple of 0.05!
            if (vol > 0.05) {
                vol -= 0.05;
                mainmenuOST.volume = vol;
            } else {
                // Stop the setInterval when 0 is reached
                clearInterval(fadeout);
            }
        }, interval);

    setTimeout(function () {
        mainmenuOST.pause();
    }, 1750);

    crowdSnd.pause();
    let packElements = document.getElementsByClassName("pack");
    document.getElementById('mainmenu').style.display = "none";
    document.getElementById('openpacks').style.display = "block";
    document.getElementById('pkcollisionbox').style.display = "block";

    for (let i = 0; i < packElements.length; i++) {
        document.getElementsByClassName("pack")[i].style.display = "block";
    }

    let myPacks = Number(localStorage.getItem('myPacks'));
    if (myPacks >= 1) {
        init();
    }
};

// shop function called on shop button on click
function shop() {
    shoponclickSnd.play();
    document.getElementById("shopmenu").style.display = "block";

    $('#shopmenuContent').css({ 'display': 'block' })
        .addClass('openMenuAnim');

    document.getElementById("mainmenu").style.filter = "blur(5px)";
}

// shop button on click calls the shop function
shopbtn.onclick = function () {
    shop();
};

buybtn.onclick = function () {
    openmenuSnd.play();
    let myGold = Number(localStorage.getItem('myGold'));
    myGold -= 100;
    if (myGold >= 0) {
        setTimeout(function () {
            purchaseSnd.play();
        }, 150)
        createPack();
        let myPacks = Number(localStorage.getItem('myPacks'));
        myPacks++;
        localStorage.setItem('myGold', myGold.toString());
        localStorage.setItem('myPacks', myPacks.toString());
        document.getElementById("myGold").innerText = myGold + "🪙";
        document.getElementById("myPacks").innerText = myPacks;
    } else {
        myGold += 100;
    }
};

// back button when in the pack screen
backfrompackbtn.onclick = function () {
    openmenuSnd.play();
    crowdSnd.play();
    let packElements = document.getElementsByClassName("pack");
    document.getElementById('mainmenu').style.display = "block";
    document.getElementById('openpacks').style.display = "none";
    document.getElementById('pkcollisionbox').style.display = "none";
    for (let i = 0; i < packElements.length; i++) {
        document.getElementsByClassName("pack")[i].style.display = "none";
    }
};

// start tutorial button on click
starttutorialbtn.onclick = function () {
    openmenuSnd.play();
    document.getElementById('endturn').style.zIndex = "1";
    document.getElementById('triangle').classList.remove("triangleOpenMenuAnim");
    document.getElementById('hintbackbackground').classList.remove("openMenuAnim");
    document.getElementById('hintbackground').classList.remove("openMenuAnim");
    document.getElementById('hint').classList.remove("openMenuAnim");
    document.getElementById('opponentHeroContainer').style.zIndex = "2";
    document.getElementById('playerHeroContainer').style.zIndex = "0";
    document.getElementById("game").classList.remove("shakeScreenAnim");
    startTutorialSnd.addEventListener("ended", function () {
        if (hasPlayedBattleBeginSnd == false) {
            battlebeginSnd.play();
            hasPlayedBattleBeginSnd = true;
        }
    })

    if ((hasPlayedBattleBeginSnd == false) && (startTutorialSnd.paused)) {
        battlebeginSnd.play();
    }

    document.getElementById('playerHeroContainer').style.zIndex = "8";
    document.getElementById('endturn').style.zIndex = "21";
    document.getElementById('tutorialmenuContent').classList.add("straightEaseOutAnim");
    setTimeout(function () {
        battlebeginSnd.onended = function () {
            GAME.playerDialogueView.setDialogueAudio('src/media/sounds/voiceovers/jaina_tutorialbattle.mp3');
            GAME.playerDialogueView.setDialogueText('...');
            GAME.playerDialogueView.doDialogue();

            setTimeout(function () {
                song.play();
            }, 1 * 1000)
        }
        document.querySelector("#tutorialmenuContent").style.display = "none";
        document.querySelector("#tutorialmenu").style.display = "none";
    }, 0.125 * 1000);
};

// done pack button on click
donepackbtn.onclick = function () {
    document.getElementById('openpacks').classList.remove("openPackShakeScreenAnim");
    for (let i = 0; i < document.getElementsByClassName("pack").length; i++) {
        document.getElementsByClassName("pack")[i].style.display = "none";
    }

    for (let i = 0; i < document.getElementsByClassName("pack").length; i++) {
        document.getElementsByClassName("pack")[i].style.display = "block";
    }

    // if remaining packs still exist run this function again
    let myPacks = Number(localStorage.getItem('myPacks'));
    if (myPacks >= 1) {
        init();
    }

    donepackbtn.style.display = "none";
    document.getElementById("openpacks").style.filter = "none";
    document.getElementById("backfrompackbtn").disabled = false;
    document.getElementById("containerOpenPack").style.display = "none";
    elementsToRemove = document.querySelectorAll(".flip-card");
    for (let i = 0; i < 5; i++) {
        elementsToRemove[i].remove();
    }
}

const targetDiv = document.getElementById("fps");
document.getElementById('togglefps').onclick = function () {
    targetDiv.style.display = (targetDiv.style.display !== "none") ? "none" : 'block';
};

/* on page load prompts the user to click in order to start/play the game and is 
done in order to prevent chrome and other browsers policy conflicts such as CORS */
const preventCORSbtn = document.getElementById('preventCORS');
preventCORSbtn.onclick = function () {
    document.getElementById('preventCORS').classList.add("fadeOutAnim");
    setTimeout(function () {
        document.getElementById('preventCORS').style.visibility = "hidden";
    }, 1 * 1000)
    if (hasPlayedTutorial_deserailized === null) {
        tutorial();
    } else {
        mainmenuOST.play();
        mainmenuOST.volume = 0.7;
        setTimeout(function () {
            voiceover.play();
        }, 0.55 * 1000);
        if (typeof crowdSnd.loop == 'boolean') {
            crowdSnd.loop = true;
        } else {
            crowdSnd.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
        }

        crowdSnd.play();
        crowdSnd.volume = 0.5;
        document.querySelector('#blockmainmenu').style.display = "block";
        $('#mainmenu').css({ 'visibility': 'visible' })
            .addClass('zoomOutAnim');
        setTimeout(function () {
            document.querySelector('#blockmainmenu').style.display = "none";
            document.getElementById('mainmenu').classList.remove("zoomOutAnim");
        }, 4 * 1000);
    }

    tutorialIntroRunning = true;
    // document.getElementById("skipcinematicbtn").style.display = "none";
    let cinematicvideo = document.getElementById("cinematicVideo");
    cinematicvideo.pause();
    cinematicvideo.style.display = "none";

    $('#playerHeroContainer').css({
        'visibility': 'hidden',
        'z-index': 20
    });

    $('#opponentHeroContainer').css({
        'visibility': 'hidden',
        'background-image': 'url(src/media/images/hogger.png)',
        'z-index': 5
    });

    document.getElementById('transitionblock').style.visibility = "visible";
    document.getElementById("block").style.visibility = "visible";
    document.querySelector('#endturn').style.zIndex = "9";
    setTimeout(function () {
        $('#transitionblock').addClass('fadeInAnim')
            .addClass('fadeOutAnim');
        setTimeout(function () {
            document.getElementById('transitionblock').style.visibility = "hidden";
            $('#triangle').css({ 'visibility': 'visible' })
                .addClass('triangleOpenMenuAnim');
            $('#hintbackbackground').css({ 'visibility': 'visible' })
                .addClass('openMenuAnim');
            $('#hintbackground').css({ 'visibility': 'visible' })
                .addClass('openMenuAnim');
            $('#hint').css({ 'visibility': 'visible' })
                .addClass('openMenuAnim');
        }, 1 * 1000);
    }, 1 * 1000);
}
// button to skip the cinematic for the tutorial
// skipcinematicbtn.onclick = function () {
// tutorialIntroRunning = true;
// document.getElementById("skipcinematicbtn").style.display = "none";
// let cinematicvideo = document.getElementById("cinematicVideo");
// cinematicvideo.pause();
// cinematicvideo.style.display = "none";
// document.querySelector(".playerHero").style.visibility = "hidden";
// document.querySelector(".opponentHeroContainer").style.visibility = "hidden";
// document.querySelector(".opponentHeroContainer").style.backgroundImage = "url(src/media/images/hogger.png)";
// document.querySelector('#endturn').style.zIndex = "10";
// document.querySelector(".playerHero").style.zIndex = "20";
// document.querySelector(".opponentHeroContainer").style.zIndex = "5";
// document.getElementById('transitionblock').style.visibility = "visible";
// document.getElementById("block").style.visibility = "visible";
// document.querySelector('#endturn').style.zIndex = "9";
// setTimeout(function () {
//     document.getElementById('transitionblock').classList.add("fadeInAnim");
//     document.getElementById('transitionblock').classList.add("fadeOutAnim");
//     setTimeout(function () {
//         document.getElementById('transitionblock').style.visibility = "hidden";
//         document.querySelector('#triangle').style.visibility = "visible";
//         document.querySelector('#hintbackbackground').style.visibility = "visible";
//         document.querySelector('#hintbackground').style.visibility = "visible";
//         document.querySelector('#hint').style.visibility = "visible";
//         document.querySelector('#triangle').classList.add("triangleOpenMenuAnim");
//         document.querySelector('#hintbackbackground').classList.add("openMenuAnim");
//         document.querySelector('#hintbackground').classList.add("openMenuAnim");
//         document.querySelector('#hint').classList.add("openMenuAnim");
//     }, 1 * 1000);
// }, 1 * 1000);
// };

// custom cursor when attacking with the use of svg
const onMouseOuterMove = (e) => {
    $('#outercursor').css({
        'left': `${e.pageX}px`,
        'top': `${e.pageY}px`
    });
}
document.addEventListener('mousemove', onMouseOuterMove);

const onMouseInnerMove = (e) => {
    $('#innercursor').css({
        'left': `${e.pageX}px`,
        'top': `${e.pageY}px`
    });
}
document.addEventListener('mousemove', onMouseInnerMove);

const onMouseTriangleMove = (e) => {
    $('#arrowcursor').css({
        'left': `${e.pageX}px`,
        'top': `${e.pageY}px`
    });
}
document.addEventListener('mousemove', onMouseTriangleMove);
