'use strict';

const MenuBuilder = require("../../helpers/core/MenuBuilder.js");

const QueryObject = require('../../../../database/QueryObject.js');
const MenuQuery = QueryObject.MenuModel.operations;

const _mainMenuAction = (params) => {
    const { contactNumber, script } = params;
    let menu = MenuBuilder(script);
    return MenuQuery.findOneAndUpdate({ phone: contactNumber }, { menu: menu }, { upsert: true, new: true })
        .then((session) => {
            let response = {
                responseMessage: session.menu,
                verify: false,
                backToMainMenu: false
            };
            return response;
        }).catch((err) => { console.log(err); });
};

module.exports = _mainMenuAction;