'use strict';

const PromisesFactory = (func) => {
    return function (...args) {
        return new Promise((resolve, reject) => {
            func.apply(null, [...args, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }]);
        });
    };
};

module.exports = PromisesFactory;


// const myPromiseFunction = PromisesFactory(function (args, callback) {
//     const { a, b, c } = args;
//     console.log(a, b, c);
// });

// const params = {
//     a: false,
//     b: true,
//     c: 'ABACATE'
// };

// myPromiseFunction(params).then((result) => {
//     console.log(result);
// }).catch((err) => { console.log(err); });