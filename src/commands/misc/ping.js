module.exports = {
    name: "ping",
    description: "Answers with Pong!",
    //devonly: bool,
    //testonly: bool,
    //options: object[]

    callback: (client, interaction) => {
        interaction.reply("Pong!");
    }
};