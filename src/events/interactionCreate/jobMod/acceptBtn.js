const {Client, Interaction, ChannelType, PermissionFlagsBits, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChatInputCommandInteraction, Guild, channelLink, MessageFlags, ModalBuilder, TextInputComponent, EmbedBuilder, ButtonBuilder, ButtonStyle} = require("discord.js")
const ProjectData = require("../../../models/projectData");
const {jobChannel} = require("../../../config.json");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isButton()) {
        const customId = interaction.customId.split("_")[0];
        if(customId === "acceptJob") {
            const projectId = interaction.customId.split("_")[1];

            const query = {
                projectId: projectId,
            };
            
            const projectData = await ProjectData.findOne(query);
    
            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };

            var gameEngine = "nana"

            if(projectData.gameEngine === 1) gameEngine = "Unity";
            if(projectData.gameEngine === 2) gameEngine = "Unreal Engine 5";
            if(projectData.gameEngine === 3) gameEngine = "Roblox Studio";
        
            const owner = await interaction.guild.members.fetch(projectData.ownerId);
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

            const channel = await interaction.guild.channels.fetch(jobChannel);

            const message = await channel.send({embeds: [embed], components: [actionRow]});
            
            projectData.hireMessageId = message.id;
            await projectData.save();

            interaction.message.delete();

            interaction.reply({
                content: "Done",
                flags: MessageFlags.Ephemeral
            });
        };
    };
};