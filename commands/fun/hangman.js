const Discord = require('discord.js');
const { hangman } = require('reconlx');
module.exports = {
	name: 'hangman',
	description: 'Play hangman game',
	run : async (client, message, args) => {
		console.log(message);
		// const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
		// if(!channel) return message.channel.send('Please specify a channel');
		// const word = args.slice(1).join(' ');
		const word = args.join(' ');
		if(!word) return message.channel.send('Please specify a word to guess.');

		const hang = new hangman({
			message: message,
			word: word,
			client: client,
			channelID: message.channel.id,
		});

		hang.start();
	},
};