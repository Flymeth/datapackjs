"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createID(prefix, suffix) {
    const date = new Date();
    const random = Math.random() * 100;
    const id = `${date.getTime()}_${random.toFixed()}`;
    return (prefix || "") + id + (suffix || "");
}
exports.default = createID;
