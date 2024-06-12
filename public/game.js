import { Deck } from './jsObjects/gameObjects/deck.js';
import { Hand } from './jsObjects/gameObjects/hand.js';
import { Board } from './jsObjects/gameObjects/board.js';
import { Mana } from './jsObjects/gameObjects/mana.js';

import { MinionAttackController } from './jsObjects/gameControllers/minionAttackController.js';
import { TurnController } from './jsObjects/gameControllers/turnController.js';
import { CardDrawController } from './jsObjects/gameControllers/cardDrawController.js';

import { BoardView } from './jsObjects/views/BoardView.js';
import { DeckView } from './jsObjects/views/DeckView.js';
import { DialogueView } from './jsObjects/views/DialogueView.js';
import { HandPlayerView } from './jsObjects/views/HandPlayerView.js';
import { HandOpponentView } from './jsObjects/views/HandOpponentView.js';
import { ManaPlayerView } from './jsObjects/views/ManaPlayerView.js';
import { ManaOpponentView } from './jsObjects/views/ManaOpponentView.js';

import { handleSocketResponse } from './socketResponseHandler.js';
let socket;

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

        // TODO: move elsewhere?
        socket = io();

        handleSocketResponse({
            socket: socket,
            event: 'getHandResponse',
            onSuccess: (data) => {
                this.playerHandView.hand = data.hand;
                this.playerHandView.update();
            },
            onFailure: (data) => {
                socket.emit('getHand', { /* data */ }); // retry
            }
        });
    }

    resetValues() {
        // this.playerDeck = new Deck();
        // this.opponentDeck = new Deck();

        // this.playerDeckView = new DeckView(this.playerDeck, 'playerDeck');
        // this.opponentDeckView = new DeckView(this.opponentDeck, 'opponentDeck');

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

        socket.emit('getHand', { /* data */ });
    }
}

export default new GAME();
