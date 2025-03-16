const { Client, Message, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, InteractionCallback, Guild, ButtonBuilder, ButtonStyle } = require("discord.js");
const UserData = require("../../../models/userData");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    const messageContent = message.content.split(" ");
    if(messageContent[0] === "?give") {
        if(message.author.id === "1122177378978889841") {
            const user = message.mentions.users.first();

            const query = {
                userID: user.id,
            };

            const userData = await  UserData.findOne(query);

            if(!userData){
                message.reply("User doesnt exists!");
                return;
            }

            const howMuchToAdd = Number(messageContent[3]);

            userData.coins += howMuchToAdd
            userData.save();

            message.reply(`Gave ${user} ${howMuchToAdd} Coins!`)
        }
    }      
};