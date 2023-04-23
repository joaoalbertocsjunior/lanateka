const QueryObject = require('../../../../database/QueryObject.js');
const { Script } = require('../../../../configuration/script.js');
const UserQuery = QueryObject.UserModel.operations;

const ScriptLoader = (phone) => {
    return UserQuery.findOne({ phone: phone }).then((data) => {
        return Script(data);
    });
};

module.exports = ScriptLoader;