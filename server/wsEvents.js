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
const Minion = require('./minion.js');
const { ATTRIBUTES, MINION_IDS, MINION_DATA } = require('./baseMinionData.js');

// DEBUG DATA
let playerHand = [
    new Minion(MINION_IDS.ARMORSMITH),
    new Minion(MINION_IDS.LIGHTWELL),
    new Minion(MINION_IDS.TIRION_FORDRING)
],
    playerBoard = [],
    opponentBoard = [
        new Minion(MINION_IDS.ALAKIR_THE_WINDLORD),
        new Minion(MINION_IDS.CENARIUS),
        new Minion(MINION_IDS.KORKRON_ELITE),
        new Minion(MINION_IDS.SUMMONING_PORTAL)
    ],
    playerHealth = 30,
    opponentHealth = 10;
// DEBUG DATA

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
            playerHealth: playerHealth,
            opponentHealth: opponentHealth,
            hand: playerHand,
            playerBoard: playerBoard,
            opponentBoard: opponentBoard
        });
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
        const { boardIndex, handIndex } = data;

        // TODO: check that the indexed card is actually a minion
        const card = playerHand[handIndex];
        playerHand.splice(handIndex, 1);
        // TODO: trigger minion's battlecry
        playerBoard.splice(boardIndex, 0, card);
        // TODO: trigger onPlay effects
    } catch (err) {
        console.error(err);
    }

    getGameState(ws, {});
}

async function attack(ws, data) {
    console.log(arguments.callee.name);

    try {
        const { attackerIndex, targetIndex } = data;

        // TODO: add condition for where the hero is the attacker
        if (attackerIndex >= playerBoard.length || attackerIndex < 0) {
            throw new Error('Invalid attacker index');
        }

        let damageToAttacker =
            damageToTarget = 0;

        if (targetIndex == 99) { // target is hero
            damageToTarget = playerBoard[attackerIndex].attack;
        } else if (targetIndex < opponentBoard.length && targetIndex >= 0) { // target is minion
            damageToTarget = playerBoard[attackerIndex].attack;
            damageToAttacker = opponentBoard[targetIndex].attack;
        } else {
            throw new Error('Invalid target index');
        }

        sendEvent(ws, 'attack', true, { // trigger animation on client
            attackerIndex: attackerIndex,
            targetIndex: targetIndex
        });

        if (damageToTarget > 0) { // deal damage to target
            if(targetIndex == 99) {
                opponentHealth -= damageToTarget;
            } else {
                opponentBoard[targetIndex].health -= damageToTarget;
            }
            sendEvent(ws, 'damage', true, {
                attackerIndex: attackerIndex,
                targetIndex: targetIndex,
                damage: damageToTarget
            });

            if (targetIndex != 99 && opponentBoard[targetIndex].health <= 0) {
                opponentBoard.splice(targetIndex, 1);
                sendEvent(ws, 'death', true, {
                    isPlayer: false,
                    boardIndex: targetIndex,
                });
                getGameState(ws, {});
            }
        }

        if (damageToAttacker > 0) { // deal damage to attacker
            playerBoard[attackerIndex].health -= damageToAttacker;
            sendEvent(ws, 'damage', true, {
                attackerIndex: targetIndex,
                targetIndex: attackerIndex,
                damage: damageToAttacker
            });

            if (playerBoard[attackerIndex].health <= 0) {
                playerBoard.splice(attackerIndex, 1);
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



// HELPER FUNCTIONS

function sendEvent(ws, event, success, data) {
    ws.send(JSON.stringify({
        signature: event,
        success: success,
        data: data
    }));
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