declare type ressourceLocation = string;
declare const ressourceLocationRegExp: RegExp;
declare function isRessourceLocationValid(test: string): boolean | 0;
export { ressourceLocation, isRessourceLocationValid, ressourceLocationRegExp };
