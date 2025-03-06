const {Client, Interaction, ChannelType, PermissionFlagsBits, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChatInputCommandInteraction, Guild, channelLink, MessageFlags} = require("discord.js")
const ProjectData = require("../../../models/projectData");
const Preview = require("../../../utils/sendHirePreview");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isModalSubmit) {
        if(interaction.customId === "hireAddJobMdl") {
            const query = {
                ownerId: interaction.user.id,
                hireChannelId: interaction.channel.id,
            };
        
            const projectData = await ProjectData.findOne(query);
        
            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };
        
            const name = interaction.fields.getTextInputValue("name");
            const desc = interaction.fields.getTextInputValue("desc");
            const money = interaction.fields.getTextInputValue("money");
            const amount = interaction.fields.getTextInputValue("amount");

            projectData.jobName.push(name);
            projectData.jobDesc.push(desc);
            projectData.jobMoney.push(money);
            projectData.jobAmount.push(amount);

            await projectData.save();
            await Preview.sendMessage(interaction.channel.id, interaction.guild);
            interaction.reply({
                content: `The Job **${name}** got added`,
                flags: MessageFlags.Ephemeral,
            });
        };
    };
};