'use strict';

const MenuSchema = {
    phone: {
        type: String,
    },
    firstMessage: {
        type: Boolean,
        required: true,
        default: true
    },
    menu: {
        type: String,
    },
    scope: {
        type: String,
    }
};

module.exports = MenuSchema;