const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
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
        .setDescription('Schedule a message or view/edit currently scheduled messages.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageEvents)
        .addSubcommand(subcommand =>
            subcommand
                .setName('post')
                .setDescription('Schedules post for desired date and time!')
                .addChannelOption(option =>
                    option
                        .setName('channel')
                        .setDescription('The channel the post will be scheduled for.')
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName('date')
                        .setDescription('Sets the date of the scheduled post. <YYYY/MM/DD>')
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName('time')
                        .setDescription('Sets the time of the scheduled post. <HH:MM>')
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName('am-pm')
                        .setDescription('Sets whether the post is scheduled for AM or PM.')
                        .setRequired(true)
                        .addChoices(
                            { name: 'AM', value: 'AM' },
                            { name: 'PM', value: 'PM' },
                        ))
                .addAttachmentOption(option =>
                    option
                        .setName('attachment')
                        .setDescription('Any files that need to be attached to the post should be uploaded here first.')))
        
        .addSubcommand(subcommand =>
            subcommand
                .setName('view')
                .setDescription('Allows user to view list of currently scheduled posts.'))
        
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove any currently scheduled posts.')
                .addStringOption(option =>
                    option
                        .setName('post')
                        .setDescription('Pick a post to remove.')
                        .setRequired(true)))
                        
    ,
    async execute(interaction, client) {
        if (interaction.options.getSubcommand() === 'view') {

            const posts = await scheduledSchema.find({})
            if (posts === undefined || posts.length == 0) {
                await interaction.reply({content: 'There is currently no posts scheduled.  ⏳', ephemeral: true})
            } else {
                const postsEmbed = new EmbedBuilder()
                    .setTitle('Currently Scheduled Posts')
                var counter = 0
                var options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                    timeZone: 'America/Los_Angeles'
                }
                for (const post of posts) {
                    counter++
                    var date = new Date(post.date)
                    dateString = date.toLocaleDateString('en-US', options)
                    postsEmbed.addFields({name: `Post ${counter}`, value: `Content: \`\`\`${post.content}\`\`\`\nDate: \`\`\`${dateString}\`\`\``})
                }
                await interaction.reply({content: ' ', embeds: [postsEmbed], ephemeral: true})
            }

        } else if (interaction.options.getSubcommand() === 'remove') {

            if (interaction.user.id === '298959447844323330' || interaction.user.id === '725033649212227594' || interaction.user.id === '267479916138856448') {
                const posts = await scheduledSchema.find({})
                var post = interaction.options.getString('post')
                post = parseInt(post)
                post--
                if (Number.isInteger(post) == false || posts[post] == null) {
                    await interaction.reply({content: 'Invalid post number! Please try again.  ❌', ephemeral: true})
                    return
                }
                const query = posts[post]
                await scheduledSchema.deleteOne(query) 
                await interaction.reply({content: 'The post has been removed!  👌', ephemeral: true})
            } else {
                await interaction.reply({content: 'Insufficent permissions.  ❌', ephemeral: true})
                return
            }
        
        } else if (interaction.options.getSubcommand() === 'post') {

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
    
            await interaction.reply({content: 'Please DM the bot with the post you would like to schedule.  📅', ephemeral: true})
    
            const filter = (m) => {
                return m.author.id === interaction.user.id
            }
    
            const dm = await interaction.user.send('Please enter the post you would like to schedule.  📬')
            const dmChannel = client.channels.cache.get(dm.channelId)
    
            // const collector = interaction.channel.createMessageCollector({ filter, max:1, time:1000 * 600})
            const collector = dmChannel.createMessageCollector({ filter, max:1, time:1000 * 600})
    
            collector.on('end', async (collected) => {

                const collectedMessage = collected.first()
    
                if (!collectedMessage) {
                    await interaction.user.send({content: 'You did not reply in time. The time limit is 10 mins.', ephemeral: true})
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
                    await interaction.editReply({content: 'Invalid time or date format please try again. ❌', ephemeral: true})
                    return
                }
    
                await interaction.editReply({content: `Your post has been scheduled for ${date} at ${time} ${amPm} ✅`, ephemeral: true})
                await interaction.user.send(`Your post has been scheduled for ${date} at ${time} ${amPm} ✅`)

            })

        }
    }
}