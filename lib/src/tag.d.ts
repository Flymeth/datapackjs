import { ressourceLocation } from "../utils/ressourceLocation";
declare type tagsType = "blocks" | "fluids" | "items" | "entities" | "events";
/**
 * Represent a block/fluid/items/... tag
 * @link
 * https://minecraft.fandom.com/wiki/Tag
 * https://minecraft.fandom.com/wiki/Tag#JSON_format
 */
declare class gameTag {
    readonly ObjectType = "Tag";
    type: tagsType;
    content: string[];
    name: ressourceLocation;
    replace: boolean;
    namespace: string | undefined;
    /**
     * @param name The name of this tag
     * @param fromMinecraft If the tag come from the minecraft's default tag and not the datapack
     * @param includes Object to include inside this tag
     */
    constructor(type: tagsType, name: ressourceLocation, fromMinecraft?: boolean, ...includes: string[]);
    /**
     * Associate an object to this tag
     */
    addObject(object: gameTag | string): this;
    /**
     * Set if this tag replace other tag named as this one
     */
    strict(set: boolean): this;
    render(): string;
}
export default gameTag;
