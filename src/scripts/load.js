let mainmenuOST = new Audio("src/media/sounds/ost/mainmenu.mp3"),
    crowdSnd = new Audio("src/media/sounds/crowd.mp3")

let introLines = [
    "src/media/sounds/voiceovers/innkeeper_1.mp3",
    "src/media/sounds/voiceovers/innkeeper_2.mp3",
    "src/media/sounds/voiceovers/innkeeper_3.mp3"
]

let introLine = introLines[Math.floor(Math.random() * introLines.length)],
    hasPlayedTutorial_deserailized = JSON.parse(localStorage.getItem("hasPlayedTutorial"));

let voiceover = new Audio(introLine);
document.onreadystatechange = function () {
    let state = document.readyState
    if (state == 'interactive') {
        document.getElementById('contents').style.visibility = "hidden";
    } else if (state == 'complete') {
        setTimeout(function () {
            document.getElementById('interactive');
            document.getElementById('load').style.visibility = "hidden";
            document.getElementById('load').style.opacity = "0";
            document.getElementById('load').style.transition = "visibility 0s 0.5s, opacity 0.5s linear";
            // get myGold on page load from local storage
            let myGold = Number(localStorage.getItem('myGold'));
            if (typeof myGold === 'undefined') {
                myGold = 0;
                localStorage.setItem('myGold', myGold.toString());
            }
            // get myPacks on page load from local storage
            let myPacks = Number(localStorage.getItem('myPacks'));
            if (typeof myPacks === 'undefined') {
                myPacks = 0;
                localStorage.setItem('myPacks', myPacks.toString());
            }
            // set innerText of myGold and innerText
            document.getElementById("myGold").innerText = myGold + "🪙";
            document.getElementById("myPacks").innerText = myPacks;
            // make an element and set innerText to myPacks in mainmenu
            for (let i = 0; i < myPacks; i++) {
                createPack();
            }
            document.getElementById("preventCORS").style.visibility = "visible";
        }, 0.25 * 1000);
    }
}
