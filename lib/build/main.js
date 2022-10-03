"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBuild = exports.build = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const events_1 = __importDefault(require("./readers/events"));
const functions_1 = __importDefault(require("./readers/functions"));
const tags_1 = __importDefault(require("./readers/tags"));
const advancement_1 = __importDefault(require("./readers/advancement"));
const mk_1 = __importDefault(require("./utils/mk"));
const recipe_1 = __importDefault(require("./readers/recipe"));
var buildInfos = {
    mainPath: ".",
    namespace: "dpjs",
    options: {}
};
function initBuild(pck) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, options, version, description, icon, namespace } = pck;
        if (!(name && version && namespace))
            throw new Error(`Cannot build a datapack without his main informations!`);
        const { buildPath, author } = options || {};
        const mainFolderPath = path_1.default.join(buildPath || '.', name);
        try {
            (0, fs_1.rmSync)(mainFolderPath, { recursive: true });
        }
        catch (e) { }
        buildInfos = {
            mainPath: mainFolderPath,
            namespace,
            options: options || {}
        };
        (0, mk_1.default)("folder", path_1.default.join(mainFolderPath, "data", namespace));
        if (icon) {
            const ext = path_1.default.extname(icon);
            if (ext !== "png")
                console.error(`".${ext}" is not a valid icon extention!`);
            else
                (0, fs_1.readFile)(path_1.default.join(__dirname, icon), (e, f) => {
                    if (e)
                        return console.error(`"${icon}" is not a valid icon!`);
                    (0, mk_1.default)("file", path_1.default.join(mainFolderPath, "pack.png", f.toString('utf-8')));
                });
        }
        const packFormat = {
            "1.18": 8,
            "1.18.2": 9,
            "1.19": 10
        };
        const packmeta = {
            pack: {
                pack_format: packFormat[version] || version[version.length - 1],
                description
            }
        };
        (0, mk_1.default)("file", path_1.default.join(mainFolderPath, 'pack.mcmeta'), JSON.stringify(packmeta));
    });
}
exports.initBuild = initBuild;
function build(...datas) {
    var _a;
    const functions = {
        "event": events_1.default,
        "function": functions_1.default,
        "tag": tags_1.default,
        "advancement": advancement_1.default,
        "recipe": recipe_1.default
    };
    for (const obj of datas) {
        const f = functions[(_a = obj.ObjectType) === null || _a === void 0 ? void 0 : _a.toLowerCase()];
        if (!f)
            return console.error(`"${obj.ObjectType}" isn't a valid object type!`);
        else
            f(obj, buildInfos);
    }
    console.info(`The datapack has been built inside ${buildInfos.mainPath}!`);
}
exports.build = build;
exports.default = initBuild;
