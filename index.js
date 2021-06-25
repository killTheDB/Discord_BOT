const Discord = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');
const db = require('quick.db');
const ascii = require('ascii-table');

dotenv.config();

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

require('discord-buttons')(client);
const commandFolders = fs.readdirSync('./commands');

const myPrefix = '#';
const mySecret = process.env.TOKEN;

const table = new ascii('Commands');
table.setHeading('Command', ' Load status');

/**
 * Loading commands directory
 * */

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		if(command.name) {
			client.commands.set(command.name, command);
			table.addRow(file, '✔');
		}
		else {
			table.addRow(file, '❌ -> Missing a help.name, or help.name is not a string.');
			continue;
		}
	}
}

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log(table.toString());
});

client.on('guildMemberAdd', (member) => {
	member.send('Welcome to the server');
	const embed = new Discord.MessageEmbed()
		.setTitle('Welcome to server')
		.setColor('#cc3300')
		.setDescription(`Thanks for joining\nMember Count : ${member.guild.memberCount}`)
		.setThumbnail(member.user.avatarURL());

	member.send(embed);
});

client.on('message', async msg => {

	const args = msg.content.slice(myPrefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	/**
	 * AFK START
	 */
	if(db.has(`AFK-${msg.author.id}+${msg.guild.id}`)) {
		// const info = db.get(`AFK-${msg.author.id}+${msg.guild.id}`);
		await db.delete(`AFK-${msg.author.id}+${msg.guild.id}`);
		msg.reply('I removed your AFK');
	}

	if(msg.mentions.members.first()) {
		if(db.has(`AFK-${msg.mentions.members.first().id}+${msg.guild.id}`)) {
			msg.channel.send(msg.mentions.members.first().user.tag + ':' + db.get(`AFK-${msg.mentions.members.first().id}+${msg.guild.id}`));
		}
	}
	/**
	 * AFK END
	 */

	if (!msg.content.startsWith(myPrefix) || msg.author.bot) return;

	/**
	 * Aliases
	 */
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	/**
	 * GuildOnly and DM's
	 */
	if (command.guildOnly && msg.channel.type === 'dm') {
		return msg.reply('I can\'t execute that command inside DMs!');
	}

	/**
	 * Check Permissions
	 */
	if (command.permissions) {
		const authorPerms = msg.channel.permissionsFor(msg.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return msg.reply('You dont have perms!');
		}
	}

	/**
	 * Check for arguments
	 */
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${msg.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${myPrefix}${command.name} ${command.usage}\``;
		}

		return msg.channel.send(reply);
	}

	/**
	 * Cooldowns starts
	 */
	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(msg.author.id)) {
		const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return msg.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(msg.author.id, now);
	setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

	/**
	 * Cooldowns end
	 */

	try {
		command.run(client, msg, args);
	}
	catch (error) {
		console.error(error);
		msg.reply('there was an error trying to execute that command!');
	}
});


client.login(mySecret);