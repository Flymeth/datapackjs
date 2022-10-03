import Datapack, { buildDatas, dpOptions } from "..";
declare type buildConfig = {
    /**
    * datapacks/foo/[HERE]
    */
    mainPath: string;
    namespace: string;
    options: dpOptions;
};
declare function initBuild(pck: Datapack): Promise<void>;
declare function build(...datas: buildDatas[]): void;
export default initBuild;
export { build, initBuild, buildConfig };
