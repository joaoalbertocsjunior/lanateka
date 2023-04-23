'use strict';

const IsArray = require('../matchers/IsArray.js');

const GetParentObject = (jsonObj, targetObj, parentObj = null, parentKey = null) => {
    for (let key in jsonObj) {
        if (jsonObj[key] === targetObj) {
            if (IsArray(parentObj)) {
                const index = parentObj.indexOf(targetObj);
                return { parent: parentObj, index: index };
            } else {
                return parentObj;
            }
        } else if (typeof jsonObj[key] === 'object') {
            const result = GetParentObject(jsonObj[key], targetObj, jsonObj, key);
            if (result !== null) {
                return result;
            }
        }
    }
    return null;
};

module.exports = GetParentObject;