'use strict';

const env = process.env;

const GetENVCondition = () => {
    const multiCoreEnabled = env.ENABLE_MULTI_CORE === 'true';
    const watchdogEnabled = env.ENABLE_WATCHDOG === 'true';

    if (multiCoreEnabled && watchdogEnabled) {
        return 'MULTICORE_ON_AND_WATCHDOG_ON';
    } else if (multiCoreEnabled) {
        return 'MULTICORE_ON_AND_WATCHDOG_OFF';
    } else if (watchdogEnabled) {
        return 'MULTICORE_OFF_AND_WATCHDOG_ON';
    } else {
        return 'MULTICORE_OFF_AND_WATCHDOG_OFF';
    }
};

module.exports = GetENVCondition;