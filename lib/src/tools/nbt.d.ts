/**
 * Represent a NBT object
 */
declare class NBTData {
    nbt: {
        [key: string]: any;
    };
    /**
     * @param nbt The intial data of the nbt
     */
    constructor(nbt?: object);
    /**
     * Set a data to the nbt object
     * @param path The path to set the data inside the NBT
     * @param datas The value of this nbt
     * @returns
     */
    set(path: NBTPath, datas: any): this;
    /**
     * Delete a data of the nbt
     * @param path The path where to delete data
     */
    del(path: NBTPath): this;
    /**
     * Replace a current data with a new one
     * @param path The path where to modify the data
     * @param newDatas The new data to attribute to this path
     */
    edit(path: NBTPath, newDatas: any): this;
    render(): string;
}
declare type NBTPathType = (number | string)[];
/**
 * Represent a path to a nbt
 */
declare class NBTPath {
    paths: NBTPathType;
    /**
     * @param path The init path
     * @exemple
     * ```js
     * const path = new NBTPath("test.hello[0].path")
     * ```
     */
    constructor(path?: string);
    /**
     * Get deeper in the path
     * @param keyName The key of the deeper path
     */
    inner(keyName: number | string): this;
    /**
     * Get topier in the path
     * @param length The amount of path to remove (from right to left)
     */
    outer(length?: number): this;
    /**
     * Set the current path
     * @param path The new path
     */
    set(path: string): this;
    private stringToPath;
    private renderPathList;
    render(): string;
}
export { NBTData, NBTPath };
