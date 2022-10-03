import executeCmd from "../../utils/execute";
import { ressourceLocation, isRessourceLocationValid } from "../../utils/ressourceLocation";
import { Command, Commands } from "../function";
import { mcDefaultColors } from "./display";
import { JsonRaw } from "./jsonraw";
import { Entity } from "./selector";

type bbOptions = {
    display: JsonRaw,
    max: number,
    value?: number, 
    visible?: boolean,
    color: mcDefaultColors,
    /**
     * The bossbar's format:
     * 
     * `6`: The bossbar will be splited into 6 "checkpoints"\
     * `10`: The bossbar will be splited into 10 "checkpoints"\
     * `12`: The bossbar will be splited into 12 "checkpoints"\
     * `20`: The bossbar will be splited into 20 "checkpoints"\
     * `null`: The bossbar willn't be splited
     */
    splited: 6 | 10 | 12 | 20 | null
}

/**
 * Represent a bossbar
 */
class Bossbar {
    id: string
    settings: bbOptions
    /**
     * @param id The id of the bossbar
     * @param options The bossbar's option
     */
    constructor(id: ressourceLocation, options: bbOptions) {
        if(!isRessourceLocationValid(id)) throw new Error(`"${id}" is not a valid bossbar id!`)
        this.id = id
        this.settings = options
    }

    /**
     * Create the bossbar
     * @param force If another bossbar has the same Id, removes it then create this one
     */
    create(force: boolean): Commands {
        const cmd = `bossbar add ${this.id} ${this.settings.display.render()}`
        if(force) return [this.remove(), cmd, ...this.edit.update()]
        else return [cmd, ...this.edit.update()]
    }
    /**
     * Delete the bossbar
     */
    remove(): Command {
        return `bossbar remove ${this.id}`
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
    get(type: "max" | "players" | "value" | "visible" | "bossbars"): Command {
        if(type === "bossbars") return `bossbar list`
        return `bossbar get ${this.id} ${type}`
    }

    /**
     * Store a value to the bossbar
     */
    store = {
        /**
         * Store the execution's result into the bossbar's value
         * @param type The type of result you want:
         * 
         * `success`: If the command has been correcly executed, it will returns `1`, else `0`
         * 
         * `result`: Will returns the callback of the executed command
         * @param from The command to get the result
         */
        value: (type: "result" | "success", from: Command) => {
            return executeCmd(`execute store ${type} bossbar ${this.id} value run`, from)
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
        max: (type: "result" | "success", from: Command) => {
            return executeCmd(`execute store ${type} bossbar ${this.id} max run`, from)
        }
    }
    
    /**
     * Edit the bossbar's properties
     */
    edit = {
        /**
         * How the player will see the bossbar's name
         * @param content Json formated text
         */
        display: (content: JsonRaw) => {
            this.settings.display = content
            return `bossbar modify name ${content.render()}`
        },
        /**
         * The color of the bossbar
         * @param content The bossbar's color
         */
        color: (content: mcDefaultColors) => {
            this.settings.color = content
            return `bossbar modify color ${content}`
        },
        /**
         * The maximum value of the bossbar
         */
        max: (value: number) => {
            this.settings.max = value
            return `bossbar modify max ${value}`
        },
        /**
         * Set the bossbar's visibility
         * @param entity The entity that can see the bossbar (if the value is `false` or `undefined`, the bossbar will be invisible for everyone)
         */
        visible: (entity?: Entity | false) => {
            if(!entity) {
                this.settings.visible = false
                return `bossbar modify visible false`
            }else {
                this.settings.visible = true
                return [`bossbar modify visible true`, `bossbar modify players ${entity.render()}`]
            }
        },
        /**
         * Set the bossbar's value
         */
        value: (value: number) => {
            this.settings.value = value
            return `bossbar modify value ${value}`
        },
        /**
         * Update the bossbar with every property in one time
         */
        update: () => {
            const modifyCommands: (Command | Commands)[] = []
            modifyCommands.push(`name ${this.settings.display.render()}`)
            modifyCommands.push(`max ${this.settings.max}`)
            modifyCommands.push(`value ${this.settings.value || 0}`)
            modifyCommands.push(`color ${this.settings.color}`)
            modifyCommands.push(`visible ${!!this.settings.visible}`)
            modifyCommands.push(`style ${this.settings.splited ? `notched_${this.settings.splited}` : "progress"}`)
            return modifyCommands.map(cmd => `bossbar modify ${cmd}`)
        }
    }
}

export {Bossbar}