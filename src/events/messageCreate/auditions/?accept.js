const { Client, Message, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, InteractionCallback, Guild } = require("discord.js");
const ProjectData = require("../../../models/projectData");
const AuditionData = require("../../../models/projectAuditions");
const editMsg = require("../../../utils/updateHireMessage");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    if(message.content === "?accept") {
        const auditionQuery = {
            channelId: message.channel.id,
        };

        const auditionData = await AuditionData.findOne(auditionQuery);

        const query = {
            projectId: auditionData.projectId,
        };
    
        const projectData = await ProjectData.findOne(query);

        if(projectData.ownerId !== message.author.id) return;

        const user = await message.guild.members.fetch(auditionData.userId);

        projectData.memberIds.push(user.id);
        projectData.memberJobs.push(auditionData.jobId);
        await projectData.save();
        
        const memberRole = await message.guild.roles.fetch(projectData.roleIds[0]);
        await user.roles.add(memberRole);

        await editMsg.editMessage(message.guild, projectData.projectId);
        
        await message.channel.delete();
    }      
};