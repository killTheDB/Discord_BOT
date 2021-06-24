const db = require('quick.db');
const Discord = require('discord.js');
module.exports = {
	name: 'afk',
	description: 'Sets AFK',
	run : async (client, message, args) => {
		const afktext = args.join(' ');
		db.set(`AFK-${message.author.id}+${message.guild.id}`, afktext);
		const embed = new Discord.MessageEmbed()
			.setDescription(`AFK\n**Reason: **\n${afktext}`)
			.setColor('RANDOM')
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }));
		message.channel.send(embed);
	},
};