const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const momentTimezone = require('moment-timezone')
const scheduledSchema = require('../models/scheduled-schema')

module.exports = {
    init: (client) => {
        const checkForPosts = async () => {
            const query = {
                date: {
                    $lte: Date.now()
                }
            }

            const results = await scheduledSchema.find(query)

            for (const post of results) {
                const { guildId, channelId, content, attachment } = post

                const guild = await client.guilds.fetch(guildId)
                if (!guild) {
                    continue
                }

                const channel = guild.channels.cache.get(channelId)
                if (!channel) {
                    continue
                }

                channel.send(content)
                if (attachment != null) {
                    await channel.send(attachment)
                }
            }

            await scheduledSchema.deleteMany(query)

            setTimeout(checkForPosts, 1000*10)
        }

        checkForPosts()
    },
    data: new SlashCommandBuilder()
        .setName('schedule')
        .setDescription('Schedules message for desired date and time!')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageEvents)
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('The channel the message will be scheduled for.')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('date')
                .setDescription('Sets the date of the scheduled message. <YYYY/MM/DD>')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('time')
                .setDescription('Sets the time of the scheduled message. <HH:MM>')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('am-pm')
                .setDescription('Sets whether the message is scheduled for AM or PM.')
                .setRequired(true)
                .addChoices(
                    { name: 'AM', value: 'AM' },
                    { name: 'PM', value: 'PM' },
                ))
        .addAttachmentOption(option =>
            option
                .setName('attachment')
                .setDescription('Any files that need to be attached to the message should be uploaded here first.'))
    ,
    async execute(interaction) {
        const guild = interaction.guild
        const timeZone = 'America/Los_Angeles'
        const targetChannel = interaction.options.getChannel('channel')
        const date = interaction.options.getString('date')
        const time = interaction.options.getString('time')
        const amPm = interaction.options.getString('am-pm')
        const attachment = await interaction.options.getAttachment('attachment')

        const targetDate = momentTimezone.tz(
            `${date} ${time} ${amPm}`,
            'YYYY/MM/DD HH:mm A',
            timeZone
        )

        await interaction.reply({content: 'Please enter the message you would like to schedule.  📬', ephemeral: true})

        const filter = (m) => {
            return m.author.id === interaction.user.id
        }

        const collector = interaction.channel.createMessageCollector({ filter, max:1, time:1000 * 600})

        collector.on('end', async (collected) => {
            const collectedMessage = collected.first()

            if (!collectedMessage) {
                interaction.editReply({content: 'You did not reply in time. The time limit is 10 mins.', ephemeral: true})
                return
            }
            try {
                if (attachment == null) {
                    await new scheduledSchema({
                        date: targetDate.valueOf(),
                        content: collectedMessage.content,
                        guildId: guild.id,
                        channelId: targetChannel.id,
                    }).save()
                } else {
                    await new scheduledSchema({
                        date: targetDate.valueOf(),
                        content: collectedMessage.content,
                        guildId: guild.id,
                        channelId: targetChannel.id,
                        attachment: attachment.attachment
                    }).save()
                }
            } catch (error) {
                interaction.editReply({content: 'Invalid time or date format please try again. ❌', ephemeral: true})
                collectedMessage.delete()
                return
            }

            collectedMessage.delete()

            interaction.editReply({content: 'Your message has been scheduled. ✅', ephemeral: true})
        })

    }
}