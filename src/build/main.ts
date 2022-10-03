import { readFile, rmSync } from "fs";
import path from "path";
import Datapack, { buildDatas, dpOptions } from "..";
import buildEvent from "./readers/events";
import buildFunction from "./readers/functions";
import buildTag from "./readers/tags";
import buildAdvancement from "./readers/advancement";
import mk from "./utils/mk";
import buildRecipe from "./readers/recipe";

type buildConfig = {
    /**
    * datapacks/foo/[HERE]
    */
    mainPath: string,
    namespace: string,
    options: dpOptions
}

var buildInfos:buildConfig = {
    mainPath: ".",
    namespace: "dpjs",
    options: {}
}

async function initBuild(pck:Datapack) {
    const {name, options, version, description, icon, namespace} = pck
    if(!(
        name && version && namespace
    )) throw new Error(`Cannot build a datapack without his main informations!`)

    const { buildPath, author } = options || {}
    const mainFolderPath = path.join(buildPath || '.', name)
    try {
        rmSync(mainFolderPath, {recursive: true})
    } catch (e) {}

    buildInfos = {
        mainPath: mainFolderPath,
        namespace,
        options: options || {}
    }
    

    mk("folder", path.join(mainFolderPath, "data", namespace))

    if(icon) {
        const ext = path.extname(icon)
        if(ext !== "png") console.error(`".${ext}" is not a valid icon extention!`)
        else readFile(path.join(__dirname, icon), (e, f) => {
            if(e) return console.error(`"${icon}" is not a valid icon!`)
            mk("file", path.join(mainFolderPath, "pack.png", f.toString('utf-8')))
        })
    }

    const packFormat = {
        "1.18": 8,
        "1.18.2": 9,
        "1.19": 10
    }
    const packmeta = {
        pack: {
            pack_format: packFormat[version] || version[version.length - 1],
            description
        }
    }
    mk("file", path.join(mainFolderPath, 'pack.mcmeta'), JSON.stringify(packmeta))
}

function build(...datas: buildDatas[]) {
    const functions: {[key: string]: any} = {
        "event": buildEvent,
        "function": buildFunction,
        "tag": buildTag,
        "advancement": buildAdvancement,
        "recipe": buildRecipe
    }
    for(const obj of datas) {
        const f = functions[obj.ObjectType?.toLowerCase()]
        if(!f) return console.error(`"${obj.ObjectType}" isn't a valid object type!`)
        else f(obj, buildInfos)
    }

    console.info(`The datapack has been built inside ${buildInfos.mainPath}!`)
}

export default initBuild
export {build, initBuild, buildConfig}