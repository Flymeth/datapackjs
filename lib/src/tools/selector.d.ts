import { Command, Commands } from "../function";
import { Scoreboard } from "./scoreboard";
import { Team } from "./team";
import { RangeValue } from "./value";
import { Block, coordonate, Position } from "./blocks";
import { NBTData, NBTPath } from "./nbt";
import gameTag from "../tag";
import { Effect } from "./effects";
declare type entityType = "all players" | "nearest player" | "random player" | "all entities" | "self";
declare type playerType = "all" | "nearest" | "random" | "self";
declare type gamemodes = "creative" | "spectator" | "adventure" | "survival";
declare type sorts = "nearest" | "furthest" | "random" | "arbitrary";
declare type selector = {
    positionned?: {
        x?: number;
        y?: number;
        z?: number;
        [key: string]: number | undefined;
    };
    area?: {
        x?: number;
        y?: number;
        z?: number;
        [key: string]: number | undefined;
    };
    distance?: RangeValue;
    scores?: {
        scoreboard: Scoreboard;
        value: RangeValue;
    }[];
    tags?: string | string[];
    team?: Team | null;
    name?: string;
    type?: string;
    rotation?: {
        x?: RangeValue;
        y?: RangeValue;
        [key: string]: RangeValue | undefined;
    };
    nbt?: NBTData;
    level?: RangeValue;
    gamemodes?: gamemodes[];
    limit?: number;
    sort?: sorts;
    [key: string]: any;
};
declare const PlayerInventorySlots: {
    armor: {
        helmet: number;
        chestplate: number;
        leggings: number;
        boots: number;
    };
    inventory: {
        craft: {
            tl: number;
            tr: number;
            bl: number;
            br: number;
        };
        navbar: {
            slots: {
                1: number;
                2: number;
                3: number;
                4: number;
                5: number;
                6: number;
                7: number;
                8: number;
                9: number;
            };
            secondHand: number;
        };
        other: {
            lines: {
                1: {
                    1: number;
                    2: number;
                    3: number;
                    4: number;
                    5: number;
                    6: number;
                    7: number;
                    8: number;
                    9: number;
                };
                2: {
                    1: number;
                    2: number;
                    3: number;
                    4: number;
                    5: number;
                    6: number;
                    7: number;
                    8: number;
                    9: number;
                };
                3: {
                    1: number;
                    2: number;
                    3: number;
                    4: number;
                    5: number;
                    6: number;
                    7: number;
                    8: number;
                    9: number;
                };
            };
            colums: {
                1: {
                    1: number;
                    2: number;
                    3: number;
                };
                2: {
                    1: number;
                    2: number;
                    3: number;
                };
                3: {
                    1: number;
                    2: number;
                    3: number;
                };
                4: {
                    1: number;
                    2: number;
                    3: number;
                };
                5: {
                    1: number;
                    2: number;
                    3: number;
                };
                6: {
                    1: number;
                    2: number;
                    3: number;
                };
                7: {
                    1: number;
                    2: number;
                    3: number;
                };
                8: {
                    1: number;
                    2: number;
                    3: number;
                };
                9: {
                    1: number;
                    2: number;
                    3: number;
                };
            };
        };
    };
};
/**
 * Represent an world's entity
 */
declare class Entity {
    private type;
    selector: selector;
    constructor(type: entityType, selector?: selector);
    isPlayerType(): string | undefined;
    private advanceSelector;
    isMultipleEntities(): boolean;
    letterSelector(): "e" | "a" | "p" | "r" | "s";
    /**
     * Manage the entity's nbt
     */
    nbt: {
        /**
         * Get a nbt of this entity
         * @param path The path to the entity's NBT
         * @param scale The scale to multiply the request NBT after get it
         */
        get: (path?: NBTPath, scale?: number) => Command;
        /**
         * Set a nbt for this entity
         * @param value The value to set to this NBT
         * @param path The path to the entity's NBT
         */
        set: (value: NBTData | string | number, path?: NBTPath) => Command;
        /**
         * Store data from a command
         * @param path The path to the entity's NBT
         * @param type The type of result you want: \
         * `success`: If the command has been correcly executed, it will returns `1`, else `0` \
         * `result`: Will returns the callback of the executed command
         * @param from The command
         */
        store: (path: NBTPath, type: "result" | "success", scale: number, from: Command) => Command;
    };
    /**
     * Manage the entity's tags
     */
    tags: {
        /**
         * Add tags to the entity
         */
        add: (...names: string[]) => Commands;
        /**
         * Remove tags to the entity
         */
        remove: (...names: string[]) => Commands;
        /**
         * Replace a tag to the entity
         * @param from The tag to replace
         * @param to The tag to replace with
         */
        replace: (from: string, to: string) => Commands;
    };
    /**
     * Execute some commands as this entity
     * @param at If the execution take care of the player's position
     * @param executor The function where the execute is made by this entity (the return result need to be an array of commands)
     */
    execute(at: boolean, executor: (e: Entity) => Commands): string[];
    /**
     * If the entity isn't a "player-type", spawn it at the given location
     * @param position The position where the entity will spawn
     * @param nbt Custom nbt to give to the entity when spawning
     */
    spawn(position: Block, nbt?: NBTData): string;
    /**
     * Teleport the/an entity somewhere
     * @param location The location where the entity will be teleported
     * @param entity The entity to teleport (if unset, it will take this entity)
     * @param facing The rotation of the entity
     */
    teleport(location: coordonate | Entity | "self", entity?: Entity, facing?: {
        entity: Entity;
        face?: "eyes" | "feet";
    } | {
        value: [Position | number | string, Position | number | string];
    }): string;
    /**
     * Manage the entity's inventory
     */
    inventory: {
        /**
         * Give an item to the entity
         * @param item The item to give
         * @param count The amount of this item to give (default: `1`)
         * @param itemsData The data of this item
         */
        give: (item: string, count?: number, itemsData?: NBTData) => string;
        /**
         * Clear an item or the total entity's inventory
         * @param item The item to remove (if unset, will clear all the entity's inventory)
         * @param max The maximum of this item to clear
         */
        clear: (item?: gameTag | string, max?: number) => string;
        /**
         * Place an item in a specific slot of the entity's inventory
         * @param slot The slot's number to set the item in
         * @param item The item
         * @param count The amount of this item to set
         * @note You can use the `PlayerInventorySlots` slot variable to help you choosing the slot's number
         */
        place: (slot: number, item: string, count?: number) => string;
    };
    /**
     * Add an effect to the entity
     * @param effect The effect to give
     */
    addEffect(effect: Effect): string;
    /**
     * Remove an effect to this entity
     * @param effect The effect to remove
     */
    removeEffect(effect: Effect): string;
    /**
     * Remove all the effect of this entity
     */
    removeEffects(): string;
    /**
     * Execute a command with the entity aligned on the block where it is
     * @param x If the execution will be aligned on the x axis
     * @param y If the execution will be aligned on the y axis
     * @param z If the execution will be aligned on the z axis
     * @param command The command to execute
     */
    align(x: boolean, y: boolean, z: boolean, command: Command): string;
    /**
     * Kill this entity
     */
    kill(): string;
    render(): string;
}
/**
 * Represent a world's player
 * @extends Entity
 */
declare class Player extends Entity {
    constructor(type: playerType, selector?: selector);
    /**
     * Set the player operator or not
     * @param op If the player is an operator
     */
    setOperator(op: boolean): Command;
    /**
     * Kick the player of the server/map
     * @param reason The reason the player has been kicked for
     */
    kick(reason?: string): string;
    /**
     * Ban the player of the server
     * @param reason The reason the player has been banned for
     */
    ban(reason?: string): string;
}
export { Entity, Player, PlayerInventorySlots };
