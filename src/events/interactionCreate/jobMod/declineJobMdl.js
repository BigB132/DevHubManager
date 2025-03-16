const {Client, Interaction, ChannelType, PermissionFlagsBits, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChatInputCommandInteraction, Guild, channelLink, MessageFlags} = require("discord.js")
const ProjectData = require("../../../models/projectData");
const UserData = require("../../../models/userData");
const Preview = require("../../../utils/sendHirePreview");
/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isModalSubmit()) {
        const customId = interaction.customId.split("_")[0];
        if(customId === "declineJobMdl") {
            const projectId = interaction.customId.split("_")[1];
            const messageId = interaction.customId.split("_")[2];

            const query = {
                projectId: projectId,
            };
            
            const projectData = await ProjectData.findOne(query);
    
            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };
    
            const reason = interaction.fields.getTextInputValue("reason");
            const warn = interaction.fields.getTextInputValue("warn");
    
            const owner = await interaction.guild.members.fetch(projectData.ownerId);
            if(warn === "y") {
                owner.send(`Your hiring message got **declined**!!!\n**Reason:** ${reason}\nAs this is strictly against the rules you received an **warn**\nPlease edit your message so it fits our rules, and try again!`);

                const query = {
                    userID: owner.id,
                };
                    
                const userData = await UserData.findOne(query);
                userData.warns += 1;
                
                if(userData.warns === 1) {
                    const duration = 60 * 60 * 1000;
                    await targetMember.timeout(duration, reason);
                };

                if(userData.warns === 2) {                
                    const duration =  24 * 60 * 60 * 1000;
                    await targetMember.timeout(duration, reason); 
                };
                if(userData.warns === 3) {
                    await targetMember.ban({reason: reason});
                };
                    
                await userData.save();
            } else {
                owner.send(`Your hiring message got **declined**\n**Reason:** ${reason}\nPlease edit your message so it fits our rules, and try again!`);
            }

            await Preview.sendMessage(projectData.hireChannelId, interaction.guild);

            const message = await interaction.channel.messages.fetch(messageId);
            await message.delete();

            interaction.reply({
                content: "Done",
                flags: MessageFlags.Ephemeral
            });
        }
    };
};