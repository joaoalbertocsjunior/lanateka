'use strict';
const mongoose = require('mongoose');

const SchemaPrototype = (schemaName, schema, collectionName, plugin) => {
    schema = new mongoose.Schema(schema);
    if (plugin) {
        schema.plugin(plugin.function, plugin.configuration);
    }
    return mongoose.model(schemaName, schema, collectionName);
};

module.exports = SchemaPrototype;