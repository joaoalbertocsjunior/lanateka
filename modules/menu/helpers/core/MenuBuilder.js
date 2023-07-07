'use strict';
const MenuBuilder = (menu) => {
    let result = '';
    if (menu?.menuStartText) {
        result += menu.menuStartText;
    };
    if (menu?.options) {
        menu.options.forEach((option, index) => {
            if (option?.menuOption) {
                result += (`*${index + 1}* - ` + option.menuOption + "\n");
            };
        });
    };
    if (menu?.menuEndText) {
        result += menu.menuEndText;
    };
    return result;
};

module.exports = MenuBuilder;