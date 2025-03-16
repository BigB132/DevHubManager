const {Client, Interaction, MessageFlags, MessageFlagsBitField, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, Colors, ButtonBuilder, ButtonStyle, User} = require("discord.js")
const ProjectData = require("../../../models/projectData");
const UserData = require("../../../models/userData");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isButton) {
        if(interaction.customId === "hireFinish") {
            const pQuery = {
                hireChannelId: interaction.channel.id,
            };
            const uQuery = {
                userID: interaction.user.id,
            };

            const projectData = await ProjectData.findOne(pQuery);
            const userData = await UserData.findOne(uQuery);

            var allInAllMoney = 0;

            for (let i = 0; i < projectData.jobName.length; i++) {
                allInAllMoney += projectData.jobAmount[i] * projectData.jobMoney[i];
            };

            if(allInAllMoney > userData.coins){
                await interaction.message.delete();
                const embed = new EmbedBuilder()
                    .setTitle("Not enough coins!")
                    .setDescription("You do not have enough coins!")
                    .setColor(Colors.Red)
                
                const cancelButton = new ButtonBuilder()
                    .setCustomId("hireFinishNo")
                    .setLabel("Edit")
                    .setStyle(ButtonStyle.Success)

                const checkAgain = new ButtonBuilder()
                    .setCustomId("hireFinish")
                    .setLabel("Try again")
                    .setStyle(ButtonStyle.Primary)

                const actionRow = new ActionRowBuilder().addComponents(cancelButton, checkAgain);

                await interaction.reply({embeds: [embed], components: [actionRow]})
                return;
            }

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
            await interaction.message.delete();
            
            await interaction.reply({embeds: [embed], components: [actionRow]});
        };
    };
};