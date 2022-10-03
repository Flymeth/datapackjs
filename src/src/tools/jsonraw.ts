import { Block } from "./blocks"
import { mcDefaultColors } from "./display"
import { NBTPath } from "./nbt"
import { Scoreboard } from "./scoreboard"
import { Entity } from "./selector"
import { Storage } from "./storage"

type jsonNBT = (
    {path: NBTPath, entity: Entity, separator?: JsonRaw } 
    | {path: NBTPath, block: Block, separator?: JsonRaw}
    | {path: NBTPath, storage: Storage, separator?: JsonRaw}
)
type jsontag = {
    text: string | { entity: Entity } | {
        score: {
            scoreboard: Scoreboard,
            entity: Entity | string
        }
    } | { nbt: jsonNBT },
    color?: mcDefaultColors | string,
    underlined?: boolean,
    italic?: boolean,
    bold?: boolean
}
type jsonrawtag = { //= jsontag in minecraft
    text?: string | object,
    selector?: string,
    nbt?: object,
    score?: {
        objective: string,
        name: string,
        value?: number
    }
    color?: mcDefaultColors | string,
    underlined?: boolean,
    italic?: boolean,
    bold?: boolean
}
    
type jsonraw = jsontag | jsontag[]

/**
 * Represent a json formated text
 */
class JsonRaw {
    content: jsonraw | undefined
    constructor(content?: jsonraw) {
        this.content = content
    }

    /**
     * Add a text to the current formated text
     * @param content The text to add
     */
    addText(content: jsontag) {
        if(!this.content) this.content = content
        else if(!("push" in this.content)) this.content = [this.content, content]
        else this.content.push(content)
        return this
    }

    /**
     * Remove a part of the text
     * @param index The index of the text to remove
     */
    removeText(index: number) {
        if(this.content && "push" in this.content && this.content.length && index < this.content.length && index >= 0) this.content.splice(index, 1)
        return this
    }

    /**
     * Remove all the text
     */
    resetText() {
        delete this.content
        return this
    }

    render() {
        if(!this.content) throw new Error(`The text is empty!`)
        function process(obj: jsontag): jsonrawtag {
            const newObject:jsonrawtag = {...obj}
            if(typeof obj.text === "object") {
                const {text} = obj
                if("score" in text) {
                    const { score } = text
                    if(score.entity instanceof Entity) {
                        newObject.score = {
                            name: score.entity.render(),
                            objective: score.scoreboard.name
                        }
                    }else {
                        newObject.score = {
                            name: score.entity,
                            objective: score.scoreboard.name
                        }
                    }
                }else if("entity" in text) {
                    newObject.selector = text.entity.render()
                }else if("nbt" in text) {
                    const { nbt } = text
                    const {path, separator} = nbt
                    const obj: {[key: string]: string} = {}

                    if("entity" in nbt) obj.entity = nbt.entity.render()
                    else if("block" in nbt) obj.block = nbt.block.render()
                    else if("storage" in nbt) obj.storage = nbt.storage.name

                    if(separator) obj.separator = separator.render()

                    newObject.nbt = {
                        path: path.render(),
                        ...obj
                    }
                }
                delete newObject.text
            }

            return newObject
        }
        let finalData: jsonrawtag | ["", ...jsonrawtag[]] = [""]
        
        if(typeof this.content === "string") return JSON.stringify({text: this.content})
        if("push" in this.content) for(const obj of this.content) finalData.push(process(obj))
        else finalData = process(this.content)
        return JSON.stringify(finalData)
    }
}

export {JsonRaw}