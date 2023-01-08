const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const hours = require('../data/hours.json')
const lastUpdated = 'January 2023'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hours')
        .setDescription('This command will DM you your current MRP hours for service, leadership, and fellowship!')
        .addStringOption(option =>
            option
                .setName('first-name')
                .setDescription('Please enter your first name.')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('last-name')
                .setDescription('Please enter your last name.')
                .setRequired(true))
        ,
    async execute(interaction) {
        const fname = interaction.options.getString('first-name')
        const lname = interaction.options.getString('last-name')
        var nickname = interaction.member.nickname
        if (nickname.includes(" ")) {
            nickname = nickname.replace('.', '')
        }

        await interaction.deferReply({ephemeral: true})

        var i
        for (i = 0; i < hours.Members.length; ++i) {
            if (hours.Members[i].name.toUpperCase().includes(fname.toUpperCase()) && hours.Members[i].name.toUpperCase().includes(lname.toUpperCase()) && hours.Members[i].name.toUpperCase().includes(nickname.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                var service = hours.Members[i].service
                var leadership = hours.Members[i].leadership
                var fellowship = hours.Members[i].fellowship
                var status = hours.Members[i].status

                if (service === '') {
                    service = '0'
                }
                if (leadership === '') {
                    leadership = '0'
                }
                if (fellowship === '') {
                    fellowship = '0'
                }
                if (status === '') {
                    status = 'Not enough hours to reach MRP status'
                }

                interaction.user.send({content: `Hours Updated as of ${lastUpdated}\nService: ${service} hrs\nLeadership: ${leadership} hrs\nFellowship: ${fellowship} hrs\nMRP Status: ${status}`})
                interaction.editReply({content: 'Check your direct messages!  📬', ephemeral: true})
                return
            }
        }
        
        await interaction.editReply({content: 'First or last name was entered incorrectly. It could also be that the name entered does not belong to you. If it still does not work you may not be a dues paid member for the term. Please try again or reach out to a board officer.', ephemeral: true})
        
    }
}