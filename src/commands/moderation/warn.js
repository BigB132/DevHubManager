const  { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, GuildMember, MessageFlags } = require("discord.js");
const UserData = require("../../models/userData");

module.exports = {
    name: "warn",
    description: "Warns a member.",
    //devonly: bool,
    //testonly: bool,
    deleted: false,

    options: [
        {
            name: "user",
            description: "The user to warn",
            required: true,
            type: ApplicationCommandOptionType.User,
        },
        {
            name: "reason",
            description: "Reason for warn",
            required: false,
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionRequired: [PermissionFlagsBits.BanMembers],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        const targetUser = interaction.options.get("user").user.id;
        const reason = interaction.options.get("reason")?.value || "No reason provided";

        const query = {
            userID: targetUser,
        }
    
        try {
            const userData = await UserData.findOne(query);

            if(!userData){
                interaction.reply({
                    content: "User isnt on the server",
                    flags: MessageFlags.Ephemeral,
                });
                return;
            };
            console.log("bana")
            userData.warns += 1;

            const targetMember = await interaction.guild.members.fetch(targetUser);

            if(userData.warns === 1) {
                interaction.reply({
                    content: `This was <@${targetUser}>s first warn. He got timed out for 1h.`,
                    flags: MessageFlags.Ephemeral,
                });

                client.users.fetch(targetUser).then(user => user.send(`**You got warned** by ${interaction.user.displayName}. This is your **first warn!!!**\n**Reason:** ${reason}.`));

                const duration = 60 * 60 * 1000;
                await targetMember.timeout(duration, reason);
            };
            if(userData.warns === 2) {
                interaction.reply({
                    content: `This was <@${targetUser}>s second warn. He got timed out for 24h.`,
                    flags: MessageFlags.Ephemeral,
                });

                client.users.fetch(targetUser).then(user => user.send(`**You got warned** by ${interaction.user.displayName}. This is your **second warn!!!**\n**Reason:** ${reason}.`));

                const duration =  24 * 60 * 60 * 1000;
                await targetMember.timeout(duration, reason); 
            };
            if(userData.warns === 3) {
                interaction.reply({
                    content: `This was <@${targetUser}>s third warn. He got banned from the server.`,
                    flags: MessageFlags.Ephemeral,
                });
                await client.users.fetch(targetUser).then(user => user.send(`**You got warned** by ${interaction.user.displayName}. This is your **third warn, and you got **banned** from the server!!!**\n**Reason:** ${reason}.`));
                await targetMember.ban({reason: reason});
            };
            await userData.save().catch((e) => {
                console.log(`Error saving warn in db: ${e}`)
            });
        } catch (error) {
            console.log(`Error warning user: ${error}`);
        };
    },
};