const {Client, Interaction, MessageFlags, ChannelType, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder} = require("discord.js")
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isStringSelectMenu) {
        if(interaction.customId === "assignRTCDD") {
            const query = {
                projectId: interaction.channel.id,
            }
        
            const projectData = await ProjectData.findOne(query);
        
            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };
        
            const roleId = interaction.values[0];
            //saves the channel type in the db
        
            const embed = new EmbedBuilder()
                .setTitle("Choose the Channel you want to assign the Role to")

            if(projectData.channelIds.length === 0) {
                await interaction.message.delete()
                interaction.reply({content: "You dont have any channels!", flags: 64});
                return;
            }

            const assignRTCDD2 = new StringSelectMenuBuilder()
                .setCustomId("assignRTCDD2" + "+" + roleId)
                .setMinValues(1)
                .setMaxValues(1)

            for (let i = 0; i < projectData.channelIds.length; i++) {
                const channel = await interaction.guild.channels.fetch(projectData.channelIds[i]);
                
                assignRTCDD2.addOptions({
                    label: channel.name,
                    value: channel.id,
                })
            };

            const actionRow = new ActionRowBuilder().addComponents(assignRTCDD2);

            await interaction.message.delete();
            await interaction.reply({
                embeds: [embed],
                components: [actionRow],
                flags: 64,
            })
        };
    };
};