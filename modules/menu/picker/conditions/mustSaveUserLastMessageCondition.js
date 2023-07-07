'use strict';

const GetScope = require("../../helpers/scopes/GetScope.js");

const mustSaveUserLastMessageCondition = (params) => {
    const { script, serverLastMessage } = params;
    let result;
    if (serverLastMessage) {
        result = GetScope(script, serverLastMessage.body)?.save ? true : false;
        return result;
    };
    return false;
};

module.exports = mustSaveUserLastMessageCondition;