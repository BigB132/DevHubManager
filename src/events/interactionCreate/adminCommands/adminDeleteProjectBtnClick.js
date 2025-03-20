const {Client, Interaction, MessageFlags, MessageFlagsBitField} = require("discord.js")
const ProjectData = require("../../../models/projectData");
const UserData = require("../../../models/userData");
const AuditionData = require("../../../models/projectAuditions");
const {jobChannel} = require("../../../config.json");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isButton) {
        if(interaction.customId === "finishProjectAccept") {
            const query = {
                projectId: interaction.channel.id,
            };

            const projectData = await ProjectData.findOne(query);

            for (let i = 0; i < projectData.memberIds.length; i++) {
                const memberId = projectData.memberIds[i];
                const userData = await UserData.findOne({ userID: memberId });
                const jobId = projectData.memberJobs[i];
                const moneyToPay = projectData.jobMoney[jobId]

                userData.coins += moneyToPay;
                userData.finishedProjects += 1;
                await userData.save();
            }

            for(const channelId of projectData.channelIds) {
                const channel = await interaction.guild.channels.fetch(channelId);
                if(channel) {
                    channel.delete();
                };
            };

            for(const roleId of projectData.roleIds) {
                const role = await interaction.guild.roles.fetch(roleId);
                if(role) {
                    role.delete();
                };
            };

            if(projectData.hireChannelId !== "0") {
                const hireChannelId = await interaction.guild.channels.fetch(projectData.hireChannelId);
                hireChannelId.delete();
            };

            const jobChannelFetched = await interaction.guild.channels.fetch(jobChannel);
            if(projectData.hireMessageId !== "0") {
                const hireMsg = await jobChannelFetched.messages.fetch(projectData.hireMessageId)
                await hireMsg.delete();
            };
            const ownerRole = await interaction.guild.roles.fetch(projectData.ownerRoleId);
            const category = interaction.guild.channels.cache.get(projectData.categoryId);
            const adminChannel = await interaction.guild.channels.fetch(projectData.projectId);

            await ownerRole.delete();
            await category.delete();
            await adminChannel.delete();
            
            await AuditionData.deleteMany({projectId: projectData.projectId});
            await projectData.deleteOne({projectId: projectData.projectId});
        }
    };
};