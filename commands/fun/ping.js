const Discord = require('discord.js');
module.exports = {
	name: 'ping',
	description: 'Ping!',
	run : async (client, message, args) => {
		const delay = Date.now() - message.createdAt;
		const embed = new Discord.MessageEmbed()
			.setTitle('**Ping**')
			.setColor('RANDOM')
			.setDescription(`**Pong** *(delay: ${delay}ms)*\nAPI Latency: ${Math.round(client.ws.ping)}ms`);
		// message.channel.send(`**Pong** *(delay: ${delay}ms)*`);
		message.channel.send(embed);
	},
};