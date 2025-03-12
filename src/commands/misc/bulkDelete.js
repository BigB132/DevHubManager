const  { Client, Interaction,PermissionFlagsBits} = require("discord.js");

module.exports = {
    name: "bulk-delete",
    description: "Bulk deletes the last 100 Messages.",
    //devonly: bool,
    //testonly: bool,
    permissionRequired: [PermissionFlagsBits.ManageMessages],
    deleted: true,


    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        interaction.channel.bulkDelete(100);
        interaction.reply("Done!");
    }
};