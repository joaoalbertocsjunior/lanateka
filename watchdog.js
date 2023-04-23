'use strict';
const run = require('./index.js')

let retries = 0;

const watchdog = (maxRetries = 4) => {
    console.log('Starting watchdog...');
    console.log(`Attempt ${retries + 1}`);
    setTimeout(() => {
        try {
            run();
            retries = 0;
        } catch (err) {
            console.log(err);
            ++retries;
            if (retries <= maxRetries) {
                watchdog(run());
            }
        };
    }, 3000);
};

module.exports = watchdog;


