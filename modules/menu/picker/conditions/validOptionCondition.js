'use strict';

const GetScope = require("../../helpers/scopes/GetScope.js");
const StringToInt = require("../../helpers/parsers/StringToInt.js");

const validOptionCondition = (params) => {
    const { msg, script, data } = params;
    let result;
    let messageToInt, menuScope, scopeOptionsSize;
    messageToInt = StringToInt(msg.body);
    if (data?.menu) {
        menuScope = GetScope(script, data.menu);
        scopeOptionsSize = menuScope.options.length;
    } else {
        scopeOptionsSize = undefined;
    };
    result = ((messageToInt <= scopeOptionsSize) && (messageToInt > 0));
    return result;
};

module.exports = validOptionCondition;