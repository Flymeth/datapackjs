"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonRaw = void 0;
const selector_1 = require("./selector");
/**
 * Represent a json formated text
 */
class JsonRaw {
    constructor(content) {
        this.content = content;
    }
    /**
     * Add a text to the current formated text
     * @param content The text to add
     */
    addText(content) {
        if (!this.content)
            this.content = content;
        else if (!("push" in this.content))
            this.content = [this.content, content];
        else
            this.content.push(content);
        return this;
    }
    /**
     * Remove a part of the text
     * @param index The index of the text to remove
     */
    removeText(index) {
        if (this.content && "push" in this.content && this.content.length && index < this.content.length && index >= 0)
            this.content.splice(index, 1);
        return this;
    }
    /**
     * Remove all the text
     */
    resetText() {
        delete this.content;
        return this;
    }
    render() {
        if (!this.content)
            throw new Error(`The text is empty!`);
        function process(obj) {
            const newObject = Object.assign({}, obj);
            if (typeof obj.text === "object") {
                const { text } = obj;
                if ("score" in text) {
                    const { score } = text;
                    if (score.entity instanceof selector_1.Entity) {
                        newObject.score = {
                            name: score.entity.render(),
                            objective: score.scoreboard.name
                        };
                    }
                    else {
                        newObject.score = {
                            name: score.entity,
                            objective: score.scoreboard.name
                        };
                    }
                }
                else if ("entity" in text) {
                    newObject.selector = text.entity.render();
                }
                else if ("nbt" in text) {
                    const { nbt } = text;
                    const { path, separator } = nbt;
                    const obj = {};
                    if ("entity" in nbt)
                        obj.entity = nbt.entity.render();
                    else if ("block" in nbt)
                        obj.block = nbt.block.render();
                    else if ("storage" in nbt)
                        obj.storage = nbt.storage.name;
                    if (separator)
                        obj.separator = separator.render();
                    newObject.nbt = Object.assign({ path: path.render() }, obj);
                }
                delete newObject.text;
            }
            return newObject;
        }
        let finalData = [""];
        if (typeof this.content === "string")
            return JSON.stringify({ text: this.content });
        if ("push" in this.content)
            for (const obj of this.content)
                finalData.push(process(obj));
        else
            finalData = process(this.content);
        return JSON.stringify(finalData);
    }
}
exports.JsonRaw = JsonRaw;
