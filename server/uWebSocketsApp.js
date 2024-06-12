
const { App } = require('uWebSockets.js');
const mime = require('mime-types');
const fs = require('fs');
const path = require('path');
const staticDir = path.join(__dirname, '../public');

class uWebSocketsApp {
    constructor() {
        this.app = new App();
        this.port = process.env.PORT || 5500;
        this.app.any('/*', async (res, req) => {
            const filePath = path.join(staticDir, req.getUrl() == '/' ? '/index.html' : req.getUrl());
        
            res.onAborted(() => { console.warn('Request was aborted by the client'); });
        
            fs.readFile(filePath, (err, data) => {
                if (res.aborted) { return; }
        
                res.cork(() => {
                    res.writeStatus(err ? '404 Not Found' : '200 OK')
                        .writeHeader('Content-Type', err ? 'text/plain' : mime.lookup(filePath))
                        .end(err ? 'File Not Found' : data);
                });
            });
        }).listen(this.port, () => { console.log(`Server is running at http://localhost:${this.port}`); });
    }
}

module.exports = new uWebSocketsApp().app;