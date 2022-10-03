import { Entity } from "./selector";
declare type effectOptions = {
    duration?: number;
    amplifier?: number;
    particles?: boolean;
};
/**
 * Represent a potion's effect
 */
declare class Effect {
    readonly name: string;
    duration: number;
    amplifier: number;
    particles: boolean;
    /**
     * @param name The name of the effect
     */
    constructor(name: string, options?: effectOptions);
    edit: object;
    /**
     * Give this effect to an entity
     * @param entity The entity to give the effect to
     */
    give(entity: Entity): string;
    /**
     * Remove this effect to an entity
     * @param entity The entity to remove this effect to
     */
    remove(entity: Entity): string;
}
export { Effect };
