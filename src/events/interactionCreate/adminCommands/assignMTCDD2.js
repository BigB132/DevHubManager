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
        if(values[0] === "assignMTCDD2") {
            const query = {
                projectId: interaction.channel.id,
            }
        
            const projectData = await ProjectData.findOne(query);
        
            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };

            const userId = values[1]
            const channelId = interaction.values[0];
            //saves the channel type in the db
        
            const embed = new EmbedBuilder()
                .setTitle("Choose the permissions you want to give the user");

            const assignMTCDD3 = new StringSelectMenuBuilder()
                .setCustomId("assignMTCDD3" + "+" + userId + "+" + channelId)
                .setMinValues(0)
                .setMaxValues(1)
                .setOptions({
                    label: "View Channel only",
                    value: "0",
                },
                {
                    label: "Send Messages",
                    value: "1",
                },
                {
                    label: "Unassign the User",
                    value: "2",
                })

            const actionRow = new ActionRowBuilder().addComponents(assignMTCDD3);

            await interaction.reply({
                embeds: [embed],
                components: [actionRow],
                flags: 64,
            })
        };
    };
};