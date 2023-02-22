const {
	SlashCommandBuilder,
	PermissionFlagBits,
	EmbedBuilder,
	PermissionsBitField,
} = require("discord.js");
const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
require("dotenv/config");
const { GoogleAuth } = require("google-auth-library");
const { google } = require("googleapis");

async function signupUser(userInfo) {
	const auth = new GoogleAuth({
		keyFile: "credentials.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});

	const service = google.sheets({ version: "v4", auth });

	const spreadsheetId = "1pcJTPyL84FcNNGmjfFk-HxziBRKmE_vT2uanuFsvccc";

	try {
		// const result = await service.spreadsheets.values.get({
		//     spreadsheetId,
		//     majorDimension: "ROWS",
		//     range: '1/24 Soup Kitchen!B6:M50'
		// })

		let values = [
			[
				`${userInfo.name}`,
				"",
				"",
				`${userInfo.carpool}`,
				"",
				"",
				`${userInfo.contact}`,
				"",
				"",
				`${userInfo.location}`,
			],
		];

		const resource = {
			values,
		};

		const result = service.spreadsheets.values.append({
			spreadsheetId,
			range: `${userInfo.eventName}!B6:M50`,
			valueInputOption: "RAW",
			resource,
		});
	} catch (err) {
		throw err;
	}
}

async function getSheetTitles() {
	const auth = new GoogleAuth({
		keyFile: "credentials.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});

	const service = google.sheets({ version: "v4", auth });

	const spreadsheetId = "1pcJTPyL84FcNNGmjfFk-HxziBRKmE_vT2uanuFsvccc";

	var sheetTitles = [];

	try {
		const result = await service.spreadsheets.get({
			spreadsheetId,
		});

		var sheets = result.data.sheets;

		for (var sheet in sheets) {
			if (
				!(
					sheets[sheet].properties.hidden === true ||
					sheets[sheet].properties.hidden === "undefined" ||
					sheets[sheet].properties.title === "Home Page" ||
					sheets[sheet].properties.title.includes("*TEMPLATE*") ||
					sheets[sheet].properties.title.includes("Board Contact")
				)
			) {
				const value = sheets[sheet].properties.title;
				sheetTitles[sheet] = { name: `${value}`, value: `${value}` };
			}
		}
	} catch (err) {
		throw err;
	}

	sheetTitles = sheetTitles.filter((value) => value);

	return sheetTitles;
}

async function getSignedUsers(eventName) {
	const auth = new GoogleAuth({
		keyFile: "credentials.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});

	const service = google.sheets({ version: "v4", auth });

	const spreadsheetId = "1pcJTPyL84FcNNGmjfFk-HxziBRKmE_vT2uanuFsvccc";

	try {
		const result = await service.spreadsheets.get({
			spreadsheetId,
		});

		var sheets = result.data.sheets;
		var sheet = sheets.find((element) =>
			element.properties.title.includes(eventName)
		);

		const users = await service.spreadsheets.values.get({
			spreadsheetId,
			range: `${sheet.properties.title}!B6:B50`,
		});
		// convert 2D array to 1D array
		var userArr = [];
		if (users.data.values !== undefined) {
			userArr = [].concat(...users.data.values);
		}
		return userArr;
	} catch (err) {
		throw err;
	}
}

let data = new SlashCommandBuilder()
	.setName("signup")
	.setDescription(
		"Sign up for upcoming events to help us accomondate for attendance and carpool."
	)
	.addStringOption((option) =>
		option
			.setName("event")
			.setDescription("Enter the event you would like to sign up for.")
			.setRequired(true)
			.addChoices({ name: "test", value: "test" })
	)
	.addStringOption((option) =>
		option
			.setName("name")
			.setDescription(
				"Enter the name that will be placed on the sign up sheet."
			)
			.setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName("carpool")
			.setDescription("Enter your ride situation so we can plan accordingly.")
			.setRequired(true)
			.addChoices(
				{ name: "I have my own!", value: "I have my own!" },
				{ name: "I offer rides!", value: "I offer rides!" },
				{ name: "I need a ride!", value: "I need a ride!" },
				{ name: "Online!", value: "Online!" }
			)
	)
	.addStringOption((option) =>
		option
			.setName("contact")
			.setDescription("Enter what platform would best to contact you.")
	)
	.addStringOption((option) =>
		option.setName("location").setDescription("Enter where you will be near.")
	);

module.exports = {
	init: async (client) => {
		async function getGuild() {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(client.guilds.cache.get("575535162201473027"));
				}, 5000);
			});
		}

		async function getMembers(guild) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(guild.members.fetch());
				}, 5000);
			});
		}

		async function getRoles(guild) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(guild.roles.fetch());
				}, 5000);
			});
		}

		async function createRole(guild, roleName) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(guild.roles.create({ name: `${roleName}` }));
				}, 5000);
			});
		}

		async function createChannel(guild, channelName) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(
						guild.channels.create({
							name: channelName,
							parent: "1076297891162886164",
						})
					);
				}, 5000);
			});
		}

		async function findMember(members, user) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(members.find((m) => m.nickname === user));
				}, 5000);
			});
		}

		const commands = [];
		const commandFiles = fs
			.readdirSync("./commands")
			.filter((file) => file.endsWith(".js"));
		for (const file of commandFiles) {
			const command = require(`../commands/${file}`);
			commands.push(command.data.toJSON());
		}

		const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

		const guild = await getGuild();

		const checkForSheets = async () => {
			const members = await getMembers(guild);
			const channelsArray = Array.from(guild.channels.cache.values());
			let channelNames = [];
			channelsArray.forEach((channel) => {
				channelNames.push(channel.name);
			});
			// get sheet titles
			let sheetTitles = getSheetTitles();
			// once sheet titles are available
			sheetTitles.then((result) => {
				// loop through each sheet
				result.forEach(async (event) => {
					// if the sheet title is not a choice in the command
					if (
						!data.options[0].choices.some((item) => item.name === event.name)
					) {
						// add it to choices
						data.options[0].addChoices(event);
					}
					// format channel to the event title
					let eventChannelName = event.name.replaceAll(" ", "-");
					// search for a role with that event name if doesn't exist create a role for it
					if (
						guild.roles.cache.find((role) => role.name === event.name) ===
						undefined
					) {
						await createRole(guild, event.name);
					}
					// search for a text channel with that event name and if doesn't exist create a channel for it
					if (
						guild.channels.cache.find(
							(channel) =>
								channel.name ===
								eventChannelName.replaceAll("/", "").toLowerCase()
						) === undefined
					) {
						await createChannel(guild, event.name);
					}
					var channelCreated = guild.channels.cache.find(
						(channel) =>
							channel.name ===
							eventChannelName.replaceAll("/", "").toLowerCase()
					);
					channelCreated.permissionOverwrites.create(guild.roles.everyone, {
						ViewChannel: true,
						SendMessages: true,
						AddReactions: true,
						AttachFiles: true,
						EmbedLinks: true,
					});
					// get the list of users for that event
					let users = getSignedUsers(event.name);
					// once user list is available
					users.then((result) => {
						// loop through each user
						result.forEach(async (user) => {
							// format user string
							if (user.includes(" ")) {
								if (user.toLowerCase() === "matthew christiansen") {
									user = "Matthew C.";
								} else if (user.toLowerCase() === "josh narciso") {
									user = "Josh N.";
								} else {
									user = user.split(" ");
									user = user[0];
								}
							}
							// find them on discord
							var member = await findMember(members, user);
							// if the member is found then
							if (member !== undefined) {
								// give them event role
								const roles = await getRoles(guild);
								var roleAdd = roles.find(
									(role) => role.name === `${event.name}`
								);
								if (roleAdd !== undefined) {
									member.roles.add(roleAdd);
								}
							}
						});
					});
				});
				// for each choice in the command
				data.options[0].choices.forEach((choice) => {
					// if there is no event in the sheet with the choice name
					if (!result.some((item) => item.name === choice.name)) {
						// remove that event from choices in command once it has been removed from sheets
						const index = data.options[0].choices.indexOf(choice);
						data.options[0].choices.splice(index, 1);
						// remove channel once it has been removed from sheets
						const channelDelete = guild.channels.cache.find(
							(channel) =>
								channel.name ===
								choice.name
									.replaceAll("/", "")
									.replaceAll(" ", "-")
									.toLowerCase()
						);
						if (channelDelete !== undefined) {
							channelDelete.delete();
						}
						const roleDelete = guild.roles.cache.find(
							(role) => role.name === choice.name
						);
						if (roleDelete !== undefined) {
							roleDelete.delete();
						}
					}
				});
			});
			// refresh commands
			const d = await rest.put(
				Routes.applicationGuildCommands(
					process.env.CLIENT_ID,
					process.env.GUILD_ID
				),
				{ body: commands }
			);
			// refresh this command every minute
			setTimeout(checkForSheets, 1000 * 60);
		};

		checkForSheets();
	},
	data: data,
	async execute(interaction) {
		const userName = interaction.options.getString("name");
		const eventName = interaction.options.getString("event");
		const carpool = interaction.options.getString("carpool");
		let contact = interaction.options.getString("contact");
		let location = interaction.options.getString("location");

		if (contact === undefined || contact === null) {
			contact = "";
		}

		if (location === undefined || location === null) {
			location = "";
		}

		const userInfo = {
			name: userName,
			eventName: eventName,
			carpool: carpool,
			contact: contact,
			location: location,
		};

		await interaction.deferReply({ ephemeral: true });

		signupUser(userInfo).then(() => {
			interaction.editReply({
				content:
					"You have been signed up!\nCheck out the sign up sheet here for more info.\nhttps://tinyurl.com/SacStateCKISignUpSheets",
			});
		});
	},
};
