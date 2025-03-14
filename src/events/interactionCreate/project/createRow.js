const {Client, Interaction, ChannelType, PermissionFlagsBits, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChatInputCommandInteraction, Guild, channelLink, MessageFlags, ModalBuilder, TextInputComponent, EmbedBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder} = require("discord.js")
const UserData = require("../../../models/userData")
/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    const query = {
        userID: interaction.user.id,
    };

    const userData = await UserData.findOne(query);

    if(!userData) {
        const newUserData = new UserData ({
            userID: interaction.user.id,
            coins: 0,
            warns: 0,
        });
        
        await newUserData.save();
    };
};