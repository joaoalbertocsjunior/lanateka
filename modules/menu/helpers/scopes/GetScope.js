'use strict';

const MenuBuilder = require('../core/MenuBuilder.js');
const IsArray = require('../matchers/IsArray.js');

const GetScope = (obj, valueToMatch, keyNameToSkip, parentObj) => {
    parentObj = parentObj || obj;
    keyNameToSkip = keyNameToSkip || "keywords";

    if (obj?.options) {
        if (valueToMatch === MenuBuilder(obj)) {
            return obj;
        }
        return GetScope(obj.options, valueToMatch, keyNameToSkip, obj.options);
    } else if (typeof obj === 'string') {
        if (obj === valueToMatch) {
            return parentObj;
        }
    } else if (IsArray(obj) && keyNameToSkip !== "keywords") {
        for (let i = 0; i < obj.length; i++) {
            const match = GetScope(obj[i], valueToMatch, keyNameToSkip, obj);
            if (match) {
                return match;
            }
        }
    } else if (typeof obj === 'object') {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key) && key !== keyNameToSkip) {
                const match = GetScope(obj[key], valueToMatch, keyNameToSkip, obj);
                if (match) {
                    return match;
                }
            }
        }
    }
}

module.exports = GetScope;