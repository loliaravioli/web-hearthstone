/* SSL/non-SSL example with async/await functions */

async function processMessage(text, ws) {
    // Simulating an asynchronous operation (e.g., database call, file I/O)
    return new Promise((resolve) => {
        setTimeout(() => {
            ws.send(text);
            console.log('Echoed message back to client:', text);
            resolve();
        }, 1 * 1000); // 1 second delay for demonstration
    });
}

const uWS = require('uWebSockets.js'), /* or require('../dist/uws.js') ? */
    app = uWS.App(),
    PORT = 9001;

app./*SSL*/App({
    key_file_name: 'misc/key.pem',
    cert_file_name: 'misc/cert.pem',
    passphrase: '1234'
}).ws('/*', {
    open: (ws) => {
        console.log('A WebSocket connection has been opened!');
    },

    message: async (ws, message, isBinary) => {
        const receivedText = new TextDecoder().decode(message);
        console.log('Received message:', receivedText);

        // Asynchronously echo the message back to the client
        await processMessage(receivedText, ws);
    },

    close: (ws, code, message) => {
        console.log('A WebSocket connection has been closed');
    }
}).listen(PORT, (token) => {
    if (token) {
        console.log('Listening to port ' + PORT);
    } else {
        console.log('Failed to listen to port ' + PORT);
    }
});



// TODO: try using this instead of express?
// try using C++ backend to have better performance than node.js
// const { App } = require('uWebSockets.js');
// const { Server } = require('socket.io');

// const app = new App();
// const io = new Server();

// io.attachApp(app);

// io.on("connection", (socket) => {
//     // ...
// });

// app.listen(3000, (token) => {
//     if (!token) {
//         console.warn("port already in use");
//     }
// });