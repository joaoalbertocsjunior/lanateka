'use strict';

const GetScope = require("../../helpers/scopes/GetScope.js");

const QueryObject = require("../../../../database/QueryObject.js");
const MenuQuery = QueryObject.MenuModel.operations;
const UserQuery = QueryObject.UserModel.operations;

const _mustSaveUserLastMessageAction = (params) => {
    const { contactNumber, msg, script } = params;
    return MenuQuery.findOne({ phone: contactNumber }).then((data) => {
        let scope = GetScope(script, data.scope);
        let responseMessage, response;
        console.log(scope);
        return MenuQuery.findOneAndUpdate({ phone: contactNumber }, { scope: scope }, { upsert: true, new: true }).then((session) => {
            return UserQuery.findOneAndUpdate({ phone: contactNumber }, { [scope.save]: msg }, { upsert: true, new: true }).then((doc) => {
                responseMessage = scope.verify;
                let verify = true;
                response = {
                    responseMessage: responseMessage,
                    verify: verify,
                    backToMainMenu: false
                };
                return response;
            }).catch((err) => { console.log(err); });
        }).catch((err) => { console.log(err); });
    }).catch((err) => { console.log(err); });
};

module.exports = _mustSaveUserLastMessageAction;