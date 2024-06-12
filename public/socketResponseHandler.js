export const handleSocketResponse = (socket, eventName, successHandler, failureHandler = () => { }) => {
    socket.on(eventName, (response) => {
        const { success, signature, data } = response;

        console.log(success ? 'SUCCESS' : 'FAIL', signature);

        if (!success) {
            failureHandler(data);
            return;
        }

        if (typeof successHandler === 'function') {
            successHandler(data);
        }
    });
};


/* EXAMPLE USAGE:

handleSocketResponse(socket, 'getHandResponse',
    (data) => {
        // SUCCESS CONDITION
    },
    (data) => {
        // FAILURE CONDITION
        // SILENTLY RETURNS BY DEFAULT
    }
);

*/