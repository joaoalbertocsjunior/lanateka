'use strict';

const mainMenuConditions = require('../conditions/mainMenuConditions.js');
const backOptionCondition = require('../conditions/backOptionCondition.js');
const verifyOptionsCondition = require('../conditions/verifyOptionsCondition.js');
const validOptionCondition = require('../conditions/validOptionCondition.js');
const serverLastMessageIsNotificationCondition = require('../conditions/serverLastMessageIsNotificationCondition.js');
const mustSaveUserLastMessageCondition = require('../conditions/mustSaveUserLastMessageCondition.js');

module.exports = {
    mainMenuConditions,
    backOptionCondition,
    verifyOptionsCondition,
    validOptionCondition,
    serverLastMessageIsNotificationCondition,
    mustSaveUserLastMessageCondition
};