const { Guild, GuildChannel, Message, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const {jobChannel} = require("../config.json");
const ProjectData = require("../models/projectData");

/**
 * 
 * @param {Guild} guild 
 */
const editMessage = async (guild, projectId) => {
    const query = {
        projectId: projectId,
    };

    const projectData = await ProjectData.findOne(query);

    const channel = await guild.channels.fetch(jobChannel);
    const message = await channel.messages.fetch(projectData.hireMessageId);

    var gameEngine = "nana"
    
                if(projectData.gameEngine === 1) gameEngine = "Unity";
                if(projectData.gameEngine === 2) gameEngine = "Unreal Engine 5";
                if(projectData.gameEngine === 3) gameEngine = "Roblox Studio";
            
                const owner = await guild.members.fetch(projectData.ownerId);
                const embed = new EmbedBuilder()
                    .setTitle(projectData.projectName)
                    .setDescription(`**Owner:** ${owner}\n**Game Engine:** ${gameEngine}\n**Description:** ${projectData.projectDesc}`)
    
                const memberCount = {};
    
                projectData.memberJobs.forEach(num => {
                    memberCount[num] = (memberCount[num] || 0) + 1;
                });
    
                for (let i = 0; i < projectData.jobName.length; i++) {
                    embed.addFields({
                        name: `${projectData.jobName[i]} (${memberCount[i] || 0}/${projectData.jobAmount[i]}) each will get ${projectData.jobMoney[i]} DH Coins`, // Job-Name
                        value: `**Description:** ${projectData.jobDesc[i]}`,
                        inline: false,
                    });
                };
    
                const apply = new ButtonBuilder()
                    .setCustomId("apply_" + projectData.projectId)
                    .setLabel("Apply")
                    .setStyle(ButtonStyle.Primary);
    
                const actionRow = new ActionRowBuilder().addComponents(apply);
    
                await message.edit({embeds: [embed], components: [actionRow]});
}

module.exports = {editMessage};