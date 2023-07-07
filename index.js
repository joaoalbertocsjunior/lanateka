'use strict';

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const WhatsAppClient = require('./modules/core/Client.js');
const Main = require('./modules/core/Main.js');
let client = new WhatsAppClient(io).getInstance();

function run() {
    app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io/client-dist/'));
    app.use(express.static('public'));

    let serverPath, filePath;

    app.get('/', (req, res) => {
        filePath = path.join(__dirname, '/public/index.html');
    });

    const PORT = process.env.PORT || 3000;
    const HOST = process.env.ADDRESS || '0.0.0.0';

    server.listen(PORT, HOST, () => {
        if (process.env.REMOTE_HOST === 'true') {
            serverPath = process.env.REMOTE_HOST_URL_ADDRESS;
        } else {
            serverPath = `http://${HOST}:${PORT}`;
        };
        console.log(`Server running at ${serverPath}`);
    });

    const connectionHandler = () => {
        console.log('IO socket connected!');
        client.once('ready', readyHandler);
    };

    const readyHandler = () => {
        console.log('Client ready!');
        Main(client, io, serverPath, filePath);
        client.removeListener('ready', readyHandler);
        io.removeListener('connection', connectionHandler);
    };

    io.once('connection', connectionHandler);

    if (client) {
        client.on('disconnected', (reason) => {
            console.log('Client disconnected due to reason: ' + reason);
            client.destroy();
            client = null;
            if (!client) {
                client = new WhatsAppClient(io).getInstance();
                // client.once('ready', readyHandler);
                io.once('connection', connectionHandler);
            };
        });
    };
};

module.exports = run;