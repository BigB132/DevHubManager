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

            const apply = new ButtonBuilder()
                .setCustomId("Apply" + projectData.projectId)
                .setLabel("Apply")
                .setStyle(ButtonStyle.Primary);

            const actionRow = new ActionRowBuilder().addComponents(apply);

            const channel = await interaction.guild.channels.fetch(jobChannel);

            channel.send({embeds: [embed], components: [actionRow]});
            
            interaction.message.delete();

            interaction.reply({
                content: "Done",
                flags: MessageFlags.Ephemeral
            });


        };
    };
};