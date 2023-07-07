'use strict';

const connect = require('../connection/connect.js');
const ConfigurationPrototype = require('./ConfigurationPrototype.js');

const Query = async (settings) => {
    return await connect(ConfigurationPrototype(settings));
};

module.exports = Query;