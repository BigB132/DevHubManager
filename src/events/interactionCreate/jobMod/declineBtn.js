const {Client, Interaction, ChannelType, PermissionFlagsBits, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChatInputCommandInteraction, Guild, channelLink, MessageFlags, ModalBuilder, TextInputComponent} = require("discord.js")
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isButton()) {
        const customId = interaction.customId.split("_")[0];
        if(customId === "declineJob") {
            const projectId = interaction.customId.split("_")[1];

            const query = {
                projectId: projectId,
            };
            
            const projectData = await ProjectData.findOne(query);
    
            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };
        

            const modal = new ModalBuilder()
                .setTitle("Decline Job")
                .setCustomId("declineJobMdl_" + projectId + "_" + interaction.message.id);

            const reason = new TextInputBuilder()
                .setCustomId("reason")
                .setLabel("Reason")
                .setPlaceholder("The reason for declining")
                .setRequired(true)
                .setStyle(TextInputStyle.Short)
         
            const warn = new TextInputBuilder()
                .setCustomId("warn")
                .setLabel("Warn user")
                .setPlaceholder("If the user gets warned")
                .setRequired(true)
                .setMaxLength(1)
                .setMinLength(1)
                .setStyle(TextInputStyle.Short);

            const row1 = new ActionRowBuilder().addComponents(reason)
            const row2 = new ActionRowBuilder().addComponents(warn);

            modal.addComponents(row1, row2);

            interaction.showModal(modal);
        }
    };
};