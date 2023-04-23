'use strict';

const mongoose = require('mongoose');
const fixieHelper = require('./helpers/fixie.js');
const env = process.env;
// let mongo = mongoose.set('debug', true);

const connection = async () => {
    try {
        let DB_URI, mongoConfig;
        DB_URI = `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_CLUSTER}/${env.DB_DATABASE}?retryWrites=true&w=majority`;
        if (env.USE_FIXIE === 'true') {
            const fixie = fixieHelper(env.FIXIE_URL, DB_URI, env.FIXIE_AUTH);
            DB_URI = fixie.url;
            mongoConfig = fixie.configuration;
        } else {
            mongoConfig = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                keepAlive: true,
                connectTimeoutMS: 30000,
                keepAliveInitialDelay: 300000
            };
        };
        const mongo = await mongoose.connect(DB_URI, mongoConfig);
        return mongo;
    } catch (error) {
        // console.error('Error connecting to MongoDB database:', error);
        throw error;
    }
};

const disconnect = async () => {
    await mongoose.disconnect();
};

module.exports = { connection, disconnect };