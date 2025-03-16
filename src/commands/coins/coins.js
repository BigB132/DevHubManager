const  { Client, Interaction, MessageFlags, ApplicationCommandOptionType} = require("discord.js");
const UserData = require("../../models/userData");
const userData = require("../../models/userData");

module.exports = {
    name: "coins",
    description: "Shows how many coins you have.",
    //devonly: bool,
    //testonly: bool,
    options: [
        {
            name: "user",
            description: "The users coins",
            required: false,
            type: ApplicationCommandOptionType.User,
        },
    ],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        const targetUserId = await interaction.options.get("user")?.value || interaction.user.id;
        
        const query = {
            userID: targetUserId,
        };
        
        const userData = await UserData.findOne(query);

        if(!userData){
            interaction.reply({
                content: "User isn't registered in database!",
                flags: 64,
            });
            return;
        };

        if(targetUserId === interaction.user.id) {
            interaction.reply({
                content: `You have ${userData.coins} Coins!`,
                flags: MessageFlags.Ephemeral,
            });
        } else {
            const member = await interaction.guild.members.fetch(targetUserId);
            interaction.reply({
                content: `${member} has ${userData.coins} Coins!`,
                flags: MessageFlags.Ephemeral,
            });
        };
    }
}