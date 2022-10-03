import { Command } from "../function";
import { JsonRaw } from "./jsonraw";
import { Entity } from "./selector";
import { Team } from "./team";
declare type sbTypes = "dummy" | "trigger" | "deathCount" | "playerKillCount" | "totalKillCount" | "health" | "xp" | "level" | "food" | "air" | "armor" | string;
declare type sbSettings = {
    type: sbTypes;
    display?: JsonRaw;
};
declare type sbOpertations = "add" | "substract" | "multiply" | "divide" | "module" | "set" | "minimum" | "maximum" | "swaps";
declare type sbLocation = "sidebar" | "list" | "belowName" | Team;
/**
 * Represent a scoreboard
 */
declare class Scoreboard {
    name: string;
    options: sbSettings;
    /**
     * @param name The name of the scoreboard
     */
    constructor(name: string, options?: sbSettings);
    /**
     * Create the scoreboard
     * @param force If `true`, it will deletes all the same scoreboard's name then create this one
     */
    create(force?: boolean): string | string[];
    /**
     * Remove the scoreboard
     */
    delete(): string;
    /**
     * Manage the player's value of the scoreboard
     */
    players?: {
        /**
         * Set the value of an entity
         * @param entity The value to set to
         * @param value The value
         */
        set: (entity: Entity | string, value: number) => string;
        /**
         * Add a value to an entity
         * @param entity The value to set to
         * @param value The value to add to the current entity's score
         */
        add: (entity: Entity | string, value: number) => string;
        /**
         * Subtract a value to an entity
         * @param entity The value to set to
         * @param value The value to remove to the current entity's score
         */
        subtract: (entity: Entity, value: number) => string;
        /**
         * Get the value of an entity
         * @param entity The entity to get the value for
         */
        get: (entity: Entity | string) => Command;
        /**
         * Store a command execute to an entity's value
         * @param entity The value to set to
         * @param type The type of result you want: \
         * `success`: If the command has been correcly executed, it will returns `1`, else `0` \
         * `result`: Will returns the callback of the executed command
         * @param from The command to execute
         */
        store: (entity: Entity | string, type: "result" | "success", from: string) => Command;
        /**
         * Set a value relatively from another entity
         * @param entity The entity to modify the value
         * @param operation The operation before set the value
         * @param target The target entity to get the value for
         */
        operation: (entity: Entity | string, operation: sbOpertations, target: {
            scoreboard: Scoreboard;
            entity: Entity | string;
        }) => Command;
        /**
         * If the scoreboard is a trigger, enable it for some entities
         * @param entity Entity to enable trigger for
         */
        enable: (entity: Entity) => Command;
        /**
         * Delete/reset the score of an entity
         * @param entity The entity to delete the score to
         */
        delete: (entity: Entity | string) => Command;
    } | undefined;
    /**
     * Edit the scoreboard
     */
    edit: {
        /**
         * Edit the displayed name of the scoreboard
         * @param display The new displayed name
         */
        rename: (display: JsonRaw | "") => string;
        /**
         * Set the scoreboard position
         * @param location The location to show the scoreboard to
         */
        show: (location: sbLocation) => string;
        /**
         * Hide the scoreboard
         */
        hide: () => string;
    };
}
export { Scoreboard };
