const { Client, Message, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, InteractionCallback, Guild } = require("discord.js");
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    if(message.content === "?edit"){
        const projectData = await ProjectData.findOne({hireChannelId: message.channel.id});

        if(!projectData) return;

        
    }
};