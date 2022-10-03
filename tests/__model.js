const { Datapack } = require('datapackjs')
const { Entity, Players, RangeValue, Title, Condition, Scoreboard, JsonRaw, Team } = require('datapackjs/tools')
const { NBTPath } = require('../lib/tools')

const dp = new Datapack( {
	name: "My great dp",
	description: "This is a great dp!",
	options: {
		buildpath: ".minecraft/saves/dp_testing/datapacks",
		author: {
			name: "Flymeth",
			mcName: "Flymeth"
		}
	}
})

const superOPLvl = new RangeValue().upperThan(5).lowerThan(10)
const adminTeam  = new Team("admins")

const opSB = new Scoreboard("opLvl")
const gameSB = new Scoreboard("game", {
	type: "dummy",
	display: new JsonRaw({
		text: "Game SB",
		color: "red",
		underlined: true	
	})
})

const GamesAdmin = new Players("all", {
	tags: ["admin"],
	scores: [
		{scoreboard: opSB, value: superOPLvl},
		{scoreboard: gameSB, value: new RangeValue().equalTo(0)}
	],
	team: adminTeam
})

const loadEvent = new dp.Event("load")

const loadFct = new dp.Function()
loadEvent.exec(loadFct)

const welcomeTitle = new Title("title", new JsonRaw([
	{text: "Welcome, ", color: "red"},
	{text: {
		entity: new Entity("self")
	}, color: "red", underlined: true}
]))
const welcomeSub  = new Title("subtitle", new JsonRaw({text: `Thanks for using ${dp.name} (by ${dp.options.author})`, color: "blue", italic: true}))

loadFct.exec(welcomeTitle.show(GamesAdmin), welcomeSub.show(GamesAdmin))

const gamesItems = new dp.Tags("item", [
	"minecraft:iron_chestplate", "minecraft:iron_sword", "minecraft:beacon"
])

const clearItems = new dp.Function("clear")
const tickEvent = new dp.Event("tick")
tickEvent.exec(clearItems)

clearItems.exec(GamesAdmin.execute(true/* at ?*/, new Condition({
	if: {
		scores: [
			{scoreboard: opSB, value: new RangeValue().equalTo(5)}
		],
		entities: [
			adminTeam
		],

	},
	unless: {
		//same as if: {}
	}
}), (player) => [
	player.clear(gamesItems),
	gameSB.players.set(player, 0)
]))

const inGameDatas = new NBTData({Invisibility: true})

opSB.storing.set({
	from: new Entity("all", {tags: ["x"]}).storing.get(new NBTPath().inner("Inventory").inner(1).inner("count")),
	type: "result",
	multipliedBy: .15,
	into: "x"
})

const cond = new Condition({
	scores: [
		{scoreboard: Hello, value: new RangeValue().lowerThan(0), entity: ply}
	]
})

ply.execute(true, (p) => {
	cond.execIf(p.kill())
})