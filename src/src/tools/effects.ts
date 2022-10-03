import { Entity } from "./selector"

type effectOptions = {
    duration?: number,
    amplifier?: number,
    particles?: boolean
}

/**
 * Represent a potion's effect
 */
class Effect {
    readonly name: string
    duration: number
    amplifier: number
    particles: boolean
    /**
     * @param name The name of the effect
     */
    constructor(name: string, options?: effectOptions) {
        this.name = name
        this.duration = options?.duration || 3
        this.amplifier = options?.amplifier || 1
        this.particles = options?.particles || true
    }

    edit: object = {
        duration: (time: number) => {
            this.duration = time
            return this
        },
        amplifier: (amplifier: number) => {
            this.amplifier = amplifier
            return this
        },
        particles: (show: boolean) => {
            this.particles = show
            return this
        }
    }

    /**
     * Give this effect to an entity
     * @param entity The entity to give the effect to
     */
    give(entity: Entity) {
        return `effet give ${entity.render()} ${this.name} ${this.duration} ${this.amplifier} ${this.particles}`
    }
    /**
     * Remove this effect to an entity
     * @param entity The entity to remove this effect to
     */
    remove(entity: Entity) {
        return `effet clear ${entity.render()} ${this.name}`
    }
}

export {Effect}