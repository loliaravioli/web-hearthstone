import GAME from '../../game.js';

export class CardDragController {
    constructor() {
        this.refresh();
    }

    refresh() {
        $('.card').draggable({
            containment: 'window',
            revert: function (valid) {
                GAME.playerBoardView.removePlaceholder();
                return !valid;
            },
            drag: this.throttle((event, ui) => {
                if (!ui.helper.data('hovering-board')) { return; }
                GAME.playerBoardView.generatePlaceholder(ui.helper.offset().left + (ui.helper.width() / 2));
            }, 50)
        });
        
        $('#board--player').droppable({
            accept: '.card',
            drop: (event, ui) => {
                ui.helper.data('hovering-board', false);
                //GAME.playerBoardView.addCard(GAME.playerHandView.getCard(ui.draggable.data('handIndex')));
                //GAME.playerHandView.removeCard(ui.draggable.data('handIndex'));
                GAME.triggerEvent('playMinion', {
                    boardIndex: this.placeholderIndex == -1 ? 0 : this.placeholderIndex,
                    handIndex: ui.draggable.data('handIndex')
                });
                $('#gifhint, #texthint').hide();
                this.update;
            }, over: function (event, ui) {
                ui.helper.data('hovering-board', true);
            }, out: function (event, ui) {
                ui.helper.data('hovering-board', false);
            },
        });
    }

    // certain events trigger every millisecond (e.g. onmousemove)
    // use this method to make them only trigger every x milliseconds to improve performance
    throttle(func, limit) {
        let lastFunc, lastRan;
        return function (...args) {
            if (!lastRan) {
                func.apply(this, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function () {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(this, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    }
}