const {default: DatapackJS} = require('../lib/index')
const {} = require('../lib/tools')

const dp = new DatapackJS({
    name: "test",
    namespace: "test",
    version: "1.19"
})

const adv = new dp.Advancement("test", {
    conditions: [],
    rewards: {
        function: new dp.Function("test")
    }
})

dp.build(adv)