const Discord = require('discord.js');
module.exports = {
	name: 'howgay',
	description: 'Shows gay percent!',
	run : async (client, message, args) => {
		const user = message.mentions.users.first() || message.member.user;
		const gaymeter = Math.floor(Math.random() * 101);
		const embed = new Discord.MessageEmbed()
			.setTitle('**Howgay**')
			.setColor('RANDOM')
			.setDescription(`${user.username} is ${gaymeter}% gay 🌈. *Gay Pride*`);

		message.channel.send(embed);
	},
};