/* eslint-disable no-mixed-spaces-and-tabs */
const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[prefix][help](command name you need help with)',
	cooldown: 5,
	run : async (client, message, args) => {
		// const data = [];
		// const myPrefix = '#';
		// const { commands } = msg.client;

		// if (!args.length) {
		// 	data.push('Here\'s a list of all my commands:');
		// 	data.push(commands.map(command => command.name).join(', '));
		// 	data.push(`\nYou can send \`${myPrefix}help [command name]\` to get info on a specific command!`);

		// 	return msg.author.send(data, { split: true })
		// 		.then(() => {
		// 			if (msg.channel.type === 'dm') return;
		// 			msg.reply('I\'ve sent you a DM with all my commands!');
		// 		})
		// 		.catch(error => {
		// 			console.error(`Could not send help DM to ${msg.author.tag}.\n`, error);
		// 			msg.reply('it seems like I can\'t DM you!');
		// 		});
		// }

		// const name = args[0].toLowerCase();
		// const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		// if (!command) {
		// 	return msg.reply('that\'s not a valid command!');
		// }

		// data.push(`**Name:** ${command.name}`);

		// if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		// if (command.description) data.push(`**Description:** ${command.description}`);
		// if (command.usage) data.push(`**Usage:** ${myPrefix}${command.name} ${command.usage}`);

		// data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		// msg.channel.send(data, { split: true });

		const roleColor =
		message.guild.me.displayHexColor === '#000000' ? '#ffffff' : message.guild.me.displayHexColor;

		const myPrefix = '#';

		if (!args[0]) {
			const categories = [];

			readdirSync('./commands/').forEach((dir) => {
				const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
					file.endsWith('.js'),
				);

				const cmds = commands.map((command) => {
					const file = require(`../../commands/${dir}/${command}`);

					if (!file.name) return 'No command name.';

					const name = file.name.replace('.js', '');

					return `\`${name}\``;
				});

				let data = new Object();

		  		data = {
					name: dir.toUpperCase(),
					value: cmds.length === 0 ? 'In progress.' : cmds.join(' '),
		  		};

		  categories.push(data);
			});

			const embed = new MessageEmbed()
		  .setTitle('📬 Need help? Here are all of my commands:')
		  .addFields(categories)
		  .setDescription(
					`Use \`${myPrefix}help\` followed by a command name to get more additional information on a command. For example: \`${myPrefix}help ban\`.`,
		  )
		  .setFooter(
					`Requested by ${message.author.tag}`,
					message.author.displayAvatarURL({ dynamic: true }),
		  )
		  .setTimestamp()
		  .setColor(roleColor);
			return message.channel.send(embed);
	  }
		else {
			const command =
		  client.commands.get(args[0].toLowerCase()) ||
		  client.commands.find(
		  	(c) => c.aliases && c.aliases.includes(args[0].toLowerCase()),
		  );

			if (!command) {
		  const embed = new MessageEmbed()
					.setTitle(`Invalid command! Use \`${myPrefix}help\` for all of my commands!`)
					.setColor('FF0000');
		  return message.channel.send(embed);
			}

			const embed = new MessageEmbed()
		  .setTitle('Command Details:')
		  .addField('PREFIX:', `\`${myPrefix}\``)
		  .addField(
					'COMMAND:',
					command.name ? `\`${command.name}\`` : 'No name for this command.',
		  )
		  .addField(
					'ALIASES:',
					command.aliases
			  ? `\`${command.aliases.join('` `')}\``
			  : 'No aliases for this command.',
		  )
		  .addField(
					'USAGE:',
					command.usage
			  ? `\`${myPrefix}${command.name} ${command.usage}\``
			  : `\`${myPrefix}${command.name}\``,
		  )
		  .addField(
					'DESCRIPTION:',
					command.description
			  ? command.description
			  : 'No description for this command.',
		  )
		  .setFooter(
					`Requested by ${message.author.tag}`,
					message.author.displayAvatarURL({ dynamic: true }),
		  )
		  .setTimestamp()
		  .setColor(roleColor);
			return message.channel.send(embed);
	  }
	},
};