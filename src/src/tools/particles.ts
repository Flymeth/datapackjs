import { Command } from "../function"
import { Block } from "./blocks"
import { Entity } from "./selector"

type particleOption = {
    position: Block,
    delta: {
        x?: number,
        y?: number,
        z?: number
    },
    speed: number,
    count: number,
    showIfFar?: boolean,
    viewers?: Entity
}

/**
 * Represent particles
 */
class Particle {
    name: string
    options?: particleOption | Block
    /**
     * @param name The name of the particles
     */
    constructor(name: string, options?: particleOption | Block) {
        this.name = name
        this.options = options
    }

    /**
     * Show the particles
     */
    show(): Command {
        return this.render()
    }

    render() {
        if(this.options instanceof Block) return `particle ${this.name} ${this.options.render()}`
        else if(this.options) {
            const {position, count, delta: {x, y, z}, speed, showIfFar, viewers} = this.options
            const view = showIfFar ? 'force' : 'normal'
            const extra = viewers ? `${view} ${viewers.render()}` : (view === "normal" ? '' : view)

            return `particle ${this.name} ${position.render()} ${x || 0} ${y || 0} ${z || 0} ${speed} ${count + (extra ? ` ${extra}` : '')}`
        }
        return `particle ${this.name}`
    }
}

export {Particle}