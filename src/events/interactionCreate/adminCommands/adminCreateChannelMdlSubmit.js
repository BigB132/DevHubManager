const {Client, Interaction, MessageFlags, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChatInputCommandInteraction, Guild, channelLink} = require("discord.js")
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isModalSubmit) {
        if(interaction.customId === "channelCreationModal") {
            const query = {
                ownerId: interaction.user.id,
                projectId: interaction.channel.id,
            }
        
            const projectData = await ProjectData.findOne(query);
        
            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };
        
            const channelName = interaction.fields.getTextInputValue("channelCreationName");
            //get the channel name

            var channelType = 0;

            if(projectData.createChannelType === "text") {
                channelType = 0;
            };

            if(projectData.createChannelType === "voice") {
                channelType = 2;
            };

            if(projectData.createChannelType === "announcement") {
                channelType = 5;
            };

            const ownerRole = await interaction.guild.roles.fetch(projectData.ownerRoleId);
            const memberRole = await interaction.guild.roles.fetch(projectData.roleIds[0]);

            const channel = await interaction.guild.channels.create({
                name: channelName,
                parent: projectData.categoryId,
                type: channelType,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: ownerRole.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AddReactions, PermissionFlagsBits.Administrator, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.SendPolls, PermissionFlagsBits.CreatePublicThreads],
                    },
                    {
                        id: memberRole.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AddReactions, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.SendPolls, PermissionFlagsBits.CreatePublicThreads]
                    }
                ],
            });

            projectData.channelIds.push(channel.id);
            interaction.reply({
                content: `Your Channel got created. Check it out: ${channel}`,
                flags: 64,
            });
            await projectData.save();
        };
    };
};