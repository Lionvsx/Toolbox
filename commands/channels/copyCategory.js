const BaseCommand = require('../../utils/structures/BaseCommand')
const { Permissions} = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = class CopyCategory extends BaseCommand {
    constructor() {
        super('copy-category', 'channels', {
            usage: 'copy-category',
            description: 'Copy Category channel into clipboard',
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
            .addChannelOption(option =>
                option.setName("category")
                    .setRequired(true)
                    //addChannelTypes([ChannelTypes.GUILD_CATEGORY])
                    .setDescription("Enter the category you want to copy")
            )
    }
    async run(client, interaction, options) {
        const guild = interaction.guild
        const allChannels = guild.channels.cache
        let category = allChannels.get(options.get('category').channel.id)
        
        let childrenChannels = allChannels.filter(c => c.parent === category)
        let clipboard = {
            category: {
                name: category.name,
                permissions: category.permissionOverwrites.cache,
                guildID: guild.id
            },
            childChannels: [
            ]
        }
        childrenChannels.each(channel => {
            clipboard.childChannels.push({
                name: channel.name,
                permissions: channel.permissionOverwrites.cache,
                type: channel.type,
                position: channel.position
            })
        })
        client.categoryClipboard = clipboard;

        interaction.reply("Category copied")
    }
}