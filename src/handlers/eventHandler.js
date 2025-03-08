const path = require("path");
const getAllFiles = require("../utils/getAllFiles");
const {} = require("discord.js")

module.exports = (client) => {
    const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

    for (const eventFolder of eventFolders) {

        const eventName = path.basename(eventFolder);

        const eventTypeFolders = getAllFiles(eventFolder, true);
        eventTypeFolders.sort((a, b) => a.localeCompare(b));

        for (const eventTypeFolder of eventTypeFolders) {

            const eventFiles = getAllFiles(eventTypeFolder);
            eventFiles.sort((a, b) => a.localeCompare(b));

            client.on(eventName, async (...args) => {
                for (const eventFile of eventFiles) {
                    const eventFunction = require(eventFile);
                    await eventFunction(client, ...args);
                }
            });
        }
    }
};