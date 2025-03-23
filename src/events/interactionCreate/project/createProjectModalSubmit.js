const {Client, Interaction, MessageFlags, ChannelType, PermissionFlagsBits, EmbedBuilder} = require("discord.js")
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
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.UseApplicationCommands, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
                        deny: [PermissionFlagsBits.SendTTSMessages, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.AddReactions, PermissionFlagsBits.UseExternalEmojis, PermissionFlagsBits.UseExternalStickers, PermissionFlagsBits.CreatePrivateThreads, PermissionFlagsBits.CreatePublicThreads, PermissionFlagsBits.Administrator]
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

            const embed1 = new EmbedBuilder()
                .setTitle("Admin Commands")
                .setColor("#ffc800")

            const embed2 = new EmbedBuilder()
                .setTitle("Channels")
                .setDescription("```?create-channel```\nSome questions will guide you through the creation process.\n\n```?list-channels```\nWill list all channels.")
                .setColor("#ffc800")

            const embed3 = new EmbedBuilder()
                .setTitle("Roles")
                .setDescription("```?create-role```\nSome questions will guide you through the creation process.\n\n```?list-roles```\nWill list all roles.")
                .setColor("#ffc800")

            const embed4 = new EmbedBuilder()
                .setTitle("List Members")
                .setDescription("```?list-members```\nWill list all members of the project.")
                .setColor("#ffc800")

            const embed5 = new EmbedBuilder()
                .setTitle("Assigning")
                .setDescription("```?assign-member-to-channel```\nWill guide you through a process where you can (un)assign a member to a channel. You can give the user permissions (View only/Send Messages). This requires atleast one channel and member.\n\n```?assign-role-to-channel```\nWill guide you through a process where you can (un)assign a role to a channel. You can give the role permissions (View only/Send Messages). This requires atleast one channel.\n\n```?assign-member-to-role```\nWill guide you through a process where you can assign a member to a role. This requires atleast one member.")
                .setColor("#ffc800")

            const embed6 = new EmbedBuilder()
                .setTitle("Hire")
                .setDescription("```?hire```\nWill start the process of the hire-message generation. Which lets you hire other people.")
                .setColor("#ffc800")

            const embed7 = new EmbedBuilder()
                .setTitle("Finish Project")
                .setDescription("```?finish-project```\nWill finish the project, meaning it deletes it from the Database, delete all channels, roles, and the category, and will **pay all members**. It will also delete the hire message (only if it exists).")
                .setColor("#ffc800")

            await adminChannel.send({embeds: [embed1, embed2, embed3, embed4, embed5, embed6, embed7]});
        };
    };
}