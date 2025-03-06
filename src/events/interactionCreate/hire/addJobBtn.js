const {Client, Interaction, MessageFlags, MessageFlagsBitField, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require("discord.js")
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isButton) {
        if(interaction.customId === "hireAddJob") {
            const modal = new ModalBuilder()
                .setCustomId("hireAddJobMdl")
                .setTitle("Add Job");

            const name = new TextInputBuilder()
                .setCustomId("name")
                .setLabel("Name")
                .setPlaceholder("The name of the job")
                .setRequired(true)
                .setStyle(TextInputStyle.Short);

            const desc = new TextInputBuilder()
                .setCustomId("desc")
                .setLabel("Description")
                .setPlaceholder("The description for the job")
                .setRequired(true)
                .setStyle(TextInputStyle.Paragraph)

            const money = new TextInputBuilder()
                .setCustomId("money")
                .setLabel("Salary")
                .setPlaceholder("How much coins each person gets")
                .setRequired(true)
                .setStyle(TextInputStyle.Short);

            const amount = new TextInputBuilder()
                .setCustomId("amount")
                .setLabel("Amount of people needed for this job")
                .setPlaceholder("How many people you need for this job")
                .setRequired(true)
                .setStyle(TextInputStyle.Short);
            
            const row1 = new ActionRowBuilder().addComponents(name);
            const row2 = new ActionRowBuilder().addComponents(desc);
            const row3 = new ActionRowBuilder().addComponents(money);
            const row4 = new ActionRowBuilder().addComponents(amount);

            modal.addComponents(row1, row2, row3, row4);

            await interaction.showModal(modal);
        };
    };
};