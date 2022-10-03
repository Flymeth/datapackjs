"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const mk_1 = __importDefault(require("../utils/mk"));
function buildRecipe(recipe, config) {
    const { data, name } = recipe;
    (0, mk_1.default)("file", path_1.default.join(config.mainPath, `data/${config.namespace}/recipes/${name.toLowerCase()}`), JSON.stringify(data));
}
exports.default = buildRecipe;
