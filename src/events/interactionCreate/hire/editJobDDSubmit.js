const {Client, Interaction, MessageFlags, ChannelType, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require("discord.js")
const ProjectData = require("../../../models/projectData");
const Preview = require("../../../utils/sendHirePreview");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.isStringSelectMenu) {
        if(interaction.customId === "hireEditJobDD") {
            const query = {
                hireChannelId: interaction.channel.id,
            }
        
            const projectData = await ProjectData.findOne(query);
        
            if(!projectData) {
                interaction.reply("A super rare error is occured!!!");
                return;
            };
        
            const jobToEdit = interaction.values[0];
            const index = projectData.jobName.indexOf(jobToEdit);
            

            const modal = new ModalBuilder()
                .setTitle("Edit Job")
                .setCustomId("hireEditJobMdl_" + jobToEdit);
            
            const name = new TextInputBuilder()
                .setCustomId("name")
                .setLabel("Name")
                .setPlaceholder("The name of the job")
                .setRequired(true)
                .setStyle(TextInputStyle.Short)
                .setValue(projectData.jobName[index]);

            const desc = new TextInputBuilder()
                .setCustomId("desc")
                .setLabel("Description")
                .setPlaceholder("The description for the job")
                .setRequired(true)
                .setStyle(TextInputStyle.Paragraph)
                .setValue(projectData.jobDesc[index]);

            const money = new TextInputBuilder()
                .setCustomId("money")
                .setLabel("Salary")
                .setPlaceholder("How much coins each person gets")
                .setRequired(true)
                .setStyle(TextInputStyle.Short)
                .setValue(String(projectData.jobMoney[index]));

            const amount = new TextInputBuilder()
                .setCustomId("amount")
                .setLabel("Amount of people needed for this job")
                .setPlaceholder("How many people you need for this job")
                .setRequired(true)
                .setStyle(TextInputStyle.Short)
                .setValue(String(projectData.jobAmount[index]));
            
            const row1 = new ActionRowBuilder().addComponents(name);
            const row2 = new ActionRowBuilder().addComponents(desc);
            const row3 = new ActionRowBuilder().addComponents(money);
            const row4 = new ActionRowBuilder().addComponents(amount);

            modal.addComponents(row1, row2, row3, row4);

            await interaction.showModal(modal);

            projectData.hireCurrentMsg = interaction.message.id;
            projectData.save();
        };
    };
};