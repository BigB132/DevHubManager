const {Client, Message, PermissionFlagsBits, EmbedBuilder, Colors, ButtonBuilder, ButtonStyle, ActionRow, ActionRowBuilder, Collection} = require("discord.js");

const coolDown = new Collection();

const linkRegex = /(https?:\/\/[^\s]+)/gi;

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    if (message.author.bot) return; // Ignore bot messages

    // Check if the message contains a link
    if (linkRegex.test(message.content)) {
        const userId = message.author.id;
        const now = Date.now();

        // Check if user is already in cooldown
        if (coolDown.has(userId)) {
            const userData = coolDown.get(userId);
            userData.count++;

            if (userData.count >= 3) {
                const adminChannel = await message.guild.channels.fetch("1356036452135211053");

                await adminChannel.send(`${message.author.globalName} is spamming links in ${message.channel.name}`);

                const member = await message.guild.members.fetch(message.author.id);
                try {
                    await member.timeout(10 * 60 * 1000, "Link spam");   
                } catch (error) {};

                await message.delete();
                return;
            }

            userData.lastMessage = now;
            coolDown.set(userId, userData);
        } else {
            coolDown.set(userId, { count: 1, lastMessage: now });

            setTimeout(() => coolDown.delete(userId), 10000);
        }
    }    
}
