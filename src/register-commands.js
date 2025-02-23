const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");
const {token} = require("./config.json");
const {guild_id} = require("./config.json");
const {client_id} = require("./config.json");

const commands = [
    {
        name: "add",
        description: "Adds two numbers",
        options: [
            {
                name: "first-number",
                description: "The first number",
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: "one",
                        value: 1,
                    },
                    
                    {
                        name: "two",
                        value: 2,
                    },

                    {
                        name: "three",
                        value: 3,
                    },

                    {
                        name: "four",
                        value: 4,
                    }

                ],
                required: true,
            },

            {
                name: "second-number",
                description: "The second number",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ]
    },

    {
        name: "embed",
        description: "Sends an embed!"
    },

    {
        name: "hire",
        description: "Starts the hiring message generation process",
    }
];

const rest = new REST ({ version: "10" }).setToken(token);

(async () => {
    try{
        console.log("Registering commands...");

        await rest.put(
            Routes.applicationCommands(client_id, guild_id),
            { body: commands }
        )
        console.log("Commands were registered!")
    }

    catch(error) {
        console.log(`There was an error registering the commands: ${error}`);
    }
})();