const {Client, Interaction, MessageFlags, MessageFlagsBitField, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle} = require("discord.js")
const ProjectData = require("../../../models/projectData");
const {jobModChannelId} = require("../../../config.json");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isButton) {
        if(interaction.customId === "hireFinishYes") {
            const query = {
                hireChannelId: interaction.channel.id,
            };
            const projectData = await ProjectData.findOne(query);
            await interaction.message.delete();
            await interaction.reply("Your job will go under a quick moderation and once done it will be published! You will get a notification.");
            const modChannel = await interaction.guild.channels.fetch(jobModChannelId);

            const owner = await interaction.guild.members.fetch(projectData.ownerId);

            const embed = new EmbedBuilder()
            .setTitle(projectData.projectName)
            .setDescription(`**Owner:** ${owner}\n**Game Engine:** Unknown\n**Description:** ${projectData.projectDesc}`)
    
            for (let i = 0; i < projectData.jobName.length; i++) {
                embed.addFields({
                    name: `${projectData.jobName[i]} (0/${projectData.jobAmount[i]}) each will get ${projectData.jobMoney[i]} DH Coins`, // Job-Name
                    value: `**Description:** ${projectData.jobDesc[i]}`,
                    inline: false,
                });
            };

            const acceptBtn = new ButtonBuilder()
                .setCustomId("acceptJob_" + projectData.projectId)
                .setLabel("Accept")
                .setStyle(ButtonStyle.Success);

            const declineBtn = new ButtonBuilder()
                .setCustomId("declineJob_" + projectData.projectId)
                .setLabel("Decline")
                .setStyle(ButtonStyle.Danger);

            const actionRow = new ActionRowBuilder().addComponents(acceptBtn, declineBtn);

            modChannel.send({embeds: [embed], components: [actionRow]})
        };
    };
};