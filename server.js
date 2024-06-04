const constants = require('./constants');
const {
    DEFAULT_REMAINING_LETTERS,
    TILE_POINT_VALUES,
    CATEGORY,
    KEYS,
    characters,
    onlyAloneNouns,
    onlyFirstInSequenceNouns,
    onlyLastInSequenceNouns,
    neverAloneNouns,
    nouns,
    prepositions
} = constants;

const QueryHandler = require('./queryHandler');
const { debugConsole } = require('./debugConsole');

const path = require('path');
const nodemailer = require('nodemailer');
const express = require('express');
const cron = require('node-cron');
const Typo = require('typo-js');
const { Pool } = require('pg');
const { debug } = require('console');






// TODO: try using this instead of express?
const { App } = require('uWebSockets.js');
const { Server } = require('socket.io');

const app = new App();
const io = new Server();

io.attachApp(app);

io.on("connection", (socket) => {
  // ...
});

app.listen(3000, (token) => {
  if (!token) {
    console.warn("port already in use");
  }
});












const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
let connectedClients = {};

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io/client-dist'));

const dictionary = new Typo('en_US');

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

const gameExpirationDays = 2;
cron.schedule('*/10 * * * *', () => {
    deleteOldRecords();
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'raizinoviev@gmail.com',
        pass: 'ebos oeiz putt qqkc'
    }
});

const asURL = (f) => `${__dirname}/public/${f}`;

// app.get('/', (req, res) => {
//     res.send(`
//       <html>
//         <head>
//           <meta property="og:image" content="https://www.romanzinoviev.com/public/images/scrabble_embed_picture.png">
//           <!-- Other meta tags -->
//         </head>
//         <body>
//           <!-- Your content -->
//         </body>
//       </html>
//     `);
// });

app.get('/scrabble', (req, res) => {
    const signature = 'scrabble';
    debugConsole(CATEGORY.REQUEST, signature);

    res.sendFile(asURL('scrabble.html'));

    debugConsole(CATEGORY.SUCCESS, signature);
});

app.get('/scrabbleInvite', (req, res) => {
    const signature = 'scrabbleInvite';
    debugConsole(CATEGORY.REQUEST, signature);

    const roomCode = req.query.roomCode;
    if (roomCode && roomCode.length === 5) {
        debugConsole(CATEGORY.NONE, `Loading invitation for room ${roomCode}`);
        res.sendFile(asURL('scrabbleInvite.html'));
    } else {
        debugConsole(CATEGORY.NONE, 'No room code provided');
        res.redirect('/scrabble');
    }

    debugConsole(CATEGORY.SUCCESS, signature);
});

app.get('/redirectToScrabbleRoom', (req, res) => {
    const signature = 'redirectToScrabbleRoom';
    debugConsole(CATEGORY.REQUEST, signature);

    const roomCode = req.query.roomCode;

    if (roomCode) {
        debugConsole(CATEGORY.NONE, `Redirecting to room ${roomCode}`);
        res.redirect(`/scrabbleRoom?roomCode=${roomCode}`);
    } else {
        debugConsole(CATEGORY.NONE, 'No room code provided');
        res.redirect('/scrabble');
    }

    debugConsole(CATEGORY.SUCCESS, signature);
});

app.get('/scrabbleRoom', (req, res) => {
    const signature = 'scrabbleRoom';
    debugConsole(CATEGORY.REQUEST, signature);

    const roomCode = req.query.roomCode;
    if (roomCode && roomCode.length === 5) {
        debugConsole(CATEGORY.NONE, `Loading room ${roomCode}`);
        res.sendFile(asURL('scrabbleRoom.html'));
    } else {
        debugConsole(CATEGORY.NONE, 'No room code provided');
        res.redirect('/scrabble');
    }

    debugConsole(CATEGORY.SUCCESS, signature);
});

app.get('/resume', (req, res) => {
    const signature = 'resume';
    debugConsole(CATEGORY.REQUEST, signature);

    res.sendFile(asURL('resume.html'));

    debugConsole(CATEGORY.SUCCESS, signature);
});

app.post('/sendEmail', (req, res) => {
    const signature = 'sendEmail';
    debugConsole(CATEGORY.REQUEST, signature);

    const { subject, content, sender } = req.body;

    const mailOptions = {
        from: 'raizinoviev@gmail.com',
        to: 'raizinoviev@gmail.com',
        subject: subject,
        text: `${content}\n\nFrom ${sender}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
        }
        else {
            debugConsole(CATEGORY.SUCCESS, signature);
        }
    });

    res.sendStatus(200);
});

app.post('/generateUsername', (req, res) => {
    const signature = 'generateUsername';
    debugConsole(CATEGORY.REQUEST, signature);

    const username = generateUsername();

    res.send({
        success: true,
        signature: signature,
        data: {
            username: username
        }
    });

    debugConsole(CATEGORY.SUCCESS, signature);
});

io.on('connection', (socket) => {
    // associate the socket with the client's unique identifier
    // this clientID is stored in the database to track who's playing in a scrabble game
    const clientID = socket.handshake.query.clientID;
    connectedClients[clientID] = socket;

    debugConsole(CATEGORY.CONNECTED, clientID);

    socket.on('disconnect', () => {
        debugConsole(CATEGORY.DISCONNECTED, clientID);
        delete connectedClients[socket.id];
    });

    socket.on('createScrabbleRoom', (data) => {
        const { playerCount } = data;
        createScrabbleRoom(socket, clientID, playerCount);
    });

    socket.on('joinScrabbleRoom', (data) => {
        const { roomCode } = data;
        joinScrabbleRoom(socket, roomCode, clientID);
    });

    socket.on('getScrabbleRoomData', (data) => {
        const { roomCode } = data;
        getScrabbleRoomData(socket, roomCode, clientID);
    });

    socket.on('endTurn', (data) => {
        const { mode, roomCode, points, tilesToSwap, boardState, dock, wordsSubmitted, pointsEarned } = data;
        endTurn(mode, socket, roomCode, clientID, points, tilesToSwap, boardState, dock, wordsSubmitted, pointsEarned);
    });

    socket.on('checkRemainingLetters', (data) => {
        const { roomCode } = data;
        checkRemainingLetters(socket, roomCode);
    });

    socket.on('checkWord', (data) => {
        const { roomCode, words } = data;
        checkWord(socket, roomCode, words);
    });

    socket.on('sendMessage', (data) => {
        const { roomCode, isChat, message, recipients } = data;
        sendMessage(roomCode, clientID, isChat, message, recipients);
    });

    socket.on('generateUsername', (data) => {
        generateUsername();
    });

    socket.on('sendBugReport', (data) => {
        const { roomCode, clientID, message } = data;
        sendBugReport(socket, roomCode, clientID, message);
    });
});

function sendBugReport(socket, roomCode, clientID, message) {
    const signature = arguments.callee.name;
    debugConsole(CATEGORY.FUNCTION, signature);

    try {
        const mailOptions = {
            from: 'raizinoviev@gmail.com',
            to: 'raizinoviev@gmail.com',
            subject: `Bug in game ${roomCode} reported by ${clientID}`,
            text: message
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (err) {
                console.error(err);
            }
        });

        socketEmit(socket, signature, true, { roomCode: roomCode });

        debugConsole(CATEGORY.SUCCESS, signature);
    } catch (err) {
        console.error(err);
        socketEmit(socket, signature, false, { roomCode: roomCode });
    }
}

function generateUsername() {
    const signature = arguments.callee.name;
    debugConsole(CATEGORY.FUNCTION, signature);

    // this generates a random 5-character sequence
    //
    // let sequence = '';
    // for (let i = 0; i < 5; i++) {
    //     const randomIndex = Math.floor(Math.random() * characters.length);
    //     sequence += characters.charAt(randomIndex);
    // }
    // return sequence;

    try {
        const usedIndices = new Set();
        let sequence = '';
        let randomIndex, noun;

        randomIndex = Math.floor(Math.random() * 5);
        if (randomIndex === 1) {
            sequence += 'Chef ';
        }

        do {
            randomIndex = Math.floor(Math.random() * nouns.length);
            noun = nouns[randomIndex];
        } while (usedIndices.has(randomIndex)
        || onlyAloneNouns.includes(noun)
            || onlyLastInSequenceNouns.includes(noun));
        usedIndices.add(randomIndex);

        sequence += `${noun}-`;

        do {
            randomIndex = Math.floor(Math.random() * nouns.length);
            noun = nouns[randomIndex];
        } while (usedIndices.has(randomIndex)
        || onlyAloneNouns.includes(noun)
            || onlyFirstInSequenceNouns.includes(noun));
        usedIndices.add(randomIndex);

        sequence += `${noun}`;

        // sequence += ' ';

        // const randomPrepositionIndex = Math.floor(Math.random() * prepositions.length);
        // const preposition = prepositions[randomPrepositionIndex];

        // do {
        //     randomIndex = Math.floor(Math.random() * nouns.length);
        //     noun = nouns[randomIndex];
        // } while (usedIndices.has(randomIndex)
        // || onlyAloneNouns.includes(noun)
        //     || onlyLastInSequenceNouns.includes(noun));
        // usedIndices.add(randomIndex);

        // sequence += `${noun}-${preposition}-`;

        // do {
        //     randomIndex = Math.floor(Math.random() * nouns.length);
        //     noun = nouns[randomIndex];
        // } while (usedIndices.has(randomIndex)
        // || onlyAloneNouns.includes(noun)
        //     || onlyFirstInSequenceNouns.includes(noun));
        // usedIndices.add(randomIndex);

        // sequence += noun;


        debugConsole(CATEGORY.NONE, `Generated username ${sequence}`);

        debugConsole(CATEGORY.SUCCESS, signature);
        return sequence;
    } catch (err) {
        console.error(err);
    }
}

function checkWord(socket, roomCode, words) {
    const signature = arguments.callee.name;
    debugConsole(CATEGORY.FUNCTION, signature);

    try {
        let isValid = true;

        for (const word of words) {
            if (!dictionary.check(word)) {
                debugConsole(CATEGORY.NONE, `${word} is an invalid word`);
                isValid = false;
                break;
            }
        }

        if (isValid) {
            debugConsole(CATEGORY.NONE, `No invalid words found in list [${words}]`);
        }

        socketEmit(socket, signature, true, {
            roomCode: roomCode,
            isValid: isValid,
            wordList: words
        });
    } catch (err) {
        console.error(err);
        socketEmit(socket, signature, false, { roomCode: roomCode });
    }

    debugConsole(CATEGORY.SUCCESS, signature);
}

async function checkRemainingLetters(socket, roomCode) {
    const signature = arguments.callee.name;
    debugConsole(CATEGORY.FUNCTION, signature);

    try {
        const record = await getRowFromRoomCode(roomCode);

        socketEmit(socket, signature, true, {
            roomCode: roomCode,
            remainingLettersEmpty: (record[KEYS.REMAINING_LETTERS].length === 0)
        });

        debugConsole(CATEGORY.SUCCESS, signature);
    } catch (err) {
        console.error(err);
        socketEmit(socket, signature, false, { roomCode: roomCode });
    }
}

async function createScrabbleRoom(socket, clientID, playerCount) {
    const signature = arguments.callee.name;
    debugConsole(CATEGORY.FUNCTION, signature);

    try {
        const newRoomCode = await generateRoomCode();

        let columns = [KEYS.LAST_MODIFIED, KEYS.ROOM_CODE, KEYS.IP1, KEYS.PLAYER_COUNT, KEYS.WHOSE_TURN];
        let values = ['NOW()', newRoomCode, clientID, playerCount, 1];

        // generate all players' docks as the game starts
        let remainingLetters = DEFAULT_REMAINING_LETTERS;
        for (let i = 1; i <= playerCount; i++) {
            const { newDock, newRemainingLetters } = getDockTiles(remainingLetters, '');

            const dockKey = `dock${i}`;
            columns.push(dockKey);
            // values.push('S,C,R,A,B,B,L,E');
            values.push(newDock);

            remainingLetters = newRemainingLetters;
        }
        columns.push(KEYS.REMAINING_LETTERS);
        values.push(remainingLetters);

        // let columns = [
        //     KEYS.REMAINING_LETTERS,
        //     KEYS.PLAYER_COUNT,
        //     KEYS.WHOSE_TURN,
        //     KEYS.ROOM_CODE,
        //     KEYS.IP1,
        //     KEYS.POINTS1,
        //     KEYS.DOCK1,
        //     KEYS.PASS1,
        //     KEYS.BOARD_STATE
        // ];

        // let values = [
        //     'FFRGDRG',
        //     1,
        //     1,
        //     newRoomCode,
        //     clientID,
        //     381,
        //     'T',
        //     'FALSE',
        //     'TW,.,.,DL,.,.,.,TW,.,.,.,a,s,k,TW,.,DW,.,.,.,TL,.,.,.,TL,.,.,.,DW,.,.,.,DW,.,.,.,DL,.,DL,.,.,.,DW,.,.,DL,.,.,DW,.,.,.,DL,.,.,.,DW,.,.,DL,.,.,.,.,DW,.,.,.,.,.,DW,.,.,.,.,.,TL,.,.,.,TL,.,.,.,TL,.,.,.,TL,.,.,.,DL,.,.,.,DL,.,DL,.,.,.,DL,.,.,TW,.,.,DL,.,.,.,x,.,.,.,DL,.,.,TW,.,.,DL,.,.,.,DL,.,DL,.,.,.,DL,.,.,.,TL,.,.,.,TL,.,.,.,TL,.,.,.,TL,.,.,.,.,.,DW,.,.,.,.,.,DW,.,.,.,.,DL,.,.,DW,.,.,.,DL,.,.,.,DW,.,.,DL,.,.,DW,.,.,.,DL,.,DL,.,.,.,DW,.,.,.,DW,.,.,.,TL,.,.,.,TL,.,.,.,DW,.,TW,.,.,DL,.,.,.,TW,f,a,r,DL,.,.,TW'
        // ];

        const params = {
            columns: columns,
            values: values
        };
        await queryHandlerInstance.insert(params);

        socketEmit(socket, signature, true, {
            roomCode: newRoomCode
        });

        debugConsole(CATEGORY.SUCCESS, signature);
    } catch (err) {
        console.error(err);
        socketEmit(socket, signature, false, {});
    }
}

async function joinScrabbleRoom(socket, roomCode, clientID) {
    const signature = arguments.callee.name;
    debugConsole(CATEGORY.FUNCTION, signature);

    try {
        const record = await getRowFromRoomCode(roomCode);
        if (!record) {
            debugConsole(CATEGORY.NONE, 'Room doesn\'t exist');
            socketEmit(socket, signature, false, {
                message: 'Room doesn\'t exist'
            });
            return;
        }

        const playerNumberTest = getPlayerNumberFromID(clientID, record);
        if (playerNumberTest !== 0) {
            debugConsole(CATEGORY.NONE, `${clientID} is already a player in room ${roomCode}`);
            socketEmit(socket, signature, true, {
                roomCode: roomCode
            });
            debugConsole(CATEGORY.SUCCESS, signature);
            return;
        }

        let nextOpenPosition = KEYS.IP1;
        for (let i = 2; i <= record[KEYS.PLAYER_COUNT]; i++) {
            const key = `ip${i}`;
            if (!record[key]) {
                nextOpenPosition = key;
                break;
            }
        }
        if (nextOpenPosition === KEYS.IP1) {
            debugConsole(CATEGORY.NONE, 'Room is full');
            socketEmit(socket, signature, false, {
                message: 'Room is full'
            });
            return;
        }

        const params = {
            set: [
                { key: nextOpenPosition, value: clientID },
                { key: KEYS.LAST_MODIFIED, value: 'NOW()' }
            ],
            where: [{ key: KEYS.ROOM_CODE, value: roomCode }]
        };
        await queryHandlerInstance.update(params);

        socketEmit(socket, signature, true, {
            roomCode: roomCode
        });

        const recipients = [
            record[KEYS.IP1],
            record[KEYS.IP2],
            record[KEYS.IP3],
            record[KEYS.IP4]
        ];

        sendMessage(roomCode, clientID, false, `${clientID} has joined the room.`, recipients);

        const updatedRecord = await getRowFromRoomCode(roomCode);
        notifyPlayers(signature, clientID, updatedRecord);

        debugConsole(CATEGORY.SUCCESS, signature);
    } catch (err) {
        console.error(err);
        socketEmit(socket, signature, false, { roomCode: roomCode });
    }
}

async function getScrabbleRoomData(socket, roomCode, clientID) {
    const signature = arguments.callee.name;
    debugConsole(CATEGORY.FUNCTION, signature);

    try {
        const record = await getRowFromRoomCode(roomCode);

        const playerNumber = getPlayerNumberFromID(clientID, record);
        if (playerNumber === 0) {
            throw new Error(`Player ${clientID} is not in room ${roomCode}`);
            // ADD PLAYER TO ROOM AND NOTIFY ALL PLAYERS
        }

        const { ipKey, passKey, pointsKey, dockKey } = getKeysFromPlayerNumber(playerNumber);

        const scoreboard = [
            [record[KEYS.IP1], record[KEYS.POINTS1]],
            [record[KEYS.IP2], record[KEYS.POINTS2]],
            [record[KEYS.IP3], record[KEYS.POINTS3]],
            [record[KEYS.IP4], record[KEYS.POINTS4]]
        ];

        const whoseTurn = record[`ip${record[KEYS.WHOSE_TURN]}`];

        socketEmit(socket, signature, true, {
            roomCode: roomCode,
            scoreboard: scoreboard,
            boardState: record[KEYS.BOARD_STATE],
            clientID: clientID,
            dockTiles: record[dockKey],
            turnActive: (playerNumber === record[KEYS.WHOSE_TURN]),
            whoseTurn: whoseTurn
        });

        debugConsole(CATEGORY.SUCCESS, signature);
    } catch (err) {
        console.error(err);
        socketEmit(socket, signature, false, { roomCode: roomCode });
    }
}

async function endTurn(mode, socket, roomCode, clientID, points, tilesToSwap, boardState, dock, wordsSubmitted, pointsEarned) {
    const signature = arguments.callee.name;
    debugConsole(CATEGORY.FUNCTION, signature);

    try {
        const record = await getRowFromRoomCode(roomCode);

        const playerNumber = getPlayerNumberFromID(clientID, record);
        const playerCount = record[KEYS.PLAYER_COUNT];
        const nextPlayerNumber = (playerNumber === playerCount) ? 1 : playerNumber + 1;

        const { ipKey, passKey, pointsKey, dockKey } = getKeysFromPlayerNumber(playerNumber);
        const {
            newPoints,
            newRemainingLetters,
            newPassValue,
            newBoardState,
            newDock
        } = getUpdatedGameData(mode, record, playerNumber, points, tilesToSwap, boardState, dock);

        const params = {
            set: [
                { key: pointsKey, value: newPoints },
                { key: KEYS.BOARD_STATE, value: newBoardState },
                { key: KEYS.REMAINING_LETTERS, value: newRemainingLetters },
                { key: dockKey, value: newDock },
                { key: KEYS.WHOSE_TURN, value: nextPlayerNumber },
                { key: passKey, value: newPassValue },
                { key: KEYS.LAST_MODIFIED, value: 'NOW()' }
            ],
            where: [{ key: KEYS.ROOM_CODE, value: roomCode }]
        };
        await queryHandlerInstance.update(params);

        socketEmit(socket, signature, true, {
            roomCode: roomCode,
            mode: mode
        });

        const recipients = [
            record[KEYS.IP1],
            record[KEYS.IP2],
            record[KEYS.IP3],
            record[KEYS.IP4]
        ];

        // send message notifying players that someone made a move
        let msg = '';
        if (mode === 'submit') {
            msg = `<b>${clientID}</b> submitted "${wordsSubmitted}" for ${pointsEarned} points`;
        } else if (mode === 'pass') {
            msg = `<b>${clientID}</b> passed (0 points)`;
        } else if (mode === 'swap') {
            msg = `<b>${clientID}</b> swapped some letters (0 points)`;
        }
        sendMessage(roomCode, clientID, false, msg, recipients);

        // checking if game should end
        let passValues = [record[KEYS.PASS1], record[KEYS.PASS2], record[KEYS.PASS3], record[KEYS.PASS4]];
        passValues[playerNumber - 1] = newPassValue === 'TRUE';

        const end = passValues.slice(0, playerCount).every(value => value);

        if (end || (newDock.length === 0 && newRemainingLetters.length === 0)) {
            debugConsole(CATEGORY.NONE, 'Turn has ended the game');
            endGame(roomCode, clientID);
            return;
        }

        const notifyRecord = await getRowFromRoomCode(roomCode);
        notifyPlayers(signature, clientID, notifyRecord);

        debugConsole(CATEGORY.SUCCESS, signature);
    } catch (err) {
        console.error(err);
        socketEmit(socket, signature, false, {
            roomCode: roomCode,
            mode: mode
        });
    }
}

async function endGame(roomCode, clientID) {
    const signature = arguments.callee.name;
    debugConsole(CATEGORY.FUNCTION, signature);

    try {
        const record = await getRowFromRoomCode(roomCode);

        const backupPoints = [record[KEYS.POINTS1], record[KEYS.POINTS2], record[KEYS.POINTS3], record[KEYS.POINTS4]];
        const points = [record[KEYS.POINTS1], record[KEYS.POINTS2], record[KEYS.POINTS3], record[KEYS.POINTS4]];
        const ips = [record[KEYS.IP1], record[KEYS.IP2], record[KEYS.IP3], record[KEYS.IP4]];
        const docks = [record[KEYS.DOCK1], record[KEYS.DOCK2], record[KEYS.DOCK3], record[KEYS.DOCK4]];
        const playerCount = record[KEYS.PLAYER_COUNT];

        // subtract unplayed letters from players' scores
        let unplayedLetters = 0;
        // let subtractedPoints = [0, 0, 0, 0];
        for (let i = 0; i < playerCount; i++) {
            if (record[KEYS[`IP${i + 1}`]] !== '') {
                const dock = record[KEYS[`DOCK${i + 1}`]];
                if (dock) {
                    const dockTiles = record[KEYS[`DOCK${i + 1}`]].split(',');
                    for (const letter of dockTiles) {
                        const pointValue = TILE_POINT_VALUES[letter];
                        points[i] -= pointValue;
                        // subtractedPoints[i] -= pointValue;
                        unplayedLetters += pointValue;
                    }
                }
            }
        }

        // add sum of unplayed letters to players' scores if they used all of their tiles
        for (let i = 0; i < playerCount; i++) {
            if (record[KEYS[`IP${i + 1}`]] !== '') {
                const dock = record[KEYS[`DOCK${i + 1}`]];
                if (!dock) {
                    points[i] += unplayedLetters;
                }
            }
        }

        let uniqueValues = new Set();
        let tied = false;
        for (let i = 0; i < playerCount; i++) {
            if (uniqueValues.has(points[i])) {
                tied = true;
                break;
            }
            uniqueValues.add(points[i]);
        }

        let winner = -1;
        let highestPoints = -1;
        for (let i = 0; i < playerCount; i++) {
            if (tied) {
                if (backupPoints[i] > highestPoints) {
                    highestPoints = backupPoints[i];
                    winner = i;
                }
            }
            else {
                if (points[i] > highestPoints) {
                    highestPoints = points[i];
                    winner = i;
                }
            }
        }
        winner++;

        // making a new "updated" record for notifyPlayers to use
        const dummyRecord = {
            [KEYS.ROOM_CODE]: roomCode,
            [KEYS.BOARD_STATE]: record[KEYS.BOARD_STATE],
            [KEYS.PLAYER_COUNT]: record[KEYS.PLAYER_COUNT],
            [KEYS.POINTS1]: tied ? backupPoints[0] : points[0],
            [KEYS.POINTS2]: tied ? backupPoints[1] : points[1],
            [KEYS.POINTS3]: tied ? backupPoints[2] : points[2],
            [KEYS.POINTS4]: tied ? backupPoints[3] : points[3],
            [KEYS.IP1]: record[KEYS.IP1],
            [KEYS.IP2]: record[KEYS.IP2],
            [KEYS.IP3]: record[KEYS.IP3],
            [KEYS.IP4]: record[KEYS.IP4],
            winner_name: record[KEYS[`IP${winner}`]],
            winner_points: highestPoints,
            // subtractedPoints1: tied ? 0 : subtractedPoints[0],
            // subtractedPoints2: tied ? 0 : subtractedPoints[1],
            // subtractedPoints3: tied ? 0 : subtractedPoints[2],
            // subtractedPoints4: tied ? 0 : subtractedPoints[3]
        };

        const deleteParams = { where: [{ key: KEYS.ROOM_CODE, value: roomCode }] };
        await queryHandlerInstance.delete(deleteParams);

        const recipients = [
            dummyRecord[KEYS.IP1],
            dummyRecord[KEYS.IP2],
            dummyRecord[KEYS.IP3],
            dummyRecord[KEYS.IP4]
        ];

        let msg = `The game has ended and ${record[KEYS[`IP${winner}`]]} has won!`;
        for (let i = 0; i < playerCount; i++) {
            if (ips[i] !== '') {
                msg += '<br><br>';
                if (docks[i].length === 0) {
                    msg += `<b>${ips[i]}</b> ended the game with <b>no tiles</b>`;
                }
                else {
                    msg += `<b>${ips[i]}</b> ended the game with <b>"${docks[i].replace(',', ', ')}"</b>`;
                }
            }
        }
        msg += '<br><br>';
        msg += '<div id="end_game_gif"></div>';
        msg += '<br>';
        msg += 'You can still send messages, but the room is gone forever once you leave.';

        sendMessage(roomCode, clientID, false, msg, recipients);

        notifyPlayers(signature, clientID, dummyRecord);

        debugConsole(CATEGORY.SUCCESS, signature);
    } catch (err) {
        console.error(err);
        // no response here because there's no one socket associated
    }
}

async function notifyPlayers(mode, clientID, record) {
    const signature = arguments.callee.name;
    debugConsole(CATEGORY.FUNCTION, signature);

    debugConsole(CATEGORY.NONE, record[KEYS.ROOM_CODE]);
    try {
        const scoreboard = [
            [record[KEYS.IP1], record[KEYS.POINTS1]],
            [record[KEYS.IP2], record[KEYS.POINTS2]],
            [record[KEYS.IP3], record[KEYS.POINTS3]],
            [record[KEYS.IP4], record[KEYS.POINTS4]]
        ];

        for (let i = 1; i <= record[KEYS.PLAYER_COUNT]; i++) {
            const { ipKey, passKey, pointsKey, dockKey } = getKeysFromPlayerNumber(i);
            const ip = record[ipKey];

            if (!ip || ip.includes('test')) {
                continue;
            }

            const socket = connectedClients[ip];
            if (socket) {
                debugConsole(CATEGORY.NONE, `Notfying next player with ID ${ip}`);
                if (mode === 'endGame') {
                    socketEmit(socket, mode, true, {
                        roomCode: record[KEYS.ROOM_CODE],
                        scoreboard: scoreboard,
                        boardState: record[KEYS.BOARD_STATE],
                        clientID: clientID,
                        winner_name: record['winner_name'],
                        winner_points: record['winner_points'],
                        // subtractedPoints1: record['subtractedPoints1'],
                        // subtractedPoints2: record['subtractedPoints2'],
                        // subtractedPoints3: record['subtractedPoints3'],
                        // subtractedPoints4: record['subtractedPoints4'],
                    });
                }
                else if (mode === 'joinScrabbleRoom') {
                    socketEmit(socket, `${mode}Secondary`, true, {
                        roomCode: record[KEYS.ROOM_CODE],
                        scoreboard: scoreboard,
                        whoseTurn: record[`ip${record[KEYS.WHOSE_TURN]}`]
                    });
                }
                else {
                    debugConsole(CATEGORY.NONE, record[KEYS.ROOM_CODE]);
                    getScrabbleRoomData(socket, record[KEYS.ROOM_CODE], ip);
                }
            }
            else {
                throw new Error('Socket was null');
            }
        }

        debugConsole(CATEGORY.SUCCESS, signature);
    } catch (err) {
        console.error(err);
        // no response here because there's no one socket associated
    }
}

async function sendMessage(roomCode, clientID, isChat, message, recipients) {
    const signature = arguments.callee.name;
    debugConsole(CATEGORY.FUNCTION, signature);

    try {
        if (recipients.length === 0) {
            const record = await getRowFromRoomCode(roomCode);
            recipients = [
                record[KEYS.IP1],
                record[KEYS.IP2],
                record[KEYS.IP3],
                record[KEYS.IP4]
            ];
        }

        for (const ip of recipients) {
            if (!ip) {
                continue;
            }

            const socket = connectedClients[ip];
            if (socket) {
                debugConsole(CATEGORY.NONE, `Sending message "${message}"`);
                debugConsole(CATEGORY.NONE, `Recipient player ID: ${ip}`);

                socketEmit(socket, signature, true, {
                    roomCode: roomCode,
                    isChat: isChat,
                    sender: clientID,
                    message: message
                });
            }
        }

        debugConsole(CATEGORY.SUCCESS, signature);
    } catch (err) {
        console.error(err);
        // no response here because there's no one socket associated
    }
}

async function deleteOldRecords() {
    const signature = arguments.callee.name;
    debugConsole(CATEGORY.FUNCTION, signature);

    try {
        const params = { where: [{ key: `${KEYS.LAST_MODIFIED}<`, value: `NOW() - INTERVAL '2 days'`, type: 'SQL' }] };
        const rows = await queryHandlerInstance.delete(params);

        debugConsole(CATEGORY.NONE, `Deleted ${rows.length} records`);

        debugConsole(CATEGORY.SUCCESS, signature);
    } catch (err) {
        console.error(err);
    }
}

// HELPER METHODS

function socketEmit(socket, signature, success, data) {
    socket.emit(`${signature}Response`, {
        success: success,
        signature: signature,
        data: data
    });
}

async function generateRoomCode() {
    const signature = arguments.callee.name;
    debugConsole(CATEGORY.FUNCTION, signature);

    try {
        while (true) {
            let roomCode = '';

            for (let i = 0; i < 5; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                roomCode += characters.charAt(randomIndex);
            }

            const record = getRowFromRoomCode(roomCode);

            if (!record.rows) {
                debugConsole(CATEGORY.SUCCESS, signature);
                return roomCode;
            } else {
                debugConsole(CATEGORY.NONE, `roomCode ${roomCode} was not unique. Trying again...`);
            }
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function getRowFromRoomCode(roomCode) {
    const signature = arguments.callee.name;
    debugConsole(CATEGORY.FUNCTION, signature);

    try {
        const params = { where: [{ key: KEYS.ROOM_CODE, value: roomCode }] };
        const result = await queryHandlerInstance.select(params);

        debugConsole(CATEGORY.SUCCESS, signature);
        // query only ever returns one row since roomCode is unique
        return result[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}

function getPlayerNumberFromID(clientID, record) {
    const ips = [record[KEYS.IP1], record[KEYS.IP2], record[KEYS.IP3], record[KEYS.IP4]];
    return ips.indexOf(clientID) + 1;
}

function getDockTiles(remainingLetters, currentDockTiles) {
    const signature = arguments.callee.name;
    debugConsole(CATEGORY.FUNCTION, signature);

    let dockTilesArray = (currentDockTiles ? currentDockTiles.split(',') : []);

    while (remainingLetters.length > 0 && dockTilesArray.length < 7) {
        const randomIndex = Math.floor(Math.random() * remainingLetters.length);
        const letter = remainingLetters.charAt(randomIndex);

        dockTilesArray.push(letter);

        // remove the letter from remainingLetters
        remainingLetters = remainingLetters.slice(0, randomIndex) + remainingLetters.slice(randomIndex + 1);
    }

    debugConsole(CATEGORY.SUCCESS, signature);
    return { newRemainingLetters: remainingLetters, newDock: dockTilesArray.join(',') };
}

function getKeysFromPlayerNumber(playerNumber) {
    return {
        ipKey: `ip${playerNumber}`,
        passKey: `pass${playerNumber}`,
        pointsKey: `points${playerNumber}`,
        dockKey: `dock${playerNumber}`
    };
}

function getUpdatedGameData(mode, record, playerNumber, points, tilesToSwap, boardState, dock) {
    const signature = arguments.callee.name;
    debugConsole(CATEGORY.FUNCTION, signature);

    const { ipKey, passKey, pointsKey, dockKey } = getKeysFromPlayerNumber(playerNumber);

    // updating points if submitting
    const newPoints = (mode === 'submit') ? points : record[pointsKey];

    // adding tiles back in if swapping
    const tempRemainingLetters = (mode === 'swap') ? (record[KEYS.REMAINING_LETTERS] + tilesToSwap) : record[KEYS.REMAINING_LETTERS];
    // then getting updated dock and remaining letters
    const { newDock, newRemainingLetters } = getDockTiles(tempRemainingLetters, dock);

    // updating pass value for player if passing, but only if there's no remaining letters
    const newPassValue = (mode === 'pass') ? (newRemainingLetters === '' ? 'TRUE' : 'FALSE') : 'FALSE';

    // updating board state if submitting
    const newBoardState = (mode === 'submit') ? boardState : record[KEYS.BOARD_STATE];

    debugConsole(CATEGORY.SUCCESS, signature);
    return {
        newPoints: newPoints,
        newRemainingLetters: newRemainingLetters,
        newPassValue: newPassValue,
        newBoardState: newBoardState,
        newDock: newDock
    };
}

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => { console.log(`Server is running at http://localhost:${PORT}`); });
