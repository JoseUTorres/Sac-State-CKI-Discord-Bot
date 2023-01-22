const { SlashCommandBuilder, PermissionFlagBits, EmbedBuilder } = require('discord.js')
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
                sheetTitles.push(sheets[sheet].properties.title)
                //delete sheets[sheet]
            }
        }
        // sheetTitles = sheetTitles.filter(n => n)
    } catch (err) {
        throw err
    }
    //console.log(sheetTitles)
    return sheetTitles

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('signup')
        .setDescription('Sign up for upcoming events to help us accomondate for attendance and carpool.')
    ,
    async execute(interaction, client) {
        let sheetTitles = getSheetTitles()
        sheetTitles.then((result) => {
            interaction.reply({content: `title: ${result[0]}`, ephemeral: true})
        })
        // const title = test[1]
        // await interaction.reply({content: `title: ${title}`, ephemeral: true})
    }
}