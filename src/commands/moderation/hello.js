const  { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, GuildMember } = require("discord.js");
const { callback } = require("../misc/ping");

module.exports = {
    name: "hello",
    description: "Answers with hello!",
    //devonly: bool,
    //testonly: bool,
    
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        interaction.reply("Hello!")
    }
}