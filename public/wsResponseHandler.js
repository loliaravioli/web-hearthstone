const eventHandlers = {};

export const handleWSResponse = ({ socket, event, onSuccess, onFailure = () => { } }) => {
    if (!eventHandlers[event]) {
        eventHandlers[event] = [];
    }
    
    eventHandlers[event].push({ onSuccess, onFailure });

    socket.addEventListener('message', (evt) => {
        const message = JSON.parse(evt.data);
        const { command, success, data } = message;

        if (!eventHandlers[command]) { return; }

        eventHandlers[command].forEach(handler => {
            console.log(success ? 'SUCCESS' : 'FAIL', command);

            if (!success) {
                handler.onFailure(data);
            } else if (typeof handler.onSuccess === 'function') {
                handler.onSuccess(data);
            }
        });
    });
};



/* EXAMPLE USAGE:

handleWSResponse({
    socket: socket,
    event: 'getHandResponse',
    onSuccess: (data) => {
        // Handle success
    },
    onFailure: (data) =>  {
        // Handle failure
        // Silently returns by default
    }
});

*/