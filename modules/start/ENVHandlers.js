'use strict';

const run = require('../../index.js');
const watchdog = require('../../watchdog.js');
const throng = require('throng');

let WORKERS = process.env.WEB_CONCURRENCY || 1;

const ENVHandlers = {
    'MULTICORE_ON_AND_WATCHDOG_ON': () => {
        // Handle case where multicore is enabled and watchdog is enabled
        console.log('MULTICORE_ON_AND_WATCHDOG_ON');
        console.log(`Starting process with ${process.env.WEB_CONCURRENCY} cores and ${process.env.WEB_MEMORY}MB of memory allocated.`);
        throng({
            worker: watchdog,
            count: WORKERS,
            lifetime: Infinity,
        });
    },
    'MULTICORE_ON_AND_WATCHDOG_OFF': () => {
        // Handle case where multicore is enabled and watchdog is disabled
        console.log('MULTICORE_ON_AND_WATCHDOG_OFF');
        console.log(`Starting process with ${process.env.WEB_CONCURRENCY} cores and ${process.env.WEB_MEMORY}MB of memory allocated.`);
        throng({
            worker: run,
            count: WORKERS,
            lifetime: Infinity,
        });
    },
    'MULTICORE_OFF_AND_WATCHDOG_ON': () => {
        // Handle case where multicore is disabled and watchdog is enabled
        console.log('MULTICORE_OFF_AND_WATCHDOG_ON');
        watchdog();
    },
    'MULTICORE_OFF_AND_WATCHDOG_OFF': () => {
        // Handle case where multicore is disabled and watchdog is disabled
        console.log('MULTICORE_OFF_AND_WATCHDOG_ON');
        run();
    }
};

const DefaultHandler = ENVHandlers['MULTICORE_ON_AND_WATCHDOG_OFF'];

module.exports = {
    ENVHandlers,
    DefaultHandler
};