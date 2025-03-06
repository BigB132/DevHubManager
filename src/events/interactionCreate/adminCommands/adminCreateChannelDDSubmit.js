const {Client, Interaction, MessageFlags, ChannelType, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require("discord.js")
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isStringSelectMenu) {
        if(interaction.customId === "channelCreationType") {
            const query = {
                ownerId: interaction.user.id,
                projectId: interaction.channel.id,
            }
        
            const projectData = await ProjectData.findOne(query);
        
            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };
        
            projectData.createChannelType = interaction.values[0];
        
            const modal = new ModalBuilder()
                .setCustomId("channelCreationModal")
                .setTitle("Channel Creation");
        
            const channelName = new TextInputBuilder()
                .setCustomId("channelCreationName")
                .setLabel("Name")
                .setPlaceholder("The name of the channel")
                .setStyle(TextInputStyle.Short)
                .setRequired(true);
        
            const firstRow = new ActionRowBuilder().addComponents(channelName);
        
            modal.addComponents(firstRow);
        
            interaction.showModal(modal);
            await projectData.save();
        };
    };
};