import { mcDefaultColors } from "./display";
import { JsonRaw } from "./jsonraw";
import { Entity } from "./selector";
declare type extraTeamChoice = "never" | "for other teams" | "for this team" | "always";
declare type teamOptions = {
    color: mcDefaultColors;
    /**
     * The team's display name
     */
    display?: JsonRaw;
    /**
     * Prefix of the member's pseudo
     */
    prefix?: JsonRaw;
    /**
     * Prefix of the member's pseudo
     */
    suffix?: JsonRaw;
    /**
     * If the PvP is activated inside the team
     */
    friendlyFire?: boolean;
    seeInvisibleFriends?: boolean;
    hideNametag?: extraTeamChoice;
    hideDeathMessage?: extraTeamChoice;
    collisions?: extraTeamChoice;
};
/**
 * Represent a team
 */
declare class Team {
    name: string;
    settings: teamOptions;
    /**
     * @param name The name of the team
     */
    constructor(name: string, options?: teamOptions);
    /**
     * Create the team
     * @param force Delete other team named as this one before create this one
     */
    create(force?: boolean): string[];
    /**
     * Delete the team
     */
    delete(): string;
    private extraTeamToStr;
    /**
     * Manage the team attributes
     */
    edit: {
        /**
         * Set the new team's color
         */
        color: (color: mcDefaultColors) => string;
        /**
         * Set the new team's collision rule
         */
        collisions: (type: extraTeamChoice) => string;
        /**
         * Set if member of this team show a message after they die
         */
        deathMessage: (hideFor: extraTeamChoice) => string;
        /**
         * Set the new team's display name
         */
        display: (content: JsonRaw) => string;
        /**
         * Set if PvP is activated inside the team
         */
        friendlyFire: (active: boolean) => string;
        /**
         * Set the new team's nametag visibility rule
         */
        nametag: (hideFor: extraTeamChoice) => string;
        /**
         * Set the new team member's prefix
         */
        prefix: (content: JsonRaw) => string;
        /**
         * Set if invisible member can be saw by the other team member
         */
        invisibleFriends: (hidden: boolean) => string;
        /**
         * Set the new team member's suffix
         */
        suffix: (content: JsonRaw) => string;
        /**
         * update all the team attribute in one time
         */
        update: () => string[];
    };
    /**
     * Manage the team member
     */
    members: {
        /**
         * Add a member to the team
         * @param entity The entity to add to the team
         * @param force If is set to `false` the command will do nothing if the entity is already in an other team
         */
        add: (entity?: Entity, force?: boolean) => string | (string | string[])[];
        /**
         * Remove a team member
         * @param entity The entity to remove
         * @param force If is set to `false` the command will do nothing if the entity is already in an other team
         * @returns
         */
        remove: (entity: Entity, force: boolean) => string | string[];
        /**
         * Remove all the team member
         */
        clear: () => string;
    };
}
export { Team };
