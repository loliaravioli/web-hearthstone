export const handleSocketResponse = (socket, eventName, successHandler, failureHandler = () => { }) => {
    socket.on(eventName, (response) => {
        const { success, signature, data } = response;

        console.log(success ? 'SUCCESS' : 'FAIL', signature);

        if (!success) {
            failureHandler(response);
            return;
        }

        if (typeof successHandler === 'function') {
            successHandler(data);
        }
    });
};

// EXAMPLE USAGE:

/*
handleSocketResponse(socket, 'getHandResponse',
    (data) => {
        // SUCCESS CONDITION
    },
    (response) => {
        // FAILURE CONDITION
        // SILENTLY RETURNS BY DEFAULT
    }
);
*/