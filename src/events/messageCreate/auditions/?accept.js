const { Client, Message, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, InteractionCallback, Guild } = require("discord.js");
const ProjectData = require("../../../models/projectData");
const AuditionData = require("../../../models/projectAuditions");

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

        const user = await message.guild.members.fetch(auditionData.userId);
        const memberRole = await message.guild.roles.fetch(projectData.roleIds[0]);
        user.roles.add(memberRole);
        
        await message.channel.delete();
    }      
};