const {Client, Interaction, MessageFlags, ChannelType, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChatInputCommandInteraction, Guild, channelLink} = require("discord.js")
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isModalSubmit) {
        if(interaction.customId === "createRoleMdl") {
            const query = {
                ownerId: interaction.user.id,
                projectId: interaction.channel.id,
            }
        
            const projectData = await ProjectData.findOne(query);
        
            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };
        
            const roleName = interaction.fields.getTextInputValue("name");
            const fullRoleName = `${projectData.projectName} - ${roleName}`

            const role = await interaction.guild.roles.create({
                name: fullRoleName,
                color: "#0b8500",
                reason: `Created by ${projectData.ownerId} for his project ${projectData.projectName}`
            });
            
            projectData.roleIds.push(role.id);
            interaction.reply({
                content: `Your role ${role} got created.`,
                flags: MessageFlags.Ephemeral,
            });

            await projectData.save();
        };
    };
};