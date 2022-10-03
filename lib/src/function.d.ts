import { ressourceLocation } from "../utils/ressourceLocation";
declare type Command = string;
declare type Commands = (Command | Commands)[];
declare function processCommands(commands: Commands | Command): string[];
/**
 * Represent a function
 * @link
 * https://minecraft.fandom.com/wiki/Function_(Java_Edition)
 */
declare class gameFunction {
    readonly ObjectType = "Function";
    name: string;
    namespace: string | undefined;
    commands: string[];
    constructor(name?: ressourceLocation, ...exec: Commands);
    exec(...cmds: Commands): this;
    call(): string;
    render(): string;
}
export default gameFunction;
export { Command, Commands, processCommands };
