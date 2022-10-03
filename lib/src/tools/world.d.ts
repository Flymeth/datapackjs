import { Commands } from "../function";
import { coordonate } from "./blocks";
import { Entity } from "./selector";
/**
 * Represent a world
 */
declare class World {
    world: string;
    /**
     * @param name The name of the world
     */
    constructor(name: string);
    /**
     * Execute commands inside this world
     * @param commands The command to execute inside this world
     */
    executeInside(...commands: Commands): string[];
    /**
     * Teleport an entity to this world
     * @param entity The entity to teleport inside this world
     * @param coordonates The coordonate inside this world the entity will be teleport on
     */
    teleport(entity: Entity, coordonates?: coordonate): string[];
    render(): string;
}
export { World };
