const BaseCommand = require('../../utils/structures/BaseCommand')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = class OpenConversation extends BaseCommand {
    constructor() {
        super('start-conversation', 'ai', {
            usage: 'start-conversation',
            description: 'Open the bridge with OpenAI API on this channel',
            categoryDisplayName: '🧠 IA'
        }, {
            clientPermissions: [],
            userPermissions: [],
            home: false
        });

        this.builder = new SlashCommandBuilder()
            .setDefaultPermission(true)
            .setName(this.name)
            .setDescription(this.help.description)
    }
    async run(client, interaction, options) {
        if (interaction.user.id !== ("212357824557219840" || "259814691445014530" || "440859158540189697")) return client.replyError(interaction, "Tu n'as pas la permission de lancer cette commande")

        client.openConversations.set(interaction.channel.id, true);
        interaction.reply("Comment ca va salope?")
    }
}