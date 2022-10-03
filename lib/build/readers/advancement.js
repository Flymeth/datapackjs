"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mk_1 = __importDefault(require("../utils/mk"));
const path_1 = __importDefault(require("path"));
const tools_1 = require("../../tools");
function buildAdvancement(adv, config) {
    var _a, _b;
    const { conditions, rewards, description, display, isSecret, parent, type, whenComplete } = adv.options;
    const criteria = {};
    for (const { data, name, trigger } of conditions) {
        criteria[name] = {
            trigger,
            conditions: data
        };
    }
    const finalOBJ = {
        display: {
            icon: (display === null || display === void 0 ? void 0 : display.icon) ? {
                name: display.icon.name,
                nbt: display.icon.nbt.render()
            } : undefined,
            title: ((display === null || display === void 0 ? void 0 : display.title) instanceof tools_1.JsonRaw ? display.title.render() : display === null || display === void 0 ? void 0 : display.title),
            frame: type,
            description: (description instanceof tools_1.JsonRaw ? description.render() : description),
            show_toast: whenComplete === null || whenComplete === void 0 ? void 0 : whenComplete.toast,
            announce_to_chat: whenComplete === null || whenComplete === void 0 ? void 0 : whenComplete.announce,
            hidden: isSecret
        },
        parent,
        criteria,
        rewards: {
            recipes: (_a = rewards.recipes) === null || _a === void 0 ? void 0 : _a.map(e => e.render()),
            loots: (_b = rewards.loots) === null || _b === void 0 ? void 0 : _b.map(e => e.render()),
            experiences: rewards.experiences,
            function: rewards.function.render()
        }
    };
    (0, mk_1.default)('file', path_1.default.join(config.mainPath, `/data/${config.namespace}/advancement/${adv.name}.json`), JSON.stringify(finalOBJ));
}
exports.default = buildAdvancement;
