'use strict';
const validator = require('validator');
const cpf = require('../validators/cpf.js');

const UserSchema = {
    phone: {
        type: String,
        required: true,
        unique: true,
        minlength: 13,
        maxlength: 13,
        default: null
    },
    name: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    cpf: {
        type: String,
        validate: {
            validator: cpf,
            message: (props) => `${props.value} is not a valid CPF number`,
        },
    },
    reschedule: {
        type: String,
        trim: true,
        maxlength: 165
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
};

module.exports = UserSchema;