const Discord = require('discord.js');
module.exports = {
	name: 'userinfo',
	description: 'Shows user his details',
	run : async (client, msg, args) => {
		// if(!args.length) {
		// 	msg.channel.send(`Your username: ${msg.author.username}#${msg.author.discriminator}\nYour ID: ${msg.author.id}`);
		// }
		// else {
		try {
			const user = msg.mentions.users.first() || msg.member.user;
			const member = msg.guild.members.cache.get(user.id);
			// msg.channel.send(`Username: ${member.user.username}#${member.user.discriminator}\nID: ${member.id}`);
			const embed = new Discord.MessageEmbed()
				.setAuthor(`User info for: ${user.username}`, user.displayAvatarURL())
				.setColor('RANDOM')
				.addFields({
					name: 'User Tag',
					value: user.tag,
				},
				{
					name: 'Is bot',
					value: user.bot,
				},
				{
					name: 'Nickname',
					value: member.nickname || 'None',
				},
				{
					name: 'Joined Server',
					value: new Date(member.joinedTimestamp).toLocaleDateString(),
				},
				{
					name: 'Joined Discord At',
					value: new Date(user.createdTimestamp).toLocaleDateString(),
				},
				{
					name: 'Role Count',
					value: member.roles.cache.size - 1,
				},
				{
					name: 'Roles',
					value: member.roles.cache.filter((roles) => roles.id !== msg.guild.id).map((role) => role.toString()),
				},
				)
					;
			msg.channel.send(embed);
		}
		catch (error) {
			msg.reply('Tag a user');
		}
		// }
	},
};