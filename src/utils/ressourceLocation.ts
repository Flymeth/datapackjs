type ressourceLocation = string
const ressourceLocationRegExp = /[a-z_\- 0-9\.\/]+/
function isRessourceLocationValid(test: string) {
    return test.length && ressourceLocationRegExp.exec(test)?.[0] === test
}

export {ressourceLocation, isRessourceLocationValid, ressourceLocationRegExp}