import executeCmd from "../../utils/execute"
import { Command } from "../function"
import gameTag from "../tag"
import { NBTData, NBTPath } from "./nbt"

type coordonate = {
    x: Position | number | string,
    y: Position | number | string,
    z: Position | number | string
}

type zoneOptions = {
    coordonates: coordonate,
    to: {
        x: number,
        y: number,
        z: number
    }
}

type posType = "absolute" | "position" | "rotation"

/**
 * Represent a position (like x, y or z)
 */
class Position {
    position: string
    type: posType

    /**
     * 
     * @param pos Set the position (by default it's set to 0)
     * @example
     * const pos    = new Position("~5")
     *              = new Position("^2")
     *              = new Position(-25)
     *              = [...]
     */
    constructor(pos?: string | number) {
        this.position = pos?.toString() || "~"
        if(this.position.startsWith('~')) this.type = "position"
        else if(this.position.startsWith('^')) this.type = "rotation"
        else this.type = "absolute"
    }

    /**
     * Set as an absolute position (like `-15` or `1255`...)
     * @param coordonate The coordonate
     */
    absolute(coordonate: number) {
        this.position = coordonate.toString()
        this.type = "absolute"
        return this
    }

    /**
     * Set as a relative position from the entity's position (like `~5` or `~-7.36`...)
     * @param thenAdd The position relatively to the entity's postion
     */
    fromPosition(thenAdd: number) {
        this.position = `~${thenAdd || ''}`
        this.type = "position"
        return this
    }
    /**
     * Set as a relative position from the entity's rotation (like `^-95` or `^.25`...)
     * @param thenAdd The position relatively to the entity's rotation
     */
    fromRotation(thenAdd: number) {
        this.position = `^${thenAdd || ''}`
        this.type = "rotation"
        return this
    }

    render() {
        return this.position
    }
}

type attrsType = {
    add: (name: string, value: any) => ThisType<Block>,
    remove: (name: string) => ThisType<Block>,
    set: (datas: {name: string, value: any}[]) => ThisType<Block>,
    modify: (name: string, by: any) => ThisType<Block>,
    reset: () => ThisType<Block>,
    render: () => string
}

function renderCoordonates(coordonates:coordonate) {
    return Object.values(coordonates).map(e => ((e instanceof Position) ? e.render() : e.toString()))
}

/**
 * Represent a world's block
 */
class Block {
    coords: string[]
    zone: boolean
    name: string
    attributesData: {name: string, value: any}[]

    /**
     * @param position The position of the target block
     * @param name The name of the target block
     */
    constructor(position: coordonate, name?: string) {
        this.coords = renderCoordonates(position)
        this.zone= false
        this.name = name || "minecraft:air"
        this.attributesData = []
    }

    nbt? = {
        /**
         * Get a nbt for this block
         * @param path The path to the block's NBT
         * @param scale The scale to multiply the request NBT after get it
         */
        get: (path?: NBTPath, scale?: number): Command => {
            return `data get block ${this.render() + (path ? ` ${path.render()}` : "") + (scale ? ` ${scale}` : "")}`
        },
        /**
         * Set a nbt for this block
         * @param value The value to set to this NBT
         * @param path The path to the block's NBT
         */
        set: (value: NBTData | string | number, path?: NBTPath): Command => {
            if(!path) return `data merge block ${this.render()} ${value instanceof NBTData ? value.render() : JSON.stringify({data: value})}`
            return `data modify block ${this.render()} ${path.render()} ${value instanceof NBTData ? value.render() : value}`
        },
        /**
         * Store data from a command
         * @param path The path to the block's NBT
         * @param type The type of result you want: \
         * `success`: If the command has been correcly executed, it will returns `1`, else `0` \
         * `result`: Will returns the callback of the executed command
         * @param from The command the NBT will execute to store itself
         */
        store: (path: NBTPath, type: "success" | "result", from: Command): Command => {
            return executeCmd(`execute store ${type} storage ${this.render()} ${path.render()} run`, from)
        },
        /**
         * Reset all the NBT for this block
         */
        reset: (): Command => {
            return `data merge block ${this.render()} {}`
        }
    }

    /**
     * Represent attributes
     * @example
     * ```mcfunction
     * # This is how block's attributes are working:
     * minecraft:dirt[name=value, name2=value, ...]
     * ```
     */
    attributes: attrsType = {
        /**
         * Add an attribute to this block
         * @param name The attribute's name
         * @param value The attribute's value
         */
        add: (name: string, value: any) => {
            this.attributesData.push({name, value})
            return this
        },
        /**
         * Remove an attribute to this block
         * @param name The attribute's name to remove
         */
        remove: (name: string) => {
            const index = this.attributesData.findIndex(e => e.name === name)
            if(index >= 0) this.attributesData.splice(index, 1)
            return this
        },
        /**
         * Set multiples attributes in one time to this block
         * @param datas The custom attributes
         */
        set: (datas: {name: string, value: any}[]) => {
            this.attributesData = datas
            return this
        },
        /**
         * Modify an attribute's value
         * @param name The of the attribute to modify
         * @param by The new value of this attitribute
         */
        modify: (name: string, by: any) => {
            this.attributes.remove(name)
            return this.attributes.add(name, by)
        },
        /**
         * Reset all the block's attribute
         */
        reset: () => {
            this.attributesData = []
            return this
        },
        render: () => {
            const data: string[] = []
            for(const {name, value} of this.attributesData) {
                data.push(`${name}=${typeof value === "object" ? JSON.stringify(value) : value}`)
            }
            return `[${data.join(',')}]`
        }
    }

    /**
     * Set to the block's coordonate/zone the given block
     * @param block The name of the block to place
     * @exemple
     * ```js
     * const b = new Block({...})
     * b.set("minecraft:dirt")
     * ```
     */
    set(block?: string): Command {
        if(block) this.name= block
        if(this.zone) return `fill ${this.render()} ${block || this.name}`
        return `setblock ${this.render()} ${block || this.name}`
    }
    /**
     * Place to the given coordonates the block
     * @param position The position where to place the block
     * @param to If `this` is a Zone, the opposite corner of the zone to place the block
     */
    place(position: coordonate, to?: zoneOptions["to"]): Command {
        const {x, y, z} = position
        if(to) return `fill ${[x, y, z].join(' ')} ${to.x} ${to.y} ${to.z} ${this.name + this.attributes.render()}`
        return `setblock ${[x, y, z].map(e => (e instanceof Position ? e.render() : e)).join(' ')} ${this.name + this.attributes.render()}`
    }
    /**
     * Delete the block/zone (= replace it with `minecraft:air`)
     */
    del() {
        this.name = "minecraft:air"
        return this.set(this.name)
    }
    
    render() {
        return this.coords.join(' ')
    }
}

/**
 * Represent a zone of blocks
 * @extends Block
 */
class Zone extends Block {
    to: [string, string, string]
    constructor(data: zoneOptions) {
        const {to, coordonates} = data
        super(coordonates)
        this.to = [to.x.toString(), to.y.toString(), to.z.toString()]
        this.zone = true
        delete this.nbt
    }

    /**
     * Set only the blocks on the outer edge of the fill region with the specified block and replace inside with `minecraft:air`
     * @param block The block to fill with
     */
    empty(block?: string): Command {
        return `fill ${this.render()} ${block || this.name} hollow`
    }
    /**
     * Set only the blocks on the outer edge of the fill region with the specified block without replacing inside with `minecraft:air`
     * @param block The block to fill with
     */
    outline(block?: string): Command {
        return `fill ${this.render()} ${block || this.name} outline`
    }
    /**
     * Set only the `minecraft:air` blocks in the fill region with the specified block
     * @param block The block to fill with
     */
    safe(block?: string): Command {
        return `fill ${this.render()} ${block || this.name} keep`
    }
    /**
     * Set all blocks in the fill region with the specified block, dropping the existing blocks (including those that are unchanged) and block contents
     * @param block The block to fill with
     */
    destroy(block?: string): Command {
        return `fill ${this.render()} ${block || this.name} destroy`
    }
    /**
     * Set all blocks (including air) in the fill region with the specified block
     * @param blocks The block to replace
     * @param withBlock The block that the selected blocks will be replaced 
     */
    replace(blocks: gameTag | string, withBlock?: string): Command {
        if(blocks instanceof gameTag && blocks.type !== "blocks") throw new Error(`${blocks.render()} is not a block tag!`)
        return `fill ${this.render()} ${withBlock || this.name} replace ${blocks instanceof gameTag ? blocks.render() : blocks}`
    }

    render() {
        return this.coords.join(' ') + ' ' + this.to.join(' ')
    }
}

export {Block, Zone, Position, coordonate, renderCoordonates}