const fs = require('fs');

module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	args: true,
	run : async (client, msg, args) => {
		if(msg.author.id === '639272038560956440') {
			const commandName = args[0].toLowerCase();
			const command = msg.client.commands.get(commandName)
				|| msg.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

			if (!command) {
				return msg.channel.send(`There is no command with name or alias \`${commandName}\`, ${msg.author}!`);
			}

			const commandFolders = fs.readdirSync('./commands');
			const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

			delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

			try {
				const newCommand = require(`../${folderName}/${command.name}.js`);
				msg.client.commands.set(newCommand.name, newCommand);
				msg.channel.send(`Command \`${newCommand.name}\` was reloaded!`);
			}
			catch (error) {
				console.error(error);
				msg.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
			}
		}
		else {
			msg.reply('You are not my dad');
		}

	},
};