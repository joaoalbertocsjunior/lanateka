'use strict';
const emojiRegex = require('emoji-regex');


const removeEmojis = (string) => {
    return string.replace(emojiRegex(), '');
};

module.exports = removeEmojis;