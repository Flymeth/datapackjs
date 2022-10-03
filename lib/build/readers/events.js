"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const mk_1 = __importDefault(require("../utils/mk"));
const functions_1 = __importDefault(require("./functions"));
function buildEvent(event, config) {
    const { functions } = event;
    const filePath = path_1.default.join(config.mainPath, `data/minecraft/tags/functions/${event.type}.json`);
    const datas = {
        values: []
    };
    try {
        const existingFile = (0, fs_1.readFileSync)(filePath);
        datas.values = JSON.parse(existingFile.toString()).datas.values;
    }
    catch (e) { }
    for (const obj of functions) {
        (0, functions_1.default)(obj, config);
        datas.values.push(`${config.namespace}:${obj.name}`);
    }
    (0, mk_1.default)("file", filePath, JSON.stringify(datas));
}
exports.default = buildEvent;
