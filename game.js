import { Deck } from './src/jsObjects/gameObjects/deck.js';
import { Hand } from './src/jsObjects/gameObjects/hand.js';
import { Board } from './src/jsObjects/gameObjects/board.js';
import { Mana } from './src/jsObjects/gameObjects/mana.js';

import { MinionAttackController } from './src/jsObjects/gameControllers/minionAttackController.js';
import { TurnController } from './src/jsObjects/gameControllers/turnController.js';
import { CardDrawController } from './src/jsObjects/gameControllers/cardDrawController.js';

import { BoardView } from './src/jsObjects/views/BoardView.js';
import { DeckView } from './src/jsObjects/views/DeckView.js';
import { DialogueView } from './src/jsObjects/views/DialogueView.js';
import { HandPlayerView } from './src/jsObjects/views/HandPlayerView.js';
import { HandOpponentView } from './src/jsObjects/views/HandOpponentView.js';
import { ManaPlayerView } from './src/jsObjects/views/ManaPlayerView.js';
import { ManaOpponentView } from './src/jsObjects/views/ManaOpponentView.js';

class GAME {
    constructor() {
        this.playerDeck = null;
        this.opponentDeck = null;

        this.playerDeckView = null;
        this.opponentDeckView = null;

        this.playerBoard = null;
        this.opponentBoard = null;

        this.playerBoardView = null;
        this.opponentBoardView = null;

        this.playerHand = null;
        this.playerHandView = null;

        this.playerDialogueView = null;
        this.opponentDialogueView = null;

        this.playerMana = null;
        this.opponentMana = null;

        this.playerManaView = null;
        this.opponentManaView = null;

        this.minionAttackController = null;
        this.turnController = null;
        this.cardDrawController = null;

        // TODO: move elsewhere
        let socket = io(window.location.origin, { query: { clientID: clientID } });

        socket.on('getHandResponse', (response) => {
            const { success, signature, data } = response;

            console.log(success ? 'SUCCESS' : 'FAIL', signature);

            if (!success) { return; }

            console.log(data.hand);
        });

        socket.emit('getHand', { /* data */ });
    }

    resetValues() {
        this.playerDeck = new Deck();
        this.opponentDeck = new Deck();

        this.playerDeckView = new DeckView(this.playerDeck, 'playerDeck');
        this.opponentDeckView = new DeckView(this.opponentDeck, 'opponentDeck');

        this.playerBoard = new Board();
        this.opponentBoard = new Board();

        this.playerBoardView = new BoardView(this.playerBoard, 'board--player', true);
        this.opponentBoardView = new BoardView(this.opponentBoard, 'board--opponent', false);

        this.playerHand = new Hand();

        this.playerHandView = new HandPlayerView(this.playerHand);
        this.opponentHandView = new HandOpponentView();

        this.playerDialogueView = new DialogueView('playerBubble');
        this.opponentDialogueView = new DialogueView('opponentBubble');

        this.playerMana = new Mana();
        this.opponentMana = new Mana();

        this.playerManaView = new ManaPlayerView(this.playerMana);
        this.opponentManaView = new ManaOpponentView(this.playerMana);

        this.minionAttackController = new MinionAttackController(this.playerBoardView, this.opponentBoardView);
        this.turnController = new TurnController();
        this.cardDrawController = new CardDrawController();
    }
}

export default new GAME();