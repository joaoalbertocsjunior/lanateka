'use strict';

const SettingsPrototype = require('./SettingsPrototype.js');

const ConfigurationPrototype = (settings) => {
    const { model, operation, queryParams } = settings;
    return SettingsPrototype(model, operation, queryParams);
};

module.exports = ConfigurationPrototype;