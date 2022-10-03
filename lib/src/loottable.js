"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ressourceLocation_1 = require("../utils/ressourceLocation");
/**
 * Represent a loot table
 * # !! WARNING !!
 * > This feature isn't support yet!
 * The loot tables are still under creation and takes time to make...
 * @link
 * https://minecraft.fandom.com/wiki/Loot_table
 * https://minecraft.fandom.com/wiki/Loot_table#Recurring_JSON_structures_within_loot_tables_and_other_data_pack_files
 */
class gameLootTable {
    /**
     * @param name The name of the loot table
     * @param type The type of that loot table (if it affects mob or blocks)
     * @param data The loot table's behavior
     * @param id The id of that loot table (if it's set to `0` or `undefined`, this will be randomly generated)
     */
    constructor(name, type, data, id) {
        this.ObjectType = "LootTable";
        if (!(0, ressourceLocation_1.isRessourceLocationValid)(name))
            throw new Error("Invalid ressource location!");
        this.name = name;
        this.type = {
            key: type === "mob" ? "DeathLootTable" : "LootTable",
            key_seed: type === "mob" ? "DeathLootTableSeed" : "LootTableSeed",
        };
        this.seed = id;
        this.data = data;
    }
    render() {
        return `${this.namespace}:${this.name}`;
    }
}
exports.default = gameLootTable;
