'use strict';

const verifyOptionsCondition = (params) => {
    const { serverLastMessage, configurations } = params;
    let result;
    if (serverLastMessage) {
        result = serverLastMessage.body === configurations.verifyMessage;
        return result;
    };
    return false;
};

module.exports = verifyOptionsCondition;