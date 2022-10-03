import executeCmd from "../../utils/execute"
import { ressourceLocation, isRessourceLocationValid } from "../../utils/ressourceLocation"
import { Command } from "../function"
import { NBTData, NBTPath } from "./nbt"

/**
 * Represent a storage
 */
class Storage {
    name: string
    datas: NBTData
    /**
     * @param name The name of the storage
     * @param initDatas The init data set inside this storage
     */
    constructor(name: ressourceLocation, initDatas?: NBTData) {
        if(name && isRessourceLocationValid(name)) throw new Error(`"${name}" is not a valid storage name!`)
        this.name = name
        this.datas= initDatas || new NBTData({})
    }

    /**
    * Get data of the storage
    * @param path The path to the storage's data
    * @param scale The scale to multiply the request data after get it
    */
    get(path?: NBTPath, scale?: number): Command {
        return `data get storage ${this.name} ${(path ? ` ${path.render()}` : "") + (scale ? ` ${scale}` : "")}`
    }
    /**
    * Set a data in this storage
    * @param value The value to set
    * @param path The path to the storage's data
    */
    set(value: NBTData | string | number, path?: NBTPath): Command {
        if(!path) return `data merge storage ${this.name} ${value instanceof NBTData ? value.render() : JSON.stringify({data: value})}`
        return `data modify storage ${this.name} ${path.render()} set value ${value instanceof NBTData ? value.render() : value}`
    }
    /**
    * Store data from a command
    * @param path The path to the storage's data
    * @param type The type of result you want: \
    * `success`: If the command has been correcly executed, it will returns `1`, else `0` \
    * `result`: Will returns the callback of the executed command
    * @param from The command
    */
    store(path: NBTPath, type: "success" | "result", from: Command): Command {
        return executeCmd(`execute store ${type} storage ${this.name} ${path.render()} run`, from)
    }
    /**
     * Reset the storage's data
     */
    reset(): Command {
        return `data merge storage ${this.name} {}`
    }
}

export {Storage}