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

async function processEvent(ws, json) {
    const { event, data } = json;

    switch (event) {
        case 'getGameState':
            getGameState(ws, data);
            break;
        case 'playMinion':
            playMinion(ws, data);
            break;
        case 'attack':
            attack(ws, data);
            break;
        case 'endTurn':
            endTurn(ws, data);
            break;
        default:
            console.error('Unknown event', event);
    }
}

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
        const { attackerID, targetID } = data;
        gameState.setWS(ws);
        gameState.attack(attackerID, targetID);
    } catch (err) {
        console.error(err);
    }
}

async function endTurn(ws, data) {
    console.log(arguments.callee.name);

    try {
        gameState.setWS(ws);
        gameState.endTurn();
    } catch (err) {
        console.error(err);
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

module.exports = { processEvent };