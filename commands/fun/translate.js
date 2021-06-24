const Discord = require('discord.js');
const translate = require('@iamtraction/google-translate');
// const translate = require('google-translate');
module.exports = {
	name: 'translate',
	description: 'Translate',
	run : async (client, message, args) => {
		const query = args.join(' ');
		if(!query) {
			return message.channel.send('Specify text to translate');
		}
		const res = await translate(query, { to: 'en' });
		// message.channel.send(res.text);
		const embed = new Discord.MessageEmbed()
			.setTitle(`**Translate:** ${query}`)
			.setColor('RANDOM')
			.setDescription(`${res.text}`);

		message.channel.send(embed);
	},
};