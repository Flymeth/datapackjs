declare type mkTypes = "file" | "folder";
declare function mk(type: mkTypes, path: string, datas?: string): void;
export default mk;
