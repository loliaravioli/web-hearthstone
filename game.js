import { Deck } from './src/jsObjects/deck.js';
import { Hand } from './src/jsObjects/hand.js';
import { Board } from './src/jsObjects/board.js';
import { AttackController } from './src/jsObjects/attackController.js';

import { BoardOpponentView } from './src/views/BoardOpponentView.js';
import { BoardPlayerView } from './src/views/BoardPlayerView.js';
import { DeckOpponentView } from './src/views/DeckOpponentView.js';
import { DeckPlayerView } from './src/views/DeckPlayerView.js';
import { HandPlayerView } from './src/views/HandPlayerView.js';

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
    }
}

export default new GAME();