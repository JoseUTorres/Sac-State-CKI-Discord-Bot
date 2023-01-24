const { Client, GatewayIntentBits, Collection, Events } = require('discord.js')
const mongoose = require("mongoose")
const fs = require('node:fs')
const path = require('node:path')
const schedule = require('./commands/schedule')
const signup = require('./commands/signup')
const clc = require('cli-color')
require('dotenv/config')

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
    ],
})

client.commands = new Collection()

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(clc.yellow(`⚠️ [WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`))
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
        console.error(clc.yellow(`😐[meh] No command matching ${interaction.commandName} was found`))
        return
    }
    try {
        await command.execute(interaction, client)
    } catch(error) {
        console.log(clc.red.bold(error))
        await interaction.reply({ content: 'There was an error while executing this command! Blame Jose!', ephemeral: true })
    }
})

client.on('ready', () => {
    mongoose.connect(process.env.MONGO_URI, {
        keepAlive: true
    })
    console.log(clc.green.bold('CKI bot is ready ✅'))
})

schedule.init(client)
signup.init()

client.login(process.env.TOKEN)