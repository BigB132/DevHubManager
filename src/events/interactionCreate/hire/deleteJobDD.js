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
        if(interaction.customId === "hireDeleteJobDD") {
            const query = {
                ownerId: interaction.user.id,
                hireChannelId: interaction.channel.id,
            }
        
            const projectData = await ProjectData.findOne(query);
        
            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };
        
            const jobToDelete = interaction.values[0];
            const index = projectData.jobName.indexOf(jobToDelete);


            projectData.jobName.splice(index, 1);
            projectData.jobDesc.splice(index, 1);
            projectData.jobMoney.splice(index, 1);
            projectData.jobAmount.splice(index, 1);

            projectData.hireCurrentMsg = interaction.message.id,

            await projectData.save();
            await Preview.sendMessage(interaction.channel.id, interaction.guild);
            interaction.reply({
                content: `The job **${jobToDelete}** got deleted`,
                flags: MessageFlags.Ephemeral,
            });
        };
    };
};