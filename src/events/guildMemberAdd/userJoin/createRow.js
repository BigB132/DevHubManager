const {Client, GuildMember} = require("discord.js");
const UserData = require("../../../models/userData")

/**
 * 
 * @param {Client} client 
 * @param {GuildMember} user 
 */

module.exports = async (client, user) => {
    const newUserData = new UserData ({
        userID: user.id,
        coins: 0,
        warns: 0,
    });

    await newUserData.save();
}