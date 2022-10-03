"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCommands = void 0;
const idgen_1 = __importDefault(require("../utils/idgen"));
const ressourceLocation_1 = require("../utils/ressourceLocation");
function processCommands(commands) {
    if (typeof commands === "string")
        return [commands];
    // @ts-ignore - "L'instanciation de type est trop profonde et éventuellement infinie."
    else
        return commands.flat(Infinity);
}
exports.processCommands = processCommands;
/**
 * Represent a function
 * @link
 * https://minecraft.fandom.com/wiki/Function_(Java_Edition)
 */
class gameFunction {
    constructor(name, ...exec) {
        this.ObjectType = "Function";
        if (name && !(0, ressourceLocation_1.isRessourceLocationValid)(name))
            throw new Error(`"${name}" is not a valid function name!`);
        this.name = name || (0, idgen_1.default)("fct_");
        this.commands = processCommands(exec);
    }
    exec(...cmds) {
        if (cmds.length)
            this.commands.push(...processCommands(cmds));
        return this;
    }
    call() {
        return `function ${this.render()}`;
    }
    render() {
        return `${this.namespace}:${this.name}`;
    }
}
exports.default = gameFunction;
