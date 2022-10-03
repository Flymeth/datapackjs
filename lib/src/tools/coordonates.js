"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zone = exports.Block = void 0;
class Block {
    constructor(x, y, z) {
        this.coords = [x.toString(), y.toString(), z.toString()];
    }
    render() {
        return this.coords.join(' ');
    }
}
exports.Block = Block;
class Zone extends Block {
    constructor(data) {
        const { area, coordonates } = data;
        const { x, y, z } = coordonates;
        super(x, y, z);
        this.area = [area.x.toString(), area.y.toString(), area.z.toString()];
    }
    render() {
        return this.coords.join(' ') + ' ' + this.area.join(' ');
    }
}
exports.Zone = Zone;
