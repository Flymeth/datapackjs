const Datapack = require('../lib/index').default
const { Title } = require('../lib/tools')

const dp = new Datapack({
    name: "My cool dp",
    namespace: "dp",
    version: "1.19",
    options: {
        buildPath: "./"
    }
})

const ontick = new dp.Event("tick")
const onload = new dp.Event("load")

const tickFunction = new dp.Function("tick")
const loadFunction = new dp.Function("load")
ontick.exec(tickFunction)
onload.exec(loadFunction)

