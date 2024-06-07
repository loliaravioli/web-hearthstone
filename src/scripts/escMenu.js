const concedeButton = document.getElementById('concedebutton'),
    optionsButton = document.getElementById('optionsbutton'),
    quitButton = document.getElementById('quitbutton'),
    resumeButton = document.getElementById('resumebutton'),
    miscellaneousButton = document.getElementById('miscellaneousbutton'),
    menuHoverSound = new Audio("src/media/sounds/menuselect.mp3"),
    openMenuSound = new Audio("src/media/sounds/openmenu.mp3");

let isScreenShake = new Boolean(true);

[concedeButton, optionsButton, quitButton,
    resumeButton, miscellaneousButton].forEach(i => {
        if (!i) { return; }
        i.addEventListener('mouseover', () => menuHoverSound.play());
        i.onclick = () => openMenuSound.play();
    });

document.getElementById('togglescreenshake').onclick = function () {
    isScreenShake = !isScreenShake;
    console.log("Screen Shaking has been set to " + isScreenShake);
};

document.getElementById('volume-control').addEventListener("change", function (e) {
    song.volume = e.currentTarget.value / 100;
})

concedeButton.onclick = function () {
    console.log('you lose');
    location.reload();
};

optionsButton.onclick = function () {
    $('#optionsmenu').show();
    $('#optionsmenuContent')
        .show()
        .addClass('openMenuAnim');
};

quitButton.onclick = function () {
    $('#contents')
        .css({
            'visibility': 'hidden',
            'opacity': 0,
            'transition': 'visibility 0s 0.5s, opacity 0.5s linear'
        });
    window.close();
};

resumeButton.onclick = function () {
    $('#gamemenuContent')
        .removeClass('openMenuAnim')
        .hide();
    $('#gamemenu').hide();
};

miscellaneousButton.onclick = function () {
    window.open('https://playhearthstone.com/en-gb', '_blank');
};

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
        concedeButton.disabled = !isInGame;
        openMenuSound.play();
    }
});