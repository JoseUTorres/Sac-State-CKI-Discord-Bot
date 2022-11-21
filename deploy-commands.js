const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const clc = require('cli-color')
require('dotenv/config');

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// Delete specefic command
// rest.delete(Routes.applicationCommand(process.env.CLIENT_ID, '1010392289820033106'))
// 	.then(() => console.log('Successfully deleted application command'))
// 	.catch(console.error);

// and deploy your commands!
(async () => {
	try {
		console.log(clc.blue(`Started refreshing ${commands.length} application (/) commands.`));

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands },
		);

		//const moreData = await rest.put(
		//	Routes.applicationGuildCommands(process.env.CLIENT_ID, '840624658205376513'),
		//	{ body: commands },
		//);

		console.log(clc.green.bold(`Successfully reloaded ${data.length} (/) commands for Sac State CKI.`));
		//console.log(`Successfully reloaded ${moreData.length} (/) commands for lovers.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();