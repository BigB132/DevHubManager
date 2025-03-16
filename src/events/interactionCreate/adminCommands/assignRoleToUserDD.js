const {Client, Interaction, MessageFlags, ChannelType, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder,StringSelectMenuBuilder} = require("discord.js")
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isStringSelectMenu) {
        if(interaction.customId === "assignRoleToUserDD") {
            const query = {
                ownerId: interaction.user.id,
                projectId: interaction.channel.id,
            }
        
            const projectData = await ProjectData.findOne(query);
        
            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };
        
            projectData.roleIds = interaction.values[0];

            const embed = new EmbedBuilder()
                .setTitle("Choose now the user you want the role to")
                .setDescription("Please choose the user you want to assign the role to")
            
            const roleDD = new StringSelectMenuBuilder()
                .setCustomId("assignRoleToUserDD2")
                .setPlaceholder("Select a user to assign the role to")
                

            for (let i = 0; i < projectData.roleIds.length; i++) {
                const role = await message.guild.roles.fetch(projectData.roleIds[i]);
                roleDD.addOptions({
                    label: `${role.name}`,
                    value: `${role.id}`,
                });
            };

            const firstRow = new ActionRowBuilder().addComponents(channelName);
    
            await interaction.message.delete();
            interaction.reply({embeds: [embed], components: [firstRow], flags: MessageFlags.Ephemeral});
        };
    };
};