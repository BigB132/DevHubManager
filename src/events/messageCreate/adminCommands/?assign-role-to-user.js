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

    if(message.content === "?assign-role-to-user") {
        const newChannelEmbed = new EmbedBuilder()
            .setTitle("Assign a role to a user")
            .setDescription("Choose a role to assign below!");

        const roleDD = new StringSelectMenuBuilder()
            .setCustomId("assignRTUDD")
            .setPlaceholder("Select a role to assign")
            
        const button = new ButtonBuilder()
            .setCustomId("adminChannelCancel")
            .setLabel("Close")
            .setStyle(ButtonStyle.Danger);

        for (let i = 0; i < projectData.roleIds.length; i++) {
            const role = await message.guild.roles.fetch(projectData.roleIds[i]);
            if(role.name === `${projectData.projectName} - Member`) continue;
            roleDD.addOptions({
                label: `${role.name}`,
                value: `${role.id}`,
            });
        };

        const dropdownRow = new ActionRowBuilder().addComponents(roleDD);
        const buttonRow = new ActionRowBuilder().addComponents(button);    
    
        message.channel.send({
            embeds: [newChannelEmbed],
            components: [dropdownRow, buttonRow],
        });
    };

    if(message.author.bot) return;

    message.delete();
};