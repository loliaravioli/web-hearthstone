import GAME from '../../game.js';

export class CardPlayController {
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
            drag: this.throttle(function (event, ui) {
                if (!ui.helper.data('hovering-board')) { return; }
                GAME.playerBoardView.generatePlaceholder(ui.helper.offset().left + (ui.helper.width() / 2));
            }, 50)
        });

        $('#board--player').droppable({
            accept: '.card',
            drop: function (event, ui) {
                ui.helper.data('hovering-board', false);
                GAME.triggerEvent('playMinion', {
                    boardIndex: GAME.playerBoardView.placeholderIndex == -1 ? 0 : GAME.playerBoardView.placeholderIndex,
                    minionID: ui.draggable.data('minionid')
                });
                $('#gifhint, #texthint').hide();
            }, over: function (event, ui) {
                ui.helper.data('hovering-board', true);
            }, out: function (event, ui) {
                ui.helper.data('hovering-board', false);
            },
        });
    }

    // certain events trigger so often that they ruin performance
    // use this method to make them only trigger every x milliseconds
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