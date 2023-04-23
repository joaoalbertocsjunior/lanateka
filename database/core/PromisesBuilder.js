'use strict';

const Query = require('./Query.js');

const PromisesBuilder = (configurations) => {
    const result = {};

    configurations.models.forEach(({ model, operations }) => {
        const modelOperations = {};
        operations.forEach(operation => {
            modelOperations[operation] = (...queryParams) => {
                const newSetting = { model, operation };
                newSetting.queryParams = queryParams.map((param) => ({ ...param }));
                return Query(newSetting);
            };
            result[model.modelName] = { operations: modelOperations };
        });
    });
    return result;
};

module.exports = PromisesBuilder;