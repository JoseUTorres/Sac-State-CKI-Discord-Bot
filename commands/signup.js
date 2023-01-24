const { SlashCommandBuilder, PermissionFlagBits, EmbedBuilder } = require('discord.js')
const { REST, Routes } = require('discord.js')
const fs = require('node:fs')
require('dotenv/config')
const { GoogleAuth } = require('google-auth-library')
const { google } = require("googleapis")

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
    //console.log(sheetTitles)
    return sheetTitles

}

let data = new SlashCommandBuilder()
        .setName('signup')
        .setDescription('Sign up for upcoming events to help us accomondate for attendance and carpool.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('details')
                .setDescription('View the full details for upcoming events before signing up.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('sheet')
                .setDescription('Enter your name and ride situation to sign up for an event.')
                .addStringOption(option =>
                    option
                        .setName('event')
                        .setDescription('Enter the event you would like to sign up for.')
                        .setRequired(true)
                        .addChoices(
                            { name: 'test', value: 'test' }
                        )
                )
        )

module.exports = {
    init: () => {

        const commands = []
        const command = require(`../commands/signup.js`)
        commands.push(command.data.toJSON())

        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

        const checkForSheets = async () => {

            let sheetTitles = getSheetTitles()
            sheetTitles.then((result) => {

                result.forEach(event => {

                    if (!(data.options[1].options[0].choices.some(item => item.name === event.name))) {
                        data.options[1].options[0].addChoices(event)
                    }
                })

                data.options[1].options[0].choices.forEach(choice => {
                    if (!(result.some(item => item.name === choice.name))) {
                        const index = data.options[1].options[0].choices.indexOf(choice)
                        data.options[1].options[0].choices.splice(index, 1)
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
    async execute(interaction, client) {
        
        
    }
}