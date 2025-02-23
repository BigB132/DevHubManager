const { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const {token} = require("./config.json");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent

    ]
});

const roles = [
    {
        id: "1342947331452174457",
        label: "blue",
    },
    {
        id: "1342947420685733960",
        label: "red",
    },
    {
        id: "1342947538680156170",
        label: "green",
    }
]

client.on("ready", async (c) => {
    try {
        const channel = await client.channels.cache.get("1285992406537212067");
        if(!channel) return;

        const row = new ActionRowBuilder();

        roles.forEach((roles) => {
            row.components.push(
                new ButtonBuilder()
                    .setCustomId(roles.id)
                    .setLabel(roles.label)
                    .setStyle(ButtonStyle.Primary)
            )
        });

        await channel.send({
            content: "Choose a role to claim or remove below!",
            components: [row],
        });
        
    } catch (error) {
        console.log(error);
    }
});

client.login(token);