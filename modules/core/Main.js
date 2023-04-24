'use strict';

const {
    configurations
} = require('../../configuration/script.js');

const ActionPicker = require('../menu/picker/core/ActionPicker.js');

const MenuBuilder = require("../menu/helpers/core/MenuBuilder.js");

const turl = require('turl');
const GenerateUrl = require("../menu/helpers/misc/GenerateUrl");

const NormalizeInput = require("../menu/helpers/parsers/NormalizeInput.js");

const TimestampHasReachBreakpoint = require('../menu/helpers/misc/TimestampHasReachBreakpoint.js');

const { disconnect } = require('../../database/connection/connection.js');

const ScriptLoader = require('../menu/helpers/core/ScriptLoader.js');

const QueryObject = require('../../database/QueryObject.js');
const MenuQuery = QueryObject.MenuModel.operations;

const {
    mainMenuConditions,
    backOptionCondition,
    verifyOptionsCondition,
    validOptionCondition,
    serverLastMessageIsNotificationCondition,
    mustSaveUserLastMessageCondition
} = require('../menu/picker/core/ConditionsLoader.js');

let info, phone, link, wid_serial;

const Main = (client, io, serverPath, filePath) => { // serverPath and filePath on collectionToXLS
    let onLinkToQr = configurations.inviteMessage;
    info = client.info;
    wid_serial = info.wid._serialized;
    phone = info.wid.user;
    link = GenerateUrl(phone, onLinkToQr);
    turl.shorten(link).then((res) => {
        io.emit('link', res);
    }).catch((err) => {
        console.log(err);
    });
    let processing = false;
    const handleMessage = async (msg) => {
        if (!processing) {
            processing = true;
            await msg.getContact()
                .then(async (contact) => {
                    let message = encodeURIComponent(msg.body);
                    const chat = await msg.getChat();
                    const id = chat.id._serialized;
                    let serverMessages = [];
                    let userMessages = [];
                    chat.fetchMessages({ limit: Infinity, fromMe: undefined })
                        .then(async (messages) => {
                            messages.forEach((message) => {
                                if (message.fromMe) {
                                    serverMessages = [...serverMessages, message];
                                } else {
                                    userMessages = [...userMessages, message];
                                }
                            });
                            let userLastMessage, serverLastMessage;
                            if (userMessages.length) {
                                userLastMessage = userMessages[userMessages.length - 1];
                            }
                            const contactNumber = contact.number;
                            ScriptLoader(contactNumber).then((script) => {
                                if (serverMessages.length) {
                                    serverLastMessage = serverMessages[serverMessages.length - 1];
                                }
                                const normalized = NormalizeInput(message);
                                const breakpointParams = {
                                    msg,
                                    threshold: 4320
                                };
                                if (messages.length >= 2) {
                                    Object.assign(breakpointParams, { messages });
                                } else {
                                    Object.assign(breakpointParams, { messages: undefined });
                                };
                                MenuQuery.findOne({ phone: contactNumber }).then((data) => {
                                    let lastServerMessage, mainMenuCondition, dataHolder;
                                    if (data) {
                                        dataHolder = data;
                                        mainMenuCondition = false;
                                    } else {
                                        dataHolder = false;
                                        mainMenuCondition = true;
                                    };
                                    if (serverLastMessage) {
                                        lastServerMessage = serverLastMessage;
                                    } else {
                                        lastServerMessage = false;
                                    };
                                    const ConditionsParams = {
                                        messages,
                                        breakpoint: TimestampHasReachBreakpoint(breakpointParams),
                                        script,
                                        normalized,
                                        msg,
                                        onLinkToQr,
                                        configurations,
                                        serverLastMessage: lastServerMessage,
                                        data: dataHolder,
                                        contactNumber
                                    };
                                    const conditions = {
                                        mainMenuConditions: mainMenuConditions(ConditionsParams),
                                        backOptionCondition: backOptionCondition(ConditionsParams),
                                        verifyOptionsCondition: verifyOptionsCondition(ConditionsParams),
                                        validOptionCondition: validOptionCondition(ConditionsParams),
                                        serverLastMessageIsNotificationCondition: serverLastMessageIsNotificationCondition(ConditionsParams),
                                        mustSaveUserLastMessageCondition: mustSaveUserLastMessageCondition(ConditionsParams)
                                    };
                                    const inputs = {
                                        contactNumber,
                                        normalized,
                                        client,
                                        wid_serial,
                                        configurations,
                                        script,
                                        msg
                                    };
                                    const ActionPickerParams = {
                                        conditions,
                                        inputs
                                    };
                                    ActionPicker(ActionPickerParams).then(async (result) => {
                                        if (result) {
                                            try {
                                                await client.sendMessage(id, decodeURIComponent(result.responseMessage));
                                                if (result.verify) {
                                                    const verifyOptions = configurations.verifyMessage;
                                                    await client.sendMessage(id, verifyOptions);
                                                }
                                                if (result.backToMainMenu) {
                                                    let menu = MenuBuilder(script);
                                                    await client.sendMessage(id, menu);
                                                }
                                            } catch (err) {
                                                console.log(err);
                                            }
                                        }
                                    }).catch((err) => { console.log(err); });
                                }).catch((err) => { console.log(err); });
                            }).catch((err) => { console.log(err); });
                        }).catch((err) => { console.log(err); });
                })
                .catch((err) => { console.log(err); });
            processing = false;
            // disconnect();
            await disconnect().then(() => {
                console.log('Database connection closed.');
            }).catch((err) => { console.log(err) });
        }
        client.once('message', (msg) => { handleMessage(msg) });
    };
    client.once('message', (msg) => { handleMessage(msg) });
};

module.exports = Main;