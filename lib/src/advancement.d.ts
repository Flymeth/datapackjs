import { NBTData, JsonRaw } from "../tools";
import { ressourceLocation } from "../utils/ressourceLocation";
import gameFunction from "./function";
import gameLootTable from "./loottable";
import gameRecipe from "./recipe";
declare type AdvCondition = {
    /**
     * The name of the condition
     */
    name: string;
    /**
     * See https://minecraft.fandom.com/wiki/Advancement/JSON_format#List_of_triggers
     */
    trigger: string;
    /**
     * The trigger data requirement
     */
    data: object;
};
declare type AdvRewards = {
    /**
     * Recipies to unlock
     */
    recipes?: gameRecipe[];
    /**
     * Loot given to the player
     */
    loots?: gameLootTable[];
    /**
     * Amount of experiance given to the player
     */
    experiences?: number;
    /**
     * Function to execute as the player
     */
    function: gameFunction;
};
declare type AdvOptions = {
    display?: {
        /**
         * The advancement icon (a game's item)
         */
        icon?: {
            /**
             * The name of the item
             */
            name: string;
            /**
             * Data to add to this item
             */
            nbt: NBTData;
        };
        /**
         * Title of the advancement
         */
        title?: JsonRaw | string;
    };
    type?: "challenge" | "goal" | "task";
    description?: JsonRaw | string;
    whenComplete?: {
        /**
         * Whether to show a toast to the player when this advancement has been completed
         */
        toast?: boolean;
        /**
         * Whether to announce in the chat when this advancement has been completed
         */
        announce?: boolean;
    };
    /**
     * Whether to hide this advancement and all its children from the advancement screen until this advancement have been completed
     */
    isSecret?: boolean;
    /**
     * The parent advancement directory of this advancement. If absent, this advancement is a root advancement. Circular references cause a loading failure
     */
    parent?: string;
    /**
     * Conditions that need to be made to unlock the advancement
     */
    conditions: AdvCondition[];
    rewards: AdvRewards;
};
/**
 * Represent an advancement
 * @link
 * https://minecraft.fandom.com/wiki/Advancement
 * https://minecraft.fandom.com/wiki/Advancement/JSON_format
 */
declare class gameAdvancement {
    readonly ObjectType = "Advancement";
    name: string;
    namespace: string | undefined;
    options: AdvOptions;
    /**
     * @param name The name of this advancement
     * @param option The data of the advancement
     */
    constructor(name: ressourceLocation, option: AdvOptions);
    editType(newType: "challenge" | "goal" | "task"): this;
    editBehaviors(isSecret?: boolean, parent?: string, whenComplete?: {
        toast?: boolean;
        announce?: boolean;
    }): this;
    editReward(newReward: AdvRewards): void;
    conditions: {
        get: () => AdvCondition[];
        add: (...newConditions: AdvCondition[]) => this;
        set: (...conditions: AdvCondition[]) => this;
        reset: () => this;
        remove: (index: number) => this;
    };
    render(): string;
}
export default gameAdvancement;
