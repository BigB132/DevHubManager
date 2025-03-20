const { Client, Message, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    const query = {
        projectId: message.channel.id,
    };

    const projectData = await ProjectData.findOne(query);
    
    if(!projectData) return;

    if(message.content === "?list-roles") {
        const embed = new EmbedBuilder()
            .setTitle("Your Roles");

        for (let i = 0; i < projectData.roleIds.length; i++) {
            const role = await message.guild.roles.fetch(projectData.roleIds[i]);
            embed.addFields({
                name: `${role.name}`,
                value: `${role}`,
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