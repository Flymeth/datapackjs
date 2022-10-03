import { ressourceLocation } from "../../utils/ressourceLocation";
import { Command, Commands } from "../function";
import { mcDefaultColors } from "./display";
import { JsonRaw } from "./jsonraw";
import { Entity } from "./selector";
declare type bbOptions = {
    display: JsonRaw;
    max: number;
    value?: number;
    visible?: boolean;
    color: mcDefaultColors;
    /**
     * The bossbar's format:
     *
     * `6`: The bossbar will be splited into 6 "checkpoints"\
     * `10`: The bossbar will be splited into 10 "checkpoints"\
     * `12`: The bossbar will be splited into 12 "checkpoints"\
     * `20`: The bossbar will be splited into 20 "checkpoints"\
     * `null`: The bossbar willn't be splited
     */
    splited: 6 | 10 | 12 | 20 | null;
};
/**
 * Represent a bossbar
 */
declare class Bossbar {
    id: string;
    settings: bbOptions;
    /**
     * @param id The id of the bossbar
     * @param options The bossbar's option
     */
    constructor(id: ressourceLocation, options: bbOptions);
    /**
     * Create the bossbar
     * @param force If another bossbar has the same Id, removes it then create this one
     */
    create(force: boolean): Commands;
    /**
     * Delete the bossbar
     */
    remove(): Command;
    /**
     * Get a value of the bossbar
     * @param type The data of the bossbar's you want: \
     * `max`: The maximum value of the bossbar \
     * `players`: The players who can see the bossbar \
     * `value`: The current bossbar's value \
     * `visible`: If the bossbar is visible or not \
     * `bossbars`: The list of all the bossbars
     */
    get(type: "max" | "players" | "value" | "visible" | "bossbars"): Command;
    /**
     * Store a value to the bossbar
     */
    store: {
        /**
         * Store the execution's result into the bossbar's value
         * @param type The type of result you want:
         *
         * `success`: If the command has been correcly executed, it will returns `1`, else `0`
         *
         * `result`: Will returns the callback of the executed command
         * @param from The command to get the result
         */
        value: (type: "result" | "success", from: Command) => string;
        /**
         * Store the execution's result into the maximum bossbar's value
         * @param type The type of result you want:
         *
         * `success`: If the command has been correcly executed, it will returns `1`, else `0`
         *
         * `result`: Will returns the callback of the executed command
         * @param from The command to get the result
         */
        max: (type: "result" | "success", from: Command) => string;
    };
    /**
     * Edit the bossbar's properties
     */
    edit: {
        /**
         * How the player will see the bossbar's name
         * @param content Json formated text
         */
        display: (content: JsonRaw) => string;
        /**
         * The color of the bossbar
         * @param content The bossbar's color
         */
        color: (content: mcDefaultColors) => string;
        /**
         * The maximum value of the bossbar
         */
        max: (value: number) => string;
        /**
         * Set the bossbar's visibility
         * @param entity The entity that can see the bossbar (if the value is `false` or `undefined`, the bossbar will be invisible for everyone)
         */
        visible: (entity?: Entity | false) => string[] | "bossbar modify visible false";
        /**
         * Set the bossbar's value
         */
        value: (value: number) => string;
        /**
         * Update the bossbar with every property in one time
         */
        update: () => string[];
    };
}
export { Bossbar };
