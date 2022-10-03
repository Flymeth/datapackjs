import { ressourceLocation } from "../../utils/ressourceLocation";
import { Command } from "../function";
import { NBTData, NBTPath } from "./nbt";
/**
 * Represent a storage
 */
declare class Storage {
    name: string;
    datas: NBTData;
    /**
     * @param name The name of the storage
     * @param initDatas The init data set inside this storage
     */
    constructor(name: ressourceLocation, initDatas?: NBTData);
    /**
    * Get data of the storage
    * @param path The path to the storage's data
    * @param scale The scale to multiply the request data after get it
    */
    get(path?: NBTPath, scale?: number): Command;
    /**
    * Set a data in this storage
    * @param value The value to set
    * @param path The path to the storage's data
    */
    set(value: NBTData | string | number, path?: NBTPath): Command;
    /**
    * Store data from a command
    * @param path The path to the storage's data
    * @param type The type of result you want: \
    * `success`: If the command has been correcly executed, it will returns `1`, else `0` \
    * `result`: Will returns the callback of the executed command
    * @param from The command
    */
    store(path: NBTPath, type: "success" | "result", from: Command): Command;
    /**
     * Reset the storage's data
     */
    reset(): Command;
}
export { Storage };
