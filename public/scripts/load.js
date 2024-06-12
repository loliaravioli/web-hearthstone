$(document).ready(function () {
    setTimeout(function () {
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
});
