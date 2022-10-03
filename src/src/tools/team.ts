import { mcDefaultColors } from "./display"
import { JsonRaw } from "./jsonraw"
import { Entity } from "./selector"

type extraTeamChoice = "never" | "for other teams" | "for this team" | "always"
type teamOptions = {
    color: mcDefaultColors,
    /**
     * The team's display name
     */
    display?: JsonRaw,
    /**
     * Prefix of the member's pseudo
     */
    prefix?: JsonRaw,
    /**
     * Prefix of the member's pseudo
     */
    suffix?: JsonRaw,
    /**
     * If the PvP is activated inside the team
     */
    friendlyFire?: boolean,
    seeInvisibleFriends?: boolean,
    hideNametag?: extraTeamChoice,
    hideDeathMessage?: extraTeamChoice,
    collisions?: extraTeamChoice
}

/**
 * Represent a team
 */
class Team {
    name: string
    settings: teamOptions
    /**
     * @param name The name of the team
     */
    constructor(name: string, options?: teamOptions) {
        if(/ /.exec(name)?.[0]) throw new Error(`${name} is not a valid team name!`)
        this.name = name
        this.settings = options || {
            color: "white"
        }
    }

    /**
     * Create the team
     * @param force Delete other team named as this one before create this one
     */
    create(force?: boolean) {
        const cmd = `team add ${this.name + (this.settings.display ? " " + this.settings.display.render() : "")}`
        if(force) return [this.delete(), cmd, ...this.edit.update()]
        return [cmd, ...this.edit.update()]
    }
    /**
     * Delete the team
     */
    delete() {
        return `team remove ${this.name}`
    }

    private extraTeamToStr(txt: extraTeamChoice, type: string) {
        const data = {
            "never": "never",
            "for other teams": `${type}OtherTeams`,
            "for this team": `${type}OwnTeam`,
            "always": "always"
        }
        return data[txt] || "never"
    }

    /**
     * Manage the team attributes
     */
    edit = {
        /**
         * Set the new team's color
         */
        color: (color: mcDefaultColors) => {
            this.settings.color = color
            return `team modify ${this.name} color ${color}`
        },
        /**
         * Set the new team's collision rule
         */
        collisions: (type: extraTeamChoice) => {
            this.settings.collisions = type
            return `team modify ${this.name} collisionRule ${this.extraTeamToStr(type, "push")}`
        },
        /**
         * Set if member of this team show a message after they die
         */
        deathMessage: (hideFor: extraTeamChoice) => {
            this.settings.hideDeathMessage = hideFor
            return `team modify ${this.name} deathMessageVisibility ${this.extraTeamToStr(hideFor, "hideFor")}`
        },
        /**
         * Set the new team's display name
         */
        display: (content: JsonRaw) => {
            this.settings.display = content
            return `team modify ${this.name} displayName ${content.render()}`
        },
        /**
         * Set if PvP is activated inside the team
         */
        friendlyFire: (active: boolean) => {
            this.settings.friendlyFire = active
            return `team modify ${this.name} friendlyFire ${!!active}`
        },
        /**
         * Set the new team's nametag visibility rule
         */
        nametag: (hideFor: extraTeamChoice) => {
            this.settings.hideNametag = hideFor
            return `team modify ${this.name} nametagVisibility ${this.extraTeamToStr(hideFor, "hideFor")}`
        },
        /**
         * Set the new team member's prefix
         */
        prefix: (content: JsonRaw) => {
            this.settings.prefix = content
            return `team modify ${this.name} prefix ${content.render()}`
        },
        /**
         * Set if invisible member can be saw by the other team member
         */
        invisibleFriends: (hidden: boolean) => {
            this.settings.seeInvisibleFriends = !hidden
            return `team modify ${this.name} seeFriendlyInvisibles ${!hidden}`
        },
        /**
         * Set the new team member's suffix
         */
        suffix: (content: JsonRaw) => {
            this.settings.suffix = content
            return `team modify ${this.name} suffix ${content.render()}`
        },
        /**
         * update all the team attribute in one time
         */
        update: () => {
            const {color, collisions, hideDeathMessage, display, friendlyFire, hideNametag, prefix, seeInvisibleFriends, suffix} = this.settings
            const cmds = []
            cmds.push(`color ${color}`)
            if(collisions) cmds.push(`collisionRule ${this.extraTeamToStr(collisions, "push")}`)
            if(hideDeathMessage) cmds.push(`deathMessageVisibility ${this.extraTeamToStr(hideDeathMessage, "hideFor")}`)
            if(display) cmds.push(`displayName ${display.render()}`)
            if(friendlyFire) cmds.push(`friendlyFire ${!!friendlyFire}`)
            if(hideNametag) cmds.push(`nametagVisibility ${this.extraTeamToStr(hideNametag, "hideFor")}`)
            if(prefix) cmds.push(`prefix ${prefix.render()}`)
            if(seeInvisibleFriends) cmds.push(`seeFriendlyInvisibles ${!!seeInvisibleFriends}`)
            if(suffix) cmds.push(`suffix ${suffix.render()}`)

            return cmds.map(c => `team modify ${this.name} ${c}`)
        }
    }

    /**
     * Manage the team member
     */
    members = {
        /**
         * Add a member to the team
         * @param entity The entity to add to the team
         * @param force If is set to `false` the command will do nothing if the entity is already in an other team
         */
        add: (entity?: Entity, force?: boolean) => {
            const cmd = `team join ${this.name + (entity && entity.letterSelector() !== "s" ? ` ${entity.render()}` : "")}`
            if(force) return [this.members.remove(entity || new Entity("self"), true), cmd]
            else return cmd
        },
        /**
         * Remove a team member
         * @param entity The entity to remove
         * @param force If is set to `false` the command will do nothing if the entity is already in an other team
         * @returns 
         */
        remove: (entity: Entity, force: boolean) => {
            if(force) return `team leave ${entity.render()}`
            else {
                entity.selector.team = this
                return entity.execute(false, e => [`team leave ${e.render()}`])
            }
        },
        /**
         * Remove all the team member
         */
        clear: () => {
            return `team empty ${this.name}`
        }
    }
}

export {Team}