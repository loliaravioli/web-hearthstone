import GAME from '../game.js';

export function AI() {
    if(GAME.opponentBoard.count() == 7) { // full board
        const attackerCard = GAME.opponentBoardView.cardViews[Math.floor(Math.random() * GAME.opponentBoard.count())];
        if(GAME.playerBoard.count() > 0) {
            const targetCard = GAME.playerBoardView.cardViews[Math.floor(Math.random() * GAME.playerBoard.count())];
            GAME.minionAttackController.setAttacker(attackerCard);
            GAME.minionAttackController.setTarget(targetCard);
            GAME.minionAttackController.doAttack();
        } else {
            // attack hero?
        }
    } else {
        const cardToPlay = Math.floor(Math.random() * GAME.opponentHand.count());
        GAME.opponentBoardView.addCard(GAME.opponentHandView.getCard(cardToPlay));
        GAME.opponentHandView.removeCard(cardToPlay);
    }
}