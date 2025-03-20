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
        if(values[0] === "assignRTUDD2") {
            const query = {
                projectId: interaction.channel.id,
            }
        
            const projectData = await ProjectData.findOne(query);
        
            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };

            const roleId = values[1]
            const userId = interaction.values[0];
            
            const member = await interaction.guild.members.fetch(userId);
            const role = await interaction.guild.roles.fetch(roleId)

            if(member.roles.cache.has(role)){
                member.roles.add(role);
            
                interaction.reply({
                    content: `Successfully assigned ${role} to ${member}`,
                    flags: 64,
                })
            } else {
                member.roles.remove(role);
            
                interaction.reply({
                    content: `Successfully unassigned ${role} from ${member}`,
                    flags: 64,
                })
            }
        };
    };
};