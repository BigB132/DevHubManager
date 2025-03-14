const { Client, Message, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, InteractionCallback, Guild, ButtonBuilder, ButtonStyle } = require("discord.js");
const ProjectData = require("../../../models/projectData");
const AuditionData = require("../../../models/projectAuditions");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    if(message.content === "?create-project-channel") {
        if(message.author.id === "1122177378978889841") {
            const embed = new EmbedBuilder()
                .setTitle("Create Project")
                .setDescription("Click the button below to create a project!")
                .setImage("https://i.ibb.co/Y4BrxYw4/IMG-1202.jpg")

            const button = new ButtonBuilder()
                .setCustomId("create-project")
                .setLabel("🛠│create-project│🛠")
                .setStyle(ButtonStyle.Primary);

            const actionRow = new ActionRowBuilder().addComponents(button);

            message.delete;
            await message.channel.send({embeds: [embed], components: [actionRow]});
        }
    }      
};