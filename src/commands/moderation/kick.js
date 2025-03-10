const  { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, GuildMember, EmbedBuilder, Guild, Colors, Message, MessageFlags, InteractionResponse } = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kicks a member",
    //devonly: bool,
    //testonly: bool,
    deleted: false,
    options: [
        {
            name: "user",
            description: "The user to timeout",
            required: true,
            type: ApplicationCommandOptionType.User,
        },
        {
            name: "reason",
            description: "Reason for timeout",
            required: false,
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionRequired: [PermissionFlagsBits.KickMembers],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        const targetUserId = await interaction.options.get("user").user.id;
        const reason = await interaction.options.get("reason")?.value || "No reason provided."

        const embed = new EmbedBuilder()
            .setTitle("You got kicked!")
            .setDescription(`You got kicked by ${interaction.user.globalName}\n**Reason: **${reason}`)
            .setColor(Colors.NotQuiteBlack);
            
        const targetUser = await interaction.guild.members.fetch(targetUserId).catch(err => {
            interaction.reply({
                content: "This user isnt in the server!",
                flags: MessageFlags.Ephemeral,
            });
            return;
        });            

        await targetUser.send({embeds: [embed]})

        await targetUser.kick(reason);

        interaction.reply({
            content:"The user got kicked!",
            flags: MessageFlags.Ephemeral,
        });
    },
};