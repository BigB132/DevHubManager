const {Client, Interaction, MessageFlags, MessageFlagsBitField, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, Colors, ButtonBuilder, ButtonStyle} = require("discord.js")
const ProjectData = require("../../../models/projectData");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isButton) {
        if(interaction.customId === "hireFinish") {
            const query = {
                hireChannelId: interaction.channel.id,
            };
            const projectData = await ProjectData.findOne(query);
            const embed = new EmbedBuilder()
                .setTitle("Are you sure you want to continue?")
                .setDescription("This can not be undone!")
                .setColor(Colors.NotQuiteBlack);

            const yes = new ButtonBuilder()
                .setCustomId("hireFinishYes")
                .setLabel("Yes")
                .setStyle(ButtonStyle.Success)
            
            const no = new ButtonBuilder()
                .setCustomId("hireFinishNo")
                .setLabel("No")
                .setStyle(ButtonStyle.Danger)

            const actionRow = new ActionRowBuilder().addComponents(yes, no);
            const messageId = await projectData.hireCurrentMsg;
            const message = await interaction.channel.messages.fetch(messageId);
            await message.delete();
            
            await interaction.reply({embeds: [embed], components: [actionRow]});
        };
    };
};