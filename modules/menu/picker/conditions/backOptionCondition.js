'use strict';

const backOptionCondition = (params) => {
    const { normalized, configurations } = params;
    let result;
    result = normalized === configurations.backKeyword;
    return result;
};

module.exports = backOptionCondition;