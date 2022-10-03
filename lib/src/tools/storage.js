"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
const execute_1 = __importDefault(require("../../utils/execute"));
const ressourceLocation_1 = require("../../utils/ressourceLocation");
const nbt_1 = require("./nbt");
/**
 * Represent a storage
 */
class Storage {
    /**
     * @param name The name of the storage
     * @param initDatas The init data set inside this storage
     */
    constructor(name, initDatas) {
        if (name && (0, ressourceLocation_1.isRessourceLocationValid)(name))
            throw new Error(`"${name}" is not a valid storage name!`);
        this.name = name;
        this.datas = initDatas || new nbt_1.NBTData({});
    }
    /**
    * Get data of the storage
    * @param path The path to the storage's data
    * @param scale The scale to multiply the request data after get it
    */
    get(path, scale) {
        return `data get storage ${this.name} ${(path ? ` ${path.render()}` : "") + (scale ? ` ${scale}` : "")}`;
    }
    /**
    * Set a data in this storage
    * @param value The value to set
    * @param path The path to the storage's data
    */
    set(value, path) {
        if (!path)
            return `data merge storage ${this.name} ${value instanceof nbt_1.NBTData ? value.render() : JSON.stringify({ data: value })}`;
        return `data modify storage ${this.name} ${path.render()} set value ${value instanceof nbt_1.NBTData ? value.render() : value}`;
    }
    /**
    * Store data from a command
    * @param path The path to the storage's data
    * @param type The type of result you want: \
    * `success`: If the command has been correcly executed, it will returns `1`, else `0` \
    * `result`: Will returns the callback of the executed command
    * @param from The command
    */
    store(path, type, from) {
        return (0, execute_1.default)(`execute store ${type} storage ${this.name} ${path.render()} run`, from);
    }
    /**
     * Reset the storage's data
     */
    reset() {
        return `data merge storage ${this.name} {}`;
    }
}
exports.Storage = Storage;
