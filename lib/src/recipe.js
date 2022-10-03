"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ressourceLocation_1 = require("../utils/ressourceLocation");
/**
 * Represent a game recipe
 * @link
 * https://minecraft.fandom.com/wiki/Recipe
 * https://minecraft.fandom.com/wiki/Recipe#JSON_format
 */
class gameRecipe {
    /**
     * @param name The recipe's name
     * @param group The recipe's group (useful for the recipies book)
     * @param options The recipe option (see https://minecraft.fandom.com/wiki/Recipe#JSON_format)
     */
    constructor(name, type, group, options) {
        this.ObjectType = "Recipe";
        if (!(0, ressourceLocation_1.isRessourceLocationValid)(name))
            throw new Error("Invalid ressource location!");
        this.name = name;
        this.data = Object.assign({ type, group }, options);
    }
    render() {
        return `${this.namespace}:${this.name}`;
    }
}
exports.default = gameRecipe;
