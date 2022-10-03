import initBuild, { build } from "./build/main"
import gameEvent from "./src/event"
import gameFunction from "./src/function"
import gameTag from "./src/tag"
import gameAdvancement from "./src/advancement"
import gameLootTable from "./src/loottable"
import gameRecipe from "./src/recipe"
import { ressourceLocation, isRessourceLocationValid } from "./utils/ressourceLocation"
export * as tools from "./tools";

type dpOptions = {
    buildPath?: string,
    author?: {
        name: string,
        mcName?: string
    }
}
type acceptVersion =  "1.18" | "1.19"
type dpSettings = {
    name: string,
    version: acceptVersion,
    namespace: ressourceLocation,
    description?: string,
    icon?: string,
    options?: dpOptions
}

type buildDatas = gameEvent | gameFunction | gameTag | gameAdvancement | gameLootTable | gameRecipe

/**
 * Represent the datapack itself
 */
class Datapack {
    name: string
    description: string
    icon: string | undefined
    readonly namespace: string // = namespace
    version: acceptVersion
    options: dpOptions | undefined
    datas: buildDatas[]
    
    Event = gameEvent
    Function = gameFunction
    Tag = gameTag
    Advancement = gameAdvancement
    LootTable = gameLootTable
    Recipe = gameRecipe

    /**
     * @param datas Represent the main settings of the datapack
     */
    constructor(datas: dpSettings) {
        if(datas.namespace.includes("/") || !isRessourceLocationValid(datas.namespace)) throw new Error(`Invalide namespace!`)
        this.namespace = datas.namespace

        this.name = datas.name
        this.version = datas.version
        this.description = datas.description || ""
        this.icon = datas.icon
        this.options = datas.options
        this.datas = []

        this.Function.prototype.namespace = this.namespace
        this.Tag.prototype.namespace = this.namespace
        this.Advancement.prototype.namespace = this.namespace
        this.LootTable.prototype.namespace = this.namespace
        this.Recipe.prototype.namespace = this.namespace
        
        Object.freeze(this.Function)
        Object.freeze(this.Event)
        Object.freeze(this.Tag)
        Object.freeze(this.Advancement)
        Object.freeze(this.LootTable)
        Object.freeze(this.Recipe)
    }

    /**
     * Save new buildables objects for the datapack
     * @param datas Buildable objects
     */
    save(...datas: buildDatas[]) {
        this.datas= [...this.datas, ...datas]
        return this
    }
    /**
     * Build the datapack into the "buildPath" folder
     * @param datas Add buildables objects to the datapack before building it
     */
    build(...datas: buildDatas[]) {
        initBuild(this)
        build(...[...datas, ...this.datas])
    }
}

export default Datapack
export {buildDatas, dpOptions, Datapack}