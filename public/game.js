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

import { handleWSResponse } from './wsResponseHandler.js';
let ws;

class GAME {
    constructor() {
        console.log('GAME CONSTRUCTOR');
        this.playerDeckView = null;
        this.opponentDeckView = null;

        this.playerBoardView = null;
        this.opponentBoardView = null;

        this.playerHandView = null;
        this.opponentHandView = null;

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
        ws = new WebSocket('ws://localhost:5500');

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        handleWSResponse({
            socket: ws,
            event: 'getHand',
            onSuccess: (data) => {
                this.playerHandView.hand = data.hand;
                this.playerHandView.update();
            },
            onFailure: (data) => {
                setTimeout(() => {
                    this.emit('getHand'); // retry
                }, 5 * 1000);
            }
        });

        handleWSResponse({
            socket: ws,
            event: 'getBoard',
            onSuccess: (data) => {
                this.playerBoardView.board = data.playerBoard;
                this.playerBoardView.update();

                this.opponentBoardView.board = data.opponentBoard;
                this.opponentBoardView.update();
            },
            onFailure: (data) => {
                setTimeout(() => {
                    this.emit('getBoard'); // retry
                }, 5 * 1000);
            }
        });

        handleWSResponse({
            socket: ws,
            event: 'deathEvent',
            onSuccess: (data) => {
                if(data.isPlayer) {
                    this.playerBoardView.killCard(data.boardIndex);
                } else {
                    this.opponentBoardView.killCard(data.boardIndex);
                }

                this.playerBoardView.board = data.playerBoard;
                this.playerBoardView.update();

                this.opponentBoardView.board = data.opponentBoard;
                this.opponentBoardView.update();
            }
        });
    }

    resetValues() {
        this.playerDeckView = new DeckView(true);
        this.opponentDeckView = new DeckView(false);

        this.playerBoardView = new BoardView(true);
        this.opponentBoardView = new BoardView(false);

        this.playerHandView = new HandPlayerView();
        this.opponentHandView = new HandOpponentView();

        this.playerDialogueView = new DialogueView(true);
        this.opponentDialogueView = new DialogueView(false);

        this.playerMana = new Mana();
        this.opponentMana = new Mana();

        this.playerManaView = new ManaPlayerView(this.playerMana);
        this.opponentManaView = new ManaOpponentView(this.opponentMana); // TODO: get rid of separate player/opponent views for Mana

        this.minionAttackController = new MinionAttackController();
        this.turnController = new TurnController();
        this.cardDrawController = new CardDrawController();

        this.emit('getHand');
        this.emit('getBoard');
    }

    emit(command, data = {}) {
        ws.send(JSON.stringify({ command: command, data: data }));
    }
}

export default new GAME();
