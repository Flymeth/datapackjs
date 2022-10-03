"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ressourceLocationRegExp = exports.isRessourceLocationValid = void 0;
const ressourceLocationRegExp = /[a-z_\- 0-9\.\/]+/;
exports.ressourceLocationRegExp = ressourceLocationRegExp;
function isRessourceLocationValid(test) {
    var _a;
    return test.length && ((_a = ressourceLocationRegExp.exec(test)) === null || _a === void 0 ? void 0 : _a[0]) === test;
}
exports.isRessourceLocationValid = isRessourceLocationValid;
