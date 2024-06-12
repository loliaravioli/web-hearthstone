export const handleSocketResponse = ({ socket, event, onSuccess, onFailure = () => {} }) => {
    socket.on(event, (response) => {
        const { success, signature, data } = response;

        console.log(success ? 'SUCCESS' : 'FAIL', signature);

        if (!success) {
            onFailure(data);
            return;
        }

        if (typeof onSuccess === 'function') {
            onSuccess(data);
        }
    });
};


/* EXAMPLE USAGE:

handleSocketResponse({
    socket: socket,
    event: 'getHandResponse',
    onSuccess: (data) => {
        // Handle success
    },
    onFailure: (data) =>  {
        // Handle failure
        // silently returns by default
    }
});

*/