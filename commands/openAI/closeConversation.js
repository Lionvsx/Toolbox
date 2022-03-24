const BaseCommand = require('../../utils/structures/BaseCommand')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = class StopConversation extends BaseCommand {
    constructor() {
        super('stop-conversation', 'ai', {
            usage: 'stop-conversation',
            description: 'Close the bridge between OpenAI and the channel',
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

        client.openConversations.delete(interaction.channel.id);
        client.replySuccess(interaction, "Conversation terminée");
    }
}