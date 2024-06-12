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

module.exports = {
    getHand,
    getBoard,
    playMinion
};

// hands, boards and decks will all use the same Minion class
// this makes it easy to modify the stats of minions wherever they are
let hand = [
    new Minion(MINION_IDS.ARMORSMITH),
    new Minion(MINION_IDS.LIGHTWELL),
    new Minion(MINION_IDS.TIRION_FORDRING)
];

let playerBoard = [];

async function getHand(ws, data) {
    const signature = arguments.callee.name;
    console.log(signature);

    try {
        wsEmit(ws, signature, true, { hand: hand });
    } catch (err) {
        console.error(err);
        wsEmit(ws, signature, false, { hand: [] });
    }
}

async function getBoard(ws, data) {
    const signature = arguments.callee.name;
    console.log(signature);

    try {
        wsEmit(ws, signature, true, { playerBoard: playerBoard });
    } catch (err) {
        console.error(err);
        wsEmit(ws, signature, false, { playerBoard: [] });
    }
}

async function playMinion(ws, data) {
    const signature = arguments.callee.name;
    console.log(signature);

    try {
        const { boardIndex, handIndex } = data;

        // TODO: check that the indexed card is actually a minion
        const card = hand[handIndex];
        hand.splice(handIndex, 1);

        // TODO: trigger minion's battlecry

        playerBoard.splice(boardIndex, 0, card);

        // TODO: trigger onPlay effects

    } catch (err) {
        console.error(err);
    }

    getBoard(ws, data);
    getHand(ws, data);
}

// HELPER FUNCTIONS

function wsEmit(ws, signature, success, data) {
    ws.send(JSON.stringify({
        command: `${signature}Response`,
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