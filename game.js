import { Deck } from './src/jsObjects/gameObjects/deck.js';
import { Hand } from './src/jsObjects/gameObjects/hand.js';
import { Board } from './src/jsObjects/gameObjects/board.js';
import { Mana } from './src/jsObjects/gameObjects/mana.js';

import { MinionAttackController } from './src/jsObjects/gameControllers/minionAttackController.js';
import { TurnController } from './src/jsObjects/gameControllers/turnController.js';

import { BoardOpponentView } from './src/jsObjects/views/BoardOpponentView.js';
import { BoardPlayerView } from './src/jsObjects/views/BoardPlayerView.js';
import { DeckOpponentView } from './src/jsObjects/views/DeckOpponentView.js';
import { DeckPlayerView } from './src/jsObjects/views/DeckPlayerView.js';
import { HandPlayerView } from './src/jsObjects/views/HandPlayerView.js';
import { HandOpponentView } from './src/jsObjects/views/HandOpponentView.js';
import { DialoguePlayerView } from './src/jsObjects/views/DialoguePlayerView.js';
import { DialogueOpponentView } from './src/jsObjects/views/DialogueOpponentView.js';
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
        this.opponentHandView = new HandOpponentView();

        this.playerDialogueView = new DialoguePlayerView();
        this.opponentDialogueView = new DialogueOpponentView();

        this.playerMana = new Mana();
        this.opponentMana = new Mana();

        this.playerManaView = new ManaPlayerView(this.playerMana);
        this.opponentManaView = new ManaOpponentView(this.playerMana);

        this.minionAttackController = new MinionAttackController(this.playerBoardView, this.opponentBoardView);
        this.turnController = new TurnController();
    }

    playerDrawCard() {
        const c = this.playerDeckView.drawCard();
        if(this.playerHandView.count() < 10) {
            this.playerHandView.addCard(c);
        } else {
            // burn card from overdrawing
        }
    }

    opponentDrawCard() {
        const c = this.opponentDeckView.drawCard();
        if(this.playerHandView.count() < 10) {
            this.opponentHandView.addCard();
        } else {
            // burn card from overdrawing
        }
    }
}

export default new GAME();