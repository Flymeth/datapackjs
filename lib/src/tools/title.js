"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Title = void 0;
class Title {
    constructor(type, content) {
        this.type = type;
        this.content = content;
    }
    setContent(newContent) {
        this.content = newContent;
        return this;
    }
    showTo(entity, times) {
        const cmd = `title ${entity.render()} ${this.type} ${this.content.render()}`;
        return (times ? [this.setTime(entity, times), cmd] : cmd);
    }
    setTime(entity, times) {
        return `title ${entity.render()} times ${times.fadein} ${times.stayfor} ${times.fadeout}`;
    }
}
exports.Title = Title;
