const {Client, Interaction, MessageFlags, ChannelType, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require("discord.js")
const ProjectData = require("../../../models/projectData");
const Preview = require("../../../utils/sendHirePreview");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isStringSelectMenu) {
        if(interaction.customId === "hireGameEngineDD") {
            const query = {
                ownerId: interaction.user.id,
                hireChannelId: interaction.channel.id,
            };
        
            const projectData = await ProjectData.findOne(query);
        
            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };
        
            projectData.gameEngine = interaction.values[0];

            await projectData.save();

            interaction.message.delete();

            Preview.sendMessage(interaction.channel.id, interaction.guild)
        };
    };
};