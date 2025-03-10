const {Client, Message, PermissionFlagsBits, EmbedBuilder, Colors, ButtonBuilder, ButtonStyle, ActionRow, ActionRowBuilder} = require("discord.js")

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    if(message.content === "?verify-msg") {
        const user = await message.guild.members.fetch(message.author.id);
        if(user.permissions.has(PermissionFlagsBits.Administrator)){
            await message.delete();

            const embed = new EmbedBuilder()
                .setTitle("Verify")
                .setDescription("Verify by using the button below!")
                .setColor(Colors.NotQuiteBlack)

            const verifyBtn = new ButtonBuilder()
                .setCustomId("verify")
                .setLabel("Verify")
                .setStyle(ButtonStyle.Primary);

            const actionRow = new ActionRowBuilder().addComponents(verifyBtn);

            message.channel.send({embeds: [embed], components: [actionRow]});
        }
    }
};