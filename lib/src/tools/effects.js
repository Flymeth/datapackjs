"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effect = void 0;
/**
 * Represent a potion's effect
 */
class Effect {
    /**
     * @param name The name of the effect
     */
    constructor(name, options) {
        this.edit = {
            duration: (time) => {
                this.duration = time;
                return this;
            },
            amplifier: (amplifier) => {
                this.amplifier = amplifier;
                return this;
            },
            particles: (show) => {
                this.particles = show;
                return this;
            }
        };
        this.name = name;
        this.duration = (options === null || options === void 0 ? void 0 : options.duration) || 3;
        this.amplifier = (options === null || options === void 0 ? void 0 : options.amplifier) || 1;
        this.particles = (options === null || options === void 0 ? void 0 : options.particles) || true;
    }
    /**
     * Give this effect to an entity
     * @param entity The entity to give the effect to
     */
    give(entity) {
        return `effet give ${entity.render()} ${this.name} ${this.duration} ${this.amplifier} ${this.particles}`;
    }
    /**
     * Remove this effect to an entity
     * @param entity The entity to remove this effect to
     */
    remove(entity) {
        return `effet clear ${entity.render()} ${this.name}`;
    }
}
exports.Effect = Effect;
