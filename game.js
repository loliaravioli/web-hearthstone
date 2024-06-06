import { Deck } from './src/jsObjects/gameObjects/deck.js';
import { Hand } from './src/jsObjects/gameObjects/hand.js';
import { Board } from './src/jsObjects/gameObjects/board.js';
import { Mana } from './src/jsObjects/gameObjects/mana.js';

import { AttackController } from './src/jsObjects/gameControllers/attackController.js';
import { TurnController } from './src/jsObjects/gameControllers/turnController.js';

import { BoardOpponentView } from './src/jsObjects/views/BoardOpponentView.js';
import { BoardPlayerView } from './src/jsObjects/views/BoardPlayerView.js';
import { DeckOpponentView } from './src/jsObjects/views/DeckOpponentView.js';
import { DeckPlayerView } from './src/jsObjects/views/DeckPlayerView.js';
import { HandPlayerView } from './src/jsObjects/views/HandPlayerView.js';
import { DialoguePlayerView } from './src/jsObjects/views/DialoguePlayerView.js';
import { DialogueOpponentView } from './src/jsObjects/views/DialogueOpponentView.js';
import { ManaPlayerView } from './src/jsObjects/views/ManaPlayerView.js';
import { ManaOpponentView } from './src/jsObjects/views/ManaOpponentView.js';

class GAME {
    constructor() {
        this.resetValues();
    }

    resetValues() {
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

        this.playerDialogueView = new DialoguePlayerView();
        this.opponentDialogueView = new DialogueOpponentView();

        this.playerMana = new Mana();
        this.opponentMana = new Mana();

        this.playerManaView = new ManaPlayerView(this.playerMana);
        this.opponentManaView = new ManaOpponentView(this.playerMana);

        this.attackController = new AttackController(this.playerBoardView, this.opponentBoardView);
        this.turnController = new TurnController();
    }
}

export default new GAME();