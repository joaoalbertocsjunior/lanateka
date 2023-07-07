'use strict';

const StringMatches = require("../../helpers/matchers/StringMatches.js");
const StringHasMatchInArray = require("../../helpers/matchers/StringHasMatchInArray.js");

const QueryObject = require('../../../../database/QueryObject.js');
const MenuQuery = QueryObject.MenuModel.operations;

const mainMenuConditions = (params) => {
    const { messages, breakpoint, script, normalized, msg, onLinkToQr, mainMenuCondition, data, contactNumber } = params;
    let result;
    let hasMessages, matchesMainMenuKeywords, matchesWelcomeMessage;
    hasMessages = messages.length <= 2;
    matchesMainMenuKeywords = StringHasMatchInArray(script.keywords, normalized);
    matchesWelcomeMessage = StringMatches(msg.body, onLinkToQr);
    result = mainMenuCondition || hasMessages || breakpoint || matchesMainMenuKeywords || matchesWelcomeMessage;
    if (data.firstMessage) {
        return MenuQuery.findOneAndUpdate({ phone: contactNumber }, { firstMessage: false }, { upsert: true, new: true }).then((session) => {
            return true;
        }).catch((err) => { console.log(err); });
    };
    return result;
};

module.exports = mainMenuConditions;