'use strict';

const GetParentObject = require("../../helpers/scopes/GetParentObject.js");
const GetScope = require("../../helpers/scopes/GetScope.js");
const MenuBuilder = require("../../helpers/core/MenuBuilder.js");

const QueryObject = require("../../../../database/QueryObject.js");
const MenuQuery = QueryObject.MenuModel.operations;

const _backOptionAction = (params) => {
    const { contactNumber, script } = params;
    let menu;
    return MenuQuery.findOne({ phone: contactNumber })
        .then((data) => {
            let menuScope = GetScope(script, data.menu);
            const parent = GetParentObject(script, menuScope);
            if (!parent) {
                menu = MenuBuilder(script);
            } else {
                menu = MenuBuilder(parent);
            }
            return MenuQuery.findOneAndUpdate({ phone: contactNumber }, { menu: menu }, { upsert: true, new: true })
                .then((session) => {
                    let responseMessage = menu;
                    let response = {
                        responseMessage: responseMessage,
                        verify: false,
                        backToMainMenu: false
                    };
                    return response;
                })
                .catch((err) => { console.log(err); });
        })
        .catch((err) => { console.log(err); });
};

module.exports = _backOptionAction;