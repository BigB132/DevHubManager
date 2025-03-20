const {Client, Interaction, MessageFlags} = require("discord.js");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isButton) {
        if(interaction.customId === "adminChannelCancel") {
            interaction.message.delete();
        };
    }
};