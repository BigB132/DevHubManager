const { Guild, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const ProjectData = require("../models/projectData");

/**
 * 
 * @param {*} channelId 
 * @param {Guild} guild 
 */

const sendMessage = async (channelId, guild) => {
    
    const query = {
        hireChannelId: channelId,
    };

    const projectData = await ProjectData.findOne(query);

    if(!projectData) return;

    const channel = await guild.channels.fetch(channelId);

    const owner = await guild.members.fetch(projectData.ownerId);

    var gameEngine = "Nothing";
    if(projectData.gameEngine === 1) gameEngine = "Unity";
    if(projectData.gameEngine === 2) gameEngine = "Unreal Engine 5";
    if(projectData.gameEngine === 3) gameEngine = "Roblox Studio";

    const embed = new EmbedBuilder()
        .setTitle(projectData.projectName)
        .setDescription(`**Owner:** ${owner}\n**Game Engine:** ${gameEngine}\n**Description:** ${projectData.projectDesc}`)

        for (let i = 0; i < projectData.jobName.length; i++) {
            embed.addFields({
                name: `${projectData.jobName[i]} (0/${projectData.jobAmount[i]}) each will get ${projectData.jobMoney[i]} DH Coins`, // Job-Name
                value: `**Description:** ${projectData.jobDesc[i]}`,
                inline: false,
            });
        };
        

    const addJobBtn = new ButtonBuilder()
        .setCustomId("hireAddJob")
        .setLabel("Add Job")
        .setStyle(ButtonStyle.Primary);

    const editJobBtn = new ButtonBuilder()
        .setCustomId("hireEditJob")
        .setLabel("Edit Job")
        .setStyle(ButtonStyle.Primary);

    const deleteJobBtn = new ButtonBuilder()
        .setCustomId("hireDeleteJob")
        .setLabel("Delete Job")
        .setStyle(ButtonStyle.Danger);
    
    const hireFinish = new ButtonBuilder()
        .setCustomId("hireFinish")
        .setLabel("Finish")
        .setStyle(ButtonStyle.Success);

    if(projectData.jobName.length === 0){
        hireFinish.setDisabled(true);
    }

    const actionRow = new ActionRowBuilder().addComponents(addJobBtn, editJobBtn, deleteJobBtn, hireFinish);

    if(projectData.hireCurrentMsg === "0") {
        const message = await channel.send({embeds: [embed], components: [actionRow]});
        projectData.hireCurrentMsg = message.id;
        projectData.save();
    } else {
        try{
            const message = await channel.messages.fetch(projectData.hireCurrentMsg);
            message.delete();
        } catch {};
        const messageToSend = await channel.send({embeds: [embed], components: [actionRow]});
        projectData.hireCurrentMsg = messageToSend.id;
        projectData.save();
    }
};

module.exports = {sendMessage};