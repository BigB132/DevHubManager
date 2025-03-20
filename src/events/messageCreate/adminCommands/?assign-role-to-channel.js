const { Client, Message, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActionRow } = require("discord.js");
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    if(message.content === "?assign-role-to-channel") {
        const projectData = await ProjectData.findOne({projectId: message.channel.id});
        if(!projectData) return;

        const embed = new EmbedBuilder()
            .setTitle("Choose the role you want to give access to the channel")
            
        const roleDD = new StringSelectMenuBuilder()
            .setCustomId("assignRTCDD")
            .setMinValues(1)
            .setMaxValues(1)

        const button = new ButtonBuilder()
            .setCustomId("adminChannelCancel")
            .setLabel("Close")
            .setStyle(ButtonStyle.Danger)

        for (let i = 0; i < projectData.roleIds.length; i++) {
            const role = await message.guild.roles.fetch(projectData.roleIds[i]);
            
            roleDD.addOptions({
                label: role.name,
                value: role.id,
            })
        };

        const actionRow = new ActionRowBuilder().addComponents(roleDD);
        const actionRow2 = new ActionRowBuilder().addComponents(button);

        await message.channel.send({embeds: [embed], components: [actionRow, actionRow2]});
    }
}