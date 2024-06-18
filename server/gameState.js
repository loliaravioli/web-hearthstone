const { sendEvent } = require('./sendEvent.js');
const { ATTRIBUTES, MINION_IDS, MINION_DATA } = require('./minionData/baseMinionData.js');
const Minion = require('./minionData/minion.js');
const mana_wyrm = require('./minionData/minions/mana_wyrm.js');

const playerDeckStorage = [
    MINION_IDS.ARMORSMITH,
    MINION_IDS.TIRION_FORDRING,
    MINION_IDS.MANA_WYRM,
    MINION_IDS.LIGHTWELL,
    MINION_IDS.GUARDIAN_OF_KINGS
], opponentDeckStorage = [];

const PLAYER_ID = 1,
    OPPONENT_ID = 2;

let playedIndex = -1;

class GameState {
    constructor() {
        this.ws = null;

        this.playerDeck = [];
        this.opponentDeck = [];

        this.playerHand = [];
        this.opponentHand = [];

        this.playerBoard = [];
        this.opponentBoard = [
            new Minion(MINION_IDS.ALAKIR_THE_WINDLORD, ++playedIndex),
            new Minion(MINION_IDS.CENARIUS, ++playedIndex),
            new Minion(MINION_IDS.KORKRON_ELITE, ++playedIndex),
            new Minion(MINION_IDS.SUMMONING_PORTAL, ++playedIndex),
            new Minion(MINION_IDS.MANA_TIDE_TOTEM, ++playedIndex),
            new Minion(MINION_IDS.ARATHI_WEAPONSMITH, ++playedIndex)
        ];

        this.playerHealth = 30;
        this.opponentHealth = 10;

        this.startGame();

        this.drawCard(PLAYER_ID);
        this.drawCard(PLAYER_ID);
        this.drawCard(PLAYER_ID);
        this.drawCard(PLAYER_ID);
        this.drawCard(PLAYER_ID);
    }

    setWS(ws) {
        this.ws = ws;
    }

    startGame() {
        for (let i = 0; i < playerDeckStorage.length; i++) {
            let card;
            if (playerDeckStorage[i] == MINION_IDS.MANA_WYRM) {
                card = new mana_wyrm();
            } else {
                card = new Minion(playerDeckStorage[i]);
            }
            card.uniqueID = `1-${card.minionID}-${i}`;
            this.playerDeck.push(card);
        }

        for (let i = 0; i < opponentDeckStorage.length; i++) {
            const card = new Minion(opponentDeckStorage[i]);
            card.uniqueID = `2-${card.minionID}-${i}`;
            this.opponentDeck.push(card);
        }

        this.shuffleDeck(this.playerDeck);
        this.shuffleDeck(this.opponentDeck);
    }

    shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    drawCard(player) {
        if (player == PLAYER_ID) {
            const card = this.playerDeck.pop();
            if (card) {
                console.log('player draws a card');
                this.playerHand.push(card);
            } else {
                console.log('player overdraws');
            }
        } else if (player == OPPONENT_ID) {
            const card = this.opponentDeck.pop();
            if (card) {
                console.log('opponent draws a card');
                this.opponentHand.push(card);
            } else {
                console.log('opponent overdraws');
            }
        } else {
            console.error('unknown player ID');
        }
    }

    playMinion(isPlayer, boardIndex, handIndex) {
        let minion;
        if (isPlayer) {
            minion = this.playerHand[handIndex];
            this.playerHand.splice(handIndex, 1);

            const battlecryRet = minion.battlecry(this);
            if (battlecryRet) {
                sendEvent(this.ws, battlecryRet.event, true, battlecryRet.data);
            }

            const chooseOneRet = minion.chooseOne(this);
            if (chooseOneRet) {
                sendEvent(this.ws, chooseOneRet.event, true, chooseOneRet.data);
            }

            const comboRet = minion.combo(this);
            if (comboRet) {
                sendEvent(this.ws, comboRet.event, true, comboRet.data);
            }

            minion.playedIndex = ++playedIndex;
            this.playerBoard.splice(boardIndex, 0, minion);
        }

        this.playerBoard
            .concat(this.opponentBoard)
            .slice()
            .sort((a, b) => a.playedIndex - b.playedIndex)
            .forEach(i => {
                const ret = i.onMinionPlayed(this, minion);
                if (ret) {
                    sendEvent(this.ws, ret.event, true, ret.data);
                }
            });
    }

    // playSpell(spell) {
    //     spell.cast(this);
    //     this.emit('spellPlayed', spell);
    // }

    // summonMinion(minion) {
    //     this.minions.push(minion);
    //     this.emit('minionSummoned', minion);
    // }
}

module.exports = GameState;