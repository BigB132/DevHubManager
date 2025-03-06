const {Client, Interaction, MessageFlags, MessageFlagsBitField, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require("discord.js");
const Preview = require("../../../utils/sendHirePreview");
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isButton) {
        if(interaction.customId === "hireCancel") {
            const query = {
                hireChannelId: interaction.channel.id,
            };

            const projectData = await ProjectData.findOne(query);
            projectData.hireCurrentMsg = interaction.message.id;
            await projectData.save();
            await Preview.sendMessage(interaction.channel.id, interaction.guild);
        };
    };
};