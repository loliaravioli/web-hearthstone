import GAME from '../../game.js';

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
    ];

let song = new Audio(songs[Math.floor(Math.random() * songs.length)]);

// plays a random song and sets the volume to 70% from the array defined above
document.getElementById('volume-control').addEventListener("change", function (e) {
    song.volume = e.currentTarget.value / 100;
})

document.addEventListener("keydown", function (e) {
    if (e.key !== 'Escape') { return; }

    if (document.getElementById("gamemenuContent").style.display === "block") {
        if (document.getElementById('optionsmenuContent').style.display === "block") { // hide options menu
            $('#optionsmenu').hide();
            $('#optionsmenuContent').hide()
                .removeClass('openMenuAnim');
        } else { // show game
            $('#gamemenuContent')
                .removeClass('openMenuAnim')
                .hide();
                $('#gamemenu').hide();
        }
    } else if (document.getElementById("shopmenu").style.display == "block") {
        $('#shopmenu').hide();
        $('#shopmenuContent')
            .hide()
            .removeClass('openMenuAnim');
        document.getElementById("mainmenu").style.filter = "none";
    } else { // show game menu
        $('#gamemenu').show();
        $('#gamemenuContent')
            .show()
            .addClass('openMenuAnim');
        concedebtn.disabled = !isInGame;
        openmenuSnd.play();
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

[concedebtn, optionsbtn, quitbtn,
    resumebtn, miscellaneousbtn, playbtn,
    tutorialbtn, howtoplaybtn, openpacksbtn,
    starttutorialbtn, backfrompackbtn, shopbtn,
    buybtn].forEach(i => {
        if (!i) { return; }
        i.addEventListener('mouseover', () => menuhoverSnd.play());
    });

concedebtn.onclick = function () {
    openmenuSnd.play()
    alert("You've Lost!")
    location.reload();
};

optionsbtn.onclick = function () {
    openmenuSnd.play();
    $('#optionsmenu').show();
    $('#optionsmenuContent')
        .show()
        .addClass('openMenuAnim');
};

quitbtn.onclick = function () {
    openmenuSnd.play()
    document.getElementById('interactive');
    $('#contents')
        .css({
            'visibility': 'hidden',
            'opacity': 0,
            'transition': 'visibility 0s 0.5s, opacity 0.5s linear'
        });
    // may not work as can only close tabs with scripts that were opened with
    window.close();
};

resumebtn.onclick = function () {
    openmenuSnd.play()
    $('#gamemenuContent')
        .removeClass('openMenuAnim')
        .hide();
    $('#gamemenu').hide();
};

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

// miscellaneous button (in options (press esc))
miscellaneousbtn.onclick = function () {
    openmenuSnd.play();
    window.open(
        'https://playhearthstone.com/en-gb',
        '_blank'
    );
};

function fadeOutMainMenuOST() {
    setInterval(function () {
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
    $('#cinematicVideo').hide();
    // document.getElementById("skipcinematicbtn").style.display = "none";
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
        document.getElementById('opponentHeroContainer').classList.add("onLoadComputerAnim");
        document.getElementById('opponentHeroContainer').style.zIndex = "9";
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

    fadeOutMainMenuOST();

    setTimeout(function () {
        mainmenuOST.pause();
    }, 1 * 1750);

    crowdSnd.pause();
    let introcinematic = document.getElementById("cinematicVideo");
    // introcinematic.play();
    introcinematic.style.display = "none";
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
        // document.getElementById("skipcinematicbtn").style.display = "none";
        introcinematic.style.display = "none";
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
        document.getElementById('endturn').style.zIndex = "9";

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

    if (Number(localStorage.getItem('myPacks')) >= 1) {
        init();
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

backfrompackbtn.onclick = function () {
    openmenuSnd.play();
    crowdSnd.play();
    let packElements = document.getElementsByClassName("pack");
    $('#mainmenu').show();
    $('#openpacks, #pkcollisionbox')
        .hide();
    for (let i = 0; i < packElements.length; i++) {
        document.getElementsByClassName("pack")[i].style.display = "none";
    }
};

starttutorialbtn.onclick = function () {
    openmenuSnd.play();
    document.getElementById('endturn').style.zIndex = "1";
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
        $('#tutorialmenuContent, #tutorialmenu')
            .hide();
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

    if (Number(localStorage.getItem('myPacks')) >= 1) {
        init();
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

const targetDiv = document.getElementById("fps");
document.getElementById('togglefps').onclick = function () {
    targetDiv.style.display = (targetDiv.style.display !== "none") ? "none" : 'block';
};

document.getElementById('preventCORS').onclick = function () {
    document.getElementById('preventCORS').classList.add("fadeOutAnim");
    setTimeout(function () {
        document.getElementById('preventCORS').style.visibility = "hidden";
    }, 1 * 1000)

    if (hasPlayedTutorial_deserailized == null) {
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
        $('#blockmainmenu').show();
        $('#mainmenu')
            .css({ 'visibility': 'visible' })
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
    document.querySelector('#endturn').style.zIndex = "9";
    setTimeout(function () {
        $('#transitionblock')
            .addClass('fadeInAnim')
            .addClass('fadeOutAnim');
        setTimeout(function () {
            document.getElementById('transitionblock').style.visibility = "hidden";
            $('#triangle')
                .css({ 'visibility': 'visible' })
                .addClass('triangleOpenMenuAnim');
            $('#hintbackbackground, #hintbackground, #hint')
                .css({ 'visibility': 'visible' })
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

const onMouseOuterMove = (e) => {
    $('#outercursor')
        .css({
            'left': `${e.pageX}px`,
            'top': `${e.pageY}px`
        });
}
document.addEventListener('mousemove', onMouseOuterMove);

const onMouseInnerMove = (e) => {
    $('#innercursor')
        .css({
            'left': `${e.pageX}px`,
            'top': `${e.pageY}px`
        });
}
document.addEventListener('mousemove', onMouseInnerMove);

const onMouseTriangleMove = (e) => {
    $('#arrowcursor')
        .css({
            'left': `${e.pageX}px`,
            'top': `${e.pageY}px`
        });
}
document.addEventListener('mousemove', onMouseTriangleMove);

document.getElementById("endturn").addEventListener("click", function () {
    (new Audio("src/media/sounds/endturn.mp3")).play();
    document.getElementById("endturn").style.zIndex = "50";
    document.getElementById("gifhint").style.backgroundImage = "url('src/media/hints/attack.gif')";
    document.getElementById("texthint").innerText = "Click on an green glowing allied card then click on an enemy to attack.";
    GAME.turnController.startOpponentTurn();
});