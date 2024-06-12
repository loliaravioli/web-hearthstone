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

    // programmatically connects events to their respective function
    // each event should be named the same as the function
    // e.g. the event 'getHand' will trigger the function getHand()
    // each function should also have the same parameters
    Object.keys(functions).forEach(eventName => {
        socket.on(eventName, (data) => {
            functions[eventName](socket, clientID, data);
        });
    });
});
