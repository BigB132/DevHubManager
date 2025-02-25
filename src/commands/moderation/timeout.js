const  { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "timeout",
    description: "Kicks a member from the server",
    //devonly: bool,
    //testonly: bool,
    options: [
        {
            name: "user",
            description: "The user to kick",
            required: true,
            type: ApplicationCommandOptionType.User,
        },
        {
            name: "reason",
            description: "reason for kicking",
            required: false,
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionRequired: [PermissionFlagsBits.BanMembers],

    callback: (client, interaction) => {
        interaction.reply("kicking...")
    }
}