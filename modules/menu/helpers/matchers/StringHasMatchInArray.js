'use strict';
const matchString = require('./StringMatches.js');

const StringHasMatchInArray = (stringArray, regex) => {
    let result = false;
    stringArray.forEach(string => {
        if (matchString(string, regex)) {
            result = true;
        }
    });
    return result;
};

module.exports = StringHasMatchInArray;