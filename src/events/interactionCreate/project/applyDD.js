const {Client, Interaction, ChannelType, PermissionFlagsBits, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChatInputCommandInteraction, Guild, channelLink, MessageFlags, ModalBuilder, TextInputComponent, EmbedBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder} = require("discord.js")
const ProjectData = require("../../../models/projectData");
const ProjectAudtionData = require("../../../models/projectAuditions");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isStringSelectMenu()) {
        const customId = interaction.customId.split("_")[0];
        if(customId === "applyDD") {
            const projectId = interaction.customId.split("_")[1];

            const projectDataQuery = {
                projectId: projectId,
            };
            const auditionDataQuery = {
                userId: interaction.user.id,
                projectId: projectId,
            };
            
            const projectData = await ProjectData.findOne(projectDataQuery);
            const auditionData = await ProjectAudtionData.findOne(auditionDataQuery);

            if(auditionData) {
                interaction.reply({
                    content: "You already tried/signed up for this project",
                    flags: MessageFlags.Ephemeral,
                });
                return;
            }

            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };

            const job = interaction.values[0];

            const category = projectData.categoryId;
            const ownerRole = await interaction.guild.roles.fetch(projectData.ownerRoleId);

            const channel = await interaction.guild.channels.create({
                name: `Audition: ${interaction.user.globalName} as ${projectData.jobName[job]}`,
                parent: category,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: ownerRole.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.SendTTSMessages, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.AddReactions, PermissionFlagsBits.UseExternalEmojis, PermissionFlagsBits.UseExternalStickers, PermissionFlagsBits.CreatePrivateThreads, PermissionFlagsBits.CreatePublicThreads, PermissionFlagsBits.Administrator, PermissionFlagsBits.UseApplicationCommands]
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
                        deny: [PermissionFlagsBits.SendTTSMessages, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.AddReactions, PermissionFlagsBits.UseExternalEmojis, PermissionFlagsBits.UseExternalStickers, PermissionFlagsBits.CreatePrivateThreads, PermissionFlagsBits.CreatePublicThreads, PermissionFlagsBits.Administrator, PermissionFlagsBits.UseApplicationCommands]
                    },
                ],
            })

            const newAuditionData = new ProjectAudtionData({
                userId: interaction.user.id,
                projectId: projectData.projectId,
                channelId: channel.id,
                jobId: job,
            });

            await newAuditionData.save();

            const owner = await interaction.guild.members.fetch(projectData.ownerId);
            channel.send(`${interaction.user} wants to apply as ${projectData.jobName[job]} ${owner}`);
            channel.send(`${owner}: Use ?accept or ?decline to accept or decline the user`);

            interaction.reply({
                content: `The Channel for the audition got created: ${channel}`,
                flags: MessageFlags.Ephemeral,
            });
        };
    };
};