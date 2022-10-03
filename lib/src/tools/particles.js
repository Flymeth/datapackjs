"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Particle = void 0;
const blocks_1 = require("./blocks");
/**
 * Represent particles
 */
class Particle {
    /**
     * @param name The name of the particles
     */
    constructor(name, options) {
        this.name = name;
        this.options = options;
    }
    /**
     * Show the particles
     */
    show() {
        return this.render();
    }
    render() {
        if (this.options instanceof blocks_1.Block)
            return `particle ${this.name} ${this.options.render()}`;
        else if (this.options) {
            const { position, count, delta: { x, y, z }, speed, showIfFar, viewers } = this.options;
            const view = showIfFar ? 'force' : 'normal';
            const extra = viewers ? `${view} ${viewers.render()}` : (view === "normal" ? '' : view);
            return `particle ${this.name} ${position.render()} ${x || 0} ${y || 0} ${z || 0} ${speed} ${count + (extra ? ` ${extra}` : '')}`;
        }
        return `particle ${this.name}`;
    }
}
exports.Particle = Particle;
