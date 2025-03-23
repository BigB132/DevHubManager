const { Client, Message, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, InteractionCallback, Guild } = require("discord.js");
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    const projectData = await ProjectData.findOne({hireChannelId: message.channel.id});

    if(!projectData) return;
    if(message.author.bot) return;

    message.delete();
};