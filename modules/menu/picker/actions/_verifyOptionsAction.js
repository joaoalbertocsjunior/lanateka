'use strict';

const GetScope = require('../../helpers/scopes/GetScope.js');

const QueryObject = require('../../../../database/QueryObject.js');
const MenuQuery = QueryObject.MenuModel.operations;

const { configuration } = require('../../../../configuration/script.js');

const _verifyOptionsAction = (params) => {
    const { contactNumber, msg, script } = params;
    let responseMessage, response;
    if (msg === ("1" || "sim" || "2" || "nao")) {
        return MenuQuery.findOne({ phone: contactNumber }).then((session) => {
            const scope = GetScope(script, session.scope);
            if (msg === ("1" || "sim")) {
                if (scope?.next?.info) {
                    responseMessage = scope.next.info;
                    response = {
                        responseMessage: responseMessage,
                        verify: false,
                        backToMainMenu: false
                    };
                } else {
                    responseMessage = scope.next.backToTop;
                    let backToMainMenu = true;
                    response = {
                        responseMessage: responseMessage,
                        verify: false,
                        backToMainMenu: backToMainMenu
                    };
                }
            } else {
                responseMessage = scope.retry;
                response = {
                    responseMessage: responseMessage,
                    verify: false,
                    backToMainMenu: false
                };
            };
        }).catch((err) => { console.log(err); });
    } else {
        responseMessage = configuration.invalidVerify;
        let verify = true;
        response = {
            responseMessage: responseMessage,
            verify: verify,
            backToMainMenu: false
        };
    };
    return response;
};

module.exports = _verifyOptionsAction;