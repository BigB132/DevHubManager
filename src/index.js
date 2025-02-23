const { Client, IntentsBitField, EmbedBuilder, ChannelType, ActivityType } = require("discord.js");
const {token} = require("./config.json");
const eventHandler = require("./handlers/eventHandler");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent

    ]
});

eventHandler(client);

client.login(token);