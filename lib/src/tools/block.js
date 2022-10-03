"use strict";
class Blocks {
    constructor(x, y, z) {
        this.coordonates = [x, y, z];
    }
    render() {
        return this.coordonates.join(' ');
    }
}
