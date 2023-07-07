'use strict';
const safe = require('safe-regex');

const StringMatches = (string, regex) => {
    if (safe(new RegExp(regex, "gi"))) {
        regex = new RegExp(regex, "gi");
        return regex.test(string);
    }
    return;
};

module.exports = StringMatches;