const Discord = require('discord.js');

module.exports = {
	name: 'kick',
	guildOnly: true,
	cooldown: 8,
	permissions: 'KICK_MEMBERS',
	description: 'Kick user out of guild',
	run : async (client, msg, args) => {
		if (!msg.mentions.users.size) {
			return msg.reply('You need to tag a user in order to kick them!');
		}
		const taggedUser = msg.mentions.users.first();
		const member = msg.mentions.members.first();
		if (!member) {
			return msg.reply('Not a valid user/ Not in the guild.');
		}
		if(!member.kickable) {
			return msg.reply('I\'m unable to kick this user');
		}
		const embed = new Discord.MessageEmbed()
			.setTitle('Collier Kick')
			.setColor('RANDOM')
			.setDescription(`<@${taggedUser.id}> is kicked.`);
		msg.channel.send(embed);
		let reason = args.slice(1).join(' ');
		if(!reason) {
			reason = 'No reason given.';
		}
		const kickembed = new Discord.MessageEmbed()
			.setTitle(`You were kicked from ${msg.guild.name}`)
			.setDescription(`Reason: ${reason}`)
			.setColor('RANDOM')
			.setTimestamp();
		member.send(kickembed);

		member.kick();
	},
};
