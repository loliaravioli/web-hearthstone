export class AttackController {
    constructor(playerBoardView, opponentBoardView) {
        this.playerBoardView = playerBoardView;
        this.opponentBoardView = opponentBoardView;

        // HTML dom elements, not views or objects
        // use .dataSet.boardIndex or id to distinguish them
        this.attackerCard = null;
        this.targetCard = null;

        this.playerBoardView.getElement().addEventListener('mousedown', (e) => this.onDragStart(e));

        this.opponentBoardView.getElement().addEventListener('mouseup', (e) => this.onDrop(e));

        document.body.addEventListener('mouseup', (e) => this.onMouseUp(e));
    }

    onDragStart(event) {
        event.preventDefault();
        if (event.target.classList.contains('player-cardinplay')) {
            this.attackerCard = event.target;

            const rect = this.attackerCard.getBoundingClientRect();
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
                // TODO: fix visual bug where this arrow briefly appears on the previous card it was on
                $('#arrowcursor')
                    .css('transform', `rotate(${angleDeg}deg) translate(-50%,-110%)`);
                $('#svgpath')
                    .attr('d', `M${destX},${destY} ${x},${y}`);
            });
        }
    }

    onDrop(event) {
        event.preventDefault();
        if (event.target.classList.contains('computer-cardinplay')) {
            this.targetCard = event.target;

            if (this.attackerCard) {
                this.doAttack();
                this.resetAttack();
            }
        } else {
            console.log('invalid target for attack');
        }
    }

    onMouseUp(event) {
        event.preventDefault();
        if (this.attackerCard && this.targetCard) {
            this.doAttack();
        }
        this.resetAttack();
    }

    doAttack() {
        console.log(`${this.attackerCard.id} attacks ${this.targetCard.id}`);
        const attackerViewIndex = this.attackerCard.dataset.boardIndex,
            targetViewIndex = this.targetCard.dataset.boardIndex;
        const attackerCardView = this.playerBoardView.card(attackerViewIndex);
        const targetCardView = this.opponentBoardView.card(targetViewIndex);
        const targetIsDead = targetCardView.applyDamage(attackerCardView.getAttack());
        const attackerIsDead = attackerCardView.applyDamage(targetCardView.getAttack());

        // instead of simply removing the cards here, have a separate function which kills minions
        // which is usable elsewhere

        if (targetIsDead) {
            this.opponentBoardView.killCard(targetViewIndex);
        }

        if (attackerIsDead) {
            this.playerBoardView.killCard(attackerViewIndex);
        }
    }

    resetAttack() {
        this.attackerCard = null;
        this.targetCard = null;

        document.getElementById('svg').style.display = 'none';
        document.getElementById('innercursor').style.visibility = 'hidden';
        document.getElementById('outercursor').style.visibility = 'hidden';
        document.getElementById('arrowcursor').style.visibility = 'hidden';
        document.body.style.cursor = 'url(src/media/images/cursor/cursor.png) 10 2, auto';
    }
}