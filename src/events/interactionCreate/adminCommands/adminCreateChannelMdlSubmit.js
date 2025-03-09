const {Client, Interaction, MessageFlags, ChannelType, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChatInputCommandInteraction, Guild, channelLink} = require("discord.js")
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

            const memberRole = await interaction.guild.roles.fetch(projectData.roleIds[0]);
            if(projectData.createChannelType === "text"){
                const channel = await interaction.guild.channels.create({
                    name: channelName,
                    parent: projectData.categoryId,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {id: interaction.guild.id, deny: [PermissionFlagsBits.ViewChannel]},
                        {id: interaction.user.id, allow: [PermissionFlagsBits.Administrator]},
                        {id: memberRole, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]},
                    ]
                });

                projectData.channelIds.push(channel.id);
                interaction.reply(`Your Text Channel got created. Check it out: ${channel}`)
            };
            await projectData.save();
        };
    };
};