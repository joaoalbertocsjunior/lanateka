'use strict';

const TimestampHasReachBreakpoint = (params) => {
    const { messages, msg, threshold } = params;
    let timeDifference, result;
    if (messages) {
        timeDifference = (msg.timestamp - messages[messages.length - 2].timestamp);
        timeDifference = Math.floor(timeDifference / 60);
        result = timeDifference >= threshold;
        return result;
    };
    return false;
};

module.exports = TimestampHasReachBreakpoint;