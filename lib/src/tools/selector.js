"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerInventorySlots = exports.Player = exports.Entity = void 0;
const function_1 = require("../function");
const blocks_1 = require("./blocks");
const nbt_1 = require("./nbt");
const execute_1 = __importDefault(require("../../utils/execute"));
const tag_1 = __importDefault(require("../tag"));
function toEntityType(t) {
    switch (t) {
        case "all":
            return "all players";
        case "nearest":
            return "nearest player";
        case "random":
            return "random player";
        default: return t;
    }
}
function sortToLetter(sort) {
    switch (sort) {
        case "nearest":
            return ["p"];
        case "random":
            return ["r"];
        case "arbitrary":
            return ["a", "e"];
        default: return [];
    }
}
const PlayerInventorySlots = {
    armor: {
        helmet: 103,
        chestplate: 102,
        leggings: 101,
        boots: 100
    },
    inventory: {
        craft: {
            tl: 80,
            tr: 81,
            bl: 82,
            br: 83
        },
        navbar: {
            slots: {
                1: 0,
                2: 1,
                3: 2,
                4: 3,
                5: 4,
                6: 5,
                7: 6,
                8: 7,
                9: 8
            },
            secondHand: 40
        },
        other: {
            lines: {
                1: {
                    1: 9,
                    2: 10,
                    3: 11,
                    4: 12,
                    5: 13,
                    6: 14,
                    7: 15,
                    8: 16,
                    9: 17
                },
                2: {
                    1: 18,
                    2: 19,
                    3: 20,
                    4: 21,
                    5: 22,
                    6: 23,
                    7: 24,
                    8: 25,
                    9: 26
                },
                3: {
                    1: 27,
                    2: 28,
                    3: 29,
                    4: 30,
                    5: 31,
                    6: 32,
                    7: 33,
                    8: 34,
                    9: 35
                }
            },
            colums: {
                1: {
                    1: 9,
                    2: 18,
                    3: 27
                },
                2: {
                    1: 10,
                    2: 19,
                    3: 28
                },
                3: {
                    1: 11,
                    2: 20,
                    3: 29
                },
                4: {
                    1: 12,
                    2: 21,
                    3: 30
                },
                5: {
                    1: 13,
                    2: 22,
                    3: 31
                },
                6: {
                    1: 14,
                    2: 23,
                    3: 32
                },
                7: {
                    1: 15,
                    2: 24,
                    3: 33
                },
                8: {
                    1: 16,
                    2: 25,
                    3: 34
                },
                9: {
                    1: 14,
                    2: 26,
                    3: 35
                },
            }
        }
    }
};
exports.PlayerInventorySlots = PlayerInventorySlots;
/**
 * Represent an world's entity
 */
class Entity {
    constructor(type, selector) {
        /**
         * Manage the entity's nbt
         */
        this.nbt = {
            /**
             * Get a nbt of this entity
             * @param path The path to the entity's NBT
             * @param scale The scale to multiply the request NBT after get it
             */
            get: (path, scale) => {
                return `data get entity ${this.render() + (path ? ` ${path.render()}` : "") + (scale ? ` ${scale}` : "")}`;
            },
            /**
             * Set a nbt for this entity
             * @param value The value to set to this NBT
             * @param path The path to the entity's NBT
             */
            set: (value, path) => {
                if (!path)
                    return `data merge entity ${this.render()} ${value instanceof nbt_1.NBTData ? value.render() : JSON.stringify({ data: value })}`;
                return `data modify entity ${this.render()} ${path.render()} ${value instanceof nbt_1.NBTData ? value.render() : value}`;
            },
            /**
             * Store data from a command
             * @param path The path to the entity's NBT
             * @param type The type of result you want: \
             * `success`: If the command has been correcly executed, it will returns `1`, else `0` \
             * `result`: Will returns the callback of the executed command
             * @param from The command
             */
            store: (path, type, scale, from) => {
                if (this.isMultipleEntities())
                    throw new Error(`${this.render()} can be multiples entities!`);
                function getStoreCmd(e) {
                    return (0, execute_1.default)(`store ${type} entity ${e.render()} ${path.render()} double ${scale} run`, from);
                }
                if (this.isMultipleEntities())
                    return this.execute(false, (e) => [getStoreCmd(e)])[0];
                else
                    return getStoreCmd(this);
            }
        };
        /**
         * Manage the entity's tags
         */
        this.tags = {
            /**
             * Add tags to the entity
             */
            add: (...names) => {
                return names.map(name => `tag ${this.render()} add ${name}`);
            },
            /**
             * Remove tags to the entity
             */
            remove: (...names) => {
                return names.map(name => `tag ${this.render()} remove ${name}`);
            },
            /**
             * Replace a tag to the entity
             * @param from The tag to replace
             * @param to The tag to replace with
             */
            replace: (from, to) => {
                return [
                    ...this.tags.remove(from),
                    ...this.tags.add(to)
                ];
            }
        };
        /**
         * Manage the entity's inventory
         */
        this.inventory = {
            /**
             * Give an item to the entity
             * @param item The item to give
             * @param count The amount of this item to give (default: `1`)
             * @param itemsData The data of this item
             */
            give: (item, count, itemsData) => {
                return `give ${this.render()} ${count || 1} ${item + ((itemsData === null || itemsData === void 0 ? void 0 : itemsData.render()) || "")}`;
            },
            /**
             * Clear an item or the total entity's inventory
             * @param item The item to remove (if unset, will clear all the entity's inventory)
             * @param max The maximum of this item to clear
             */
            clear: (item, max) => {
                if (!item)
                    return `clear ${this.render()}`;
                if (item instanceof tag_1.default && item.type !== "items")
                    throw new Error(`This is not an item tag!`);
                return `clear ${this.render()} ${(item instanceof tag_1.default ? item.render() : item) + (max !== undefined ? ` ${max}` : "")}`;
            },
            /**
             * Place an item in a specific slot of the entity's inventory
             * @param slot The slot's number to set the item in
             * @param item The item
             * @param count The amount of this item to set
             * @note You can use the `PlayerInventorySlots` slot variable to help you choosing the slot's number
             */
            place: (slot, item, count) => {
                return `item replace ${this.render()} ${slot} with ${item + (count ? count : 1)}`;
            }
        };
        this.type = type;
        this.selector = selector || {};
        if (this.isPlayerType() && !(this instanceof Player)) {
            const toPlayerType = {
                "a": "all",
                "p": "nearest",
            };
            return new Player(toPlayerType[this.letterSelector()], selector);
        }
    }
    isPlayerType() {
        return ["a", "p"].find(l => l === this.letterSelector());
    }
    advanceSelector() {
        var _a, _b;
        if (!this.selector)
            return "";
        const allSelectors = [];
        if (this.selector.type && !this.isPlayerType)
            allSelectors.push(`type=${this.selector.type}`);
        if (this.selector.limit)
            allSelectors.push(`limit=${this.selector.limit}`);
        if (this.selector.area)
            for (const axe in this.selector.area)
                if (this.selector.area[axe] !== undefined)
                    allSelectors.push(`d${axe}=${this.selector.area[axe]}`);
        if (this.selector.distance)
            allSelectors.push(`distance=${this.selector.distance.render()}`);
        if (this.selector.gamemodes)
            for (const gm of this.selector.gamemodes)
                allSelectors.push(`gamemode=${gm}`);
        if (this.selector.level)
            allSelectors.push(`level=${this.selector.level.render()}`);
        if (this.selector.name)
            allSelectors.push(`name="${this.selector.name}"`);
        if (this.selector.nbt)
            allSelectors.push(`nbt=${JSON.stringify(this.selector.nbt.render())}`);
        if (this.selector.positionned)
            for (const axe in this.selector.positionned)
                if (this.selector.positionned[axe] !== undefined)
                    allSelectors.push(`${axe}=${this.selector.positionned[axe]}`);
        if (this.selector.rotation)
            for (const axe in this.selector.rotation)
                if (this.selector.rotation[axe] !== undefined)
                    allSelectors.push(`${axe}_rotation=${(_a = this.selector.rotation[axe]) === null || _a === void 0 ? void 0 : _a.render()}`);
        if ((_b = this.selector.scores) === null || _b === void 0 ? void 0 : _b.length) {
            const scores = [];
            for (const { scoreboard, value } of this.selector.scores)
                scores.push(`${scoreboard.name}=${value.render()}`);
            allSelectors.push(`scores={${scores.join(',')}}`);
        }
        if (this.selector.sort) {
            const letter = this.letterSelector();
            if (!sortToLetter(this.selector.sort).find(l => l === letter))
                allSelectors.push(`sort=${this.selector.sort}`);
        }
        if (this.selector.tags)
            for (const name of this.selector.tags)
                allSelectors.push(`tag=${name}`);
        if (this.selector.team !== undefined)
            allSelectors.push(`team=${this.selector.team === null ? "" : this.selector.team.name}`);
        const selectorValue = allSelectors.join(',');
        if (!selectorValue)
            return "";
        else
            return `[${allSelectors.join(',')}]`;
    }
    isMultipleEntities() {
        const letter = this.letterSelector();
        return !["p", "s"].find(l => l === letter) && this.selector.limit !== 1 && !(letter === "a" && this.selector.name);
    }
    letterSelector() {
        switch (this.type) {
            case "all entities":
                return "e";
            case "all players":
                return "a";
            case "nearest player":
                return "p";
            case "random player":
                return "r";
            case "self":
                return "s";
            default:
                return "e";
        }
    }
    /**
     * Execute some commands as this entity
     * @param at If the execution take care of the player's position
     * @param executor The function where the execute is made by this entity (the return result need to be an array of commands)
     */
    execute(at, executor) {
        return (0, function_1.processCommands)(executor(new Entity("self")))
            .map(cmd => (0, execute_1.default)(`as ${this.render() + (at ? " at @s" : "")}`, cmd));
    }
    /**
     * If the entity isn't a "player-type", spawn it at the given location
     * @param position The position where the entity will spawn
     * @param nbt Custom nbt to give to the entity when spawning
     */
    spawn(position, nbt) {
        var _a;
        if (this.type !== "all entities")
            throw new Error(`Cannot spawn another thing than an entity! ("${this.type}" cannot be spawned)`);
        if (!((_a = this.selector) === null || _a === void 0 ? void 0 : _a.type))
            throw new Error(`Please indicate the type of the entity to spawn!`);
        return `summon ${this.selector.type} ${position.render() + (nbt ? " " + nbt.render() : "")}`;
    }
    /**
     * Teleport the/an entity somewhere
     * @param location The location where the entity will be teleported
     * @param entity The entity to teleport (if unset, it will take this entity)
     * @param facing The rotation of the entity
     */
    teleport(location, entity, facing) {
        var _a;
        const parseLocation = (location === "self" ? "@s" : ((location instanceof Entity) ? location.render() : (0, blocks_1.renderCoordonates)(location).join(' ')));
        const parsedEntity = (entity === null || entity === void 0 ? void 0 : entity.render()) || "";
        const parsedFacing = (facing ? ("entity" in facing ? facing.entity.render() + (facing.face !== "eyes" ? ` ${facing.face}` : "") : (_a = facing.value) === null || _a === void 0 ? void 0 : _a.map(e => (e instanceof blocks_1.Position ? e.render() : e)).join(' ')) : "");
        if (parseLocation && parsedEntity && parsedFacing)
            return `tp ${parsedEntity} ${parseLocation} ${parsedFacing}`;
        else if (!parsedFacing)
            return `tp ${parsedEntity} ${parseLocation}`;
        else if (!parsedEntity)
            return `tp @s ${parseLocation} ${parsedFacing}`;
        else
            return `tp ${parseLocation}`;
    }
    /**
     * Add an effect to the entity
     * @param effect The effect to give
     */
    addEffect(effect) {
        return effect.give(this);
    }
    /**
     * Remove an effect to this entity
     * @param effect The effect to remove
     */
    removeEffect(effect) {
        return effect.remove(this);
    }
    /**
     * Remove all the effect of this entity
     */
    removeEffects() {
        return `effect clear ${this.render()}`;
    }
    /**
     * Execute a command with the entity aligned on the block where it is
     * @param x If the execution will be aligned on the x axis
     * @param y If the execution will be aligned on the y axis
     * @param z If the execution will be aligned on the z axis
     * @param command The command to execute
     */
    align(x, y, z, command) {
        if (!(x || y || z))
            throw new Error(`When invoking this command, you must at least set true one of the 3 coordonates directions`);
        return (0, execute_1.default)(`align ${(x ? "x" : "") + (y ? "y" : "") + (z ? "z" : "")}`, command);
    }
    /**
     * Kill this entity
     */
    kill() {
        return `kill ${this.render()}`;
    }
    render() {
        if (this.selector.type === "minecraft:player" && this.selector.name)
            return this.selector.name;
        return `@${this.letterSelector() + this.advanceSelector()}`;
    }
}
exports.Entity = Entity;
/**
 * Represent a world's player
 * @extends Entity
 */
class Player extends Entity {
    constructor(type, selector) {
        if (!selector)
            selector = {};
        delete selector.type;
        super(toEntityType(type), selector);
    }
    /**
     * Set the player operator or not
     * @param op If the player is an operator
     */
    setOperator(op) {
        if (op)
            return `op ${this.render()}`;
        else
            return `deop ${this.render()}`;
    }
    /**
     * Kick the player of the server/map
     * @param reason The reason the player has been kicked for
     */
    kick(reason) {
        return `kick ${this.render() + (reason ? ` ${reason}` : "")}`;
    }
    /**
     * Ban the player of the server
     * @param reason The reason the player has been banned for
     */
    ban(reason) {
        return `ban ${this.render() + (reason ? ` ${reason}` : "")}`;
    }
}
exports.Player = Player;
