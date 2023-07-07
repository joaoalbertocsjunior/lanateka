'use strict';

const NormalizeInput = (string) => {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase().replace(/\s/g, '');
};

module.exports = NormalizeInput;