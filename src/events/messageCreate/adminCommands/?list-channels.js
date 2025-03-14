const { Client, Message, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    const query = {
        ownerId: message.author.id,
        projectId: message.channel.id,
    };

    const projectData = await ProjectData.findOne(query);
    
    if(!projectData) return;

    if(message.content === "?list-channels") {
        const embed = new EmbedBuilder()
            .setTitle("Your Channels");

        for (let i = 0; i < projectData.channelIds.length; i++) {
            const channel = await message.guild.channels.fetch(projectData.channelIds[i]);
            embed.addFields({
                name: `${channel.name}`,
                value: `${channel}`,
                inline: false,
            });
        };

        const cancelButton = new ButtonBuilder()
            .setCustomId("adminChannelCancel")
            .setLabel("Close")
            .setStyle(ButtonStyle.Danger);

        const buttonRow = new ActionRowBuilder().addComponents(cancelButton);
        
        message.channel.send({
            embeds: [embed],
            components: [buttonRow],
        });
    };
};