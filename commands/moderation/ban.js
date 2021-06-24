const Discord = require('discord.js');

module.exports = {
	name: 'ban',
	guildOnly: true,
	cooldown: 8,
	permissions: 'BAN_MEMBERS',
	description: 'Ban user from guild',
	run : async (client, msg, args) => {
		if (!msg.mentions.users.size) {
			return msg.reply('You need to tag a user in order to ban them!');
		}
		const taggedUser = msg.mentions.users.first();
		const member = msg.mentions.members.first();
		if (!member) {
			return msg.reply('Not a valid user/ Not in the guild.');
		}
		if(!member.bannable) {
			return msg.reply('I\'m unable to ban this user');
		}
		const embed = new Discord.MessageEmbed()
			.setTitle('Ban Hammer')
			.setColor('RANDOM')
			.setDescription(`<@${taggedUser.id}> is banned.`);
		msg.channel.send(embed);
		let reason = args.slice(1).join(' ');
		if(!reason) {
			reason = 'No reason given.';
		}
		const banembed = new Discord.MessageEmbed()
			.setTitle(`You were banned from ${msg.guild.name}`)
			.setDescription(`Reason: ${reason}`)
			.setColor('RANDOM')
			.setTimestamp();
		member.send(banembed);

		member.ban();
	},
};
