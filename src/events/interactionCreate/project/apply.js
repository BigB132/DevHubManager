const {Client, Interaction, ChannelType, PermissionFlagsBits, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChatInputCommandInteraction, Guild, channelLink, MessageFlags, ModalBuilder, TextInputComponent, EmbedBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder} = require("discord.js")
const ProjectData = require("../../../models/projectData");
const {jobChannel} = require("../../../config.json");
const { Colors } = require("discord.js");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isButton()) {
        const customId = interaction.customId.split("_")[0];
        if(customId === "apply") {
            const projectId = interaction.customId.split("_")[1];

            const query = {
                projectId: projectId,
            };
            
            const projectData = await ProjectData.findOne(query);

            if(interaction.user.id === projectData.ownerId){
                interaction.reply({
                    content: "You cant apply for your own project!!!",
                    flags: MessageFlags.Ephemeral,
                });
                return;
            }

            
            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };

            const embed = new EmbedBuilder()
                .setTitle("Apply to job")
                .setDescription("Choose the job you want to apply to below")
                .setColor(Colors.NotQuiteBlack);

            const DropDown = new StringSelectMenuBuilder()
                .setCustomId("applyDD_" + projectData.projectId)
                .setPlaceholder("The job you want to apply to");

            for (let i = 0; i < projectData.jobName.length; i++) {
                DropDown.addOptions({
                    label: `${projectData.jobName[i]}`, // Job-Name
                    value: `${i}`,
                });
            };

            const actionRow = new ActionRowBuilder().addComponents(DropDown);
            interaction.reply({embeds: [embed], components: [actionRow], flags: MessageFlags.Ephemeral});
        };
    };
};