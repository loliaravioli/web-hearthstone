import GAME from '../../game.js';

// maybe convert this into TargetController or something which handles all targeting (attacks, spells, hero powers, etc.)
export class AttackController {
    constructor() {
        // HTML dom elements, not views or objects
        // use .dataSet.boardIndex or id to distinguish them
        this.attackerCard = null;
        this.targetCard = null;

        GAME.playerBoardView.getElement().addEventListener('mousedown', (e) => this.onDragStart(e));

        document.body.addEventListener('mouseup', (e) => this.onMouseUp(e));

        // TODO: maybe need to move the code below elsewhere
        // it will also be used for spells and hero powers
        const onMouseOuterMove = (e) => {
            $('#outercursor')
                .css({
                    'left': `${e.pageX}px`,
                    'top': `${e.pageY}px`
                });
        }

        const onMouseInnerMove = (e) => {
            $('#innercursor')
                .css({
                    'left': `${e.pageX}px`,
                    'top': `${e.pageY}px`
                });
        }

        const onMouseTriangleMove = (e) => {
            $('#arrowcursor')
                .css({
                    'left': `${e.pageX}px`,
                    'top': `${e.pageY}px`
                });
        }

        document.addEventListener('mousemove', onMouseOuterMove);
        document.addEventListener('mousemove', onMouseInnerMove);
        document.addEventListener('mousemove', onMouseTriangleMove);
    }

    setAttacker(attackerHTML) {
        this.attackerCard = attackerHTML;
    }

    setTarget(targetHTML) {
        this.targetCard = targetHTML;
    }

    onDragStart(event) {
        event.preventDefault();
        if (event.target.classList.contains('cardInPlay--player')) {
            this.attackerCard = event.target;

            const rect = this.attackerCard.getBoundingClientRect(),
                x = rect.left + (rect.width / 2),
                y = rect.top + (rect.height / 2);

            $('#svg').show();

            $('#innercursor, #outercursor, #arrowcursor')
                .css({ 'visibility': 'visible' });

            document.body.style.cursor = 'none';

            document.body.addEventListener('mousemove', (e) => {
                const destX = e.clientX,
                    destY = e.clientY,
                    angleDeg = (Math.atan2(destY - y, destX - x) * 180 / Math.PI) + 90;

                // TODO: fix visual bug where this arrow briefly appears on the previous card it was on
                $('#arrowcursor')
                    .css('transform', `rotate(${angleDeg}deg) translate(-50%,-110%)`);

                $('#svgpath')
                    .attr('d', `M${destX},${destY} ${x},${y}`);
            });
        } else if (true /* click on hero portrait */) {
            // do hero attack
        }
    }

    onMouseUp(event) {
        event.preventDefault();

        if (!this.attackerCard) { return; }

        if (event.target.classList.contains('cardInPlay--opponent')) {
            this.targetCard = event.target;

            console.log(`${this.attackerCard.id} attacks ${this.targetCard.id}`);

            GAME.trigger('trigger_attack', {
                attackerIndex: this.attackerCard.dataset.boardIndex,
                targetIndex: this.targetCard.dataset.boardIndex
            });
        } else if (event.target.id == 'opponentHero') {
            console.log(`${this.attackerCard.id} attacks the enemy hero`);

            GAME.trigger('trigger_attack', {
                attackerIndex: this.attackerCard.dataset.boardIndex,
                targetIndex: 99 // TODO: make a list of shared enums between server and client for stuff like this
            });
        }

        this.resetAttack();
    }

    resetAttack() {
        this.attackerCard = null;
        this.targetCard = null;

        $('#svg').hide();

        $('#innercursor, #outercursor, #arrowcursor')
            .css({ 'visibility': 'hidden' });

        document.body.style.cursor = 'url(../media/images/cursor/cursor.png) 10 2, auto';
    }
}