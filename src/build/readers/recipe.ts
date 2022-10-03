import path from "path";
import gameRecipe from "../../src/recipe";
import { buildConfig } from "../main";
import mk from "../utils/mk";

export default function buildRecipe(recipe: gameRecipe, config: buildConfig) {
    const {data, name} = recipe
    mk("file", path.join(config.mainPath, `data/${config.namespace}/recipes/${name.toLowerCase()}`), JSON.stringify(data))
}