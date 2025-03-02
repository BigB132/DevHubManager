const {Client, Interaction, ThreadAutoArchiveDuration, MessageFlags, ChannelType} = require("discord.js")

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if (interaction.isModalSubmit) {
        if (interaction.customId === "startHire") {
            const name = interaction.fields.getTextInputValue("name");
            const desc = interaction.fields.getTextInputValue("description");

            const projectThread = await interaction.channel.threads.create({
                name: `Project creation: ${name}`,
                autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
                type: ChannelType.GuildPrivateThread,
                reason: `To create the project called "${name}".`
            });
            
            interaction.deferReply();

            setTimeout(async () => {
                await projectThread.members.add(interaction.user.id);
                await projectThread.send(`Hey ${interaction.user}, welcome to your thread for the creation of your project!`);

                await interaction.editReply({
                    content: `A thread for the creation of your project got created. Continue here: ${projectThread}.`,
                    flags: MessageFlags.Ephemeral
                });
            }, 1000)
        };
    };
};