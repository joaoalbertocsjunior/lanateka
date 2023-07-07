'use strict';
const PromisesBuilder = require('./core/PromisesBuilder.js');
const configurations = require('../database/configurations.js');

const QueryObject = PromisesBuilder(configurations);

module.exports = QueryObject;