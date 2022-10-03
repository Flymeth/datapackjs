import gameFunction from "./function";
/**
 * `load`: called when the datapack is loaded
 * `tick`: called each game ticks
 */
declare type customEvents = "load" | "tick";
/**
 * Represent a game event
 */
declare class gameEvent {
    readonly ObjectType = "Event";
    readonly type: customEvents;
    functions: gameFunction[];
    /**
     * @param exec Functions to execute when the event is triggered
     */
    constructor(name: customEvents, ...exec: gameFunction[]);
    /**
     * Add new functions to execute when the event is triggered
     * @param fcts Functions to execute when the event is triggered
     */
    exec(...fcts: gameFunction[]): this;
    render(): string;
}
export default gameEvent;
