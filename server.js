const mime = require('mime-types');
const { App } = require('uWebSockets.js');
const { Server } = require('socket.io');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const app = new App();
const io = new Server();
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
const dbConfig = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5 * 1000,
    idleTimeoutMillis: 10 * 1000
} : {
    user: 'postgres',
    host: 'localhost',
    database: 'scrabble',
    password: 'admin',
    port: 5432,
    connectionTimeoutMillis: 5 * 1000,
    idleTimeoutMillis: 10 * 1000
}, pool = new Pool(dbConfig);
const QueryHandler = require('./queryHandler.js');
const queryHandlerInstance = new QueryHandler('game', pool);
const Minion = require('./minion.js');
const { ATTRIBUTES, MINION_IDS, MINION_DATA } = require('./baseMinionData.js');
const staticDir = path.join(__dirname, 'public');

const PORT = process.env.PORT || 5500;
app.any('/*', (res, req) => {
    const filePath = path.join(staticDir, req.getUrl() == '/' ? '/index.html' : req.getUrl());

    let fileContent,
        mimeType,
        status;

    try {
        fileContent = fs.readFileSync(filePath);
        mimeType = mime.lookup(filePath);
        status = '200 OK';
    } catch (err) {
        fileContent = 'File Not Found';
        mimeType = 'text/plain';
        status = '404 Not Found';
    }

    res.cork(() => {
        res.writeStatus(status)
            .writeHeader('Content-Type', mimeType)
            .end(fileContent);
    });
}).listen(PORT, function (token) {
    if (token) {
        console.log(`Server is running at http://localhost:${PORT}`);
    } else {
        console.log(`Failed to listen to port ${PORT}`);
    }
});

io.attachApp(app);

let connectedClients = {};
io.on('connection', (socket) => {
    const clientID = 'XXXXX'; // socket.handshake.query.clientID
    connectedClients[clientID] = socket;

    console.log(clientID, 'connected');

    socket.on('disconnect', () => {
        console.log(clientID, 'disconnected');
        delete connectedClients[socket.id];
    });

    socket.on('getHand', (data) => {
        const { } = data;
        getHand(socket, clientID);
    });
});

async function getHand(socket, clientID) {
    const signature = arguments.callee.name;
    console.log(signature);

    try {
        // const record = await getRecord(id);

        // const scoreboard = [
        //     [record[KEYS.IP1], record[KEYS.POINTS1]],
        //     [record[KEYS.IP2], record[KEYS.POINTS2]],
        //     [record[KEYS.IP3], record[KEYS.POINTS3]],
        //     [record[KEYS.IP4], record[KEYS.POINTS4]]
        // ];

        const hand = [
            new Minion(MINION_IDS.ARMORSMITH),
            new Minion(MINION_IDS.LIGHTWELL),
            new Minion(MINION_IDS.TIRION_FORDRING)
        ];

        socketEmit(socket, signature, true, { hand: hand });
    } catch (err) {
        console.error(err);
        socketEmit(socket, signature, false, { hand: [] });
    }
}

function socketEmit(socket, signature, success, data) {
    socket.emit(`${signature}Response`, {
        success: success,
        signature: signature,
        data: data
    });
}

async function getRecord(id) {
    const signature = arguments.callee.name;
    console.log(signature);

    try {
        const params = { where: [{ key: KEYS.ROOM_CODE, value: id }] };
        const result = await queryHandlerInstance.select(params);

        debugConsole(CATEGORY.SUCCESS, signature);
        // query only ever returns one row since id is unique
        return result[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}