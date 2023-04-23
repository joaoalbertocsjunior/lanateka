'use strict';

const GetScope = require('../../helpers/scopes/GetScope.js');

const serverLastMessageIsNotificationCondition = (params) => {
    const { script, serverLastMessage } = params;
    let result;
    if (serverLastMessage) {
        result = GetScope(script, serverLastMessage.body)?.notification ? true : false;
        return result;
    };
    return false;
};

module.exports = serverLastMessageIsNotificationCondition;