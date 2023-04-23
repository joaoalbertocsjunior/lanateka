'use strict';
require('dotenv').config();

const GetENVCondition = require('./modules/start/GetENVCondition.js');
const { ENVHandlers, DefaultHandler } = require('./modules/start/ENVHandlers.js');


const start = (envCondition) => {
    console.log(`Starting process with PID ${process.pid}...`);
    const handler = ENVHandlers[envCondition];
    if (handler) {
        console.log('Applying handler:')
        handler();
    } else {
        console.error(`No handler found for ${envCondition}`);
        console.log('Applying default handler...');
        DefaultHandler();
    }
};

start(GetENVCondition());