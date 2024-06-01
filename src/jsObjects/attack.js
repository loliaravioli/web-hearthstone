export class Attack {
    constructor() {
        this.attackCard = null;
        this.defendCard = null;
        
        this.reset();
    }

    reset() {
        document.getElementById('svg').style.display = "none";
        document.getElementById("innercursor").style.visibility = "hidden";
        document.getElementById("outercursor").style.visibility = "hidden";
        document.getElementById("arrowcursor").style.visibility = "hidden";
        $('body').css('cursor', 'url(src/cursor/cursor.png) 10 2, auto');
    }

    setAttacker(card) {
        const cardCenter = card.getElementCenter();
        $('#svg').show();
        document.getElementById("innercursor").style.visibility = 'visible';
        document.getElementById("outercursor").style.visibility = 'visible';
        document.getElementById("arrowcursor").style.visibility = 'visible';
        $('body').css('cursor', 'none');

        $('body').on('mousemove', function (e2) {
            let xDest = e2.clientX,
                yDest = e2.clientY,
                angleDeg = Math.atan2(yDest - cardCenter.y, xDest - cardCenter.x) * 180 / Math.PI,
                deg = angleDeg + 90;
            $('#arrowcursor').css('transform', 'rotate(' + deg + 'deg) translate(-50%,-110%)');
            $('#svgpath').attr('d', 'M' + xDest + ',' + yDest + ' ' + cardCenter.x + ',' + cardCenter.y);
        });
    }

    setDefender(card) {
        this.defendCard = card;
    }

    doAttack() {
        if(!this.attackCard || !this.defendCard) { return; }


    }
}