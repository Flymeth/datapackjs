import executeCmd from "../../utils/execute";
import { Command, Commands, processCommands } from "../function";
import { coordonate } from "./blocks";
import { Entity } from "./selector";

/**
 * Represent a world
 */
class World {
    world: string
    
    /**
     * @param name The name of the world
     */
    constructor(name: string) {
        this.world = `minecraft:${name.replace('minecraft:', '')}`
    }

    /**
     * Execute commands inside this world
     * @param commands The command to execute inside this world
     */
    executeInside(...commands: Commands) {
        return processCommands(commands).map(cmd => executeCmd(`execute in ${this.render()}`, cmd))
    }

    /**
     * Teleport an entity to this world
     * @param entity The entity to teleport inside this world
     * @param coordonates The coordonate inside this world the entity will be teleport on
     */
    teleport(entity: Entity, coordonates?: coordonate) {
        return this.executeInside(entity.teleport(coordonates || "self"))
    }

    render() {
        return this.world
    }
}

export {World}