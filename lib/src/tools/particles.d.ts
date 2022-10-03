import { Command } from "../function";
import { Block } from "./blocks";
import { Entity } from "./selector";
declare type particleOption = {
    position: Block;
    delta: {
        x?: number;
        y?: number;
        z?: number;
    };
    speed: number;
    count: number;
    showIfFar?: boolean;
    viewers?: Entity;
};
/**
 * Represent particles
 */
declare class Particle {
    name: string;
    options?: particleOption | Block;
    /**
     * @param name The name of the particles
     */
    constructor(name: string, options?: particleOption | Block);
    /**
     * Show the particles
     */
    show(): Command;
    render(): string;
}
export { Particle };
