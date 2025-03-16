const {Client, Interaction, ChannelType, PermissionFlagsBits, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChatInputCommandInteraction, Guild, channelLink, MessageFlags} = require("discord.js")
const ProjectData = require("../../../models/projectData");
const Preview = require("../../../utils/sendHirePreview");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isModalSubmit()) {
        const customId = interaction.customId.split("_")[0];
        if(customId === "hireEditJobMdl") {
            const query = {
            ownerId: interaction.user.id,
                hireChannelId: interaction.channel.id,
            };
            
            const projectData = await ProjectData.findOne(query);
    
            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };
        
            const oldName = interaction.customId.split("_")[1];
    
            const name = interaction.fields.getTextInputValue("name");
            const desc = interaction.fields.getTextInputValue("desc");
            const money = interaction.fields.getTextInputValue("money");
            const amount = interaction.fields.getTextInputValue("amount");

            if(isNaN(money) || isNaN(amount)){
                await Preview.sendMessage(interaction.channel.id, interaction.guild);
                interaction.reply({
                    content: `Please use numbers only as "Money" and "Amount" values`,
                    flags: MessageFlags.Ephemeral,
                });
                return;
            };
    
            const jobIndex = projectData.jobName.indexOf(oldName);
    
            projectData.jobName[jobIndex] = name;
            projectData.jobDesc[jobIndex] = desc;
            projectData.jobMoney[jobIndex] = money;
            projectData.jobAmount[jobIndex] = amount;
    
            await projectData.save();
            await Preview.sendMessage(interaction.channel.id, interaction.guild);
                interaction.reply({
                content: `The Job **${name}** got edited`,
                flags: MessageFlags.Ephemeral,
            });
        }
    };
};