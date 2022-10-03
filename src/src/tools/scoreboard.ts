import executeCmd from "../../utils/execute"
import { Command } from "../function"
import { JsonRaw } from "./jsonraw"
import { Entity } from "./selector"
import { Team } from "./team"

type sbTypes = "dummy" | "trigger" | "deathCount" | "playerKillCount" | "totalKillCount" | "health" | "xp" | "level" | "food" | "air" | "armor" | string
type sbSettings = {
    type: sbTypes,
    display?: JsonRaw
}
type sbOpertations = "add" | "substract" | "multiply" | "divide" | "module" | "set" | "minimum" | "maximum" | "swaps"
type sbLocation = "sidebar" | "list" | "belowName" | Team

const unmodifiableSB = ["health", "xp", "level", "food", "air", "armor"]
/**
 * Represent a scoreboard
 */
class Scoreboard {
    name: string
    options: sbSettings
    /**
     * @param name The name of the scoreboard
     */
    constructor(name: string, options?: sbSettings) {
        this.name = name
        this.options = options || {type: "dummy"}
        const {type} = this.options
        if(unmodifiableSB.find(e => e === type)) delete this.players
    }

    /**
     * Create the scoreboard
     * @param force If `true`, it will deletes all the same scoreboard's name then create this one
     */
    create(force?: boolean) {
        const add = `scoreboard objectives add ${this.name} ${this.options.type}` + (this.options.display ? " " + this.options.display.render() : "")
        return (force ? [this.delete(), add] : add)
    }
    /**
     * Remove the scoreboard
     */
    delete() {
        return `scoreboard objectives remove ${this.name}`
    }

    /**
     * Manage the player's value of the scoreboard
     */
    players? = {
        /**
         * Set the value of an entity
         * @param entity The value to set to
         * @param value The value
         */
        set: (entity: Entity | string, value: number) => {
            return `scoreboard players set ${entity instanceof Entity ? entity.render() : entity} ${this.name} ${Math.floor(value)}`
        },
        /**
         * Add a value to an entity
         * @param entity The value to set to
         * @param value The value to add to the current entity's score
         */
        add: (entity: Entity | string, value: number) => {
            return `scoreboard players add ${entity instanceof Entity ? entity.render() : entity} ${this.name} ${Math.floor(value)}`
        },
        /**
         * Subtract a value to an entity
         * @param entity The value to set to
         * @param value The value to remove to the current entity's score
         */
        subtract: (entity: Entity, value: number) => {
            return `scoreboard players remove ${entity instanceof Entity ? entity.render() : entity} ${this.name} ${Math.floor(value)}`
        },
        /**
         * Get the value of an entity
         * @param entity The entity to get the value for
         */
        get: (entity: Entity | string): Command => {
            return `scoreboard players get ${entity instanceof Entity ? entity.render() : entity} ${this.name}`
        },
        /**
         * Store a command execute to an entity's value
         * @param entity The value to set to
         * @param type The type of result you want: \
         * `success`: If the command has been correcly executed, it will returns `1`, else `0` \
         * `result`: Will returns the callback of the executed command
         * @param from The command to execute
         */
        store: (entity: Entity | string, type: "result" | "success", from: string): Command => {
            if(entity instanceof Entity && entity.isMultipleEntities()) throw new Error(`${entity.render()} can select multiples entities!`)
            
            const getCommand = (e:Entity | string, from: string) => {
                return executeCmd(`store ${type} score ${e instanceof Entity ? e.render() : e} ${this.name} run`, from)
            }
            return getCommand(entity, from)
        },
        /**
         * Set a value relatively from another entity
         * @param entity The entity to modify the value
         * @param operation The operation before set the value
         * @param target The target entity to get the value for
         */
        operation: (entity: Entity | string, operation: sbOpertations, target: {scoreboard: Scoreboard, entity: Entity | string}): Command => {
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
            }
            if(!operations[operation]) throw new Error(`Invalid operator!`)
            return `scoreboard players operation ${entity instanceof Entity ? entity.render() : entity} ${this.name} ${operations[operation]} ${target.entity instanceof Entity ? target.entity.render() : target.entity} ${target.scoreboard.name}`
        },
        /**
         * If the scoreboard is a trigger, enable it for some entities
         * @param entity Entity to enable trigger for
         */
        enable: (entity: Entity): Command => {
            if(this.options.type !== "trigger") throw new Error(`Only trigger scoreboards can use this command!`)
            return `scoreboard players enable ${entity.render()} ${this.name}`
        },
        /**
         * Delete/reset the score of an entity
         * @param entity The entity to delete the score to
         */
        delete: (entity: Entity | string): Command => {
            return `scoreboard players reset ${entity instanceof Entity ? entity.render() : entity}`
        }
    }

    /**
     * Edit the scoreboard
     */
    edit = {
        /**
         * Edit the displayed name of the scoreboard
         * @param display The new displayed name
         */
        rename: (display: JsonRaw | "") => {
            this.options.display = display || undefined
            return `scoreboard objectives modify ${this.name} displayname ${this.options.display ? this.options.display.render() : ""}`
        },
        /**
         * Set the scoreboard position
         * @param location The location to show the scoreboard to
         */
        show: (location: sbLocation) => {
            return `scoreboard objectives setdisplay ${location instanceof Team ? `sidebar.team.${location.settings?.color}` : location}`
        },
        /**
         * Hide the scoreboard
         */
        hide: () => {
            return `scoreboard objectives setdisplay ${this.name}`
        }
    }
}

export {Scoreboard}