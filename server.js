const app = require('./uWebSocketsApp.js');
const { Server } = require('socket.io');

const functions = require('./socketFunctions.js');

const io = new Server();
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
        functions.getHand(socket, clientID);
    });
});
