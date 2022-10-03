"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const mk_1 = __importDefault(require("../utils/mk"));
function buildTag(tag, config) {
    const { name, content, replace, type } = tag;
    const obj = {
        replace,
        values: content
    };
    (0, mk_1.default)("file", path_1.default.join(config.mainPath, "data", config.namespace, 'tags', type, `${name}.json`), JSON.stringify(obj));
}
exports.default = buildTag;
