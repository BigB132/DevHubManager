const  { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");
const { callback } = require("../misc/ping");

module.exports = {
    name: "ban",
    description: "Bans a member from the server",
    //devonly: bool,
    //testonly: bool,
    options: [
        {
            name: "user",
            description: "The user to ban",
            required: true,
            type: ApplicationCommandOptionType.User,
        },
        {
            name: "reason",
            description: "reason for banning",
            required: false,
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionRequired: [PermissionFlagsBits.BanMembers],

    callback: (client, interaction) => {
        interaction.reply("banning...")
    }
}