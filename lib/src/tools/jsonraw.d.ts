import { Block } from "./blocks";
import { mcDefaultColors } from "./display";
import { NBTPath } from "./nbt";
import { Scoreboard } from "./scoreboard";
import { Entity } from "./selector";
import { Storage } from "./storage";
declare type jsonNBT = ({
    path: NBTPath;
    entity: Entity;
    separator?: JsonRaw;
} | {
    path: NBTPath;
    block: Block;
    separator?: JsonRaw;
} | {
    path: NBTPath;
    storage: Storage;
    separator?: JsonRaw;
});
declare type jsontag = {
    text: string | {
        entity: Entity;
    } | {
        score: {
            scoreboard: Scoreboard;
            entity: Entity | string;
        };
    } | {
        nbt: jsonNBT;
    };
    color?: mcDefaultColors | string;
    underlined?: boolean;
    italic?: boolean;
    bold?: boolean;
};
declare type jsonraw = jsontag | jsontag[];
/**
 * Represent a json formated text
 */
declare class JsonRaw {
    content: jsonraw | undefined;
    constructor(content?: jsonraw);
    /**
     * Add a text to the current formated text
     * @param content The text to add
     */
    addText(content: jsontag): this;
    /**
     * Remove a part of the text
     * @param index The index of the text to remove
     */
    removeText(index: number): this;
    /**
     * Remove all the text
     */
    resetText(): this;
    render(): string;
}
export { JsonRaw };
