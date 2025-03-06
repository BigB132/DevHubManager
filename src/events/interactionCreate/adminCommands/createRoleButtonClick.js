const {Client, Interaction, MessageFlags, MessageFlagsBitField, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require("discord.js")
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isButton) {
        if(interaction.customId === "createRoleCancel") {
            interaction.message.delete();

            interaction.reply({
                content: "Canceled successfully",
                flags: MessageFlags.Ephemeral,
            });
        };

        if(interaction.customId === "createRoleOpenMdl") {
            const modal = new ModalBuilder()
                .setCustomId("createRoleMdl")
                .setTitle("Name of the role")

            const textInput = new TextInputBuilder()
                .setLabel("Name")
                .setCustomId("name")
                .setPlaceholder("The Name of your role")
                .setRequired(true)
                .setStyle(TextInputStyle.Short);

            const actionRow = new ActionRowBuilder().addComponents(textInput);
            modal.addComponents(actionRow);

            interaction.showModal(modal);
        }
    };
};