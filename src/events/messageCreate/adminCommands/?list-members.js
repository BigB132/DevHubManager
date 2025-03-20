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

    if(message.content === "?list-members") {
        const embed = new EmbedBuilder()
            .setTitle("Project Members");

        if(projectData.memberIds.length === 0){
            embed.addFields({
                name: "There are no members in this project",
                value: "",
                inline: false,
            });
        };

        for (let i = 0; i < projectData.memberIds.length; i++) {
            const member = await message.guild.members.fetch(projectData.memberIds[i]);
            embed.addFields({
                name: `${member.displayName}`,
                value: `${member}`,
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