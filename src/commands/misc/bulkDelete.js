const  { Client, Interaction,PermissionFlagsBits, MessageFlags} = require("discord.js");

module.exports = {
    name: "bulk-delete",
    description: "Bulk deletes the last 100 Messages.",
    //devonly: bool,
    //testonly: bool,
    permissionsRequired: [PermissionFlagsBits.Administrator],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        interaction.channel.bulkDelete(100);
        interaction.reply({
            content:"Done!",
            flags: MessageFlags.Ephemeral,
        });
    }
}