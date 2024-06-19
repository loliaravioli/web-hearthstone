const queryHandler = require('./queryHandler.js');
const KEYS = { // SQL keys
    // REMAINING_LETTERS: 'remaining_letters',
    // PLAYER_COUNT: 'player_count',
    // BOARD_STATE: 'board_state',
    // WHOSE_TURN: 'whose_turn',
    // ROOM_CODE: 'room_code',
    // IP1: 'ip1',
    // IP2: 'ip2',
    // IP3: 'ip3',
    // IP4: 'ip4',
    // PASS1: 'pass1',
    // PASS2: 'pass2',
    // PASS3: 'pass3',
    // PASS4: 'pass4',
    // POINTS1: 'points1',
    // POINTS2: 'points2',
    // POINTS3: 'points3',
    // POINTS4: 'points4',
    // DOCK1: 'dock1',
    // DOCK2: 'dock2',
    // DOCK3: 'dock3',
    // DOCK4: 'dock4',
    // LAST_MODIFIED: 'last_modified'
};
const { sendEvent } = require('./sendEvent.js');
const Minion = require('./minionData/minion.js');
const { ATTRIBUTES, MINION_IDS, MINION_DATA } = require('./minionData/baseMinionData.js');
const GameState = require('./gameState.js');

// DEBUG DATA
const gameState = new GameState(),
    PLAYER_HERO = 'playerHero',
    OPPONENT_HERO = 'opponentHero';

// EVENTS
module.exports = {
    getGameState,
    playMinion,
    attack
};

async function getGameState(ws, data) {
    console.log(arguments.callee.name);

    try {
        sendEvent(ws, 'getGameState', true, {
            playerHealth: gameState.playerHealth,
            opponentHealth: gameState.opponentHealth,
            hand: gameState.playerHand,
            playerBoard: gameState.playerBoard,
            opponentBoard: gameState.opponentBoard
        });
        // sendEvent(ws, 'getGameState', true, gameState);
    } catch (err) {
        console.error(err);
        sendEvent(ws, 'getGameState', false, {
            playerHealth: 30,
            opponentHealth: 30,
            hand: [],
            playerBoard: [],
            opponentBoard: []
        });
    }
}

async function playMinion(ws, data) {
    console.log(arguments.callee.name);

    try {
        const { boardIndex, minionID } = data;
        gameState.setWS(ws);
        gameState.playMinion(true, boardIndex, minionID);
    } catch (err) {
        console.error(err);
    }
}

async function attack(ws, data) {
    console.log(arguments.callee.name);

    try {
        const { attackerIndex, targetIndex } = data;

        // TODO: add condition for where the hero is the attacker
        if (attackerIndex >= gameState.playerBoard.length || attackerIndex < 0) {
            throw new Error('Invalid attacker index');
        }

        let damageToAttacker = damageToTarget = 0;

        if (targetIndex == 99) { // target is hero
            damageToTarget = gameState.playerBoard[attackerIndex].attack;
        } else if (targetIndex < gameState.opponentBoard.length && targetIndex >= 0) { // target is minion
            damageToTarget = gameState.playerBoard[attackerIndex].attack;
            damageToAttacker = gameState.opponentBoard[targetIndex].attack;
        } else {
            throw new Error('Invalid target index');
        }

        sendEvent(ws, 'attack', true, { // trigger animation on client
            attackerIndex: attackerIndex,
            targetIndex: targetIndex,
            damageToAttacker: damageToAttacker,
            damageToTarget: damageToTarget
        });

        if (damageToTarget > 0) { // deal damage to target
            if (targetIndex == 99) {
                gameState.opponentHealth -= damageToTarget;
            } else {
                gameState.opponentBoard[targetIndex].health -= damageToTarget;
            }
            // sendEvent(ws, 'damage', true, {
            //     attackerIndex: attackerIndex,
            //     targetIndex: targetIndex,
            //     damage: damageToTarget
            // });
            // REPLACE WITH GENERIC "changeStats"

            if (targetIndex != 99 && gameState.opponentBoard[targetIndex].health <= 0) {
                gameState.opponentBoard.splice(targetIndex, 1);
                sendEvent(ws, 'death', true, {
                    isPlayer: false,
                    boardIndex: targetIndex,
                });
                getGameState(ws, {});
            }
        }

        if (damageToAttacker > 0) { // deal damage to attacker
            gameState.playerBoard[attackerIndex].health -= damageToAttacker;
            // sendEvent(ws, 'damage', true, {
            //     attackerIndex: targetIndex,
            //     targetIndex: attackerIndex,
            //     damage: damageToAttacker
            // });
            // REPLACE WITH GENERIC "changeStats"

            if (gameState.playerBoard[attackerIndex].health <= 0) {
                gameState.playerBoard.splice(attackerIndex, 1);
                sendEvent(ws, 'death', true, {
                    isPlayer: true,
                    boardIndex: attackerIndex,
                });
                getGameState(ws, {});
            }
        }
    } catch (err) {
        console.error(err);
    }

    getGameState(ws, {});
}

// TODO: create unique minion ID's to use in place of indices
// should be something like "player-minionFileName-#"
function applyDamage(attackerID, targetID, damage) {
    if (damage < 1) { return; }

    let minion;
    if (targetID == OPPONENT_HERO) {
        gameState.opponentHealth -= damage;
    } else {
        minion = getMinionWithID(targetID);
        minion.health -= damage;
    }

    sendEvent(ws, 'damage', true, {
        attackerIndex: attackerID,
        targetIndex: targetID,
        damage: damage
    });

    if (targetID != OPPONENT_HERO && minion.health <= 0) {
        const minionIndex = gameState.opponentBoard.indexOf(minion);
        gameState.opponentBoard.splice(minionIndex, 1);
        sendEvent(ws, 'death', true, {
            targetID: targetID,
        });
        getGameState(ws, {});
    }
}



// HELPER FUNCTIONS

function getMinionWithID(board, id) {
    board.forEach(minion => {
        if (minion.minionID == id) {
            return minion;
        }
    });
}

// async function getRecord(id) {
//     const signature = arguments.callee.name;
//     console.log(signature);

//     try {
//         const params = { where: [{ key: KEYS.ROOM_CODE, value: id }] };
//         const result = await queryHandler.select(params);
//         return result[0]; // query only ever returns one row since id is unique
//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// }

// const record = await getRecord(id);
// const scoreboard = [
//     [record[KEYS.IP1], record[KEYS.POINTS1]],
//     [record[KEYS.IP2], record[KEYS.POINTS2]],
//     [record[KEYS.IP3], record[KEYS.POINTS3]],
//     [record[KEYS.IP4], record[KEYS.POINTS4]]
// ];