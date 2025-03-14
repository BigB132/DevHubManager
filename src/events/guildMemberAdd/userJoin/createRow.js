const {Client, GuildMember, EmbedBuilder} = require("discord.js");
const UserData = require("../../../models/userData");
const {welcomeChannel, rulesChannel, jobChannel, supportChannel} = require("../../../config.json");

/**
 * 
 * @param {Client} client 
 * @param {GuildMember} user 
 */

module.exports = async (client, user) => {
    

    const WelcomeChannel = await user.guild.channels.fetch(welcomeChannel);
    const RulesChannel = await user.guild.channels.fetch(rulesChannel);
    const JobChannel = await user.guild.channels.fetch(jobChannel);
    const SupportChannel = await user.guild.channels.fetch(supportChannel)
        
    const embed = new EmbedBuilder()
        .setDescription(`Welcome to DevHub ${user}\nRead the rules -> ${RulesChannel}\nApply to your first job -> ${JobChannel}\nIf you get stuck, get help -> ${SupportChannel}\n**Have a nice stay!!!**\nMembercount: ${user.guild.memberCount}`)
        .setFields(
            {name: "Join date", value: `${user.joinedAt.getUTCDate()}.${user.joinedAt.getUTCMonth() + 1}.${user.joinedAt.getUTCFullYear() + " " + user.joinedAt.getUTCHours() + ":" + user.joinedAt.getUTCMinutes()}`},
    );
    
    const query = {
        userID: user.id,
    };
    
    const userData = await UserData.findOne(query);

    if(!userData) {
        const newUserData = new UserData ({
            userID: user.id,
            coins: 0,
            warns: 0,
        });
    
        await newUserData.save();

        embed.setTitle("Welcome to DevHub!")
    } else {
        embed.setTitle("Welcome back!")
    };

    WelcomeChannel.send({embeds: [embed]});
}