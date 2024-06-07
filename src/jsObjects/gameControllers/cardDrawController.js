import GAME from '../../../game.js';

export class CardDrawController {
    constructor() {
    }

    playerDrawCard() {
        const c = GAME.playerDeckView.drawCard();
        if (GAME.playerHandView.count() < 10) {
            GAME.playerHandView.addCard(c, 'draw-card');
        } else {
            // burn card from overdrawing
        }
    }

    opponentDrawCard() {
        const c = GAME.opponentDeckView.drawCard();
        if (GAME.opponentHandView.count() < 10) {
            GAME.opponentHandView.addCard();
        } else {
            // burn card from overdrawing
        }
    }
}