import { JsonRaw } from "./jsonraw";
import { Player } from "./selector";
declare type mcDefaultColors = "red" | "blue" | "purple" | "white" | "green" | "black";
declare type titleTypes = "title" | "subtitle" | "actionbar";
declare type titleTimes = {
    fadein: number;
    stayfor: number;
    fadeout: number;
};
/**
 * Represent a showable title
 */
declare class Title {
    type: titleTypes;
    content: JsonRaw;
    constructor(type: titleTypes, content: JsonRaw);
    /**
     * Change the title's content
     * @param newContent The new title's content
     */
    changeContent(newContent: JsonRaw): this;
    /**
     * Display the title
     * @param to The player to show the title to
     * @param times The title's time option
     */
    show(to: Player, times?: titleTimes): string | string[];
    /**
     * Modify the title's time option of an entity
     * @param entity The entity to modify the title's time option to
     * @param times Time option
     */
    setTime(to: Player, times: titleTimes): string;
}
declare type tellRawOptions = {
    isPrivate: true;
    content: string;
} | {
    isPrivate: false;
    content: JsonRaw;
};
/**
 * Represent a tellraw
 */
declare class Tellraw {
    private type;
    content: JsonRaw | string;
    constructor(options: tellRawOptions);
    /**
     * Change the tellraw's privacy
     * @param isPrivate If the tellraw is private (`/tell`) or not (`/tellraw`)
     */
    changePrivacy(isPrivate: boolean): this;
    /**
     * Change the tellraw's content
     * @param content The new tellraw's content
     */
    changeContent(content: JsonRaw | string): this;
    /**
     * Show the tellraw
     * @param to The player to show the tellraw for
     */
    show(to: Player): string;
}
/**
 * Represent a private message
 */
declare class Message {
    content: string;
    /**
     * @param content The content of the message
     */
    constructor(content: string);
    /**
     * Send the message to a player
     * @param to The message's receiver (if not set, send it to everyone)
     */
    tell(to?: Player): string;
    /**
     * Change the message's content
     * @param content The new message's content
     */
    editContent(content: string): this;
}
export { Title, Tellraw, Message, mcDefaultColors };
