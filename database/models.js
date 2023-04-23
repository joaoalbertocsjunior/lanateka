'use strict';
const MenuSchema = require('./schemas/MenuSchema.js');
const UserSchema = require('../configuration/database/schemas/UserSchema.js');
const encrypt = require('mongoose-encryption');
const collections = require('../configuration/database.js');

const GenerateModels = require('./core/GenerateModels.js');

const models = [
    {
        modelName: 'MenuModel',
        modelSchema: MenuSchema,
        modelCollection: collections.Menu
    },
    {
        modelName: 'UserModel',
        modelSchema: UserSchema,
        modelCollection: collections.UserData,
        // plugin: {
        //     function: encrypt,
        //     configuration: {
        //         secret: '07ea18be2581218aebfcf55f2cb0c285',
        //         encryptedFields: [
        //             'userName',
        //             'cpf'
        //         ]
        //     }
        // }
    }
];

const BuiltModels = GenerateModels(models);

module.exports = BuiltModels;