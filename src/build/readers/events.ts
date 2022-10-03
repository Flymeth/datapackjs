import { readFileSync } from "fs";
import path from "path";
import gameEvent from "../../src/event";
import { buildConfig } from "../main";
import mk from "../utils/mk";
import buildFunction from "./functions";

export default function buildEvent(event: gameEvent, config: buildConfig) {
    const {functions} = event

    const filePath = path.join(config.mainPath, `data/minecraft/tags/functions/${event.type}.json`)
    
    const datas: any = {
        values: []
    }

    try {
        const existingFile = readFileSync(filePath)
        datas.values = JSON.parse(existingFile.toString()).datas.values        
    } catch (e) {}

    for(const obj of functions) {
        buildFunction(obj, config)
        datas.values.push(`${config.namespace}:${obj.name}`)
    }
    mk("file", filePath, JSON.stringify(datas))
}