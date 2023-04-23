'use strict';

const GetScope = require("../../helpers/scopes/GetScope.js");
const IsArray = require("../../helpers/matchers/IsArray.js");
const MenuBuilder = require("../../helpers/core/MenuBuilder.js");
const StringToInt = require("../../helpers/parsers/StringToInt.js");

const QueryObject = require("../../../../database/QueryObject.js");
const MenuQuery = QueryObject.MenuModel.operations;

const _validOptionAction = (params) => {
    const { contactNumber, msg, client, wid_serial, script } = params;
    let messageToInt = StringToInt(msg.body);
    return MenuQuery.findOne({ phone: contactNumber }).then((data) => {
        let menuScope = GetScope(script, data.menu);
        let userScope = menuScope.options[messageToInt - 1];
        let messageIsInfo, messageIsSaveData, messageIsNotification, messageIsString, responseMessage, response, updateVar;
        messageIsInfo = typeof userScope?.info === 'string';
        messageIsSaveData = typeof userScope?.saveData === 'string';
        messageIsNotification = typeof userScope?.notification === 'string';
        messageIsString = ((messageIsInfo) || (messageIsNotification) || (messageIsSaveData));
        let menu = MenuBuilder(userScope);
        if (IsArray(userScope?.options)) {
            updateVar = { menu: menu };
        } else if (messageIsString) {
            if (messageIsInfo) {
                updateVar = { scope: userScope.info };
            } else {
                updateVar = {};
            }
        }
        return MenuQuery.findOneAndUpdate({ phone: contactNumber }, updateVar, { upsert: true, new: true })
            .then(async (session) => {
                if (IsArray(userScope?.options)) {
                    responseMessage = menu;
                    response = {
                        responseMessage: responseMessage,
                        verify: false,
                        backToMainMenu: false
                    };
                } else if (messageIsString) {
                    if (messageIsInfo) {
                        responseMessage = userScope.info;
                        response = {
                            responseMessage: responseMessage,
                            verify: false,
                            backToMainMenu: false
                        };
                    } else {
                        const notification = `O número de telefone *${contactNumber}* entrou em contato a respeito de: *${userScope.menuOption}*.`; // Check
                        await client.sendMessage(wid_serial, notification);
                        responseMessage = userScope.notification;
                        response = {
                            responseMessage: responseMessage,
                            verify: false,
                            backToMainMenu: false
                        };
                    }
                }
                return response;
            })
            .catch((err) => { console.log(err); });
    }).catch((err) => { console.log(err); });
};

module.exports = _validOptionAction;