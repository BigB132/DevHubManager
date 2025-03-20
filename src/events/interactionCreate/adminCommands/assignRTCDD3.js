const {Client, Interaction, MessageFlags, ChannelType, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder} = require("discord.js")
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isStringSelectMenu()) {
        const values = interaction.customId.split("+");
        if(values[0] === "assignRTCDD3") {
            const query = {
                projectId: interaction.channel.id,
            }
        
            const projectData = await ProjectData.findOne(query);
        
            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };

            const roleId = values[1]
            const channelId = values[2];

            const permission = interaction.values[0];
            
            const channel = await interaction.guild.channels.fetch(channelId);
            const role = await interaction.guild.roles.fetch(roleId);

            if(permission === "0"){
                channel.permissionOverwrites.create(role, {
                    SendMessages: false,
                    ViewChannel: true,
                    AddReactions: true,
                    ReadMessageHistory: true,
                });
            };

            if(permission === "1"){
                channel.permissionOverwrites.create(role, {
                    SendMessages: true,
                    ViewChannel: true,
                    AddReactions: true,
                    ReadMessageHistory: true,
                });
            };

            if(permission === "2"){
                channel.permissionOverwrites.create(role, {
                    SendMessages: true,
                    ViewChannel: false,
                    AddReactions: true,
                    ReadMessageHistory: true,
                });
            };
            
            interaction.reply({
                content: `Updated permissions of ${role} for ${channel}`,
                flags: MessageFlags.Ephemeral,
            });
        };
    };
};