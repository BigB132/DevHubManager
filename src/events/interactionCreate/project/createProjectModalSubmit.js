const {Client, Interaction, MessageFlags, ChannelType, PermissionFlagsBits} = require("discord.js")
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if (interaction.isModalSubmit) {
        if (interaction.customId === "startHire") {
            const name = interaction.fields.getTextInputValue("name");
            const desc = interaction.fields.getTextInputValue("description");

            const ownerRole = await interaction.guild.roles.create({
                name: `${name} - Owner`,
                color: "#0b8500",
                reason: `Project creation by ${interaction.user.displayName}`
            });

            const member = await interaction.guild.members.fetch(interaction.user.id);
            await member.roles.add(ownerRole);

            const category = await interaction.guild.channels.create({
                name: `Project - ${name}`,
                type: ChannelType.GuildCategory,
                reason: `Project creation by ${interaction.user.globalName}`,
            });

            const adminChannel = await interaction.guild.channels.create({
                name: "Admin channel",
                type: ChannelType.GuildText,
                parent: category.id,
                reason: `Project creation by ${interaction.user.globalName}`,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: ownerRole.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.UseApplicationCommands],
                        deny: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.SendTTSMessages, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.AddReactions, PermissionFlagsBits.UseExternalEmojis, PermissionFlagsBits.UseExternalStickers, PermissionFlagsBits.CreatePrivateThreads, PermissionFlagsBits.CreatePublicThreads, PermissionFlagsBits.Administrator]
                    }
                ]
            });

            await interaction.reply({
                content: `Your project got created!!!. Continue here: ${adminChannel}`,
                flags: MessageFlags.Ephemeral,
            });

            const newProjectData = new ProjectData({
                projectId: adminChannel.id,
                categoryId: category.id,
                ownerId: interaction.user.id,
                ownerRoleId: ownerRole.id,
                projectName: name,
                projectDesc: desc,
            });

            const memberRole = await interaction.guild.roles.create({
                name: `${name} - Member`,
                color: "#0b8500",
                reason: `Hire accept by ${interaction.user.displayName}`
            });
            newProjectData.roleIds.push(memberRole.id);

            await newProjectData.save();
        };
    };
};