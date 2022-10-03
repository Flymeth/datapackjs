import { NBTData, JsonRaw } from "../tools"
import { ressourceLocation, isRessourceLocationValid } from "../utils/ressourceLocation"
import gameFunction from "./function"
import gameLootTable from "./loottable"
import gameRecipe from "./recipe"

type AdvCondition = {
    /**
     * The name of the condition
     */
    name: string,
    /**
     * See https://minecraft.fandom.com/wiki/Advancement/JSON_format#List_of_triggers
     */
    trigger: string,
    /**
     * The trigger data requirement
     */
    data: object
}
type AdvRewards = {
    /**
     * Recipies to unlock
     */
    recipes?: gameRecipe[],
    /**
     * Loot given to the player
     */
    loots?: gameLootTable[],
    /**
     * Amount of experiance given to the player
     */
    experiences?: number,
    /**
     * Function to execute as the player
     */
    function: gameFunction
}
type AdvOptions = {
    display?: {
        /**
         * The advancement icon (a game's item)
         */
        icon?: {
            /**
             * The name of the item
             */
            name: string,
            /**
             * Data to add to this item
             */
            nbt: NBTData
        },
        /**
         * Title of the advancement
         */
        title?: JsonRaw | string
    },
    type?: "challenge" |  "goal" | "task",
    description?: JsonRaw | string,
    whenComplete?: {
        /**
         * Whether to show a toast to the player when this advancement has been completed
         */
        toast?: boolean,
        /**
         * Whether to announce in the chat when this advancement has been completed
         */
        announce?: boolean
    },
    /**
     * Whether to hide this advancement and all its children from the advancement screen until this advancement have been completed
     */
    isSecret?: boolean,
    /**
     * The parent advancement directory of this advancement. If absent, this advancement is a root advancement. Circular references cause a loading failure
     */
    parent?: string,
    /**
     * Conditions that need to be made to unlock the advancement 
     */
    conditions: AdvCondition[],
    rewards: AdvRewards
}
/**
 * Represent an advancement
 * @link
 * https://minecraft.fandom.com/wiki/Advancement
 * https://minecraft.fandom.com/wiki/Advancement/JSON_format
 */
class gameAdvancement {
    readonly ObjectType = "Advancement"
    name: string
    namespace: string | undefined
    options: AdvOptions
    /**
     * @param name The name of this advancement
     * @param option The data of the advancement
     */
    constructor(name: ressourceLocation, option: AdvOptions) {
        if(!isRessourceLocationValid(name)) throw new Error("Invalid ressource location!")
        this.name = name
        this.options = option
    }

    editType(newType: "challenge" |  "goal" | "task") {
        this.options.type = newType
        return this
    }
    editBehaviors(isSecret?: boolean, parent?: string, whenComplete?: {toast?: boolean, announce?: boolean}) {
        this.options.isSecret = !!isSecret
        if(parent) this.options.parent = parent
        this.options.whenComplete = whenComplete
        return this
    }
    editReward(newReward: AdvRewards) {
        this.options.rewards = newReward
    }

    conditions = {
        get: () => this.options.conditions,
        add: (...newConditions: AdvCondition[]) : this => {
            this.options.conditions.push(...newConditions)
            return this
        },
        set: (...conditions: AdvCondition[]) : this => {
            this.options.conditions = conditions
            return this
        },
        reset: () : this => {
            this.options.conditions = []
            return this
        },
        remove: (index: number) : this => {
            if(!this.options.conditions[index]) throw new Error(`Cannot find the ${index}th element in conditions!`)
            this.options.conditions.splice(index, 1)
            return this
        }
    }

    render() {
        return `${this.namespace}:${this.name}`
    }
}

export default gameAdvancement