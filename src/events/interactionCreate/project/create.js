const {Client, Interaction, MessageFlags, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require("discord.js");
const UserData = require("../../../models/userData")

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 * @returns 
 */

module.exports = async (client, interaction) => {
    if(interaction.customId === "create-project") {
        const query = {
            userID: interaction.user.id,
        };
    
        const userData = await UserData.findOne(query);
    
        if(!userData) return;
    
        if(userData.finishedProjects < 0) {
            interaction.reply({
                content: "You have to finish 3 projects before creating your own!",
                flags: MessageFlags.Ephemeral,
            });
            return;
        };
    
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