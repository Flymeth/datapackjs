import { JsonRaw } from "./jsonraw"
import { Entity, Player } from "./selector"

type mcDefaultColors = "red" | "blue" | "purple" | "white" | "green" | "black"
type titleTypes = "title" | "subtitle" | "actionbar"
type titleTimes = {
    fadein: number,
    stayfor: number,
    fadeout: number
}

/**
 * Represent a showable title
 */
class Title {
    type: titleTypes
    content: JsonRaw
    constructor(type: titleTypes, content: JsonRaw) {
        this.type = type
        this.content = content
    }

    /**
     * Change the title's content
     * @param newContent The new title's content
     */
    changeContent(newContent: JsonRaw) {
        this.content = newContent
        return this
    }

    /**
     * Display the title
     * @param to The player to show the title to
     * @param times The title's time option
     */
    show(to: Player, times?: titleTimes) {
        const cmd = `title ${to.render()} ${this.type} ${this.content.render()}`
        return (times ? [this.setTime(to, times), cmd] : cmd)
    }

    /**
     * Modify the title's time option of an entity
     * @param entity The entity to modify the title's time option to
     * @param times Time option
     */
    setTime(to: Player, times: titleTimes) {
        return `title ${to.render()} times ${Math.floor(times.fadein)} ${Math.floor(times.stayfor)} ${Math.floor(times.fadeout)}`
    }
}

type tellRawOptions = {
    isPrivate: true,
    content: string
} | {
    isPrivate: false,
    content: JsonRaw
}
/**
 * Represent a tellraw
 */
class Tellraw {
    private type: "tellraw" | "tell"
    content: JsonRaw | string
    constructor(options: tellRawOptions) {
        this.type = options.isPrivate ? "tell" : "tellraw"
        this.content = options.content
    }

    /**
     * Change the tellraw's privacy
     * @param isPrivate If the tellraw is private (`/tell`) or not (`/tellraw`)
     */
    changePrivacy(isPrivate: boolean) {
        this.type = isPrivate ? "tell" : "tellraw"
        return this
    }

    /**
     * Change the tellraw's content
     * @param content The new tellraw's content
     */
    changeContent(content: JsonRaw | string) {
        if(this.type === "tell" && (content instanceof JsonRaw)) throw new Error("A private message cannot be formated")
        this.content = content
        return this
    }

    /**
     * Show the tellraw
     * @param to The player to show the tellraw for
     */
    show(to: Player) {
        const raw = (this.content instanceof JsonRaw ? this.content.render() : this.content)
        return `${this.type} ${to.render()} ${raw}`
    }
}

/**
 * Represent a private message
 */
class Message {
    content: string

    /**
     * @param content The content of the message
     */
    constructor(content: string) {
        this.content = content
    }

    /**
     * Send the message to a player
     * @param to The message's receiver (if not set, send it to everyone)
     */
    tell(to?: Player) {
        if(!to) return `say ${this.content}`
        else return `msg ${to.render()} ${this.content}`
    }
    /**
     * Change the message's content
     * @param content The new message's content
     */
    editContent(content: string) {
        this.content = content
        return this
    }
}

export {Title, Tellraw, Message, mcDefaultColors}