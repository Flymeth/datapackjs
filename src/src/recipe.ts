import { isRessourceLocationValid, ressourceLocation } from "../utils/ressourceLocation"

type recipesType = "blasting" | "campfire_cooking" | "crafting_shaped" | "crafting_shapeless" | "smelting" | "smithing" | "smoking" | "stonecutting" | "crafting_special_" | string
/**
 * Represent a game recipe
 * @link
 * https://minecraft.fandom.com/wiki/Recipe
 * https://minecraft.fandom.com/wiki/Recipe#JSON_format
 */
class gameRecipe {
    readonly ObjectType = "Recipe"
    namespace: string | undefined
    name: string
    data: object
    /**
     * @param name The recipe's name
     * @param group The recipe's group (useful for the recipies book)
     * @param options The recipe option (see https://minecraft.fandom.com/wiki/Recipe#JSON_format)
     */
    constructor(name: ressourceLocation, type: recipesType, group: string, options: object) {
        if(!isRessourceLocationValid(name)) throw new Error("Invalid ressource location!")
        this.name = name
        this.data = {
            type, group, ...options
        }
    }

    render() {
        return `${this.namespace}:${this.name}`
    }
}

export default gameRecipe