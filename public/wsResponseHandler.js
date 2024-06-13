const eventHandlers = {};

export const handleWSResponse = ({ socket, event, onSuccess, onFailure = () => { } }) => {
    if (typeof onSuccess != 'function') {
        console.error(`${event} onSuccess clause must be a function`);
        return;
    }

    if (!eventHandlers[event]) {
        eventHandlers[event] = [];
    }

    eventHandlers[event].push({ onSuccess, onFailure });

    socket.addEventListener('message', (evt) => {
        const { signature, success, data } = JSON.parse(evt.data);

        if (event != signature) { return; } // not the right instance of handleWSResponse for this signature

        if (!eventHandlers[signature]) { return; } // no handlers specified for the signature

        eventHandlers[signature].forEach(handler => {
            console.log(success ? 'SUCCESS' : 'FAIL', signature);

            if (success) {
                handler.onSuccess(data);
            } else {
                handler.onFailure(data);
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