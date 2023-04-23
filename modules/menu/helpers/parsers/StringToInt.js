'use strict';

const StringToInt = (string) => {
    string = string.replace(/\s/g, '');
    string = parseInt(string);
    if (!isNaN(string)) {
        return string;
    }
    return null;
};

module.exports = StringToInt;