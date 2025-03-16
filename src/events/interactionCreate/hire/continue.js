const {Client, Interaction, MessageFlags, MessageFlagsBitField, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, Colors, StringSelectMenuBuilder, StringSelectMenuComponent} = require("discord.js")
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isButton) {
        if(interaction.customId === "hireContinue") {
            const embed = new EmbedBuilder()
                .setTitle("Choose your Game Engine")
                .setDescription("Select the Game Engine you want to create your game in below!")
                .setColor(Colors.NotQuiteBlack);

            const dropdown = new StringSelectMenuBuilder()
                .setCustomId("hireGameEngineDD")
                .setMinValues(1)
                .setMaxValues(1)
                .setPlaceholder("Game Engine")
                .addOptions(
                    {label: "Unity", value: "1"},
                    {label: "Unreal Engine 5", value: "2"},
                    {label: "Roblox Studio", value: "3"},
                );

            const actionRow = new ActionRowBuilder().addComponents(dropdown);
            
            interaction.message.delete();
            interaction.reply({embeds: [embed], components: [actionRow]});
        };
    };
};