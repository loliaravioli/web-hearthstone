import { Deck } from './src/jsObjects/gameObjects/deck.js';
import { Hand } from './src/jsObjects/gameObjects/hand.js';
import { Board } from './src/jsObjects/gameObjects/board.js';
import { AttackController } from './src/jsObjects/gameControllers/attackController.js';
import { TurnController } from './src/jsObjects/gameControllers/turnController.js';

import { BoardOpponentView } from './src/jsObjects/views/BoardOpponentView.js';
import { BoardPlayerView } from './src/jsObjects/views/BoardPlayerView.js';
import { DeckOpponentView } from './src/jsObjects/views/DeckOpponentView.js';
import { DeckPlayerView } from './src/jsObjects/views/DeckPlayerView.js';
import { HandPlayerView } from './src/jsObjects/views/HandPlayerView.js';

class GAME {
    constructor() {
        this.playerDeck = new Deck();
        this.opponentDeck = new Deck();

        this.playerDeckView = new DeckPlayerView(this.playerDeck);
        this.opponentDeckView = new DeckOpponentView(this.opponentDeck);

        this.playerBoard = new Board();
        this.opponentBoard = new Board();

        this.playerBoardView = new BoardPlayerView(this.playerBoard);
        this.opponentBoardView = new BoardOpponentView(this.opponentBoard);

        this.playerHand = new Hand();
        this.playerHandView = new HandPlayerView(this.playerHand);

        this.attackController = new AttackController(this.playerBoardView, this.opponentBoardView);
        this.turnController = new TurnController();
    }
}

export default new GAME();