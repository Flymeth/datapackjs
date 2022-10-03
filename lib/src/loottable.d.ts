import { ressourceLocation } from "../utils/ressourceLocation";
declare type lootTableType = "mob" | "block";
/**
 * @link
 * https://minecraft.fandom.com/wiki/Loot_table#Loot_context_types
 */
declare type lootContext = "chest" | "command" | "selector" | "fishing" | "entity" | "gift" | "barter" | "advancement_reward" | "advancement_entity" | "generic" | "block";
declare type lootPool = {
    conditions: [];
    functions: [];
    rolls: number;
};
declare type lootTableData = {
    /**
     * Specifies the context in which the loot table should be invoked by
     */
    type?: lootContext | "empty";
    functions: [];
    pools: lootPool[];
};
/**
 * Represent a loot table
 * # !! WARNING !!
 * > This feature isn't support yet!
 * The loot tables are still under creation and takes time to make...
 * @link
 * https://minecraft.fandom.com/wiki/Loot_table
 * https://minecraft.fandom.com/wiki/Loot_table#Recurring_JSON_structures_within_loot_tables_and_other_data_pack_files
 */
declare class gameLootTable {
    readonly ObjectType = "LootTable";
    namespace: string | undefined;
    name: string;
    type: {
        key: string;
        key_seed: string;
    };
    seed?: number;
    data: lootTableData;
    /**
     * @param name The name of the loot table
     * @param type The type of that loot table (if it affects mob or blocks)
     * @param data The loot table's behavior
     * @param id The id of that loot table (if it's set to `0` or `undefined`, this will be randomly generated)
     */
    constructor(name: ressourceLocation, type: lootTableType, data: lootTableData, id?: number);
    render(): string;
}
export default gameLootTable;
