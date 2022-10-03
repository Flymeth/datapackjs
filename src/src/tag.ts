import { ressourceLocation, isRessourceLocationValid } from "../utils/ressourceLocation"

type tagsType = "blocks" | "fluids" | "items" | "entities" | "events"

/**
 * Represent a block/fluid/items/... tag
 * @link
 * https://minecraft.fandom.com/wiki/Tag
 * https://minecraft.fandom.com/wiki/Tag#JSON_format
 */
class gameTag {
    readonly ObjectType = "Tag"
    type: tagsType
    content: string[]
    name: ressourceLocation
    replace: boolean
    namespace: string | undefined
    
    /**
     * @param name The name of this tag
     * @param fromMinecraft If the tag come from the minecraft's default tag and not the datapack
     * @param includes Object to include inside this tag
     */
    constructor(type: tagsType, name: ressourceLocation, fromMinecraft?: boolean, ...includes: string[]) {
        if(!isRessourceLocationValid(name)) throw new Error(`${name} is not a valid ressource location!`)
        this.type = type
        this.name = name
        this.content = includes
        this.replace = false
        if(fromMinecraft) this.namespace = "minecraft"
    }

    /**
     * Associate an object to this tag
     */
    addObject(object: gameTag | string) {
        this.content.push((object instanceof gameTag ? object.render() : object))
        return this
    }

    /**
     * Set if this tag replace other tag named as this one
     */
    strict(set: boolean) {
        this.replace = set
        return this
    }

    render() {
        return `#${this.namespace}:${this.name}`
    }
}

export default gameTag