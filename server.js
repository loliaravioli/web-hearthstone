const uWS = require('uWebSockets.js');
// const { v4: uuidv4 } = require('uuid');
const mime = require('mime-types');
const fs = require('fs');
const path = require('path');
const staticDir = path.join(__dirname, '/public');
const { processEvent } = require('./server/wsEvents.js');

// const clients = new Map();

const port = process.env.PORT || 5500;
uWS.App({
    key_file_name: 'misc/key.pem',
    cert_file_name: 'misc/cert.pem',
    passphrase: '1234'
}).any('/*', async (res, req) => { // serving static files via HTTP
    res.onAborted(() => {
        res.aborted = true;
        console.warn('Request was aborted by the client');
    });

    const filePath = path.join(staticDir, req.getUrl() == '/' ? '/index.html' : req.getUrl());
    fs.readFile(filePath, (err, data) => {
        if (res.aborted) { return; }

        res.cork(() => {
            res.writeStatus(err ? '404 Not Found' : '200 OK')
                .writeHeader('Content-Type', err ? 'text/plain' : mime.lookup(filePath))
                .end(err ? 'File Not Found' : data);
        });
    });
}).ws('/*', { // websocket connections
    compression: uWS.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 10,

    open: (ws) => {
        // const id = uuidv4();
        // ws.id = id;
        // clients.set(id, ws);
        // console.log(`Client connected: ${id}`);
        console.log('Client connected');
    },

    close: (ws, code, message) => {
        // clients.delete(ws.id);
        // console.log(`Client disconnected: ${ws.id}`);
        console.log('Client disconnected with code', code);
    },

    message: async (ws, message, isBinary) => {
        const msg = Buffer.from(message).toString();
        console.log('Received message:', msg);

        let parsedMessage;
        try {
            parsedMessage = JSON.parse(msg);
        } catch (error) {
            console.error('Invalid JSON');
            return;
        }

        processEvent(ws, parsedMessage);
    }
}).listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


// CHANNEL CODE
// may or may not be useful. above code currently manages single-client connection

// const channels = new Map();

// function joinChannel(channelName, ws) {
//     if (!channels.has(channelName)) {
//         channels.set(channelName, new Set());
//     }
//     const channel = channels.get(channelName);
//     channel.add(ws);
// }

// function leaveChannel(channelName, ws) {
//     const channel = channels.get(channelName);
//     if (channel) {
//         channel.delete(ws);
//         if (channel.size === 0) {
//             channels.delete(channelName);
//         }
//     }
// }

// function broadcastToChannel(channelName, message) {
//     const channel = channels.get(channelName);
//     if (channel) {
//         channel.forEach(ws => {
//             ws.send(message);
//         });
//     }
// }

// app.ws('/*', {
//     open: (ws) => {
//         const id = uuidv4();
//         ws.id = id;
//         clients.set(id, ws);
//         console.log(`Client connected: ${id}`);
//     },
//     close: (ws) => {
//         clients.delete(ws.id);
//         console.log(`Client disconnected: ${ws.id}`);

//         // Remove from all channels
//         channels.forEach((channel, channelName) => {
//             leaveChannel(channelName, ws);
//         });
//     },
//     message: (ws, message, isBinary) => {
//         const receivedMessage = Buffer.from(message).toString();
//         console.log(`Received message from ${ws.id}: ${receivedMessage}`);

//         // Example of handling join and leave commands
//         const parsedMessage = JSON.parse(receivedMessage);
//         const { command, channel } = parsedMessage;

//         if (command === 'join') {
//             joinChannel(channel, ws);
//             console.log(`Client ${ws.id} joined channel ${channel}`);
//         } else if (command === 'leave') {
//             leaveChannel(channel, ws);
//             console.log(`Client ${ws.id} left channel ${channel}`);
//         } else if (command === 'broadcast') {
//             const { message } = parsedMessage;
//             broadcastToChannel(channel, message);
//             console.log(`Broadcasted message to channel ${channel}: ${message}`);
//         }
//     }
// });