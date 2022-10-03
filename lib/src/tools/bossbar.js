"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bossbar = void 0;
const execute_1 = __importDefault(require("../../utils/execute"));
const ressourceLocation_1 = require("../../utils/ressourceLocation");
/**
 * Represent a bossbar
 */
class Bossbar {
    /**
     * @param id The id of the bossbar
     * @param options The bossbar's option
     */
    constructor(id, options) {
        /**
         * Store a value to the bossbar
         */
        this.store = {
            /**
             * Store the execution's result into the bossbar's value
             * @param type The type of result you want:
             *
             * `success`: If the command has been correcly executed, it will returns `1`, else `0`
             *
             * `result`: Will returns the callback of the executed command
             * @param from The command to get the result
             */
            value: (type, from) => {
                return (0, execute_1.default)(`execute store ${type} bossbar ${this.id} value run`, from);
            },
            /**
             * Store the execution's result into the maximum bossbar's value
             * @param type The type of result you want:
             *
             * `success`: If the command has been correcly executed, it will returns `1`, else `0`
             *
             * `result`: Will returns the callback of the executed command
             * @param from The command to get the result
             */
            max: (type, from) => {
                return (0, execute_1.default)(`execute store ${type} bossbar ${this.id} max run`, from);
            }
        };
        /**
         * Edit the bossbar's properties
         */
        this.edit = {
            /**
             * How the player will see the bossbar's name
             * @param content Json formated text
             */
            display: (content) => {
                this.settings.display = content;
                return `bossbar modify name ${content.render()}`;
            },
            /**
             * The color of the bossbar
             * @param content The bossbar's color
             */
            color: (content) => {
                this.settings.color = content;
                return `bossbar modify color ${content}`;
            },
            /**
             * The maximum value of the bossbar
             */
            max: (value) => {
                this.settings.max = value;
                return `bossbar modify max ${value}`;
            },
            /**
             * Set the bossbar's visibility
             * @param entity The entity that can see the bossbar (if the value is `false` or `undefined`, the bossbar will be invisible for everyone)
             */
            visible: (entity) => {
                if (!entity) {
                    this.settings.visible = false;
                    return `bossbar modify visible false`;
                }
                else {
                    this.settings.visible = true;
                    return [`bossbar modify visible true`, `bossbar modify players ${entity.render()}`];
                }
            },
            /**
             * Set the bossbar's value
             */
            value: (value) => {
                this.settings.value = value;
                return `bossbar modify value ${value}`;
            },
            /**
             * Update the bossbar with every property in one time
             */
            update: () => {
                const modifyCommands = [];
                modifyCommands.push(`name ${this.settings.display.render()}`);
                modifyCommands.push(`max ${this.settings.max}`);
                modifyCommands.push(`value ${this.settings.value || 0}`);
                modifyCommands.push(`color ${this.settings.color}`);
                modifyCommands.push(`visible ${!!this.settings.visible}`);
                modifyCommands.push(`style ${this.settings.splited ? `notched_${this.settings.splited}` : "progress"}`);
                return modifyCommands.map(cmd => `bossbar modify ${cmd}`);
            }
        };
        if (!(0, ressourceLocation_1.isRessourceLocationValid)(id))
            throw new Error(`"${id}" is not a valid bossbar id!`);
        this.id = id;
        this.settings = options;
    }
    /**
     * Create the bossbar
     * @param force If another bossbar has the same Id, removes it then create this one
     */
    create(force) {
        const cmd = `bossbar add ${this.id} ${this.settings.display.render()}`;
        if (force)
            return [this.remove(), cmd, ...this.edit.update()];
        else
            return [cmd, ...this.edit.update()];
    }
    /**
     * Delete the bossbar
     */
    remove() {
        return `bossbar remove ${this.id}`;
    }
    /**
     * Get a value of the bossbar
     * @param type The data of the bossbar's you want: \
     * `max`: The maximum value of the bossbar \
     * `players`: The players who can see the bossbar \
     * `value`: The current bossbar's value \
     * `visible`: If the bossbar is visible or not \
     * `bossbars`: The list of all the bossbars
     */
    get(type) {
        if (type === "bossbars")
            return `bossbar list`;
        return `bossbar get ${this.id} ${type}`;
    }
}
exports.Bossbar = Bossbar;
