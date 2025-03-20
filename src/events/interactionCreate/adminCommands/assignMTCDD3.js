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
        if(values[0] === "assignMTCDD3") {
            const query = {
                projectId: interaction.channel.id,
            }
        
            const projectData = await ProjectData.findOne(query);
        
            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };

            const userId = values[1]
            const channelId = values[2];

            const permission = interaction.values[0];
            
            const channel = await interaction.guild.channels.fetch(channelId);
            const member = await interaction.guild.members.fetch(userId);

            if(permission === "0"){
                channel.permissionOverwrites.create(member, {
                    SendMessages: false,
                    ViewChannel: true,
                    AddReactions: true,
                    ReadMessageHistory: true,
                });
            };

            if(permission === "1"){
                channel.permissionOverwrites.create(member, {
                    SendMessages: true,
                    ViewChannel: true,
                    AddReactions: true,
                    ReadMessageHistory: true,
                });
            };

            if(permission === "2"){
                channel.permissionOverwrites.create(member, {
                    SendMessages: true,
                    ViewChannel: false,
                    AddReactions: true,
                    ReadMessageHistory: true,
                });
            };
            
            interaction.reply({
                content: `Updated permissions of ${member} for ${channel}`,
                flags: MessageFlags.Ephemeral,
            });
        };
    };
};