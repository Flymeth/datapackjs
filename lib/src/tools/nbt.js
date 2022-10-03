"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NBTPath = exports.NBTData = void 0;
/**
 * Represent a NBT object
 */
class NBTData {
    /**
     * @param nbt The intial data of the nbt
     */
    constructor(nbt) {
        this.nbt = nbt || {};
    }
    /**
     * Set a data to the nbt object
     * @param path The path to set the data inside the NBT
     * @param datas The value of this nbt
     * @returns
     */
    set(path, datas) {
        if (datas.render)
            datas = datas.render();
        function appendValue(object, path, value) {
            if (object === undefined)
                object = (typeof path[0] === "number" ? [] : {});
            if (path.length === 1) {
                object[path[0]] = value;
            }
            else {
                const newPath = path.shift();
                if (!newPath)
                    return object;
                object[newPath] = appendValue(object[newPath], path, value);
            }
            return object;
        }
        const { paths } = path;
        if (!paths.length)
            return this;
        this.nbt = appendValue(this.nbt, Array.from(paths), datas);
        return this;
    }
    /**
     * Delete a data of the nbt
     * @param path The path where to delete data
     */
    del(path) {
        function removeValue(object, path) {
            if (object === undefined)
                return object;
            if (path.length === 1) {
                delete object[path[0]];
            }
            else {
                const newPath = path.shift();
                if (!newPath)
                    return object;
                object[newPath] = removeValue(object[newPath], path);
            }
            return object;
        }
        const { paths } = path;
        if (!paths.length)
            return this;
        this.nbt = removeValue(this.nbt, Array.from(paths));
        return this;
    }
    /**
     * Replace a current data with a new one
     * @param path The path where to modify the data
     * @param newDatas The new data to attribute to this path
     */
    edit(path, newDatas) {
        this.del(path);
        return this.set(path, newDatas);
    }
    render() {
        return JSON.stringify(this.nbt);
    }
}
exports.NBTData = NBTData;
/**
 * Represent a path to a nbt
 */
class NBTPath {
    /**
     * @param path The init path
     * @exemple
     * ```js
     * const path = new NBTPath("test.hello[0].path")
     * ```
     */
    constructor(path) {
        this.paths = (path ? this.stringToPath(path) : []);
    }
    /**
     * Get deeper in the path
     * @param keyName The key of the deeper path
     */
    inner(keyName) {
        this.paths.push(keyName);
        return this;
    }
    /**
     * Get topier in the path
     * @param length The amount of path to remove (from right to left)
     */
    outer(length) {
        if (!this.paths.length || length && length < 0)
            return this;
        if (typeof length === "number") {
            for (let i = 1; i <= length; i++)
                this.outer();
        }
        else
            this.paths.splice(this.paths.length - 1, 1);
        return this;
    }
    /**
     * Set the current path
     * @param path The new path
     */
    set(path) {
        this.paths = this.stringToPath(path);
        return this;
    }
    stringToPath(str) {
        const dictSplited = str.split('.');
        const path = [];
        for (const p of dictSplited) {
            const includesArray = p.includes('[') && p.includes(']');
            if (includesArray) {
                const splited = p.split('[');
                splited.forEach(e => e.split(']'));
                for (const e of splited)
                    isNaN(parseInt(e)) ? path.push(e) : path.push(parseInt(e));
            }
            else
                path.push(p);
        }
        return path;
    }
    renderPathList(list) {
        let string = "";
        for (const e of list) {
            if (typeof e === "string")
                string += `.${e}`;
            else if (typeof e === "number")
                string += `[${e}]`;
            else
                string += this.renderPathList(e);
        }
        return (string.startsWith('.') ? string.slice(1, string.length) : string);
    }
    render() {
        return this.renderPathList(this.paths);
    }
}
exports.NBTPath = NBTPath;
