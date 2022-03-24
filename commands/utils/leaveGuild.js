const BaseCommand = require('../../utils/structures/BaseCommand')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = class LeaveCommand extends BaseCommand {
    constructor() {
        super('leave', 'utilities', {
            usage: 'leave',
            description: 'Leaves this guild',
            categoryDisplayName: '🔧 Utilities'
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
        client.replySuccess(interaction, `Leaving guild ${interaction.guild.name}`);
        await interaction.guild.leave();
    }
}

