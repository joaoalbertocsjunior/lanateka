'use strict';

const fixie = require('fixie');
const env = process.env;

const fixieHelper = (FIXIE_URL, MONGODB_URL, AUTH) => {
    let result, fixieURLConfig;
    FIXIE_URL = FIXIE_URL || undefined;
    MONGODB_URL = MONGODB_URL || undefined;
    MONGODB_URL = AUTH || undefined;
    if (MONGODB_URL) {
        MONGODB_URL = MONGODB_URL.split("@")[1];
    }
    fixieURLConfig = {
        uri: env.FIXIE_URL || FIXIE_URL,
        host: env.MONGODB_URI.split("@")[1] || MONGODB_URL
    };
    if (env.USE_FIXIE_AUTH === 'true') {
        const AuthObject = {
            auth: env.FIXIE_AUTH || AUTH
        };
        Object.assign(fixieURLConfig, AuthObject);
    };
    result = {
        url: fixie(fixieURLConfig),
        configuration: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    };
    return result;
};

module.exports = fixieHelper;