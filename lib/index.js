"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Datapack = exports.tools = void 0;
const main_1 = __importStar(require("./build/main"));
const event_1 = __importDefault(require("./src/event"));
const function_1 = __importDefault(require("./src/function"));
const tag_1 = __importDefault(require("./src/tag"));
const advancement_1 = __importDefault(require("./src/advancement"));
const loottable_1 = __importDefault(require("./src/loottable"));
const recipe_1 = __importDefault(require("./src/recipe"));
const ressourceLocation_1 = require("./utils/ressourceLocation");
exports.tools = __importStar(require("./tools"));
/**
 * Represent the datapack itself
 */
class Datapack {
    /**
     * @param datas Represent the main settings of the datapack
     */
    constructor(datas) {
        this.Event = event_1.default;
        this.Function = function_1.default;
        this.Tag = tag_1.default;
        this.Advancement = advancement_1.default;
        this.LootTable = loottable_1.default;
        this.Recipe = recipe_1.default;
        if (datas.namespace.includes("/") || !(0, ressourceLocation_1.isRessourceLocationValid)(datas.namespace))
            throw new Error(`Invalide namespace!`);
        this.namespace = datas.namespace;
        this.name = datas.name;
        this.version = datas.version;
        this.description = datas.description || "";
        this.icon = datas.icon;
        this.options = datas.options;
        this.datas = [];
        this.Function.prototype.namespace = this.namespace;
        this.Tag.prototype.namespace = this.namespace;
        this.Advancement.prototype.namespace = this.namespace;
        this.LootTable.prototype.namespace = this.namespace;
        this.Recipe.prototype.namespace = this.namespace;
        Object.freeze(this.Function);
        Object.freeze(this.Event);
        Object.freeze(this.Tag);
        Object.freeze(this.Advancement);
        Object.freeze(this.LootTable);
        Object.freeze(this.Recipe);
    }
    /**
     * Save new buildables objects for the datapack
     * @param datas Buildable objects
     */
    save(...datas) {
        this.datas = [...this.datas, ...datas];
        return this;
    }
    /**
     * Build the datapack into the "buildPath" folder
     * @param datas Add buildables objects to the datapack before building it
     */
    build(...datas) {
        (0, main_1.default)(this);
        (0, main_1.build)(...[...datas, ...this.datas]);
    }
}
exports.Datapack = Datapack;
exports.default = Datapack;
