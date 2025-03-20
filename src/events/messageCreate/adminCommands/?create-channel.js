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

    if(message.content === "?create-channel") {
        const newChannelEmbed = new EmbedBuilder()
            .setTitle("New Channel")
            .setDescription("Choose a channel type below");

        const channelTypeDD = new StringSelectMenuBuilder()
            .setCustomId("channelCreationType")
            .setPlaceholder("Select a channel type")
            .addOptions([
                {label: "Text Channel", value: "text"},
                {label: "Voice Channel", value: "voice"},
                {label: "Announcement Channel", value: "announcement"}
            ]);

        const cancelButton = new ButtonBuilder()
            .setCustomId("adminChannelCancel")
            .setLabel("Cancel")
            .setStyle(ButtonStyle.Danger);

        const dropdownRow = new ActionRowBuilder().addComponents(channelTypeDD);
        const buttonRow = new ActionRowBuilder().addComponents(cancelButton);
        
        message.channel.send({
            embeds: [newChannelEmbed],
            components: [dropdownRow, buttonRow],
        });
    };
};