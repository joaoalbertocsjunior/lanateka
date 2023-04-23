const encodeUrl = require('encodeurl')

const GenerateUrl = (phone, text) => {
    text = encodeUrl(text);
    return `https://wa.me/${phone}?text=${text}`;
};

module.exports = GenerateUrl;

