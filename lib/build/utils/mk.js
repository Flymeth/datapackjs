"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
function mk(type, path, datas) {
    if (type === "file") {
        const { dir } = (0, path_1.parse)(path);
        mk("folder", dir);
        fs_1.default.writeFileSync(path, datas || "");
    }
    else
        fs_1.default.mkdirSync(path, {
            recursive: true
        });
}
exports.default = mk;
