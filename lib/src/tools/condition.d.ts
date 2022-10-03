import { Scoreboard } from "./scoreboard";
import { Entity } from "./selector";
import { RangeValue } from "./value";
import { Block, Zone } from "./blocks";
import { Commands } from "../function";
import { NBTPath } from "./nbt";
declare type conditionFormat = {
    /**
     * If the given entities exist
     */
    entities?: Entity[];
    /**
     * If the given nbts exist
     */
    nbt?: {
        element: Entity | Block;
        path: NBTPath;
    }[];
    /**
     * If score's conditions are matching
     */
    scores?: ({
        scoreboard: Scoreboard;
        entity: Entity | string;
        value: RangeValue;
    } | {
        scoreboard: Scoreboard;
        entity: Entity | string;
        operation: "<" | "<=" | "=" | ">=" | ">";
        from: {
            entity: Entity | string;
            scoreboard: Scoreboard;
        };
    })[];
    /**
     * If the given block's name is equal to the given name \
     * Or if the blocks' block is the same as the checker's block
     */
    blocks?: ({
        Block: Block;
        name: string;
    } | {
        Blocks: Zone;
        checker: Block;
        includesAir?: boolean;
    })[];
};
declare type conditionType = "if" | "unless" | "random";
/**
 * Represent a condition
 */
declare class Condition {
    condition: conditionFormat | undefined;
    type: conditionType;
    /**
     * @param type The type of the condition
     * @param condition The confition itself
     */
    constructor(type: conditionType, condition?: conditionFormat);
    /**
     * Set the new condition's type
     * @param type The new condition's type
     */
    setType(type: conditionType): this;
    private conditionTypeToString;
    private conditionToString;
    /**
     * Execute commands only if the condition passed
     * @param commands The commands to execute
     */
    execute(...commands: Commands): Commands;
    /**
     * Execute commands only if the condition passed (has an `if` condition)
     * @param commands The commands to execute
     */
    executeIf(...commands: Commands): Commands;
    /**
     * Execute commands only if the condition passed (has an `if not` condition)
     * @param commands The commands to execute
     */
    executeUnless(...commands: Commands): Commands;
    render(type?: conditionType): string;
}
export { Condition };
