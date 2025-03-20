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
                hireChannelId: interaction.channel.id,
            };
        
            const projectData = await ProjectData.findOne(query);
        
            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };
        
            const name = interaction.fields.getTextInputValue("name");
            const desc = interaction.fields.getTextInputValue("desc");
            const money = Number(interaction.fields.getTextInputValue("money"));
            const amount = Number(interaction.fields.getTextInputValue("amount"));

            if(isNaN(money) || isNaN(amount)){
                interaction.reply({
                    content: `Please use numbers only as "Money" and "Amount" values`,
                    flags: MessageFlags.Ephemeral,
                });
                return;
            };

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