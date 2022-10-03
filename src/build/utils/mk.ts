import fs from 'fs'
import { parse } from 'path'

type mkTypes = "file" | "folder"
function mk(type: mkTypes, path: string, datas?: string) {
    if(type=== "file") {
        const { dir } = parse(path)        
        mk("folder", dir)
        fs.writeFileSync(path, datas || "")
    }else fs.mkdirSync(path, {
        recursive: true
    })
}

export default mk