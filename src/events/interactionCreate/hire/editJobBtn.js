const {Client, Interaction, MessageFlags, MessageFlagsBitField, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, Colors, ApplicationFlags, ButtonBuilder, ButtonStyle} = require("discord.js")
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isButton) {
        if(interaction.customId === "hireEditJob") {
            const query = {
                hireChannelId: interaction.channel.id,
            };

            const projectData = await ProjectData.findOne(query);
            
            if(!projectData) return;

            if(projectData.jobName.map(name => ({label: name, value: name})).length === 0) {
                interaction.reply({
                    content: "There are no jobs to edit!",
                    flags: MessageFlags.Ephemeral,
                });
                return;
            };

            const editJobDD = new StringSelectMenuBuilder()
                .setCustomId("hireEditJobDD")
                .setPlaceholder("The job to edit")
                .setMinValues(1)
                .setMaxValues(1);
            
            
            editJobDD.addOptions(
                projectData.jobName.map(name => ({label: name, value: name}))
            );
            

            const cancelButton = new ButtonBuilder()
                .setCustomId("hireCancel")
                .setLabel("Cancel")
                .setStyle(ButtonStyle.Danger);

            const embed = new EmbedBuilder()
                .setTitle("Edit Job")
                .setDescription("Choose the job you want to edit below")
                .setColor(Colors.NotQuiteBlack);

            const actionRow1 = new ActionRowBuilder().addComponents(editJobDD);
            const actionRow2 = new ActionRowBuilder().addComponents(cancelButton);

            const message = await interaction.channel.messages.fetch(projectData.hireCurrentMsg);
            message.delete();
            interaction.channel.send({embeds: [embed], components: [actionRow1, actionRow2]});
        };
    };
};