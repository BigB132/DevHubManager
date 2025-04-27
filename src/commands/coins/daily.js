const  { Client, Interaction, MessageFlags, ApplicationCommandOptionType} = require("discord.js");
const UserData = require("../../models/userData");

module.exports = {
    name: "daily",
    description: "Gives you your daily coins.",
    //devonly: bool,
    //testonly: bool,

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        const userData = await UserData.findOne({userID: interaction.user.id});

        if(!userData){
            interaction.reply({
                content: "You are not known in our database. Try again.",
                flags: 64,
            });
            return;
        };
        if(userData.claimedDaily === true){
            interaction.reply({content: "You already claimed your daily coins!", flags: 64});
            return;
        }
        userData.coins += 10;
        userData.claimedDaily = true;
        userData.save();

        interaction.reply({content: "You successfully claimed your daily **5 coins**!", flags: 64});
    }
}