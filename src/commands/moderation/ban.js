const  { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, GuildMember } = require("discord.js");
const { callback } = require("../misc/ping");

module.exports = {
    name: "ban",
    description: "Bans a member from the server",
    //devonly: bool,
    //testonly: bool,
    options: [
        {
            name: "user",
            description: "The user to ban",
            required: true,
            type: ApplicationCommandOptionType.User,
        },
        {
            name: "reason",
            description: "Reason for banning",
            required: false,
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.BanMembers],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get("user").value;
        const reason = interaction.options.get("reason")?.value || "No reason provided";

        await interaction.deferReply();

        const targetUser = interaction.guild.members.fetch(targetUserId);

        if(!targetUser) {
            await interaction.editReply("That user doesnt exists!");
            return;
        };

        if(targetUser.id === interaction.guild.ownerId) {
            interaction.editReply("You cant ban the owner!");
            return;
        };

        const guildMember = targetUser

        try {
            await interaction.guild.members.ban((await targetUser).id);
            await interaction.editReply({
                content: `${(await targetUser).user.displayName} got banned\nReason: ${reason}`,
                ephemeral: true,
            });
        } catch (error) {
            console.log(`There was an error banning a member! ${error}`);
        }

    }
}