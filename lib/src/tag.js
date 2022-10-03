"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ressourceLocation_1 = require("../utils/ressourceLocation");
/**
 * Represent a block/fluid/items/... tag
 * @link
 * https://minecraft.fandom.com/wiki/Tag
 * https://minecraft.fandom.com/wiki/Tag#JSON_format
 */
class gameTag {
    /**
     * @param name The name of this tag
     * @param fromMinecraft If the tag come from the minecraft's default tag and not the datapack
     * @param includes Object to include inside this tag
     */
    constructor(type, name, fromMinecraft, ...includes) {
        this.ObjectType = "Tag";
        if (!(0, ressourceLocation_1.isRessourceLocationValid)(name))
            throw new Error(`${name} is not a valid ressource location!`);
        this.type = type;
        this.name = name;
        this.content = includes;
        this.replace = false;
        if (fromMinecraft)
            this.namespace = "minecraft";
    }
    /**
     * Associate an object to this tag
     */
    addObject(object) {
        this.content.push((object instanceof gameTag ? object.render() : object));
        return this;
    }
    /**
     * Set if this tag replace other tag named as this one
     */
    strict(set) {
        this.replace = set;
        return this;
    }
    render() {
        return `#${this.namespace}:${this.name}`;
    }
}
exports.default = gameTag;
