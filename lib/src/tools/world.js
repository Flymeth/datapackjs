"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const execute_1 = __importDefault(require("../../utils/execute"));
const function_1 = require("../function");
/**
 * Represent a world
 */
class World {
    /**
     * @param name The name of the world
     */
    constructor(name) {
        this.world = `minecraft:${name.replace('minecraft:', '')}`;
    }
    /**
     * Execute commands inside this world
     * @param commands The command to execute inside this world
     */
    executeInside(...commands) {
        return (0, function_1.processCommands)(commands).map(cmd => (0, execute_1.default)(`in ${this.render()}`, cmd));
    }
    /**
     * Teleport an entity to this world
     * @param entity The entity to teleport inside this world
     * @param coordonates The coordonate inside this world the entity will be teleport on
     */
    teleport(entity, coordonates) {
        return this.executeInside(entity.teleport(coordonates || "self"));
    }
    render() {
        return this.world;
    }
}
exports.World = World;
