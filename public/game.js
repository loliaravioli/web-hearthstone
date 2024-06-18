import { Mana } from './jsObjects/gameObjects/mana.js';

import { AttackController } from './jsObjects/gameControllers/attackController.js';
import { TurnController } from './jsObjects/gameControllers/turnController.js';
import { CardDrawController } from './jsObjects/gameControllers/cardDrawController.js';
import { CardDragController } from './jsObjects/gameControllers/cardDragController.js';

import { BoardView } from './jsObjects/views/BoardView.js';
import { DeckView } from './jsObjects/views/DeckView.js';
import { DialogueView } from './jsObjects/views/DialogueView.js';
import { HeroView } from './jsObjects/views/HeroView.js';

import { HandPlayerView } from './jsObjects/views/HandPlayerView.js';
import { HandOpponentView } from './jsObjects/views/HandOpponentView.js';
import { ManaPlayerView } from './jsObjects/views/ManaPlayerView.js';
import { ManaOpponentView } from './jsObjects/views/ManaOpponentView.js';

import { wsEventHandler } from './wsEventHandler.js';
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

        this.playerHeroView = null;
        this.opponentHeroView = null;

        this.playerMana = null;
        this.opponentMana = null;

        this.playerManaView = null;
        this.opponentManaView = null;

        this.attackController = new AttackController();
        this.turnController = new TurnController();
        this.cardDrawController = new CardDrawController();
        this.cardDragController = new CardDragController();




        // TODO: move elsewhere
        ws = new WebSocket('ws://localhost:5500');
        ws.onopen = () => { console.log('Connected to WebSocket server'); };
        ws.onclose = () => { console.log('Disconnected from WebSocket server'); };

        wsEventHandler({
            socket: ws,
            event: 'getGameState',
            onSuccess: (data) => {
                this.playerHandView.hand = data.hand;
                this.playerHandView.update();

                this.playerBoardView.board = data.playerBoard;
                this.playerBoardView.update();

                this.opponentBoardView.board = data.opponentBoard;
                this.opponentBoardView.update();

                this.playerHeroView.setHealth(data.playerHealth);
                this.opponentHeroView.setHealth(data.opponentHealth);
            },
            onFailure: (data) => {
                setTimeout(() => {
                    this.triggerEvent('getGameState'); // retry
                }, 5 * 1000);
            }
        });

        wsEventHandler({
            socket: ws,
            event: 'death',
            onSuccess: (data) => {
                console.log(`${data.boardIndex} died - player's side: ${data.isPlayer}`);
                if (data.isPlayer) {
                    this.playerBoardView.killCard(data.boardIndex);
                } else {
                    this.opponentBoardView.killCard(data.boardIndex);
                }
            }
        });

        wsEventHandler({
            socket: ws,
            event: 'attack',
            onSuccess: (data) => {
                console.log(`${data.attackerIndex} attacked ${data.targetIndex}`);
            }
        });

        wsEventHandler({
            socket: ws,
            event: 'damage',
            onSuccess: (data) => {
                console.log(`${data.attackerIndex} dealt ${data.damage} to ${data.targetIndex}`);
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

        this.playerHeroView = new HeroView(true);
        this.opponentHeroView = new HeroView(false);

        this.playerMana = new Mana();
        this.opponentMana = new Mana();

        // TODO: get rid of separate player/opponent views for Mana
        this.playerManaView = new ManaPlayerView(this.playerMana);
        this.opponentManaView = new ManaOpponentView(this.opponentMana);

        this.triggerEvent('getGameState');
    }

    triggerEvent(event, data = {}) {
        ws.send(JSON.stringify({ event: event, data: data }));
    }
}

export default new GAME();
