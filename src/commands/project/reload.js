const {Client, Interaction, EmbedBuilder, Colors, MessageFlags} = require("discord.js")
const Preview = require("../../utils/sendHirePreview")

module.exports = {
    name: "reload",
    description: "Shut up",
    deleted: true,

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

    callback: async (client, interaction) => {
        await Preview.sendMessage(interaction.channel.id, interaction.guild);
        interaction.reply({
            content: "Done",
            flags: MessageFlags.Ephemeral,
        });
    }
};