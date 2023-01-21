const { GoogleAuth } = require('google-auth-library')
const { google } = require("googleapis")

async function main() {
    const auth = new GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })

    const service = google.sheets({ version: 'v4', auth})
    // const auth = new google.auth.GoogleAuth({
    //     keyFile: "credentials.json",
    //     scopes: "https://www.googleapis.com/auth/spreadsheets",
    // })

    // const client = await auth.getClient()

    // const googleSheets = google.sheets({ version: "v4", auth: client })

    const spreadsheetId = "1pcJTPyL84FcNNGmjfFk-HxziBRKmE_vT2uanuFsvccc"

    try {
        const result = await service.spreadsheets.values.get({
            spreadsheetId,
            range: 'Home Page!A3:D5',
        })
        const numRows = result.data.values ? result.data.values.length : 0
        console.log(`${numRows} rows retrieved.`)
        return result
    } catch (err) {
        throw err
    }

    // const metaData = await googleSheets.spreadsheets.get({
    //     auth: auth,
    //     spreadsheetId: spreadsheetId
    // })

    // console.log(metaData)
}

main()