const { Client, Message, MessageFlagsBitField, MessageFlags, EmbedBuilder, Colors, ButtonBuilder, ButtonStyle, ActionRow, ActionRowBuilder } = require("discord.js");
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    if(message.content === "?finish-project") {
        const query = {
            ownerId: message.author.id,
            projectId: message.channel.id,
        }
        
        const projectData = await ProjectData.findOne(query)
    
        if(!projectData) return;
    
        const embed = new EmbedBuilder()
            .setTitle("Are you sure you want to finish the project?")
            .setDescription("This will **delete every Channel and Role** associated with the project, and pay the members!")
            .setColor(Colors.Red)
    
        const acceptButton = new ButtonBuilder()
            .setCustomId("finishProjectAccept")
            .setLabel("Yes i want to finish the whole Project")
            .setStyle(ButtonStyle.Danger)

        const declineButton = new ButtonBuilder()
            .setCustomId("adminChannelCancel")
            .setLabel("Cancel")
            .setStyle(ButtonStyle.Success)

        const actionRow = new ActionRowBuilder().setComponents(acceptButton, declineButton);
        
        message.channel.send({embeds: [embed], components: [actionRow]});
    };
};

