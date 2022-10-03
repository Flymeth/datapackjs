declare type zoneOptions = {
    coordonates: {
        x: number | string;
        y: number | string;
        z: number | string;
    };
    area: {
        x: number;
        y: number;
        z: number;
    };
};
declare class Block {
    coords: [string, string, string];
    constructor(x: number | string, y: number | string, z: number | string);
    render(): string;
}
declare class Zone extends Block {
    area: [string, string, string];
    constructor(data: zoneOptions);
    render(): string;
}
export { Block, Zone };
