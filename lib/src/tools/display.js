"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.Tellraw = exports.Title = void 0;
const jsonraw_1 = require("./jsonraw");
/**
 * Represent a showable title
 */
class Title {
    constructor(type, content) {
        this.type = type;
        this.content = content;
    }
    /**
     * Change the title's content
     * @param newContent The new title's content
     */
    changeContent(newContent) {
        this.content = newContent;
        return this;
    }
    /**
     * Display the title
     * @param to The player to show the title to
     * @param times The title's time option
     */
    show(to, times) {
        const cmd = `title ${to.render()} ${this.type} ${this.content.render()}`;
        return (times ? [this.setTime(to, times), cmd] : cmd);
    }
    /**
     * Modify the title's time option of an entity
     * @param entity The entity to modify the title's time option to
     * @param times Time option
     */
    setTime(to, times) {
        return `title ${to.render()} times ${Math.floor(times.fadein)} ${Math.floor(times.stayfor)} ${Math.floor(times.fadeout)}`;
    }
}
exports.Title = Title;
/**
 * Represent a tellraw
 */
class Tellraw {
    constructor(options) {
        this.type = options.isPrivate ? "tell" : "tellraw";
        this.content = options.content;
    }
    /**
     * Change the tellraw's privacy
     * @param isPrivate If the tellraw is private (`/tell`) or not (`/tellraw`)
     */
    changePrivacy(isPrivate) {
        this.type = isPrivate ? "tell" : "tellraw";
        return this;
    }
    /**
     * Change the tellraw's content
     * @param content The new tellraw's content
     */
    changeContent(content) {
        if (this.type === "tell" && (content instanceof jsonraw_1.JsonRaw))
            throw new Error("A private message cannot be formated");
        this.content = content;
        return this;
    }
    /**
     * Show the tellraw
     * @param to The player to show the tellraw for
     */
    show(to) {
        const raw = (this.content instanceof jsonraw_1.JsonRaw ? this.content.render() : this.content);
        return `${this.type} ${to.render()} ${raw}`;
    }
}
exports.Tellraw = Tellraw;
/**
 * Represent a private message
 */
class Message {
    /**
     * @param content The content of the message
     */
    constructor(content) {
        this.content = content;
    }
    /**
     * Send the message to a player
     * @param to The message's receiver (if not set, send it to everyone)
     */
    tell(to) {
        if (!to)
            return `say ${this.content}`;
        else
            return `msg ${to.render()} ${this.content}`;
    }
    /**
     * Change the message's content
     * @param content The new message's content
     */
    editContent(content) {
        this.content = content;
        return this;
    }
}
exports.Message = Message;
