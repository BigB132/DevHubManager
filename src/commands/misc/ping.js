module.exports = {
    name: "ping",
    description: "Shows the bots ping!",


    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        const ping = reply.createdTimestamp - interaction.createdTimestamp;
        
        interaction.editReply(`Ping: ${ping}ms`);
    }
};