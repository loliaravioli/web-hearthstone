const { App } = require('uWebSockets.js'), /* or require('../dist/uws.js') ? */
    { Server } = require('socket.io'),
    { Pool } = require('pg'),
    app = new App(),
    io = new Server(),
    PORT = 5500,
    KEYS = {
        REMAINING_LETTERS: 'remaining_letters',
        PLAYER_COUNT: 'player_count',
        BOARD_STATE: 'board_state',
        WHOSE_TURN: 'whose_turn',
        ROOM_CODE: 'room_code',
        IP1: 'ip1',
        IP2: 'ip2',
        IP3: 'ip3',
        IP4: 'ip4',
        PASS1: 'pass1',
        PASS2: 'pass2',
        PASS3: 'pass3',
        PASS4: 'pass4',
        POINTS1: 'points1',
        POINTS2: 'points2',
        POINTS3: 'points3',
        POINTS4: 'points4',
        DOCK1: 'dock1',
        DOCK2: 'dock2',
        DOCK3: 'dock3',
        DOCK4: 'dock4',
        LAST_MODIFIED: 'last_modified'
    }

io.attachApp(app);

const dbConfig = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 10000
} : {
    user: 'postgres',
    host: 'localhost',
    database: 'scrabble',
    password: 'admin',
    port: 5432,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 10000
};
const pool = new Pool(dbConfig);

const queryHandlerInstance = new QueryHandler('game', pool);

io.on("connection", (socket) => {
    // associate the socket with the client's unique identifier
    // this clientID is stored in the database to track who's playing in a scrabble game
    const clientID = socket.handshake.query.clientID;
    connectedClients[clientID] = socket;

    debugConsole(CATEGORY.CONNECTED, clientID);

    socket.on('disconnect', () => {
        debugConsole(CATEGORY.DISCONNECTED, clientID);
        delete connectedClients[socket.id];
    });

    socket.on('doFunction', (data) => {
        const { var1, var2 } = data;
        doFunction(socket, clientID, var1, var2);
    });
});

async function doFunction(socket, clientID, var1, var2) {
    const signature = arguments.callee.name;
    console.log(signature);

    try {
        const record = await getRecord(id);

        const scoreboard = [
            [record[KEYS.IP1], record[KEYS.POINTS1]],
            [record[KEYS.IP2], record[KEYS.POINTS2]],
            [record[KEYS.IP3], record[KEYS.POINTS3]],
            [record[KEYS.IP4], record[KEYS.POINTS4]]
        ];

        const whoseTurn = record[`ip${record[KEYS.WHOSE_TURN]}`];

        socketEmit(socket, signature, true, { /* data */ });
    } catch (err) {
        console.error(err);
        socketEmit(socket, signature, false, { /* data */ });
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

app.listen(PORT, (token) => {
    if (!token) {
        console.warn("port already in use");
    }
});