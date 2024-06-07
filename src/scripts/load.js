const mainmenuOST = new Audio("src/media/sounds/ost/mainmenu.mp3"),
    crowdSnd = new Audio("src/media/sounds/crowd.mp3"),
    introLines = [
    "src/media/sounds/voiceovers/innkeeper_1.mp3",
    "src/media/sounds/voiceovers/innkeeper_2.mp3",
    "src/media/sounds/voiceovers/innkeeper_3.mp3"
]

const introLine = introLines[Math.floor(Math.random() * introLines.length)];

document.onreadystatechange = function () {
    let state = document.readyState;
    if (state == 'interactive') {
        document.getElementById('contents').style.visibility = "hidden";
    } else if (state == 'complete') {
        setTimeout(function () {
            (new Audio(introLine)).play();
            document.getElementById('interactive');
            $('#load')
                .css({
                    'visibility': 'hidden',
                    'opacity': 0,
                    'transition': 'visibility 0s 0.5s, opacity 0.5s linear'
                });

            // make an element and set innerText to myPacks in mainmenu
            for (let i = 0; i < myPacks; i++) {
                createPack();
            }

            document.getElementById("preventCORS").style.visibility = "visible";
        }, 0.25 * 1000);
    }
}
