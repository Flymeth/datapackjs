"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represent a game event
 */
class gameEvent {
    /**
     * @param exec Functions to execute when the event is triggered
     */
    constructor(name, ...exec) {
        this.ObjectType = "Event";
        this.type = name;
        if (exec.find(obj => (obj === null || obj === void 0 ? void 0 : obj.ObjectType) !== "Function"))
            throw new Error(`Invalid argument!`);
        this.functions = exec;
    }
    /**
     * Add new functions to execute when the event is triggered
     * @param fcts Functions to execute when the event is triggered
     */
    exec(...fcts) {
        this.functions.push(...fcts);
        return this;
    }
    render() {
        return `${this.type}`;
    }
}
exports.default = gameEvent;
