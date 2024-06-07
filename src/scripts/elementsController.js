import GAME from '../../game.js';

let playedIntroLine = false;
const mainmenuOST = new Audio("src/media/sounds/ost/mainmenu.mp3"),
    crowdSnd = new Audio("src/media/sounds/crowd.mp3"),
    openmenuSnd = new Audio("src/media/sounds/openmenu.mp3"),
    menubtnsSnd = new Audio("src/media/sounds/menubtnpress.mp3"),
    purchaseSnd = new Audio("src/media/sounds/purchase.mp3"),
    menuhoverSnd = new Audio("src/media/sounds/menuselect.mp3"),
    shophoverSnd = new Audio("src/media/sounds/shophover.mp3"),
    shoponclickSnd = new Audio("src/media/sounds/shoponclick.mp3"),
    startTutorialSnd = new Audio("src/media/sounds/voiceovers/innkeeper_starttutorial.mp3"),
    battlebeginSnd = new Audio("src/media/sounds/voiceovers/innkeeper_tutorialbattle.mp3"),
    songs = [
        "src/media/sounds/ost/mulligan.mp3",
        "src/media/sounds/ost/bad_reputation.mp3",
        "src/media/sounds/ost/better_hand.mp3",
        "src/media/sounds/ost/dont_let_your_guard_down.mp3",
        "src/media/sounds/ost/duel.mp3",
        "src/media/sounds/ost/the_forge.mp3"
    ],
    song = new Audio(songs[Math.floor(Math.random() * songs.length)]),
    fpsDiv = document.getElementById("fps"),
    confirmbtn = document.getElementById('confirm'),
    endturnbtn = document.getElementById('endturn'),
    playbtn = document.getElementById('playbutton'),
    tutorialbtn = document.getElementById('tutorialbutton'),
    howtoplaybtn = document.getElementById('howtoplaybutton'),
    openpacksbtn = document.getElementById('openpacksbutton'),
    shopbtn = document.getElementById('shopbutton'),
    starttutorialbtn = document.getElementById('starttutorialbutton'),
    backfrompackbtn = document.getElementById('backfrompackbtn'),
    donepackbtn = document.getElementById('donepackbutton');

let hasPlayedBattleBeginSnd = new Boolean(false),
    isInGame = new Boolean(false),
    tutorialIntroRunning = new Boolean(false),
    vol = 0.5,
    interval = 175;

[playbtn, tutorialbtn, howtoplaybtn, openpacksbtn,
    starttutorialbtn, backfrompackbtn, shopbtn]
    .forEach(i => {
        if (!i) { return; }
        i.addEventListener('mouseover', () => menuhoverSnd.play());
    });

confirmbtn.onclick = function () {
    document.getElementById('block').style.zIndex = "9";
    $('#triangle, #hintbackbackground, #hintbackground, #hint')
        .css({
            'visibility': 'hidden',
            'opacity': 0,
            'transition': 'visibility 0s 0.5s, opacity 0.5s linear'
        });
    document.getElementById('opponentHeroContainer').style.zIndex = "5";
    document.getElementById('playerHeroHealth').innerText = "30";
    document.getElementById('opponentHeroHealth').innerText = "10";

    $('#confirm')
        .removeClass('packHoverAnim')
        .addClass('openPackAnim');

    endturnbtn.disabled = true;

    setTimeout(function () {
        startTutorialSnd.play();
    }, 1 * 1000);

    setTimeout(function () {
        $('#playerHeroContainer')
            .css({ 'visibility': 'visible' })
            .addClass('tutorialHeroAnim');
        document.getElementById("game").classList.add("shakeScreenAnim");
        document.getElementById('confirm').style.visibility = "hidden";
    }, 1.25 * 1000);

    setTimeout(function () {
        $('#block')
            .css({
                'opacity': 0,
                'transition': 'opacity 2s linear'
            })
    }, 9 * 1000);

    setTimeout(function () {
        document.getElementById('playerHeroContainer').style.zIndex = "9";
    }, 11 * 1000);

    setTimeout(function () {
        $('#opponentHeroContainer')
            .css({ 'visibility': 'visible ' })
            .addClass('tutorialHoggerAnim');
    }, 11.925 * 1000);

    setTimeout(function () {
        $('#playerHeroHealth, #opponentHeroHealth')
            .css({
                'visibility': 'visible',
                'opacity': 1,
                'transition': 'visibility 0.5s, opacity 0.5s linear'
            });
    }, 12.925 * 1000);

    setTimeout(function () {
        GAME.opponentDialogueView.setDialogueAudio('');
        GAME.opponentDialogueView.setDialogueText('...');
        GAME.opponentDialogueView.doDialogue();
    }, 13.925 * 1000);

    setTimeout(function () {
        $('#tutorialmenu').show();
        $('#tutorialmenuContent')
            .show()
            .addClass('openMenuAnim');
    }, 17.925 * 1000);

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
    */
};

function fadeOutMainMenuOST() {
    let fadeout = setInterval(function () {
        if (vol > 0.05) {
            vol -= 0.05;
            mainmenuOST.volume = vol;
        } else {
            clearInterval(fadeout);
        }
    }, interval);
}

playbtn.onclick = function () {
    isInGame = true;
    document.getElementById("block").style.visibility = "visible";

    fadeOutMainMenuOST();
    menubtnsSnd.play();

    setTimeout(function () {
        mainmenuOST.pause();
    }, 1.75 * 1000);

    crowdSnd.pause();
    $('#transitionblock')
        .css({ 'visibility': 'visible' })
        .addClass('fadeInAnim');

    setTimeout(function () {
        document.getElementById('transitionblock').classList.add("fadeOutAnim");
    }, 1 * 1000);

    setTimeout(function () {
        document.getElementById('transitionblock').style.visibility = "hidden";
    }, 2 * 1000);

    document.getElementById('mainmenu').style.visibility = "hidden";

    setTimeout(function () {
        $('#contents, #playerlabel, #playerclasslabel, #opponentlabel, #vs')
            .css({ 'visibility': 'visible' });
        (new Audio("src/media/sounds/ongameload.mp3")).play();
        document.getElementById('playerHeroContainer').classList.add("onLoadPlayerAnim");
        $('#opponentHeroContainer')
            .addClass('onLoadComputerAnim')
            .css({ 'z-index': 9 });
        $('#playerBubble')
            .addClass('easeOutAnim')
            .removeClass('openMenuAnim');
    }, 1 * 1000);

    setTimeout(function () {
        $('#playerlabel, #playerclasslabel, #opponentlabel')
            .css({
                'visibility': 'hidden',
                'opacity': 0,
                'transition': 'visibility 0s 0.1s, opacity 0.1s linear'
            });
    }, 6.25 * 1000);

    setTimeout(function () {
        $('#vs')
            .css({
                'visibility': 'hidden',
                'opacity': 0,
                'transition': 'visibility 0s 0.2s, opacity 0.2s linear'
            });
    }, 7 * 1000);

    setTimeout(function () {
        $('#playerBubble')
            .css({ 'visibility': 'visible' })
            .addClass('openMenuAnim');
    }, 9.25 * 1000);


    setTimeout(function () {
        document.getElementById('playerBubble').style.visibility = "hidden";
        $('#opponentBubble')
            .css({ 'visibility': 'visible' })
            .addClass('openMenuAnim');
    }, 10.75 * 1000);

    setTimeout(function () {
        $('#opponentBubble')
            .addClass('easeOutAnim')
            .removeClass('openMenuAnim');
        document.getElementById('opponentHeroContainer').style.zIndex = "9";
        $('#confirm').show();
    }, 16 * 1000);

    setTimeout(function () {
        $('#opponentBubble')
            .css({ 'visibility': 'hidden' })
            .removeClass('easeOutAnim');
    }, 16.25 * 1000);
};

function tutorial() {
    isInGame = true;

    GAME.resetValues();

    fadeOutMainMenuOST();

    setTimeout(function () {
        mainmenuOST.pause();
    }, 1 * 1750);

    crowdSnd.pause();
    document.getElementById('mainmenu').style.visibility = "hidden";
    document.getElementById('contents').style.visibility = "visible";

    $('#confirm').show()
        .css({
            'background-color': 'transparent',
            'border': 'none',
            'width': '11%',
            'height': '25%',
            'top': '34%',
            'left': '44.7%',
            'transform': 'rotate(-15deg)',
            'background-image': 'url(src/media/images/pack.png)'
        })
        .addClass('packHoverAnim').html('');

    setTimeout(function () {
        if (tutorialIntroRunning) { return; }

        tutorialIntroRunning = true;
        $('#opponentHeroContainer')
            .css({
                'visibility': 'hidden',
                'z-index': 20
            });

        $('#opponentHeroContainer')
            .css({
                'visibility': 'hidden',
                'background-image': 'url(src/media/images/hogger.png)',
                'z-index': 5
            });

        $('#transitionblock, #block')
            .css({ 'visibility': 'visible' });
        endturnbtn.style.zIndex = "9";

        setTimeout(function () {
            $('#transitionblock')
                .addClass('fadeInAnim')
                .addClass('fadeOutAnim');
        }, 1 * 1000);

        setTimeout(function () {
            document.getElementById('transitionblock').style.visibility = "hidden";
            $('#triangle')
                .css({ 'visibility': 'visible' })
                .addClass('triangleOpenMenuAnim');
            $('#hintbackbackground, #hintbackground, #hint')
                .css({ 'visibility': 'visible' })
                .addClass('openMenuAnim');
        }, 2 * 1000);
    }, 48 * 1000);
}

tutorialbtn.onclick = function () {
    menubtnsSnd.play();
    tutorial();
};

howtoplaybtn.onclick = function () {
    menubtnsSnd.play();
    $('#mainmenu').hide();
    $('#howtoplay').show();
};

openpacksbtn.onclick = function () {
    openmenuSnd.play();

    fadeOutMainMenuOST();

    setTimeout(function () {
        mainmenuOST.pause();
    }, 1750);

    crowdSnd.pause();
    let packElements = document.getElementsByClassName("pack");
    $('#mainmenu').show();
    $('#openpacks, #pkcollisionbox')
        .show();

    for (let i = 0; i < packElements.length; i++) {
        document.getElementsByClassName("pack")[i].style.display = "block";
    }
};

shopbtn.onclick = function shop() {
    shoponclickSnd.play();
    $('#shopmenu').show();

    $('#shopmenuContent')
        .show()
        .addClass('openMenuAnim');

    document.getElementById("mainmenu").style.filter = "blur(5px)";
}

backfrompackbtn.onclick = function () {
    openmenuSnd.play();
    crowdSnd.play();
    let packElements = document.getElementsByClassName("pack");
    $('#mainmenu').show();
    $('#openpacks, #pkcollisionbox').hide();
    for (let i = 0; i < packElements.length; i++) {
        document.getElementsByClassName("pack")[i].style.display = "none";
    }
};

starttutorialbtn.onclick = function () {
    openmenuSnd.play();
    endturnbtn.style.zIndex = "1";
    document.getElementById('triangle').classList.remove("triangleOpenMenuAnim");
    $('#hintbackbackground, #hintbackground, #hint')
        .removeClass('openMenuAnim');
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
    endturnbtn.style.zIndex = "21";
    document.getElementById('tutorialmenuContent').classList.add("straightEaseOutAnim");

    setTimeout(function () {
        battlebeginSnd.onended = function () {
            $('#block').hide();

            GAME.playerDialogueView.setDialogueAudio('src/media/sounds/voiceovers/jaina_tutorialbattle.mp3');
            GAME.playerDialogueView.setDialogueText('...');
            GAME.playerDialogueView.doDialogue();

            for (let i = 0; i < 3; i++) {
                GAME.playerDrawCard();
            }

            GAME.turnController.startPlayerTurn();

            setTimeout(function () {
                song.play();
            }, 1 * 1000)

            endturnbtn.disabled = false;
        }
        $('#tutorialmenuContent, #tutorialmenu').hide();
    }, 0.125 * 1000);
};

donepackbtn.onclick = function () {
    document.getElementById('openpacks').classList.remove("openPackShakeScreenAnim");
    for (let i = 0; i < document.getElementsByClassName("pack").length; i++) {
        document.getElementsByClassName("pack")[i].style.display = "none";
    }

    for (let i = 0; i < document.getElementsByClassName("pack").length; i++) {
        document.getElementsByClassName("pack")[i].style.display = "block";
    }

    donepackbtn.style.display = "none";
    document.getElementById("openpacks").style.filter = "none";
    document.getElementById("backfrompackbtn").disabled = false;
    $('#containerOpenPack').hide();
    elementsToRemove = document.querySelectorAll(".flip-card");
    for (let i = 0; i < 5; i++) {
        elementsToRemove[i].remove();
    }
}

document.getElementById('togglefps').onclick = function () {
    fpsDiv.style.display = (fpsDiv.style.display !== "none") ? "none" : 'block';
};

document.getElementById('preventCORS').onclick = function () {
    if (!playedIntroLine) {
        const introLines = [
            "src/media/sounds/voiceovers/innkeeper_1.mp3",
            "src/media/sounds/voiceovers/innkeeper_2.mp3",
            "src/media/sounds/voiceovers/innkeeper_3.mp3"
        ], introLine = introLines[Math.floor(Math.random() * introLines.length)];
        (new Audio(introLine)).play();
        playedIntroLine = true;
    }

    $('#preventCORS').addClass('fadeOutAnim');
    setTimeout(function () {
        $('#preventCORS').css({ 'visibility': 'hidden' });
    }, 1 * 1000)

    tutorial();

    /* if not tutorial
    mainmenuOST.play();
    mainmenuOST.volume = 0.7;
    setTimeout(function () {
        voiceover.play();
    }, 0.55 * 1000);
    if (typeof crowdSnd.loop == 'boolean') {
        crowdSnd.loop = true;
    } else {
        crowdSnd.addEventListener('ended', function () {
            this.play();
        }, false);
    }

    crowdSnd.play();
    crowdSnd.volume = 0.5;
    $('#blockmainmenu').show();
    $('#mainmenu')
        .css({ 'visibility': 'visible' })
        .addClass('zoomOutAnim');

    setTimeout(function () {
        $('#blockmainmenu').hide();
        document.getElementById('mainmenu').classList.remove("zoomOutAnim");
    }, 4 * 1000);
    */

    tutorialIntroRunning = true;

    $('#playerHeroContainer')
        .css({
            'visibility': 'hidden',
            'z-index': 20
        });

    $('#opponentHeroContainer')
        .css({
            'visibility': 'hidden',
            'background-image': 'url(src/media/images/hogger.png)',
            'z-index': 5
        });

    $('#transitionblock, #block')
        .css({ 'visibility': 'visible' });

    endturnbtn.style.zIndex = "9";

    setTimeout(function () {
        $('#transitionblock')
            .addClass('fadeInAnim, fadeOutAnim');
    }, 1 * 1000);

    setTimeout(function () {
        document.getElementById('transitionblock').style.visibility = "hidden";
        $('#triangle')
            .css({ 'visibility': 'visible' })
            .addClass('triangleOpenMenuAnim');
        $('#hintbackbackground, #hintbackground, #hint')
            .css({ 'visibility': 'visible' })
            .addClass('openMenuAnim');
    }, 2 * 1000);
}

endturnbtn.addEventListener("click", function () {
    (new Audio("src/media/sounds/endturn.mp3")).play();
    endturnbtn.style.zIndex = "50";
    document.getElementById("gifhint").style.backgroundImage = "url('src/media/hints/attack.gif')";
    document.getElementById("texthint").innerText = "Click on an green glowing allied card then click on an enemy to attack.";
    GAME.turnController.startOpponentTurn();
});