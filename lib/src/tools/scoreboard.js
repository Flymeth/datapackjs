"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scoreboard = void 0;
const execute_1 = __importDefault(require("../../utils/execute"));
const selector_1 = require("./selector");
const team_1 = require("./team");
const unmodifiableSB = ["health", "xp", "level", "food", "air", "armor"];
/**
 * Represent a scoreboard
 */
class Scoreboard {
    /**
     * @param name The name of the scoreboard
     */
    constructor(name, options) {
        /**
         * Manage the player's value of the scoreboard
         */
        this.players = {
            /**
             * Set the value of an entity
             * @param entity The value to set to
             * @param value The value
             */
            set: (entity, value) => {
                return `scoreboard players set ${entity instanceof selector_1.Entity ? entity.render() : entity} ${this.name} ${Math.floor(value)}`;
            },
            /**
             * Add a value to an entity
             * @param entity The value to set to
             * @param value The value to add to the current entity's score
             */
            add: (entity, value) => {
                return `scoreboard players add ${entity instanceof selector_1.Entity ? entity.render() : entity} ${this.name} ${Math.floor(value)}`;
            },
            /**
             * Subtract a value to an entity
             * @param entity The value to set to
             * @param value The value to remove to the current entity's score
             */
            subtract: (entity, value) => {
                return `scoreboard players remove ${entity instanceof selector_1.Entity ? entity.render() : entity} ${this.name} ${Math.floor(value)}`;
            },
            /**
             * Get the value of an entity
             * @param entity The entity to get the value for
             */
            get: (entity) => {
                return `scoreboard players get ${entity instanceof selector_1.Entity ? entity.render() : entity} ${this.name}`;
            },
            /**
             * Store a command execute to an entity's value
             * @param entity The value to set to
             * @param type The type of result you want: \
             * `success`: If the command has been correcly executed, it will returns `1`, else `0` \
             * `result`: Will returns the callback of the executed command
             * @param from The command to execute
             */
            store: (entity, type, from) => {
                if (entity instanceof selector_1.Entity && entity.isMultipleEntities())
                    throw new Error(`${entity.render()} can select multiples entities!`);
                const getCommand = (e, from) => {
                    return (0, execute_1.default)(`store ${type} score ${e instanceof selector_1.Entity ? e.render() : e} ${this.name} run`, from);
                };
                return getCommand(entity, from);
            },
            /**
             * Set a value relatively from another entity
             * @param entity The entity to modify the value
             * @param operation The operation before set the value
             * @param target The target entity to get the value for
             */
            operation: (entity, operation, target) => {
                const operations = {
                    "add": "+=",
                    "substract": "-=",
                    "multiply": "*=",
                    "divide": "/=",
                    "module": "%=",
                    "set": "=",
                    "minimum": "<",
                    "maximum": ">",
                    "swaps": "><"
                };
                if (!operations[operation])
                    throw new Error(`Invalid operator!`);
                return `scoreboard players operation ${entity instanceof selector_1.Entity ? entity.render() : entity} ${this.name} ${operations[operation]} ${target.entity instanceof selector_1.Entity ? target.entity.render() : target.entity} ${target.scoreboard.name}`;
            },
            /**
             * If the scoreboard is a trigger, enable it for some entities
             * @param entity Entity to enable trigger for
             */
            enable: (entity) => {
                if (this.options.type !== "trigger")
                    throw new Error(`Only trigger scoreboards can use this command!`);
                return `scoreboard players enable ${entity.render()} ${this.name}`;
            },
            /**
             * Delete/reset the score of an entity
             * @param entity The entity to delete the score to
             */
            delete: (entity) => {
                return `scoreboard players reset ${entity instanceof selector_1.Entity ? entity.render() : entity}`;
            }
        };
        /**
         * Edit the scoreboard
         */
        this.edit = {
            /**
             * Edit the displayed name of the scoreboard
             * @param display The new displayed name
             */
            rename: (display) => {
                this.options.display = display || undefined;
                return `scoreboard objectives modify ${this.name} displayname ${this.options.display ? this.options.display.render() : ""}`;
            },
            /**
             * Set the scoreboard position
             * @param location The location to show the scoreboard to
             */
            show: (location) => {
                var _a;
                return `scoreboard objectives setdisplay ${location instanceof team_1.Team ? `sidebar.team.${(_a = location.settings) === null || _a === void 0 ? void 0 : _a.color}` : location}`;
            },
            /**
             * Hide the scoreboard
             */
            hide: () => {
                return `scoreboard objectives setdisplay ${this.name}`;
            }
        };
        this.name = name;
        this.options = options || { type: "dummy" };
        const { type } = this.options;
        if (unmodifiableSB.find(e => e === type))
            delete this.players;
    }
    /**
     * Create the scoreboard
     * @param force If `true`, it will deletes all the same scoreboard's name then create this one
     */
    create(force) {
        const add = `scoreboard objectives add ${this.name} ${this.options.type}` + (this.options.display ? " " + this.options.display.render() : "");
        return (force ? [this.delete(), add] : add);
    }
    /**
     * Remove the scoreboard
     */
    delete() {
        return `scoreboard objectives remove ${this.name}`;
    }
}
exports.Scoreboard = Scoreboard;
