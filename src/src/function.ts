import createID from "../utils/idgen"
import { ressourceLocation, isRessourceLocationValid } from "../utils/ressourceLocation"

type Command = string
type Commands = (Command | Commands)[]

function processCommands(commands: Commands | Command): string[] {
    if(typeof commands === "string") return [commands]
    // @ts-ignore - "L'instanciation de type est trop profonde et éventuellement infinie."
    else return commands.flat(Infinity)
}

/**
 * Represent a function
 * @link
 * https://minecraft.fandom.com/wiki/Function_(Java_Edition)
 */
class gameFunction {
    readonly ObjectType = "Function"
    name: string
    namespace: string | undefined
    commands: string[]
    constructor(name?: ressourceLocation, ...exec: Commands) {
        if(name && !isRessourceLocationValid(name)) throw new Error(`"${name}" is not a valid function name!`)
        this.name = name || createID("fct_")
        this.commands = processCommands(exec)
    }

    exec(...cmds: Commands) {
        if(cmds.length) this.commands.push(...processCommands(cmds))
        return this
    }

    call() {
        return `function ${this.render()}`
    }

    render() {
        return `${this.namespace}:${this.name}`
    }
}

export default gameFunction
export {Command, Commands, processCommands}