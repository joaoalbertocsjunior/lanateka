const mongoose = require('mongoose');
const { connection, disconnect } = require('./connection.js');

const connect = async (configuration) => {
    const { model, operation, queryParams } = configuration;
    return connection()
        .then((mongo) => {
            return new Promise((resolve, reject) => {
                if (mongo.connection.readyState === 1) {
                    // console.log('Connected to MongoDB database');
                    return Promise.resolve(model[operation](...queryParams))
                        .then((result) => {
                            // disconnect();
                            resolve(result);
                        })
                        .catch((error) => {
                            // console.error('Error performing database operation:', error);
                            // disconnect();
                            reject(error);
                        });
                } else {
                    mongo.connection.on('connected', () => {
                        // console.log('Connected to MongoDB database');
                        return Promise.resolve(model[operation](...queryParams))
                            .then((result) => {
                                // disconnect();
                                resolve(result);
                            })
                            .catch((error) => {
                                console.error('Error performing database operation:', error);
                                // disconnect();
                                reject(error);
                            });
                    });
                }
                mongoose.connection.on('error', (err) => {
                    // console.error('MongoDB connection error:', err);
                    reject(err);
                });
            });
        })
        .catch((error) => {
            // console.error('Error connecting to MongoDB database:', error);
            throw error;
        });
};

module.exports = connect;