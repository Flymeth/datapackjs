"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ressourceLocation_1 = require("../utils/ressourceLocation");
/**
 * Represent an advancement
 * @link
 * https://minecraft.fandom.com/wiki/Advancement
 * https://minecraft.fandom.com/wiki/Advancement/JSON_format
 */
class gameAdvancement {
    /**
     * @param name The name of this advancement
     * @param option The data of the advancement
     */
    constructor(name, option) {
        this.ObjectType = "Advancement";
        this.conditions = {
            get: () => this.options.conditions,
            add: (...newConditions) => {
                this.options.conditions.push(...newConditions);
                return this;
            },
            set: (...conditions) => {
                this.options.conditions = conditions;
                return this;
            },
            reset: () => {
                this.options.conditions = [];
                return this;
            },
            remove: (index) => {
                if (!this.options.conditions[index])
                    throw new Error(`Cannot find the ${index}th element in conditions!`);
                this.options.conditions.splice(index, 1);
                return this;
            }
        };
        if (!(0, ressourceLocation_1.isRessourceLocationValid)(name))
            throw new Error("Invalid ressource location!");
        this.name = name;
        this.options = option;
    }
    editType(newType) {
        this.options.type = newType;
        return this;
    }
    editBehaviors(isSecret, parent, whenComplete) {
        this.options.isSecret = !!isSecret;
        if (parent)
            this.options.parent = parent;
        this.options.whenComplete = whenComplete;
        return this;
    }
    editReward(newReward) {
        this.options.rewards = newReward;
    }
    render() {
        return `${this.namespace}:${this.name}`;
    }
}
exports.default = gameAdvancement;
