export class AttackController {
    constructor(playerBoardView, opponentBoardView) {
        this.playerBoardView = playerBoardView;
        this.opponentBoardView = opponentBoardView;

         // HTML dom elements, not views or objects
         // use .dataSet.boardIndex or id to distinguish them
        this.draggedCard = null;
        this.targetCard = null;

        this.playerBoardView.getElement().addEventListener('mousedown', (e) => this.onDragStart(e));

        this.opponentBoardView.getElement().addEventListener('mouseup', (e) => this.onDrop(e));

        document.body.addEventListener('mouseup', (e) => this.onMouseUp(e));
    }

    onDragStart(event) {
        event.preventDefault();
        if (event.target.classList.contains('player-cardinplay')) {
            this.draggedCard = event.target;

            const rect = this.draggedCard.getBoundingClientRect();
            const x = rect.left + (rect.width / 2),
                y = rect.top + (rect.height / 2);

            document.getElementById('svg').style.display = 'block';
            document.getElementById('innercursor').style.visibility = 'visible';
            document.getElementById('outercursor').style.visibility = 'visible';
            document.getElementById('arrowcursor').style.visibility = 'visible';
            document.body.style.cursor = 'none';

            document.body.addEventListener('mousemove', (e) => {
                const destX = e.clientX, destY = e.clientY;
                const angleDeg = (Math.atan2(destY - y, destX - x) * 180 / Math.PI) + 90;
                // TODO: fix bug where this arrow briefly appears on the previous card it was on
                $('#arrowcursor').css('transform', `rotate(${angleDeg}deg) translate(-50%,-110%)`);
                $('#svgpath').attr('d', `M${destX},${destY} ${x},${y}`);
            });
        }
    }

    onDrop(event) {
        event.preventDefault();
        if (event.target.classList.contains('computer-cardinplay')) {
            this.targetCard = event.target;
            
            if (this.draggedCard) {
                this.doAttack(this.draggedCard, this.targetCard);
                this.resetAttack();
            }
        }
    }

    onMouseUp(event) {
        event.preventDefault();
        if (this.draggedCard && this.targetCard) {
            this.doAttack();
        }
        this.resetAttack();
    }

    doAttack() {
        console.log(`${this.draggedCard.id} attacks ${this.targetCard.id}`);
    }

    resetAttack() {
        this.draggedCard = null;
        this.targetCard = null;

        document.getElementById('svg').style.display = 'none';
        document.getElementById('innercursor').style.visibility = 'hidden';
        document.getElementById('outercursor').style.visibility = 'hidden';
        document.getElementById('arrowcursor').style.visibility = 'hidden';
        document.body.style.cursor = 'url(src/cursor/cursor.png) 10 2, auto';
    }
}