'use strict';
const { MenuModel, UserModel } = require('./models.js');

const configurations = {
    models: [
        {
            model: MenuModel,
            operations: [
                'findOne',
                'findOneAndUpdate'
            ]
        },
        {
            model: UserModel,
            operations: [
                'findOne',
                'findOneAndUpdate',
                'find'
            ]
        }
    ]
};

module.exports = configurations;