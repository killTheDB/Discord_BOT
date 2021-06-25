const Discord = require('discord.js');
module.exports = {
	name: 'toss',
	description: 'Toss a coin heads or tails',
	run : async (client, message, args) => {
		const res = Math.floor(Math.random() * 2);
		let result = '';
		if(res == 1) result = 'Heads';
		else result = 'Tails';
		const embed = new Discord.MessageEmbed()
			.setTitle('**Coin Flip**')
			.setColor('RANDOM')
			.setDescription(`**Coin flips: ** ${result}`);
		message.channel.send(embed);
	},
};