import path from "path";
import gameTag from "../../src/tag";
import { buildConfig } from "../main";
import mk from "../utils/mk";

export default function buildTag(tag: gameTag, config: buildConfig) {
    const {name, content, replace, type} = tag
    const obj = {
        replace,
        values: content
    }
    mk("file", path.join(config.mainPath, "data", config.namespace, 'tags', type, `${name}.json`), JSON.stringify(obj))
}