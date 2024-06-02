export class AttackEvent {
    constructor() {
        this.attackCardView = null;
        this.defendCardView = null;

        document.body.onmouseup = (e) => {
            e.preventDefault();
            console.log(this);
            if (this.defendCardView) {
                this.doAttack();
            } else {
                this.reset();
            }
        };

        this.reset();
    }

    reset() {
        this.attackCardView = null;
        this.defendCardView = null;
        document.getElementById('svg').style.display = 'none';
        document.getElementById("innercursor").style.visibility = "hidden";
        document.getElementById("outercursor").style.visibility = "hidden";
        document.getElementById("arrowcursor").style.visibility = "hidden";
        document.body.style.cursor = 'url(src/cursor/cursor.png) 10 2, auto';
    }

    setAttacker(card) {
        this.attackCardView = card;
        const cardCenter = this.attackCardView.getElementCenter();
        document.getElementById('svg').style.display = 'block';
        document.getElementById("innercursor").style.visibility = 'visible';
        document.getElementById("outercursor").style.visibility = 'visible';
        document.getElementById("arrowcursor").style.visibility = 'visible';
        document.body.style.cursor = 'none';

        document.body.addEventListener('mousemove', (e) => {
            if (!this.attackCardView) { return; }
            const destX = e.clientX, destY = e.clientY;
            const angleDeg = (Math.atan2(destY - cardCenter.y, destX - cardCenter.x) * 180 / Math.PI) + 90;
            $('#arrowcursor').css('transform', `rotate(${angleDeg}deg) translate(-50%,-110%)`);
            $('#svgpath').attr('d', `M${destX},${destY} ${cardCenter.x},${cardCenter.y}`);
        });

        /*
        $(cardDiv).on('mousedown', function (e) {
            let xOrigin = e.clientX,
                yOrigin = e.clientY;
            $('#svg').show();
            $('#innercursor').css('visibility', 'visible');
            $('#outercursor').css('visibility', 'visible');
            $('#arrowcursor').css('visibility', 'visible');
            $('body').css('cursor', 'none');
        
            $('body').on('mousemove', function (e2) {
                let xDest = e2.clientX,
                    yDest = e2.clientY,
                    angleDeg = Math.atan2(yDest - yOrigin, xDest - xOrigin) * 180 / Math.PI,
                    deg = angleDeg + 90;
                $('#arrowcursor').css('transform', 'rotate(' + deg + 'deg) translate(-50%,-110%)');
                $('#svgpath').attr('d', 'M' + xDest + ',' + yDest + ' ' + xOrigin + ',' + yOrigin);
            });
        });
        */
    }

    setDefender(card) {
        this.defendCardView = card;
    }

    doAttack() {
        if (!this.attackCardView || !this.defendCardView) { return; }

        this.reset();
    }
}

// handle outside of this class:
/*
card.addEventListener('mousedown', function(event) {
    if (event.button === 0) {
        alert('Left click detected');
        attack.setattacker
    } else if (event.button === 2) {
        alert('Right click detected');
        attack.reset
    }
});
*/