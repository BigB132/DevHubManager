const {Client, Interaction, MessageFlags, ChannelType, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder} = require("discord.js")
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isStringSelectMenu) {
        if(interaction.customId === "assignRTUDD") {
            const query = {
                projectId: interaction.channel.id,
            }
        
            const projectData = await ProjectData.findOne(query);
        
            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };
        
            const roleId = interaction.values[0];
        
            const embed = new EmbedBuilder()
                .setTitle("Choose the User you want to assign the Role to")

            if(projectData.memberIds.length === 0) {
                await interaction.message.delete()
                interaction.reply({content: "There are no members in this project!", flags: 64});
                return;
            }

            const assignRTUDD2 = new StringSelectMenuBuilder()
                .setCustomId("assignRTUDD2" + "+" + roleId)
                .setMinValues(1)
                .setMaxValues(1)

            for (let i = 0; i < projectData.memberIds.length; i++) {
                const member = await interaction.guild.members.fetch(projectData.memberIds[i]);
                
                assignRTUDD2.addOptions({
                    label: member.displayName,
                    value: member.id,
                });
            };

            const actionRow = new ActionRowBuilder().addComponents(assignRTUDD2);

            await interaction.message.delete();
            await interaction.reply({
                embeds: [embed],
                components: [actionRow],
                flags: 64,
            })
        };
    };
};