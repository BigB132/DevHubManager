const path = require("path");
const getALlFiles = require("../utils/getAllFiles");
const getAllFiles = require("../utils/getAllFiles");

module.exports = (client) => {
    const eventFolders = getALlFiles(path.join(__dirname, "..", "events"), true);

    for(const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder);
        eventFiles.sort((a, b) => a > b);
        
        const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();
        
        client.on(eventName, async (arg) => {
            for(const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                await eventFunction(client, arg);
            }
        })
    }
};