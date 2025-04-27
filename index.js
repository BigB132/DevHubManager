const { Client, IntentsBitField } = require("discord.js");
const {token, database_uri} = require("./src/config.json");
const eventHandler = require("./src/handlers/eventHandler");
const commands = require("./src/utils/reset-daily");
const mongoose = require("mongoose");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent

    ]
});

(async() => {
    await mongoose.connect(database_uri, {});
    console.log("Connected successfully to database!");

    eventHandler(client);
    commands();
    client.login(token);
})();

