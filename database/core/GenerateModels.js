'use strict';
const SchemaPrototype = require('./SchemaPrototype.js');

const GenerateModels = (skeletons) => {
    let result = {};
    skeletons.forEach((model) => {
        let plugin;
        if (model?.plugin) {
            plugin = model.plugin;
        } else {
            plugin = null;
        }
        Object.assign(result, { [model.modelName]: SchemaPrototype(model.modelName, model.modelSchema, model.modelCollection, plugin) });
    });
    return result;
};

module.exports = GenerateModels;