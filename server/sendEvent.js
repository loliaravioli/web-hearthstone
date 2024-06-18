function sendEvent(ws, event, success, data) {
    ws.send(JSON.stringify({
        signature: event,
        success: success,
        data: data
    }));
}

module.exports = { sendEvent };