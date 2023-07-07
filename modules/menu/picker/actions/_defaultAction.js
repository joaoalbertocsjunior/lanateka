'use strict';

const _defaultAction = (params) => {
    const { configurations } = params;
    let responseMessage, response;
    responseMessage = configurations.invalidOption;
    response = {
        responseMessage: responseMessage,
        verify: false,
        backToMainMenu: false
    };
    return response;
};

module.exports = _defaultAction;