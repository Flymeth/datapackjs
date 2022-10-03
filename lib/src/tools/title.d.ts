import { JsonRaw } from "./jsonraw";
import { Entity } from "./selector";
declare type titleTypes = "title" | "subtitle" | "actionbar";
declare type titleTimes = {
    fadein: number;
    stayfor: number;
    fadeout: number;
};
declare class Title {
    type: titleTypes;
    content: JsonRaw;
    constructor(type: titleTypes, content: JsonRaw);
    setContent(newContent: JsonRaw): this;
    showTo(entity: Entity, times?: titleTimes): string | string[];
    setTime(entity: Entity, times: titleTimes): string;
}
export { Title };
