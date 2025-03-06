const {guild_id} = require("../../../config.json");
const areCommandsDifferent = require("../../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../../utils/getApplicationCommands");
const getLocalCommads = require("../../../utils/getLocalCommands");

module.exports = async (client) => {
    try {
        const localCommands = getLocalCommads();

        const applicationCommands = await getApplicationCommands(client, guild_id);

        for (const localCommand of localCommands) {
            const {name, description, options} = localCommand;

            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name,
            );
                
            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`Deleted command "${name}".`);
                    continue;
                }

                if(areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });

                    console.log(`Edited commands "${name}".`);
                }
            } else {
                if (localCommand.deleted) {
                    console.log(`Skipping registering command "${name}" as it is set to delete.`);
                    continue;
                }

                await applicationCommands.create({
                    name,
                    description,
                    options,
                });

                console.log(`Registered command "${name}".`)
            }  
        };
    } catch (error) {
        console.log(error);
    };
};