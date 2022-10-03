import gameFunction from "./function"

/**
 * `load`: called when the datapack is loaded
 * `tick`: called each game ticks
 */
type customEvents = "load" | "tick"

/**
 * Represent a game event
 */
class gameEvent {
    readonly ObjectType = "Event"
    readonly type: customEvents

    functions: gameFunction[]
    /**
     * @param exec Functions to execute when the event is triggered
     */
    constructor(name: customEvents, ...exec: gameFunction[]) {
        this.type= name
        if(exec.find(obj => obj?.ObjectType !== "Function")) throw new Error(`Invalid argument!`)
        this.functions = exec
    }

    /**
     * Add new functions to execute when the event is triggered
     * @param fcts Functions to execute when the event is triggered
     */
    exec(...fcts: gameFunction[]) {
        this.functions.push(...fcts)
        return this
    }

    render() {
        return `${this.type}`
    }
}

export default gameEvent