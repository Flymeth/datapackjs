const {default: Datapack} = require('../lib')
const {NBTPath, Scoreboard, Player, Condition, RangeValue, Title, JsonRaw} = require('../lib/tools')
const dp = new Datapack({
    name: "WorldCenterCoords",
    version: '1.19',
    namespace: 'wcc_v1',
    options: {
        buildPath: "./",//"C:/Users/johan/AppData/Roaming/.minecraft/saves/pack tester/datapacks",
    },
    description: "A datapack that show you how far you are from the center of the world"
})

//? Tous les joueurs (selector)
const allPlayers = new Player('all')

//? Scoreboards
// >> La distance affiché
const farAwaySB = new Scoreboard("farAway")
// >> La position du joueur en [x, y, z]
const sb = [new Scoreboard("dx"), new Scoreboard("dy"), new Scoreboard("dz")]

//? Chemin NBTS
// >> Nbt de la position du joueur en [x, y, z]
const posPath = [new NBTPath("Pos[0]"), new NBTPath("Pos[1]"), new NBTPath("Pos[2]")]

//? Lorsque le datapack est prêt
dp.save(
    new dp.Event('load', new dp.Function("init", ...sb.map(s => s.create(true)), farAwaySB.create()))
)

//? Function calculator de la distance
const coordCalc = new dp.Function("calculator")

//? Mets les coordonnées de chaques joueurs dans les scoreboards [dx, dy, dz]
coordCalc.exec(
    sb.map((s, i) => allPlayers.execute(false, player => [
        s.players.store(player, "result", player.nbt.get(posPath[i]))
    ]))
)

//? Condition: si le score est <0
const isCoordsNegatives = sb.map(s => new Condition("if", {
    scores: [{
        scoreboard: s, entity: "@s", value: new RangeValue().lowerThan(0)
    }]
}))

//? Si la condition si dessus est rempli, on inverse les coordonnées
coordCalc.exec(
    sb.map((s, i) => allPlayers.execute(false, player => [
        isCoordsNegatives[i].executeIf(s.players.store(player, "result", player.nbt.get(posPath[i], -1)))
    ]))
)

//? On met dans le scoreboard "farAway" 2x la somme des coordonnées que l'on divise par 3 (puis on ajoute 2)
coordCalc.exec(
    farAwaySB.players.set("dividor", 3),
    farAwaySB.players.set(allPlayers, 0),
    sb.map(s => [
        farAwaySB.players.operation(allPlayers, "add", {scoreboard: s, entity: allPlayers}),
        farAwaySB.players.operation(allPlayers, "add", {scoreboard: s, entity: allPlayers})]
    ),
    farAwaySB.players.operation(allPlayers, "divide", {scoreboard: farAwaySB, entity: "dividor"}),
    farAwaySB.players.add(allPlayers, 2)
)

//? On affiche les coordonnées de chaques joueurs
const displayer = new dp.Function("display")
displayer.exec(
    allPlayers.execute(false, player => {
        const textStyle = {color: "gold", italic: true}
        const coordStyle= {...textStyle, bold: true, undelined: true}

        const title = new Title("actionbar", new JsonRaw([
            {text: "Distance from the world's center: ", ...textStyle},
            {text: {score: {scoreboard: farAwaySB, entity: player}}, ...coordStyle},
            {text: "blocks", ...textStyle}
        ]))
        return [title.show(player)]
    })
)

//? On sauvegarde les fonctions et on build le datapack
dp.build(new dp.Event('tick', coordCalc, displayer))