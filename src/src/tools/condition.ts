import { Scoreboard } from "./scoreboard"
import { Entity } from "./selector"
import { RangeValue } from "./value"
import { Block, Zone } from "./blocks"
import { Commands, processCommands } from "../function"
import executeCmd from "../../utils/execute"
import { NBTPath } from "./nbt"

type conditionFormat = {
    /**
     * If the given entities exist
     */
    entities?: Entity[],
    /**
     * If the given nbts exist
     */
    nbt?: {
        element: Entity | Block,
        path: NBTPath
    }[],
    /**
     * If score's conditions are matching
     */
    scores?: (
        {
            scoreboard: Scoreboard,
            entity: Entity | string,
            value: RangeValue,
        } | {
            scoreboard: Scoreboard,
            entity: Entity | string,
            operation: "<" | "<=" | "=" | ">=" | ">",
            from: {
                entity: Entity | string,
                scoreboard: Scoreboard
            }
        }
    )[],
    /**
     * If the given block's name is equal to the given name \
     * Or if the blocks' block is the same as the checker's block
     */
    blocks?: (
        {
            Block: Block,
            name: string,
        } | {
            Blocks: Zone,
            checker: Block,
            includesAir?: boolean,
        }
    )[]
}

type conditionType = "if" | "unless" | "random"

/**
 * Represent a condition
 */
class Condition {
    condition: conditionFormat | undefined
    type: conditionType
    /**
     * @param type The type of the condition
     * @param condition The confition itself
     */
    constructor(type: conditionType, condition?: conditionFormat) {
        this.type = type
        this.condition = condition
    }
    
    /**
     * Set the new condition's type
     * @param type The new condition's type
     */
    setType(type: conditionType) {
        this.type= type
        return this
    }

    private conditionTypeToString(type: conditionType) {
        if(type === "random") return ["if", "unless"][Math.round(Math.random())]
        else return type
    }

    private conditionToString(condition: conditionFormat, type: conditionType) {
        const {blocks, entities, scores, nbt} = condition
        const commands = []

        if(entities) {
            for(const obj of entities) {
                commands.push(`entity ${obj.render()}`)
            }
        }
        if(blocks) {
            for(const data of blocks) {
                if("name" in data) {
                    commands.push(`block ${data.Block.render()} ${data.name}`)
                }else {
                    commands.push(`blocks ${data.Blocks.render()} ${data.checker.render()} ${data.includesAir ? "all" : "masked"}`)
                }
            }
        }
        if(scores) {
            for(const data of scores) {
                const entity = data.entity instanceof Entity ? data.entity.render() : data.entity
                if("value" in data) {
                    commands.push(`score ${entity} ${data.scoreboard.name} matches ${data.value.render()}`)
                }else {
                    commands.push(`score ${entity} ${data.scoreboard.name} ${data.operation} ${data.from.entity instanceof Entity ? data.from.entity.render() : data.from.entity} ${data.from.scoreboard.name}`)
                }
            }
        }
        if(nbt) {
            for(const {element, path} of nbt) {
                commands.push(`data ${element.constructor.name === "Block" ? 'block' : 'entity'} ${element.render()} ${path.render()}`)
            }
        }
        return commands.map(cmd => `${this.conditionTypeToString(type)} ${cmd}`).join(' ')
    }

    /**
     * Execute commands only if the condition passed
     * @param commands The commands to execute
     */
    execute(...commands: Commands) {
        commands = processCommands(commands).map(cmd => executeCmd(this.render(), cmd))
        return commands
    }

    /**
     * Execute commands only if the condition passed (has an `if` condition)
     * @param commands The commands to execute
     */
    executeIf(...commands: Commands) {
        commands = processCommands(commands).map(cmd => executeCmd(this.render("if"), cmd))
        return commands
    }
    /**
     * Execute commands only if the condition passed (has an `if not` condition)
     * @param commands The commands to execute
     */
    executeUnless(...commands: Commands) {
        commands = processCommands(commands).map(cmd => executeCmd(this.render("unless"), cmd))
        return commands
    }

    render(type?: conditionType) {
        if(!this.condition) return ""
        return this.conditionToString(this.condition, type || this.type)
    }
}

export {Condition}