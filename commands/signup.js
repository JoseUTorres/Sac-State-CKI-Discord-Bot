const { SlashCommandBuilder, PermissionFlagBits, EmbedBuilder } = require('discord.js')
const { REST, Routes } = require('discord.js')
const fs = require('node:fs')
require('dotenv/config')
const { GoogleAuth } = require('google-auth-library')
const { google } = require("googleapis")

async function signupUser(userInfo) {

    const auth = new GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })

    const service = google.sheets({ version: 'v4', auth})

    const spreadsheetId = "1pcJTPyL84FcNNGmjfFk-HxziBRKmE_vT2uanuFsvccc"

    try {

        // const result = await service.spreadsheets.values.get({
        //     spreadsheetId,
        //     majorDimension: "ROWS",
        //     range: '1/24 Soup Kitchen!B6:M50'
        // })

        let values = [
            [
                `${userInfo.name}`, '', '', `${userInfo.carpool}`, '', '', `${userInfo.contact}`, '', '', `${userInfo.location}`
            ]
        ]

        const resource = {
            values,
        }

        const result = service.spreadsheets.values.append({
            spreadsheetId,
            range: `${userInfo.eventName}!B6:M50`,
            valueInputOption: 'RAW',
            resource
        })

    } catch (err) {
        throw err
    }

}

async function getSheetTitles() {

    const auth = new GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })

    const service = google.sheets({ version: 'v4', auth})

    const spreadsheetId = "1pcJTPyL84FcNNGmjfFk-HxziBRKmE_vT2uanuFsvccc"

    var sheetTitles = []

    try {

        const result = await service.spreadsheets.get({
            spreadsheetId
        })

        var sheets = result.data.sheets

        for (var sheet in sheets) {
            if (!(sheets[sheet].properties.hidden === true || sheets[sheet].properties.hidden === 'undefined' || sheets[sheet].properties.title === 'Home Page' || sheets[sheet].properties.title.includes('*TEMPLATE*') || sheets[sheet].properties.title.includes('Board Contact'))) {
                const value = sheets[sheet].properties.title
                sheetTitles[sheet] = { name: `${value}`, value: `${value}`}
            }
        }

    } catch (err) {
        throw err
    }

    sheetTitles = sheetTitles.filter(value => value)

    return sheetTitles

}

let data = new SlashCommandBuilder()
        .setName('signup')
        .setDescription('Sign up for upcoming events to help us accomondate for attendance and carpool.')
        .addStringOption(option =>
            option
                .setName('event')
                .setDescription('Enter the event you would like to sign up for.')
                .setRequired(true)
                .addChoices(
                    { name: 'test', value: 'test' }
                )
        )
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Enter the name that will be placed on the sign up sheet.')
                .setRequired(true)
        )
        .addStringOption(option => 
            option
                .setName('carpool')
                .setDescription('Enter your ride situation so we can plan accordingly.')
                .setRequired(true)
                .addChoices(
                    { name: 'I have my own!', value: 'I have my own!' },
                    { name: 'I offer rides!', value: 'I offer rides!' },
                    { name: 'I need a ride!', value: 'I need a ride!' },
                    { name: 'Online!', value: 'Online!'},
                )
        )
        .addStringOption(option =>
            option
                .setName('contact')
                .setDescription('Enter what platform would best to contact you.')
        )
        .addStringOption(option =>
            option
                .setName('location')
                .setDescription('Enter where you will be near.')
        )

module.exports = {
    init: () => {

        const commands = []
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            commands.push(command.data.toJSON());
        }

        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

        const checkForSheets = async () => {

            let sheetTitles = getSheetTitles()
            sheetTitles.then((result) => {

                result.forEach(event => {
        
                    if (!(data.options[0].choices.some(item => item.name === event.name))) {
                        data.options[0].addChoices(event)
                    }

                })

                data.options[0].choices.forEach(choice => {
                    
                    if (!(result.some(item => item.name === choice.name))) {
                        const index = data.options[0].choices.indexOf(choice)
                        data.options[0].choices.splice(index, 1)
                    }
                    
                })
        
            })
            
            const d = await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                { body: commands },
            )

            setTimeout(checkForSheets, 1000*60)

        }

        checkForSheets()

    }
    ,
    data: data
    ,
    async execute(interaction) {
        
        if (interaction.options.getSubcommand() === 'sheet') {

            const userName = interaction.options.getString('name')
            const eventName = interaction.options.getString('event')
            const carpool = interaction.options.getString('carpool')
            let contact = interaction.options.getString('contact')
            let location = interaction.options.getString('location')

            if (contact === undefined || contact === null) {

                contact = ''

            }

            if (location === undefined || location === null) {

                location = ''

            }

            const userInfo = {
                name: userName,
                eventName: eventName,
                carpool: carpool,
                contact: contact,
                location: location
            }

            await interaction.deferReply({ephemeral: true})

            signupUser(userInfo).then(() => {
                interaction.editReply({ content: 'You have been signed up!\nCheck out the sign up sheet here for more info.\nhttps://tinyurl.com/SacStateCKISignUpSheets'})
            })

        }
        
    }
}