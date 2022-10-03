import path from "path";
import gameFunction from "../../src/function";
import { buildConfig } from "../main";
import mk from "../utils/mk";

export default function buildFunction(fct: gameFunction, config: buildConfig) {
    const {commands, name} = fct
    mk("file", path.join(config.mainPath, `data/${config.namespace}/functions/${name}.mcfunction`), commands.join('\n'))
}