const { Client, Message, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, InteractionCallback, Guild } = require("discord.js");
const ProjectData = require("../../../models/projectData");
const AuditionData = require("../../../models/projectAuditions");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    if(message.content === "?decline") {
        const auditionQuery = {
            channelId: message.channel.id,
        };

        const auditionData = await AuditionData.findOne(auditionQuery);

        const query = {
            projectId: auditionData.projectId,
        };
    
        const projectData = await ProjectData.findOne(query);

        if(!projectData.ownerId === message.author.id) return;

        const user = await message.guild.members.fetch(auditionData.userId);
        user.send(`You were declined for the project "${projectData.projectName}"`);
        
        await message.channel.delete();
    }      
};