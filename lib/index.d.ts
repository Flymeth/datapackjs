import gameEvent from "./src/event";
import gameFunction from "./src/function";
import gameTag from "./src/tag";
import gameAdvancement from "./src/advancement";
import gameLootTable from "./src/loottable";
import gameRecipe from "./src/recipe";
import { ressourceLocation } from "./utils/ressourceLocation";
export * as tools from "./tools";
declare type dpOptions = {
    buildPath?: string;
    author?: {
        name: string;
        mcName?: string;
    };
};
declare type acceptVersion = "1.18" | "1.19";
declare type dpSettings = {
    name: string;
    version: acceptVersion;
    namespace: ressourceLocation;
    description?: string;
    icon?: string;
    options?: dpOptions;
};
declare type buildDatas = gameEvent | gameFunction | gameTag | gameAdvancement | gameLootTable | gameRecipe;
/**
 * Represent the datapack itself
 */
declare class Datapack {
    name: string;
    description: string;
    icon: string | undefined;
    readonly namespace: string;
    version: acceptVersion;
    options: dpOptions | undefined;
    datas: buildDatas[];
    Event: typeof gameEvent;
    Function: typeof gameFunction;
    Tag: typeof gameTag;
    Advancement: typeof gameAdvancement;
    LootTable: typeof gameLootTable;
    Recipe: typeof gameRecipe;
    /**
     * @param datas Represent the main settings of the datapack
     */
    constructor(datas: dpSettings);
    /**
     * Save new buildables objects for the datapack
     * @param datas Buildable objects
     */
    save(...datas: buildDatas[]): this;
    /**
     * Build the datapack into the "buildPath" folder
     * @param datas Add buildables objects to the datapack before building it
     */
    build(...datas: buildDatas[]): void;
}
export default Datapack;
export { buildDatas, dpOptions, Datapack };
