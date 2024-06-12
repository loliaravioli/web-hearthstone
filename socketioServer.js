const App = require('./uWebSocketsApp.js');
const { Server } = require('socket.io');

class socketioServer {
    constructor() {
        this.io = new Server();
        this.io.attachApp(App);

        this.connectedClients = {};
        this.io.on('connection', (socket) => {
            const clientID = 'XXXXX'; // socket.handshake.query.clientID
            this.connectedClients[clientID] = socket;

            console.log(clientID, 'connected');

            socket.on('disconnect', () => {
                console.log(clientID, 'disconnected');
                delete this.connectedClients[socket.id];
            });
        });
    }
}

module.exports = new socketioServer().io;