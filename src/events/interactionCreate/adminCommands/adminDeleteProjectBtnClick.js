const {Client, Interaction, MessageFlags, MessageFlagsBitField} = require("discord.js")
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isButton) {
        if(interaction.customId === "deleteProjectDecline") {
            interaction.message.delete();

            interaction.reply({
                content: "Canceled successfully",
                flags: MessageFlags.Ephemeral,
            });
        };

        if(interaction.customId === "deleteProjectAccept") {
            const query = {
                ownerId: interaction.user.id,
                projectId: interaction.channel.id,
            };

            const projectData = await ProjectData.findOne(query);

            for(const channelId of projectData.channelIds) {
                const channel = await interaction.guild.channels.fetch(channelId);
                if(channel) {
                    channel.delete();
                };
            };

            for(const roleId of projectData.roleIds) {
                const role = await interaction.guild.roles.fetch(roleId);
                if(role) {
                    role.delete();
                };
            };

            if(!projectData.hireChannelId === "0") {
                const hireChannelId = await interaction.guild.channels.fetch(projectData.hireChannelId);
                hireChannelId.delete();
            };

            const ownerRole = await interaction.guild.roles.fetch(projectData.ownerRoleId);
            const category = await interaction.guild.channels.cache.get(projectData.categoryId);
            const adminChannel = await interaction.guild.channels.fetch(projectData.projectId);

            ownerRole.delete();
            category.delete();
            adminChannel.delete();
            

            await projectData.deleteOne({projectId: projectData.projectId});
        }
    };
};