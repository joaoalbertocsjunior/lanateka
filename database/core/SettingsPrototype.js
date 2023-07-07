'use strict';

const SettingsPrototype = (model, operation, queryParams) => {
    return {
        model: model,
        operation: operation,
        queryParams: queryParams
    };
};

module.exports = SettingsPrototype;