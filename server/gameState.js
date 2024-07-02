const { sendEvent } = require('./sendEvent.js');
const { generateMinion } = require('./minionData/generateMinion.js');
const { ATTRIBUTES, MINION_IDS, MINION_DATA } = require('./minionData/baseMinionData.js');
const Minion = require('./minionData/minion.js');
/** @typedef {Object} Minion */

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
            new Minion(MINION_IDS.ALAKIR_THE_WINDLORD, ++playedIndex, `2-${MINION_IDS.ALAKIR_THE_WINDLORD[0]}-0`),
            new Minion(MINION_IDS.CENARIUS, ++playedIndex, `2-${MINION_IDS.CENARIUS[0]}-1`),
            new Minion(MINION_IDS.KORKRON_ELITE, ++playedIndex, `2-${MINION_IDS.KORKRON_ELITE[0]}-2`),
            new Minion(MINION_IDS.SUMMONING_PORTAL, ++playedIndex, `2-${MINION_IDS.SUMMONING_PORTAL[0]}-3`),
            new Minion(MINION_IDS.MANA_TIDE_TOTEM, ++playedIndex, `2-${MINION_IDS.MANA_TIDE_TOTEM[0]}-4`),
            new Minion(MINION_IDS.ARATHI_WEAPONSMITH, ++playedIndex, `2-${MINION_IDS.ARATHI_WEAPONSMITH[0]}-5`)
        ];

        this.playerHealth = 30;
        this.opponentHealth = 10;

        this.whoseTurn = PLAYER_ID;

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
            const minion = generateMinion(playerDeckStorage[i]);
            minion.minionID = `1-${minion.baseMinionID}-${i}`;
            this.playerDeck.push(minion);
        }

        for (let i = 0; i < opponentDeckStorage.length; i++) {
            const minion = generateMinion(opponentDeckStorage[i]);
            minion.minionID = `2-${minion.baseMinionID}-${i}`;
            this.opponentDeck.push(minion);
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

    playMinion(isPlayer, boardIndex, minionID) {
        let minion;
        if (isPlayer) {
            const index = this.playerHand.findIndex(minion => minion.minionID == minionID);
            if (index !== -1) {
                minion = this.playerHand.splice(index, 1)[0];
            }

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

        this.triggerEffect('onMinionPlayed', { minion: minion });

        sendEvent(this.ws, 'playMinion', true, {
            boardIndex: boardIndex,
            minion: minion
        });
    }

    attack(attackerID, targetID) {
        let damageToAttacker = 0, damageToTarget = 0;

        /** @type {Minion} */
        const attacker = this.getMinion(attackerID);
        if(!attacker) {
            console.error('Could not find attacker with ID', attackerID, 'on board');
            return;
        }

        /** @type {Minion} */
        const target = this.getMinion(targetID);
        if(!target) {
            console.error('Could not find target with ID', targetID, 'on board');
            return;
        }

        damageToTarget = attacker.attack;
        damageToAttacker = (targetID != 99) ? target.attack : 0;

        sendEvent(this.ws, 'attack', true, { // trigger animation on client
            attackerID: attackerID,
            targetID: targetID,
            damageToAttacker: damageToAttacker,
            damageToTarget: damageToTarget
        });

        attacker.health -= damageToAttacker;
        if (targetID == 99) {
            this.opponentHealth -= damageToTarget;
        } else {
            target.health -= damageToTarget;
        }

        sendEvent(this.ws, 'applyDamage', true, {
            attackerID: attackerID,
            targetID: targetID,
            damage: damageToTarget,
            stats: [target.mana, target.attack, target.health],
            baseStats: [target.baseMana, target.baseAttack, target.baseHealth]
        });

        sendEvent(this.ws, 'applyDamage', true, {
            attackerID: targetID,
            targetID: attackerID,
            damage: damageToAttacker,
            stats: [attacker.mana, attacker.attack, attacker.health],
            baseStats: [attacker.baseMana, attacker.baseAttack, attacker.baseHealth]
        });

        if (target.health < 1) {
            this.killMinion(targetID);
        }

        if (attacker.health < 1) {
            this.killMinion(attackerID);
        }
    }

    killMinion(minionID) {
        /** @type {Minion} */
        const minion = this.getMinion(minionID);
        if (!minion) {
            console.error('Minion not on board', minionID);
            return;
        }

        const playerIndex = this.playerBoard.indexOf(minion);
        if (playerIndex != -1) {
            this.playerBoard.splice(playerIndex, 1);
            sendEvent(this.ws, 'death', true, {
                minionID: minionID
            });
        } else {
            const opponentIndex = this.opponentBoard.indexOf(minion);
            if (opponentIndex != -1) {
                this.opponentBoard.splice(opponentIndex, 1);
                sendEvent(this.ws, 'death', true, {
                    minionID: minionID
                });
            }
        }
    }

    endTurn() {
        if (this.whoseTurn == PLAYER_ID) {
            this.whoseTurn = OPPONENT_ID;
            this.simulateOpponentTurn();
        } else {
            this.whoseTurn = PLAYER_ID;
        }

        this.triggerEffect('onEndTurn', {});

        sendEvent(this.ws, 'endTurn', true, {
            whoseTurn: this.whoseTurn
        });
    }

    simulateOpponentTurn() {
        setTimeout(() => {
            this.endTurn();
        }, 2 * 1000);
    }

    triggerEffect(effect, data) {
        this.playerBoard
            .concat(this.opponentBoard)
            .slice()
            .sort((a, b) => a.playedIndex - b.playedIndex)
            .forEach(i => {
                let ret;
                switch (effect) {
                    case 'onMinionPlayed':
                        ret = i.onMinionPlayed(this, data.minion);
                        break;
                    case 'onEndTurn':
                        ret = i.onEndTurn(this);
                        break;
                    default:
                        break;
                }

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

    /** @returns {Minion} */
    getMinion(minionID) {
        return [...this.playerBoard, ...this.opponentBoard].find(minion => minion.minionID == minionID);
    }
}

module.exports = GameState;