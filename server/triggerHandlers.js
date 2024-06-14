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
const { TRIGGER, EVENT } = require('../constants.js');
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

// TRIGGERS
module.exports = {
    trigger_getGameState,
    trigger_playMinion,
    trigger_attack
};

async function trigger_getGameState(ws, data) {
    console.log(arguments.callee.name);

    try {
        sendEvent(ws, EVENT.GET_GAME_STATE, true, {
            playerHealth: playerHealth,
            opponentHealth: opponentHealth,
            hand: playerHand,
            playerBoard: playerBoard,
            opponentBoard: opponentBoard
        });
    } catch (err) {
        console.error(err);
        sendEvent(ws, EVENT.GET_GAME_STATE, false, {
            playerHealth: 30,
            opponentHealth: 30,
            hand: [],
            playerBoard: [],
            opponentBoard: []
        });
    }
}

async function trigger_playMinion(ws, data) {
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

    trigger_getGameState(ws, {});
}

async function trigger_attack(ws, data) {
    console.log(arguments.callee.name);

    try {
        const { attackerIndex, targetIndex } = data;

        // TODO: add condition for where the hero is the attacker
        if (attackerIndex >= playerBoard.length || attackerIndex < 0) {
            throw new Error('Invalid attacker index');
        }

        if (targetIndex == 99) {
            opponentHealth -= playerBoard[attackerIndex].attack;
            console.log('opponentHealth is', opponentHealth);
        } else if (targetIndex < opponentBoard.length && targetIndex >= 0) {
            // TODO: may need to split these up into individual, synchronous damage instances
            // like emitting a "damageEvent"
            opponentBoard[targetIndex].health -= playerBoard[attackerIndex].attack;
            playerBoard[attackerIndex].health -= opponentBoard[targetIndex].attack;
        } else {
            throw new Error('Invalid target index');
        }

        // TODO: think of a way to uniquely identify minions without indices
        // and keep track of whether or not they've attacked already

        // TODO: implement response handler on clientside
        // it should just trigger the animation
        sendEvent(ws, EVENT.ATTACK, true, {
            attackerIndex: attackerIndex,
            targetIndex: targetIndex
        });

        checkDeath(ws);
    } catch (err) {
        console.error(err);
    }

    trigger_getGameState(ws, {});
}

function checkDeath(ws) {
    console.log(arguments.callee.name);

    // it's necessary to send the board state each time
    // because minion indices change as minions die
    // and client needs to know which minions to animate
    try {
        function checkAndRemoveDeadUnits(board, isPlayer, ws) {
            let index = 0;
            while (index < board.length) {
                if (board[index].health <= 0) {
                    board.splice(index, 1);
                    sendEvent(ws, EVENT.DEATH, true, {
                        isPlayer: isPlayer,
                        boardIndex: index,
                    });
                    trigger_getGameState(ws, {});
                } else {
                    index++;
                }
            }
        }
        checkAndRemoveDeadUnits(playerBoard, true, ws);
        checkAndRemoveDeadUnits(opponentBoard, false, ws);
    } catch (err) {
        console.error(err);
    }
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