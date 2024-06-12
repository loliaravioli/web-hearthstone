export const handleSocketResponse = ({ socket, event, success, failure = () => {} }) => {
    socket.on(event, (response) => {
        const { success, signature, data } = response;

        console.log(success ? 'SUCCESS' : 'FAIL', signature);

        if (!success) {
            failure(data);
            return;
        }

        if (typeof successHandler === 'function') {
            success(data);
        }
    });
};


/* EXAMPLE USAGE:

handleSocketResponse({
    socket: socket,
    event: 'getHandResponse',
    success: (data) => {
        // Handle success
    },
    failure: (data) =>  {
        // Handle failure
        // silently returns by default
    }
});

*/