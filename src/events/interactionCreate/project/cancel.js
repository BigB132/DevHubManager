const {Client, Interaction, Message} = require("discord.js")

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if(interaction.customId === "cancel"){
        if(interaction.isButton()){
            await interaction.message.delete();
        }
    }
    
}