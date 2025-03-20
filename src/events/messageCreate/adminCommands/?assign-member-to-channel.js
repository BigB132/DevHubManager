const { Client, Message, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    if(message.content === "?assign-member-to-channel") {
        const projectData = await ProjectData.findOne({projectId: message.channel.id});
        if(!projectData) return;

        const embed = new EmbedBuilder()
            .setTitle("Choose the user(s) you want to give access to the channel")
            
        const userDD = new StringSelectMenuBuilder()
            .setCustomId("assignMTCDD")

        const button = new ButtonBuilder()
            .setCustomId("adminChannelCancel")
            .setLabel("Close")
            .setStyle(ButtonStyle.Danger)

        for (let i = 0; i < projectData.memberIds.length; i++) {
            const member = await message.guild.members.fetch(projectData.memberIds[i]);
            
            userDD.addOptions({
                label: member.displayName,
                value: member.id,
            })
        };

        const actionRow = new ActionRowBuilder().addComponents(userDD);
        const actionRow2 = new ActionRowBuilder().addComponents(button);

        await message.channel.send({embeds: [embed], components: [actionRow, actionRow2]});
    }
    message.delete();
}