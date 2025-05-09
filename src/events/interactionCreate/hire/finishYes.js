const {Client, Interaction, MessageFlags, MessageFlagsBitField, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle} = require("discord.js")
const ProjectData = require("../../../models/projectData");
const UserData = require("../../../models/userData");
const {jobModChannelId} = require("../../../config.json");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isButton) {
        if(interaction.customId === "hireFinishYes") {
            const pQuery = {
                hireChannelId: interaction.channel.id,
            };
            const uQuery = {
                userID: interaction.user.id,
            };

            const projectData = await ProjectData.findOne(pQuery);
            const userData = await UserData.findOne(uQuery);

            var allInAllMoney = 0;

            for (let i = 0; i < projectData.jobName.length; i++) {
                allInAllMoney += projectData.jobAmount[i] * projectData.jobMoney[i];
            };

            userData.coins -= allInAllMoney;
            await userData.save();

            await interaction.message.delete();
            await interaction.reply({
                content: "Your job will go under a quick moderation and once done it will be published! You will get a notification.",
                flags: MessageFlags.Ephemeral,
            });

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

            await modChannel.send({embeds: [embed], components: [actionRow]});
            await projectData.save();
        };
    };
};