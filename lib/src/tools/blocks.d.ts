import { Command } from "../function";
import gameTag from "../tag";
import { NBTData, NBTPath } from "./nbt";
declare type coordonate = {
    x: Position | number | string;
    y: Position | number | string;
    z: Position | number | string;
};
declare type zoneOptions = {
    coordonates: coordonate;
    to: {
        x: number;
        y: number;
        z: number;
    };
};
declare type posType = "absolute" | "position" | "rotation";
/**
 * Represent a position (like x, y or z)
 */
declare class Position {
    position: string;
    type: posType;
    /**
     *
     * @param pos Set the position (by default it's set to 0)
     * @example
     * const pos    = new Position("~5")
     *              = new Position("^2")
     *              = new Position(-25)
     *              = [...]
     */
    constructor(pos?: string | number);
    /**
     * Set as an absolute position (like `-15` or `1255`...)
     * @param coordonate The coordonate
     */
    absolute(coordonate: number): this;
    /**
     * Set as a relative position from the entity's position (like `~5` or `~-7.36`...)
     * @param thenAdd The position relatively to the entity's postion
     */
    fromPosition(thenAdd: number): this;
    /**
     * Set as a relative position from the entity's rotation (like `^-95` or `^.25`...)
     * @param thenAdd The position relatively to the entity's rotation
     */
    fromRotation(thenAdd: number): this;
    render(): string;
}
declare type attrsType = {
    add: (name: string, value: any) => ThisType<Block>;
    remove: (name: string) => ThisType<Block>;
    set: (datas: {
        name: string;
        value: any;
    }[]) => ThisType<Block>;
    modify: (name: string, by: any) => ThisType<Block>;
    reset: () => ThisType<Block>;
    render: () => string;
};
declare function renderCoordonates(coordonates: coordonate): string[];
/**
 * Represent a world's block
 */
declare class Block {
    coords: string[];
    zone: boolean;
    name: string;
    attributesData: {
        name: string;
        value: any;
    }[];
    /**
     * @param position The position of the target block
     * @param name The name of the target block
     */
    constructor(position: coordonate, name?: string);
    nbt?: {
        /**
         * Get a nbt for this block
         * @param path The path to the block's NBT
         * @param scale The scale to multiply the request NBT after get it
         */
        get: (path?: NBTPath, scale?: number) => Command;
        /**
         * Set a nbt for this block
         * @param value The value to set to this NBT
         * @param path The path to the block's NBT
         */
        set: (value: NBTData | string | number, path?: NBTPath) => Command;
        /**
         * Store data from a command
         * @param path The path to the block's NBT
         * @param type The type of result you want: \
         * `success`: If the command has been correcly executed, it will returns `1`, else `0` \
         * `result`: Will returns the callback of the executed command
         * @param from The command the NBT will execute to store itself
         */
        store: (path: NBTPath, type: "success" | "result", from: Command) => Command;
        /**
         * Reset all the NBT for this block
         */
        reset: () => Command;
    } | undefined;
    /**
     * Represent attributes
     * @example
     * ```mcfunction
     * # This is how block's attributes are working:
     * minecraft:dirt[name=value, name2=value, ...]
     * ```
     */
    attributes: attrsType;
    /**
     * Set to the block's coordonate/zone the given block
     * @param block The name of the block to place
     * @exemple
     * ```js
     * const b = new Block({...})
     * b.set("minecraft:dirt")
     * ```
     */
    set(block?: string): Command;
    /**
     * Place to the given coordonates the block
     * @param position The position where to place the block
     * @param to If `this` is a Zone, the opposite corner of the zone to place the block
     */
    place(position: coordonate, to?: zoneOptions["to"]): Command;
    /**
     * Delete the block/zone (= replace it with `minecraft:air`)
     */
    del(): string;
    render(): string;
}
/**
 * Represent a zone of blocks
 * @extends Block
 */
declare class Zone extends Block {
    to: [string, string, string];
    constructor(data: zoneOptions);
    /**
     * Set only the blocks on the outer edge of the fill region with the specified block and replace inside with `minecraft:air`
     * @param block The block to fill with
     */
    empty(block?: string): Command;
    /**
     * Set only the blocks on the outer edge of the fill region with the specified block without replacing inside with `minecraft:air`
     * @param block The block to fill with
     */
    outline(block?: string): Command;
    /**
     * Set only the `minecraft:air` blocks in the fill region with the specified block
     * @param block The block to fill with
     */
    safe(block?: string): Command;
    /**
     * Set all blocks in the fill region with the specified block, dropping the existing blocks (including those that are unchanged) and block contents
     * @param block The block to fill with
     */
    destroy(block?: string): Command;
    /**
     * Set all blocks (including air) in the fill region with the specified block
     * @param blocks The block to replace
     * @param withBlock The block that the selected blocks will be replaced
     */
    replace(blocks: gameTag | string, withBlock?: string): Command;
    render(): string;
}
export { Block, Zone, Position, coordonate, renderCoordonates };
