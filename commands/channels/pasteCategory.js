const BaseCommand = require('../../utils/structures/BaseCommand')
const { Permissions} = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = class CopyCategory extends BaseCommand {
    constructor() {
        super('paste-category', 'channels', {
            usage: 'paste-category',
            description: 'Paste Category channel from clipboard',
            categoryDisplayName: '💎 Channels'
        }, {
            clientPermissions: [Permissions.FLAGS.MANAGE_CHANNELS],
            userPermissions: [],
            home: false
        });

        this.builder = new SlashCommandBuilder()
            .setDefaultPermission(true)
            .setName(this.name)
            .setDescription(this.help.description)
    }
    async run(client, interaction, options) {
        const guild = interaction.guild
        let savedCategory = client.categoryClipboard;

        if (!savedCategory) return;
        if (savedCategory.category.guildID === guild.id) {
            guild.channels.create(savedCategory.category.name, {
                type: 'GUILD_CATEGORY',
                position: 1,
                permissionOverwrites: savedCategory.category.permissions,
            }).then(categoryChannel => {
                savedCategory.childChannels.forEach(childChannel => {
                    guild.channels.create(childChannel.name, {
                        type: childChannel.type,
                        position: childChannel.position,
                        permissionOverwrites: childChannel.permissions,
                        parent: categoryChannel
                    }).then(chan => chan.lockPermissions())
                })
            })
        } else {
            guild.channels.create(savedCategory.category.name, {
                type: 'category',
                position: 1,
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone.id,
                        deny: ['VIEW_CHANNEL']
                    }
                ],
            }).then(categoryChannel => {
                savedCategory.childChannels.forEach(childChannel => {
                    guild.channels.create(childChannel.name, {
                        type: childChannel.type,
                        position: childChannel.position,
                        permissionOverwrites: [
                            {
                                id: guild.roles.everyone.id,
                                deny: ['VIEW_CHANNEL']
                            }
                        ],
                        parent: categoryChannel
                    })
                })
            })
        }
        interaction.reply(`**:white_check_mark: | **Paste category !`)
    }
}