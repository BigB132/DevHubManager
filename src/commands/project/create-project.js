const {Client, Interaction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require("discord.js")

module.exports = {
    name: "create-project",
    description: "Creates a project",

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

    callback: async (client, interaction) => {
        const modal = new ModalBuilder()
            .setCustomId("startHire")
            .setTitle("First Information of your project");
        
        const textInputName = new TextInputBuilder()
            .setCustomId("name")
            .setLabel("What is the name of your project?")
            .setPlaceholder("Name of your project")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setMinLength(3)
            .setMaxLength(30)


        const textInputDesc = new TextInputBuilder()
            .setCustomId("description")
            .setLabel("Describe your project.")
            .setPlaceholder("Description of your project")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            .setMinLength(3)
            .setMaxLength(1000)

        const actionRowName = new ActionRowBuilder().addComponents(textInputName);
        const actionRowDesc = new ActionRowBuilder().addComponents(textInputDesc);

        modal.addComponents(actionRowName, actionRowDesc);

        await interaction.showModal(modal);
    }
};