const { Client, Message, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, Colors, ButtonBuilder, ButtonStyle } = require("discord.js");
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    if(message.content === "?create-role") {
        const query = {
            ownerId: message.author.id,
            projectId: message.channel.id,
        };

        const projectData = await ProjectData.findOne(query);

        if(!projectData) return;

        const embed = new EmbedBuilder()
            .setTitle("Role creation")
            .setDescription(`Click the button below to enter the name of the role. Keep in mind that it will be in this format: **<The Name of your project> - <The Name of your role.>**`)
            .setColor(Colors.Blurple);

        const continueButton = new ButtonBuilder()
            .setCustomId("createRoleOpenMdl")
            .setLabel("Continue")
            .setStyle(ButtonStyle.Primary);

        const cancelButton = new ButtonBuilder()
            .setCustomId("createRoleCancel")
            .setLabel("Cancel")
            .setStyle(ButtonStyle.Danger);

        const actionRow = new ActionRowBuilder().addComponents(continueButton, cancelButton);
        message.channel.send({embeds: [embed], components: [actionRow]});   
    };
};