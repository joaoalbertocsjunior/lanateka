'use strict';

const QueriesBuilder = (configurations) => {
    let result = {};
    configurations.models.forEach((element) => {
        let operation = {};
        let operations = [];
        element.operations.forEach((operation) => {
            Object.assign(operation, { operation: operation.operation, query: operation.query });
            operations = [...operations, operation];
        });
        let model = { [element.model.modelName]: { model: element.model, operations } };
        result = Object.assign(result, model);
    });
    return result;
};

module.exports = QueriesBuilder;