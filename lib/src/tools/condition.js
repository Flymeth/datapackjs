"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Condition = void 0;
const selector_1 = require("./selector");
const function_1 = require("../function");
const execute_1 = __importDefault(require("../../utils/execute"));
/**
 * Represent a condition
 */
class Condition {
    /**
     * @param type The type of the condition
     * @param condition The confition itself
     */
    constructor(type, condition) {
        this.type = type;
        this.condition = condition;
    }
    /**
     * Set the new condition's type
     * @param type The new condition's type
     */
    setType(type) {
        this.type = type;
        return this;
    }
    conditionTypeToString(type) {
        if (type === "random")
            return ["if", "unless"][Math.round(Math.random())];
        else
            return type;
    }
    conditionToString(condition, type) {
        const { blocks, entities, scores, nbt } = condition;
        const commands = [];
        if (entities) {
            for (const obj of entities) {
                commands.push(`entity ${obj.render()}`);
            }
        }
        if (blocks) {
            for (const data of blocks) {
                if ("name" in data) {
                    commands.push(`block ${data.Block.render()} ${data.name}`);
                }
                else {
                    commands.push(`blocks ${data.Blocks.render()} ${data.checker.render()} ${data.includesAir ? "all" : "masked"}`);
                }
            }
        }
        if (scores) {
            for (const data of scores) {
                const entity = data.entity instanceof selector_1.Entity ? data.entity.render() : data.entity;
                if ("value" in data) {
                    commands.push(`score ${entity} ${data.scoreboard.name} matches ${data.value.render()}`);
                }
                else {
                    commands.push(`score ${entity} ${data.scoreboard.name} ${data.operation} ${data.from.entity instanceof selector_1.Entity ? data.from.entity.render() : data.from.entity} ${data.from.scoreboard.name}`);
                }
            }
        }
        if (nbt) {
            for (const { element, path } of nbt) {
                commands.push(`data ${element.constructor.name === "Block" ? 'block' : 'entity'} ${element.render()} ${path.render()}`);
            }
        }
        return commands.map(cmd => `${this.conditionTypeToString(type)} ${cmd}`).join(' ');
    }
    /**
     * Execute commands only if the condition passed
     * @param commands The commands to execute
     */
    execute(...commands) {
        commands = (0, function_1.processCommands)(commands).map(cmd => (0, execute_1.default)(this.render(), cmd));
        return commands;
    }
    /**
     * Execute commands only if the condition passed (has an `if` condition)
     * @param commands The commands to execute
     */
    executeIf(...commands) {
        commands = (0, function_1.processCommands)(commands).map(cmd => (0, execute_1.default)(this.render("if"), cmd));
        return commands;
    }
    /**
     * Execute commands only if the condition passed (has an `if not` condition)
     * @param commands The commands to execute
     */
    executeUnless(...commands) {
        commands = (0, function_1.processCommands)(commands).map(cmd => (0, execute_1.default)(this.render("unless"), cmd));
        return commands;
    }
    render(type) {
        if (!this.condition)
            return "";
        return this.conditionToString(this.condition, type || this.type);
    }
}
exports.Condition = Condition;
