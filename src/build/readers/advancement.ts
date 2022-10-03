import gameAdvancement from "../../src/advancement";
import { buildConfig } from "../main";
import mk from "../utils/mk";
import path from 'path';
import { JsonRaw } from "../../tools";

export default function buildAdvancement(adv: gameAdvancement, config: buildConfig) {
    const { conditions,rewards, description, display, isSecret, parent, type, whenComplete } = adv.options
    
    const criteria: {[key: string]: {trigger: string, conditions: object}} = {}
    for(const {data, name, trigger} of conditions) {
        criteria[name] = {
            trigger,
            conditions: data
        }
    }

    const finalOBJ = {
        display: {
            icon: display?.icon ? {
                name: display.icon.name,
                nbt: display.icon.nbt.render()
            } : undefined,
            title: (display?.title instanceof JsonRaw ? display.title.render() : display?.title),
            frame: type,
            description: (description instanceof JsonRaw ? description.render() : description),
            show_toast: whenComplete?.toast,
            announce_to_chat: whenComplete?.announce,
            hidden: isSecret
        },
        parent,
        criteria,
        rewards: {
            recipes: rewards.recipes?.map(e => e.render()),
            loots: rewards.loots?.map(e => e.render()),
            experiences: rewards.experiences,
            function: rewards.function.render()
        }
    }

    mk('file', path.join(config.mainPath, `/data/${config.namespace}/advancement/${adv.name}.json`), JSON.stringify(finalOBJ))
}