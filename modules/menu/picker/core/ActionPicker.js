'use strict';

const {
    _backOptionAction,
    _defaultAction,
    _mainMenuAction,
    _mustSaveUserLastMessageAction,
    _serverLastMessageIsNotificationAction,
    _validOptionAction,
    _verifyOptionsAction
} = require('./ActionsLoader.js');

const ActionPicker = (params) => {
    const { conditions, inputs } = params;
    const {
        mainMenuConditions,
        backOptionCondition,
        verifyOptionsCondition,
        validOptionCondition,
        serverLastMessageIsNotificationCondition,
        mustSaveUserLastMessageCondition
    } = conditions;
    let response;
    return new Promise((resolve, reject) => {
        try {
            switch (true) {
                case (mainMenuConditions):
                    response = _mainMenuAction(inputs);
                    break;
                case (backOptionCondition):
                    response = _backOptionAction(inputs);
                    break;
                case (verifyOptionsCondition):
                    response = _verifyOptionsAction(inputs);
                    break;
                case (validOptionCondition):
                    response = _validOptionAction(inputs);
                    break;
                case (serverLastMessageIsNotificationCondition):
                    response = _serverLastMessageIsNotificationAction();
                    break;
                case (mustSaveUserLastMessageCondition):
                    response = _mustSaveUserLastMessageAction(inputs);
                    break;
                default:
                    response = _defaultAction(inputs);
                    break;
            }
            resolve(response);
        } catch (err) {
            reject(err);
        };
    });
};

module.exports = ActionPicker;