/* eslint-disable no-mixed-spaces-and-tabs */
module.exports = {
	name: 'avatar',
	aliases: ['icon', 'pfp'],
	description: 'Shows avatar of users',
	run : async (client, msg, args) => {
		const Discord = require('discord.js');
		if (!msg.mentions.users.size) {
			// return msg.channel.send(`Your avatar: <${msg.author.displayAvatarURL({ format: 'png', dynamic: true })}>`);
			const avUrl = msg.author.displayAvatarURL({ format: 'png', dynamic: true });
			const embed = new Discord.MessageEmbed()
                    	.setTitle(`${msg.author.username} 's profile: `)
            			.setColor(12118406)
            			.setImage(avUrl);
			return msg.channel.send({ embed });
		}

		const avatarList = msg.mentions.users.map(user => {
			// return `${user.username}'s avatar: <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`;
			const avUrl = user.displayAvatarURL({ format: 'png', dynamic: true });
			const embed = new Discord.MessageEmbed()
           			.setTitle(`${user.username} 's profile: `)
           			.setColor(12118406)
           			.setImage(avUrl);
			msg.channel.send({ embed });
		});
		// msg.channel.send(avatarList);
	},
};
